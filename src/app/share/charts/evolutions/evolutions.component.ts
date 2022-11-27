import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EvolutionsComponent implements OnChanges, OnDestroy {
  public chart: any;
  @Input() public ready: boolean = false;
  @Input() public data: Array<any>;
  private optionsChart: object;
  private myChart: any;

  constructor() {
    this.optionsChart = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      animations: {
        tension: {
          duration: 1000,
          easing: 'linear',
          from: 1,
          to: 0,
          loop: true
        }
      },
      plugins: {
        legend: {
          labels: {

          }
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 5
    }
  }

  ngOnChanges(_changes: any) {
    this.createChart();
  }

  createChart() {
    if (!this.ready) return;
    if (this.myChart) {
      this.myChart.destroy();
    }
    const [...labels] = new Set(this.pluck(this.data, ['date']))
    const datasets = this.buildDataSets(this.data)
    const data = {
      labels,
      datasets
    }
    this.myChart = new Chart('myChart', {
      type: 'line',
      data,
      options: this.optionsChart
    });
    this.myChart.resize()
  }

  ngOnDestroy() {
    this.data = [];
    this.myChart.destroy()
  }

  private pluck(array: Array<any>, property: Array<string>): Array<any> {
    const date = `${property[0]}`;
    const newArray = array.map((item: any) => {
      return item[date]
    })
    return newArray;
  }

  private buildDataSets(array: any): Array<any> {
    const dataSets: any[] = []
    const labels = Object.keys(array[0])
    labels.splice(labels.indexOf('date'), 1)
    const colors = ['blue', 'red', 'limegreen', '#ed5c7b']

    labels.forEach((item, index) => {
      const hidden = item !== 'dailyReturn'
      dataSets.push({
        index: index,
        label: item,
        data: [],
        borderColor: colors[index],
        fill: true,
        hidden,
      })
    })

    // considerar usar el pluck
    dataSets.forEach((dataSet) => {
      array.forEach((item: any) => {
        dataSet.data.push(item[dataSet.label])
      })
    })

    return dataSets
  }
}
