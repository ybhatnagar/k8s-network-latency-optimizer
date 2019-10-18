import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'connection-chart',
  templateUrl: 'connection-chart.component.html',
  styleUrls: ['connection-chart.component.scss']
})
export class ConnectionChartComponent {
  @Input() chartData;
  @Input() allowDrag = false;
  @ViewChild('chartEl', { static: false }) chartElement: ElementRef;
  private options;

  ngOnInit() {
    setTimeout(() => {
      this.loadGraph();
    }, 1000)
  }

  loadGraph() {
    this.options = {
      chart: {
        renderTo: this.chartElement.nativeElement,
        type: 'packedbubble',
        backgroundColor: 'transparent',
        height: '100%'
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      colors: ['#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
        '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'],
      title: {
        text: null
      },
      tooltip: {
        useHTML: true,
        pointFormat: '<b>{point.name}:</b> {point.value}'
      },
      plotOptions: {
        packedbubble: {
          minSize: '20%',
          maxSize: '100%',
          zMin: 0,
          zMax: 1000,
          layoutAlgorithm: {
            gravitationalConstant: 0.05,
            splitSeries: true,
            seriesInteraction: false,
            dragBetweenSeries: this.allowDrag,
            parentNodeLimit: true,
            parentNodeOptions: {
              bubblePadding: 30
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
            parentNodeFormat: '{point.series.name}',
            // filter: {
            //   property: 'y',
            //   operator: '>',
            //   value: 250
            // },
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal'
            }
          }
        }
      },
      series: [{
        name: 'Cluster 1',
        data: []
      }, {
        name: 'Cluster 2',
        data: [{
          name: 'pod 21',
          value: 100
        },
        {
          name: 'pod 22',
          value: 60
        },
        {
          name: 'pod 23',
          value: 90
        },
        {
          name: 'pod 24',
          value: 10
        }]
      }, {
        name: 'Cluster 3',
        data: [{
          name: 'pod 31',
          value: 30
        },
        {
          name: 'pod 32',
          value: 100
        }]
      }, {
        name: 'Cluster 4',
        data: [{
          name: 'pod 41',
          value: 120
        },
        {
          name: 'pod 42',
          value: 10
        },
        {
          name: 'pod 43',
          value: 10
        },
        {
          name: 'pod 44',
          value: 10
        }]
      }]
    };
    new Highcharts.Chart(this.options);
  }
}
