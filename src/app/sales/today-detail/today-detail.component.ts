import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SalesService } from '../../service/sales.service';

@Component({
  selector: 'app-today-detail',
  templateUrl: './today-detail.component.html',
  styleUrls: ['./today-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodayDetailComponent implements OnInit {

  public tableView= false;
  public chartView = true;

  public responsData;
  public salesInfos;
  public todayDate;

  public selectedData: any[] = [];
  public selectedDateValue: any[] = [];
  public selectedCardValue: any[] = [];
  public selectedRetailValue: any[] = [];
  public selectedTotalValue: any[] = [];

  public todayDetailSales: any;

  constructor(private salesService: SalesService, private http: HttpClient) { }

  ngOnInit() {
    this.getAllData();
    //this.drawChart();
  }


  getAllData() { 
    this.salesService.getTodayDetailSalesData()
        .subscribe((data) => {
          this.responsData = data;
          
          for(let i=0; i < this.responsData.length; i++) {
            this.selectedData.push({
              date: this.formatTime(new Date(this.responsData[i].date)),
              card: Number(this.responsData[i].card).toFixed(2),
              total: Number(this.responsData[i].total).toFixed(2),
              retail: Number(this.responsData[i].retail).toFixed(2)
            })
          }
          this.todayDate = this.formatDate(new Date(this.responsData[0].date));
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
    
     /*this.todayDetailSales = {
            labels: chartLabelValue,
            datasets: [
                {
                    label: 'Card',
                    backgroundColor: '#FF6384',
                    borderColor: '#FF6384',
                    data: chartCardValue
                },
                {
                    label: 'Retail',
                    backgroundColor: '#36A2EB',
                    borderColor: '#36A2EB',
                    data: chartRetailValue
                },
                {
                    label: 'Total',
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE56',
                    data: chartTotalValue
                }
            ]
     }*/ 

     this.todayDetailSales = {
            title : { text : '' },
            chart: {
                type: 'column'
            },
            colors: ['#24CBE5', '#64E572', '#FF9655'],
            xAxis: {
                categories: chartLabelValue,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Card',
                data: chartCardValue

            }, {
                name: 'Retail',
                data: chartRetailValue

            }, {
                name: 'Total',
                data: chartTotalValue

            }]
    }
  }

  formatTime(date) {
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();

    return hh + ':' + mm + ':' + ss;
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
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let value = idAttr.nodeValue;
    //console.log(value);
    let innerContents = document.querySelector('#todayDetailSales').innerHTML;
    let popupWinindow = window.open('', '_blank', 'width=auto,height=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>'+
                    '<link rel="stylesheet" type="text/css" href="style.css" /></head>'+
                    '<body onload="window.print(); window.close()">' + innerContents + '</html>'
                    );
        popupWinindow.document.close();
  }

}
