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

  public selectedPieChartData: any[] = [];

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
    
   /* for(let i=0; i < this.salesInfos.length; i++) { 
          
          this.selectedCardValue.push(
            Number(this.salesInfos[i].card).toFixed(2),
          )
          this.selectedRetailValue.push(
            Number(this.salesInfos[i].retail).toFixed(2)
          )
          this.selectedTotalValue.push(
            Number(this.salesInfos[i].total).toFixed(2)
          ) 
          
    }*/
      
    // Highcharts PIE
    for (var key in this.salesInfos) {
      var obj = this.salesInfos[key];
      for(var prop in obj) {
        this.selectedPieChartData.push(Number(obj[prop]))
        }
    }
    this.drawChart()
  }


  drawChart() {
    let chartLabelValue = ['', '', ''];
    let chartCardValue = this.selectedCardValue.map(Number);
    let chartRetailValue = this.selectedRetailValue.map(Number);
    let chartTotalValue = this.selectedTotalValue.map(Number);

    let label = ['Card', 'Retail', 'Total'];
    let pieData = this.selectedPieChartData;
    let fillData = [];

    for (let i=0; i < label.length; i ++) {
        fillData.push({
          name:label[i],
          y:pieData[i]
        });
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
  
  print(): void {
    if (this.chartView === true) {
        let innerContents = document.querySelector('#todaySalesChart').innerHTML;
        let popupWinindow = window.open('', '_blank', 'width=auto,height=100%,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head>'+
                    '<link rel="stylesheet" type="text/css" href="style.css" /></head>'+
                    '<body onload="window.print(); window.close()">' + innerContents + '</html>'
                    );
        popupWinindow.document.close();
    } else {
      let innerContents = document.querySelector('#todaySalesTable').innerHTML;
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
