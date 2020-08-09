import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ListFacturesComponent } from './components/pages/list-factures/list-factures.component';
import { ViewFactureComponent } from './components/pages/view-facture/view-facture.component';
import { CreateFactureComponent } from './components/pages/create-facture/create-facture.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListFacturesComponent,
    ViewFactureComponent,
    CreateFactureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
