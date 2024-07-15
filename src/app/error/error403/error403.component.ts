import { Component, Injector, OnInit } from '@angular/core';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-error403',
  templateUrl: './error403.component.html',
  styleUrls: ['./error403.component.scss']
})
export class Error403Component extends BaseService implements OnInit {


  constructor(
    public override injector: Injector,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  GoToLogin() {
    this.router.navigateByUrl('/auth/login');
  }
}
