import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleTagPageRoutingModule } from './single-tag-routing.module';

import { SingleTagPage } from './single-tag.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingleTagPageRoutingModule
  ],
  declarations: [SingleTagPage]
})
export class SingleTagPageModule {}
