import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { ProductoProviderService } from '../services/producto-provider.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public productos: Array<Producto>;


  constructor(private productosProvider: ProductoProviderService, private events : Events) { }

  ngOnInit() {
    this.productos = this.productosProvider.getProductos();
  }





  onSearchInputChanged(event: any) {
    // get the value of the searchbar and log it
    let searchQuery = event.target.value;
    console.log("Searching productos with query '" + searchQuery + "'");

    // if the value is an empty string don't filter the items
    if (searchQuery && searchQuery.trim() != '') {
      this.productos = this.productosProvider.getProductos().filter((producto) => {
        return (producto.nome.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
      })
    }
    // Reset list is search query is cleared
    else {
      this.productos = this.productosProvider.getProductos();
    }
  }

  delete(producto: Producto){
    console.log("PRODUCTO " + producto.nome+ " removido" );
    let index = this.productos.indexOf(producto);

    if(index > -1){
      this.productos.splice(index, 1);
    }

  }

  toogleAdquirido(producto: Producto){

   if (producto.adquirido==false){
        producto.adquirido=true
        this.productosProvider.saveAdquirido(producto);

   }else{
     producto.adquirido=false
     this.productosProvider.deleteAdquirido(producto);

   }


  }



}
