import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
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
  styleUrls: ['./last-seven-days.component.css'],
  encapsulation: ViewEncapsulation.None
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
    //this.drawChart();
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
    
    /*this.lastSevenDays = {
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
    this.lastSevenDays = {
            title : { text : '' },
            chart: {
                type: 'column'
            },
            colors: ['#058DC7', '#50B432', '#ED561B'],
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

            }],
            exporting: {
                enabled: false
            }
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
  
  print(): void {
    if (this.chartView === true) {
        let innerContents = document.querySelector('#lastSevenDaysChart').innerHTML;
        let popupWinindow = window.open('', '_blank', 'width=auto,height=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>'+
                    '<link rel="stylesheet" type="text/css" href="style.css" /></head>'+
                    '<body onload="window.print(); window.close()">' + innerContents + '</html>'
                    );
        popupWinindow.document.close();
    } else {
      let innerContents = document.querySelector('#lastSevenDaysTable').innerHTML;
      let popupWinindow = window.open('', '_blank', 'width=auto,height=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>'+
                    '<style>'+
                    '@media print{body {-webkit-print-color-adjust: exact;} .panel-default{border:0}.panel-heading{border-bottom:0}.print-btn-section{display:none}.ui-widget{font-family:Roboto,"Trebuchet MS",Arial,Helvetica,sans-serif;font-size:1em}.ui-widget-header{background:transparent}.ui-datatable table{border-collapse:collapse;width:100%;table-layout:fixed}.ui-state-default{border:1px solid #d6d6d6;background:#fff;color:#555}.ui-panel .ui-panel-content{border:0;background:0;padding:.5em .75em}.ui-datatable{position:relative}.ui-widget,.ui-widget *{box-sizing:border-box}.ui-widget-content{border:0px solid #D5D5D5;background:#fff;color:#222}.ui-panel.ui-widget .ui-panel-titlebar{border-width:0 0 1px}.ui-panel .ui-panel-titlebar{padding:.5em .75em}.ui-datatable tbody>tr.ui-widget-content{border-color:#d9d9d9}.ui-datatable .ui-datatable-data>tr>td,.ui-datatable .ui-datatable-tfoot>tr>td,.ui-datatable .ui-datatable-thead>tr>th{border-color:inherit;box-sizing:border-box;padding:.25em .5em;border-width:1px;border-style:solid}.ui-datatable th.ui-state-default{background-color:#ebedf0}.ui-datatable tfoot td,.ui-datatable thead th{text-align:left!important}}'+
                    '</style>'+
                    '</head>'+
                    '<body onload="window.print(); window.close()">' + innerContents + '</html>'
                    );
        popupWinindow.document.close();
    }
    
  }
}
