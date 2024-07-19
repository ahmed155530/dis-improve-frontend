import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  constructor(
    private translationService: TranslateService
  ) { }

  alertWithSuccess(message?: string) {
    Swal.fire(
      {
        title: this.translationService.instant('swal.Success'),
        text: message ? this.translationService.instant(message) : this.translationService.instant("swal.Data updated successfully"),
        timer: 2000,
        icon: 'success',
        iconColor: '#a5dc86',
        confirmButtonText: this.translationService.instant('swal.Close'),
      }
    );
  }

  alertWithError(message?: string) {
    Swal.fire(
      {
        title: this.translationService.instant('swal.Error'),
        text: message ? this.translationService.instant(message) : this.translationService.instant("swal.ErrorOccured"),
        timer: 2000,
        icon: 'error',
        iconColor: '#D8000C',
        confirmButtonText: this.translationService.instant('swal.Close'),
      }
    );
  }

  alertDelete(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: title ? this.translationService.instant(title) : this.translationService.instant('swal.Are you sure?'),
      text: text ? this.translationService.instant(text) : this.translationService.instant("swal.You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmText ? this.translationService.instant(confirmText) : this.translationService.instant('swal.Yes, delete it!'),
      cancelButtonText: cancelText ? this.translationService.instant(cancelText) : this.translationService.instant('swal.Cancel')
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          afterApproveTitle ? this.translationService.instant(afterApproveTitle) : this.translationService.instant('swal.Deleted!'),
          afterApproveText ? this.translationService.instant(afterApproveText) : this.translationService.instant('swal.Record has been deleted'),
          'success'
        )
      }
    });
  }

  alertApproval(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: title ? this.translationService.instant(title) : this.translationService.instant('swal.Are you sure?'),
      text: text ? this.translationService.instant(text) : this.translationService.instant("swal.You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmText ? this.translationService.instant(confirmText) : this.translationService.instant('swal.Yes, approve it!'),
      cancelButtonText: cancelText ? this.translationService.instant(cancelText) : this.translationService.instant('swal.Cancel')
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          afterApproveTitle ? this.translationService.instant(afterApproveTitle) : this.translationService.instant('swal.Approved!'),
          afterApproveText ? this.translationService.instant(afterApproveText) : this.translationService.instant('swal.Record has been approved'),
          'success'
        )
      }
    });
  }

  alertComplete(callback: Function, title?: string, text?: string, confirmText?: string, cancelText?: string, afterApproveTitle?: string, afterApproveText?: string) {
    Swal.fire({
      title: title ? this.translationService.instant(title) : this.translationService.instant('swal.Are you sure?'),
      text: text ? this.translationService.instant(text) : this.translationService.instant("swal.You won't be able to revert this!"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmText ? this.translationService.instant(confirmText) : this.translationService.instant('swal.Yes, complete it!'),
      cancelButtonText: cancelText ? this.translationService.instant(cancelText) : this.translationService.instant('swal.Cancel')
    }).then((result: any) => {
      if (result.isConfirmed) {
        callback();
        Swal.fire(
          afterApproveTitle ? this.translationService.instant(afterApproveTitle) : this.translationService.instant('swal.Completed!'),
          afterApproveText ? this.translationService.instant(afterApproveText) : this.translationService.instant('swal.Record has been completed'),
          'success'
        )
      }
    });
  }

}
