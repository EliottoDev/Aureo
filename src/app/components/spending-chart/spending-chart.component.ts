import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container" style="position: relative; height: 300px;">
      <canvas></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      width: 100%;
      height: 100%;
    }
  `]
})
export class SpendingChartComponent {

  @Input() data: number[] = [65, 59, 80, 81, 56, 55, 40];
  @Input() labels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  @Input() label: string = 'Expenses';
  @Input() color: string = 'rgba(99, 102, 241, 0.7)';
  @Input() borderColor: string = 'rgba(99, 102, 241, 1)';
  
  public barChartPlugins = [];
  public barChartType: ChartType = 'bar';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        border: {
          display: false
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            size: 12
          },
          callback: (value: any) => `$${value}`
        }
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#F9FAFB',
        padding: 12,
        cornerRadius: 6,
        displayColors: false,
        callbacks: {
          label: (context: any) => `${this.label}: $${context.parsed.y}`
        }
      }
    },
  };

  get barChartData(): ChartData<'bar'> {
    return {
      labels: this.labels,
      datasets: [
        { 
          data: this.data,
          label: this.label,
          backgroundColor: this.color,
          borderColor: this.borderColor,
          borderWidth: 1,
          borderRadius: 8,
          barThickness: 16,
          maxBarThickness: 20,
          minBarLength: 4,
          hoverBackgroundColor: this.color.replace('0.7', '0.9'),
          hoverBorderColor: this.borderColor,
          hoverBorderWidth: 2
        }
      ]
    };
  }

  // Chart events
  public chartHovered(event: any): void {
    // Handle hover event if needed
  }
}
