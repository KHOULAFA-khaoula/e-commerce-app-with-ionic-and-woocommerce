import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonSearchPage } from './common-search.page';

const routes: Routes = [
  {
    path: '',
    component: CommonSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSearchPageRoutingModule {}
