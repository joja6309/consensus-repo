import { Component, OnInit, ViewEncapsulation, Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class SliderComponent implements OnInit {
  @Output() rowChangeEmitter = new EventEmitter();
  @Output() colChangeEmitter = new EventEmitter();
  row_change(newValue) {
    this.rowChangeEmitter.emit(newValue);
  }
  col_change(newValue) {
    this.colChangeEmitter.emit(newValue);
  }
  demo: number;
  val: number = 50;
  min: number = 0;
  max: number = 100;
  disabledValue = 0;
  autoTicks = false;
  disabled = false;
  invert = false;
 
  showTicks = true;
  step = 1;
  thumbLabel = false;
  row_value = 0;
  column_value = 0;
  vertical = false;
  get tickInterval(): number | 'auto' {
    return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
  }
  set tickInterval(v) {
    this._tickInterval = Number(v);
  }
  private _tickInterval = 1;

  constructor() { }

  ngOnInit() {
  }

}
