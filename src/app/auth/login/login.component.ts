import { BaseService } from 'base/services/base.service';
import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationController } from 'base/APIs/AuthenticationController';
import { LocalStorageEnum } from '../../../base/enums/LocalStorageEnum.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseService implements OnInit {
  hide = true;
  form: FormGroup = null;
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
    this.initForm();
  }

  ngOnInit() {

  }

  initForm() {
    this.form = this.fb.group({
      username: new FormControl<string>('', Validators.compose([Validators.required])),
      password: new FormControl<string>('', Validators.compose([Validators.required])),
    });
  }

  clearForm() {
    this.form.reset();
    this.form.patchValue({
      username: '',
      password: '',
    });
    this.form.updateValueAndValidity();
  }

  Login() {
    this.spinnerService.show();
    this.httpService.POST(AuthenticationController.Login, this.form.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.isSuccess) {
          this.authService.storeUserDateAndToken(res.data);
          this.swalService.alertWithSuccess(res.message);
        }
        else
          this.swalService.alertWithError(res['message']);
      },
      error: (err: Error) => {
        this.swalService.alertWithError(err.message);
        this.spinnerService.hide();
      },
      complete: () => {
        this.spinnerService.hide();
        var userTypeId: number = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user))['UserTypeId'];
        this.Redirect(userTypeId);
      }
    });
  }

  Redirect(userTypeId: number) {
    switch (userTypeId) {
      case 1:
        this.router.navigateByUrl('/data-entry/data-list');
        break;
      case 2:
        this.router.navigateByUrl('/dashboard');
        break;
      case 3:
        this.router.navigateByUrl('/dashboard');
        break;
      default:
        break;
    }
  }
}
