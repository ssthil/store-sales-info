import { Component, OnInit, ViewEncapsulation, ViewChild  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SalesService } from '../../service/sales.service';


@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodayComponent implements OnInit {

  public tableView= false;
  public chartView = true;

  public responsData;
  public salesInfos;

  public todayDate;

  public selectedData: any[] = [];
  public selectedCardValue: any[] = [];
  public selectedRetailValue: any[] = [];
  public selectedTotalValue: any[] = [];

  public todaySales: any;

  constructor(private salesService: SalesService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllData();
    this.drawChart();
  }


  getAllData() { 
    this.salesService.getTodaySalesData()
        .subscribe((data) => {
          this.responsData = data;

            this.selectedData.push({
              //date: this.formatDate(new Date(this.responsData.date)),
              card: Number(this.responsData.card).toFixed(2),
              total: Number(this.responsData.total).toFixed(2),
              retail: Number(this.responsData.retail).toFixed(2)
            })
        
          this.salesInfos = this.selectedData;
          this.todayDate = this.formatDate(new Date(this.responsData.date));

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
          
          this.selectedCardValue.push(
            Number(this.salesInfos[i].card).toFixed(2),
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
    let chartLabelValue = ['', '', ''];
    let chartCardValue = this.selectedCardValue.map(Number);
    let chartRetailValue = this.selectedRetailValue.map(Number);
    let chartTotalValue = this.selectedTotalValue.map(Number);

    let label = ['Card', 'Retail', 'Total'];
    let data = [4, 6, 16];
    let fillData = [];

    for (let i=0; i < label.length; i ++) {
        fillData.push({
          name:label[i],
          y:data[i]
        })
    }
    
    /* this.todaySales = {
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
     } */

     this.todaySales = {
        chart: {
            type: 'pie'
        },
        colors:['#DDDF00', '#24CBE5', '#50B432'],
        series:[
          {
            data:fillData
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
  
  print(event): void {
    let innerContents = document.querySelector('#todaySales').innerHTML;
    let popupWinindow = window.open('', '_blank', 'width=auto,height=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>'+
                    '<link rel="stylesheet" type="text/css" href="style.css" /></head>'+
                    '<body onload="window.print(); window.close()">' + innerContents + '</html>'
                    );
        popupWinindow.document.close();
  }

}
