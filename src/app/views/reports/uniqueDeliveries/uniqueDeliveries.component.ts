import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import {DeliveryService} from '../../../services/dao/impl/DeliveryService';

export interface ChartObject {
  name: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './uniqueDeliveries.component.html',
  styleUrls: ['./uniqueDeliveries.component.css']
})
export class UniqueDeliveriesComponent implements OnInit {
  view: any[];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Кол-во поставок';
  showYAxisLabel = true;
  yAxisLabel = 'Дата';
  legendTitle = 'Даты поставок';
  showDataLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  deliveriesInRange: any[] = [];

  constructor(private dateAdapter: DateAdapter<any>,
              private deliveryService: DeliveryService) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit(): void {
  }

  send(): void {
    this.deliveriesInRange = [];
    this.deliveryService.getUniqueDeliveriesReport(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(value => {
        this.view = [900, value.length * 25 + 100];
        value.forEach(v => this.deliveriesInRange.push(v));
      }, () => console.log('error'));
  }

  onSelect($event: any): void {
    console.log($event);
  }
}
