import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommonSearchPageRoutingModule } from './common-search-routing.module';

import { CommonSearchPage } from './common-search.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CommonSearchPageRoutingModule
  ],
  declarations: [CommonSearchPage]
})
export class CommonSearchPageModule {}
