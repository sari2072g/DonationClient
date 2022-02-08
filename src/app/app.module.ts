import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import {ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PanelMenuModule} from 'primeng/panelmenu';
import {TabMenuModule} from 'primeng/tabmenu';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuItem} from 'primeng/api';
import { HttpClientModule } from '@angular/common/http';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MenuModule} from 'primeng/menu'
import {MegaMenuModule} from 'primeng/megamenu';
import {CardModule} from 'primeng/card';
import {MessageModule} from 'primeng/message';
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { InvestmentComponent } from './components/investment/investment.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentComponent,
    
      ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule,
    ButtonModule ,
    PanelMenuModule,
    MenuModule,
    TabMenuModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MegaMenuModule,
    CardModule,
    MessageModule,
    InputTextareaModule,
    InputTextModule,TableModule
  ],
  providers: [DialogService, DynamicDialogConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
