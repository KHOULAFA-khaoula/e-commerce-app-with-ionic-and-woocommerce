import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingleTagPage } from './single-tag.page';

const routes: Routes = [
  {
    path: '',
    component: SingleTagPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleTagPageRoutingModule {}
