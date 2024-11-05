import { Component, inject, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { ApiResponse } from '../../interfaces/chart';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-grafic',
  standalone: true,
  imports: [],
  templateUrl: './grafic.component.html',
  styleUrl: './grafic.component.scss'
})
export class GraficComponent implements OnInit { 

  public lineChart: Chart | undefined;
  public barChart: Chart | undefined;

  chartService = inject(ChartService)

  ngOnInit(): void {
    this.chartService.getAll().subscribe((response: ApiResponse) => {
      if (!response.error) {
        this.createCharts(response.body); 
      }
    });
  }

  createCharts(visitsData: { month: string, year: number, visits: number }[]) {

    const uniqueMonths = [...new Set(visitsData.map(data => data.month))];
  
    const visits2023 = uniqueMonths.map(month => {
      const entry = visitsData.find(data => data.year === 2023 && data.month === month);
      return entry ? entry.visits : 0; 
    });
  
    const visits2024 = uniqueMonths.map(month => {
      const entry = visitsData.find(data => data.year === 2024 && data.month === month);
      return entry ? entry.visits : 0; 
    });
  
    const dataLine = {
      labels: uniqueMonths,
      datasets: [
        {
          label: 'Visits in 2023',
          data: visits2023,
          fill: false,
          borderColor: 'rgb(76, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Visits in 2024',
          data: visits2024,
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }
      ]
    };
  
    const dataBar = {
      labels: uniqueMonths,
      datasets: [
        {
          label: 'Visits in 2023',
          data: visits2023,
          backgroundColor: 'rgba(76, 192, 192, 0.2)',
          borderColor: 'rgb(76, 192, 192)',
          borderWidth: 1
        },
        {
          label: 'Visits in 2024',
          data: visits2024,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    };
  
    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: dataLine
    });
  
    this.barChart = new Chart("barChart", {
      type: 'bar' as ChartType,
      data: dataBar
    });
  }
}
