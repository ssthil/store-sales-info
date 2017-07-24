import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SalesService } from '../../service/sales.service';



interface SalesResponse {
  card: string,
  retail: string,
  total: string
}

@Component({
  selector: 'app-last-seven-days',
  templateUrl: './last-seven-days.component.html',
  styleUrls: ['./last-seven-days.component.css']
})
export class LastSevenDaysComponent implements OnInit {

  public tableView= false;
  public chartView = true;

  public responsData;
  public salesInfos;

  public selectedData: any[] = [];
  public selectedDateValue: any[] = [];
  public selectedCardValue: any[] = [];
  public selectedRetailValue: any[] = [];
  public selectedTotalValue: any[] = [];

  public lastSevenDays: any;

  constructor(private salesService: SalesService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllData();
    this.drawChart();
  }


  getAllData() { 
    this.salesService.getLasSevenDaysData()
        .subscribe((data) => {
          this.responsData = data;
          
          for(let i=0; i < this.responsData.length; i++) {
            this.selectedData.push({
              date: this.formatDate(new Date(this.responsData[i].date)),
              card: Number(this.responsData[i].card).toFixed(2),
              total: Number(this.responsData[i].total).toFixed(2),
              retail: Number(this.responsData[i].retail).toFixed(2)
            })
          }
          this.salesInfos = this.selectedData;
          this.getChartValue();
        },
      
        (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
              console.log('Client side error');
          } else {
              console.log('Error occured');
          }
        }
      );
  }

  getChartValue() { 
    
    for(let i=0; i < this.salesInfos.length; i++) {
          this.selectedDateValue.push(
            this.salesInfos[i].date
          )
          this.selectedCardValue.push(
            Number(this.salesInfos[i].card).toFixed(2)
          )
          this.selectedRetailValue.push(
            Number(this.salesInfos[i].retail).toFixed(2)
          )
          this.selectedTotalValue.push(
            Number(this.salesInfos[i].total).toFixed(2)
          )
    }
    this.drawChart()
  }


  drawChart() {
    let chartLabelValue = this.selectedDateValue;
    let chartCardValue = this.selectedCardValue.map(Number);
    let chartRetailValue = this.selectedRetailValue.map(Number);
    let chartTotalValue = this.selectedTotalValue.map(Number);
    
     this.lastSevenDays = {
            labels: chartLabelValue,
            datasets: [
                {
                    label: 'Card',
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: chartCardValue
                },
                {
                    label: 'Retail',
                    backgroundColor: '#9CCC65',
                    borderColor: '#7CB342',
                    data: chartRetailValue
                },
                {
                    label: 'Total',
                    backgroundColor: '#f38c3c',
                    borderColor: '#e46e12',
                    data: chartTotalValue
                }
            ]
        } 
  }

  formatDate(date) {
      let monthNames = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"
      ];

      let day = date.getDate();
      let monthIndex = date.getMonth();
      let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  tableViewData() {
    this.tableView = true;
    this.chartView = false;
  }

  chartViewData() {
    this.chartView = true;
    this.tableView = false;
  }
}
