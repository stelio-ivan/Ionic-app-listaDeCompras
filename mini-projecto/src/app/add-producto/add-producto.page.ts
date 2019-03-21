import { Component, OnInit } from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoProviderService } from '../services/producto-provider.service';
import { Producto } from '../model/producto';

@Component({
  selector: 'app-add-producto',
  templateUrl: './add-producto.page.html',
  styleUrls: ['./add-producto.page.scss'],
})
export class AddProductoPage implements OnInit {

  constructor(private productosProvider: ProductoProviderService, private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit() { }

  saveProducto(productoForm: any) {
    // Validate form
    if(productoForm.invalid){
      console.log("Error on Form!")
      this.presentToast("Error on Form!");
    }
    else {
      console.log("Valid form submitted.");
      // Create producto object
      let newProducto = new Producto(
      
        productoForm.value.nome,
        productoForm.value.qtd,
        false,
       
      );
      // Save producto in provider and publish change
      this.productosProvider.save(newProducto);
      this.productosProvider.notifyDataChange();

      // Show notification and log
      console.log("Producto '" + newProducto.nome + "' Saved!")
      this.presentToast("Producto '" + newProducto.nome + "' Saved!");
      // Go back to previous screen
      this.navCtrl.back();
    }
  }


  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: 3000,
      color: 'secondary'
    });
    toast.present();
  }

}
