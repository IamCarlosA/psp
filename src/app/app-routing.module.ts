import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateFactureComponent} from './components/pages/create-facture/create-facture.component'
import {ListFacturesComponent} from './components/pages/list-factures/list-factures.component'
import {ViewFactureComponent} from './components/pages/view-facture/view-facture.component'

const routes: Routes = [
  {
    path: 'create-bills',
    component: CreateFactureComponent
  },
  {
    path: 'list-bills',
    component: ListFacturesComponent
  },
  {
    path: 'view-bills/:id',
    component: ViewFactureComponent
  },
  {
    path: '**',
    redirectTo: 'create-bills'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
