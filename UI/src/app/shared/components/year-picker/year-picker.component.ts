import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;

export const YEAR_MODE_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    // monthYearLabel: 'MMM YYYY',
    // dateA11yLabel: 'LL',
    // monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: [],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: YEAR_MODE_FORMATS },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true,
    },
  ],
})
export class YearPickerComponent implements ControlValueAccessor {
  /** Component label */
  @Input() label = '';

  @Input()
  public get max(): number | Date {
    return this._max ? this._max.year() : undefined;
  }
  @Input()
  public get min(): number | Date {
    return this._min ? this._min.year() : undefined;
  }

  public _max: Moment | any;
  public _min: Moment | any;

  public set max(max: number | Date) {
    if (max) {
      const momentDate =
        typeof max === 'number' ? moment([max, 0, 1]) : moment(max);
      this._max = momentDate.isValid() ? momentDate : undefined;
    }
  }

  public set min(min: number | Date) {
    if (min) {
      const momentDate =
        typeof min === 'number' ? moment([min, 0, 1]) : moment(min);
      this._min = momentDate.isValid() ? momentDate : undefined;
    }
  }

  @ViewChild(MatDatepicker) _picker: MatDatepicker<Moment> | any;

  public _inputCtrl: FormControl = new FormControl();

  // Function to call when the date changes.
  public onChange = (year: Date) => {};

  // Function to call when the input is touched (when a star is clicked).
  public onTouched = () => {};

  /** send the focus away from the input so it doesn't open again */
  public _takeFocusAway = (datepicker: MatDatepicker<Moment>) => {};

  public writeValue(date: Date): void {
    if (!date) {
      this._inputCtrl.reset();
    }
    if (date) {
      const momentDate = moment(date);
      if (momentDate.isValid()) {
        momentDate.set({ date: 1 });
        this._inputCtrl.setValue(moment(date));
      }
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? (this._picker.disabled = true)
      : (this._picker.disabled = false);

    isDisabled ? this._inputCtrl.disable() : this._inputCtrl.enable();
  }

  public _yearSelectedHandler(
    chosenDate: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    datepicker.close();

    if (!this._isYearEnabled(chosenDate.year())) {
      return;
    }

    chosenDate.set({ date: 1 });

    this._inputCtrl.setValue(chosenDate, { emitEvent: false });
    this.onChange(chosenDate.toDate());
    this.onTouched();
  }

  public _openDatepickerOnClick(datepicker: MatDatepicker<Moment>) {
    if (!datepicker.opened) {
      datepicker.open();
    }
  }

  /** Whether the given year is enabled. */
  private _isYearEnabled(year: number) {
    // disable if the year is greater than maxDate lower than minDate
    if (
      !year ||
      (this._max && year > this._max.year()) ||
      (this._min && year < this._min.year())
    ) {
      return false;
    }
    return true;
  }
}
