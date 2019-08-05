import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { OfficePage } from './office.page';
import { ModalPage } from '../home/modal/modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: OfficePage
      }
    ])
  ],
  declarations: [OfficePage, ModalPage], //added ModalPage here to be able to use it in List
  entryComponents: [ModalPage] //Also added this line for same as above
})
export class OfficePageModule {}
