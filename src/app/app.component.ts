import { AfterContentInit, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseService } from 'base/services/base.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseService implements OnInit, AfterContentInit {
  dir: string = '';
  constructor(
    public override injector: Injector,
  ) {
    super(injector);
    this.CheckLanguage();
    this.ChangeDirection();
    //this.TranslatePageTitle();
  }
  ngOnInit(): void {
    //this.spinnerService.show();
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this._ref.detectChanges();
    }, 1000)
  }

  ChangeDirection() {
    this.translationService.dir$.subscribe(lang => {
      this.dir = lang;
      this.CheckDirections();
    });
  }

  CheckLanguage() {
    this.dir = this.translationService.RetrieveDir();
    this.CheckDirections();
  }

  CheckDirections() {
    this.translationService.CheckDirection(this.dir);
  }
}
