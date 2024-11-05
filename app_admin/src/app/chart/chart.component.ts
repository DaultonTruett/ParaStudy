import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{
  chart_labels: number[] = [];

  public constructor(
    private authService: AuthenticationService,
  ){
    for (let i = 1; i <= this.authService.getCurrentUser().quiz_results.length; i++){
      this.chart_labels.push(i)
    }
  }

  ngOnInit(){}
  
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.authService.getCurrentUser().quiz_results,
        label: 'Test Score'
      }
    ],
    labels: this.chart_labels
  }
  
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      x: {
        min: 0,
        max: this.authService.getCurrentUser().quiz_results.length,
        title: {
          display: true,
          text: "Test number"
        }
      },
      y: {
        position: 'left',
        min: 0,
        max: 10,
        title: {
          display: true,
          text: "Score"
        }
      },
    },
  
    plugins: {
      title: {
        display: true,
        text: "All quiz results (7 days)",
        font: {
          size: 28,
        },
      },
      legend: { display: true }
    }
  }

}
