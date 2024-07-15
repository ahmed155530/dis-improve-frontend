import { PermissionsService } from './../services/permissions.service';
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[HasRole]'
})
export class HasRoleDirective implements OnInit {
  hasRole: boolean = false;
  @Input() role = '';
  constructor(
    private PermissionsService: PermissionsService,
    private elementRef: ElementRef,
  ) {

  }

  ngOnInit(): void {
    console.log(this.role);
    if (this.role)
      this.CheckUserIfHasPermission(this.role);
  }

  CheckUserIfHasPermission(permission: string) {
    this.PermissionsService.CheckUserIfHasPermission(permission).then(res => {
      console.log(res);
      this.elementRef.nativeElement.style.display = res ? "inline" : "none";
      return res;
    });
  }


}
