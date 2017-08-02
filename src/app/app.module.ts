import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SalesService } from './service/sales.service';

//import {DataTableModule,SharedModule, ChartModule, PanelModule} from 'primeng/primeng';
import {DataTableModule,SharedModule, PanelModule} from 'primeng/primeng';
import { LastSevenDaysComponent } from './sales/last-seven-days/last-seven-days.component';
import { TodayComponent } from './sales/today/today.component';
import { TodayDetailComponent } from './sales/today-detail/today-detail.component';

//highcharts
import {ChartModule} from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';

declare var require: any;

export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}

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
    ChartModule,
    DataTableModule,
    SharedModule,
    PanelModule,
    //ChartModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    SalesService,
    {
      provide: HighchartsStatic,
		  useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
