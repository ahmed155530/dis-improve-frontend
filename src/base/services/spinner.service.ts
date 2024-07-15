import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  _loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();
  constructor(
    private spinner: NgxSpinnerService
  ) { }

  show() {
    this._loading.next(true);
    this.spinner.show();
  }

  hide() {
    this._loading.next(false);
    this.spinner.hide();
  }

}
