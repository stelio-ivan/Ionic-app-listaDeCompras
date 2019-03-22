import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Producto } from '../model/producto';

@Injectable({
    providedIn: 'root'
  })
  export class ProductoProviderService {
  
    private productos: Array<Producto>;
    filterData :Array<Producto>;
  
    constructor(private http: Http, private events : Events) {
      this.productos = [];
    }

    public getProducto(nome : string) {
        console.log("Searching producto with nome = " + nome + " in producto db with size " + this.getProductos().length);
        let productoFound = this.getProductos().find((producto) => {
          // return true if ids match
          return producto.nome==nome;
        });
        // log result and return
        if (productoFound) {
          console.log("producto found '" + productoFound.nome + "' for code = " +nome);
        }
        else {
          console.log("producto not found!");
        }
        return productoFound;
    }

    public getProductos() {
        // Lazy loading of data within object instance
        if (this.productos.length == 0) {
            this.loadData();
        }
        return this.productos;
      }

      notifyDataChange() {
        // More info on how to use Events at https://ionicframework.com/docs/api/util/Events/
        this.events.publish('producto-data-changed');
        console.log("Publishing event 'producto-data-changed'");
      }

      
      public save(producto: Producto) {
        this.productos.push(producto);
        console.log("Producto '" + producto.nome + "' saved in-memory!");
      }

    loadData(): any {
        console.log("Loading Data from 'assets/data/productos.json'...");
        // Tutorial on HTTP Data Fetch https://www.joshmorony.com/using-http-to-fetch-remote-data-from-a-server-in-ionic-2/
        // Updated for use in Ionic 4 using pipe
        // Asynchronous call
        this.http.get('assets/data/productos.json').pipe(map(res => res.json())).subscribe(
          data => {
            for (let i=0; i < data.length; ++i) {
              this.productos.push(
                new Producto( data[i].nome,data[i].qtd, data[i].adquirido, data[i].descricao)
              );
            }
            console.log("Data loaded successfully.");
            this.notifyDataChange();
          },
          err => {
            console.log("Error Loading Data!");
          }
        );
    }
         
 
 
 
 }