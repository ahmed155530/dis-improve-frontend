import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationController } from 'base/APIs/AuthenticationController';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { BaseService } from 'base/services/base.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent extends BaseService implements OnInit {
  hideCurrentPassword = true;
  hideNewPassword = true;
  form: FormGroup = null;
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
    this.initForm();
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: new FormControl<string>(''),
      currentPassword: new FormControl<string>('', Validators.compose([Validators.required])),
      newPassword: new FormControl<string>('', Validators.compose([Validators.required])),
    });
  }

  clearForm() {
    this.form.reset();
    this.form.patchValue({
      username: '',
      currentPassword: '',
      newPassword: '',
    });
    this.form.updateValueAndValidity();
  }

  submit() {
    this.form?.patchValue({
      username: this.GetUsername()
    });
    console.log(this.form?.value);
    this.changePassword();
  }

  changePassword() {
    this.spinnerService.show();
    this.httpService.POST(AuthenticationController.ChangePassword, this.form.value).subscribe({
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
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  GetUsername(): string {
    return JSON.parse(localStorage.getItem(LocalStorageEnum.app_user))['Username'];
  }
}
