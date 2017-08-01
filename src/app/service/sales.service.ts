import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SalesService { 

  constructor(private http: Http) { 
    console.log('Sales Service up and running');
  }

  private salesUrl = 'https://n9zg3zaa4l.execute-api.us-east-1.amazonaws.com/dev/rest/sales/last_seven_days';
  private lastSevenDaysDataURL = 'assets/api/sales/last-seven-days.json';
  private todayDataURL ="/assets/api/sales/today.json";
  private todayDetailDataURL ="/assets/api/sales/today-detail.json";
  
  
  getLasSevenDaysData(): Observable<Response> { 
    return this.http.get(this.lastSevenDaysDataURL)
    .map((response: Response) => {
      return response.json().sales; 
      
    })
    
  }

  getTodaySalesData(): Observable<Response> {
    return this.http.get(this.todayDataURL)
      .map((response: Response) => {
        return response.json()
      })
  }

  getTodayDetailSalesData(): Observable<Response> {
    return this.http.get(this.todayDetailDataURL)
      .map((response: Response) => {
        //.log(response.json().sales)
        return response.json().sales
      })
  }



}
