import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertPage } from '../home/alert-component/alert-component.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertController: AlertController) {}

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Oops...\n',
      subHeader: 'This item is under construction.',
      message: 'Check out "OFFICE" :)',
      buttons: ['OK']
    });

    await alert.present();
  }
}
