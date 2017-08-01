import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LastSevenDaysComponent } from './sales/last-seven-days/last-seven-days.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles: [`
    @media print {
      .panel-default {
        border: 0;
      }
      .panel-heading {
        border-bottom: 0;
      } 
      .print-btn-section{
          display:none;
      }
      
    }
  `],
  encapsulation: ViewEncapsulation.None 
})

export class AppComponent implements OnInit{
  public title: string = 'Sales Info';

  constructor () {}
  ngOnInit(): void {
      
  }

}
