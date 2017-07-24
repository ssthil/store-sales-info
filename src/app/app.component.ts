import { Component, OnInit } from '@angular/core';
import { LastSevenDaysComponent } from './sales/last-seven-days/last-seven-days.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  public title: string = 'Sales Info';

  constructor () {}
  ngOnInit(): void {
      
  }

  
  print(): void {
    window.print()
  }
  

}
