import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SalesService } from './service/sales.service';

import {DataTableModule,SharedModule, ChartModule, PanelModule} from 'primeng/primeng';
import { LastSevenDaysComponent } from './sales/last-seven-days/last-seven-days.component';
import { TodayComponent } from './sales/today/today.component';
import { TodayDetailComponent } from './sales/today-detail/today-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LastSevenDaysComponent,
    TodayComponent,
    TodayDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTableModule,
    SharedModule,
    ChartModule,
    PanelModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [SalesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
