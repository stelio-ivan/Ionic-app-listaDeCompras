import { Component } from '@angular/core';
import { Events } from '@ionic/angular';
import { ProductoProviderService } from '../services/producto-provider.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public productosAdquiridos: Array<Producto>;


  constructor(private productosProvider: ProductoProviderService, private events : Events) { }



ngOnInit(){
  // Filter data
this.productosAdquiridos = this.productosProvider.getProductosAdquiridos();

}



}
