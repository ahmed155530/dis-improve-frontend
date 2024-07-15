import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  _dir = new BehaviorSubject<any>('rtl');
  dir$ = this._dir.asObservable();
  dir: string = '';
  lang: string = '';
  langs: string[] = ['ar', 'en'];
  constructor(
    private translationService: TranslateService,
  ) { }

  InitlanguageAndDirection() {
    localStorage.setItem(LocalStorageEnum.languageDirection, "ar");
    localStorage.setItem(LocalStorageEnum.displayDirection, "rtl");
    this.dir = "rtl";
    this.lang = "ar";
    this.translationService.addLangs(this.langs);
    this.translationService.setDefaultLang(this.lang);
    this.translationService.currentLang = this.lang;
    this.translationService.use(this.lang).subscribe();
  }

  CheckLanguage(): void {
    this.lang = localStorage.getItem(LocalStorageEnum.languageDirection) ?? 'ar';
    this.dir = localStorage.getItem(LocalStorageEnum.displayDirection) ?? 'rtl';
    this.translationService.use(this.lang);
    if (!this.lang) {
      this.InitlanguageAndDirection();
    }
  }

  RetrieveDir(): string {
    if (!this.dir)
      this.CheckLanguage();
    this._dir.next(this.dir);
    return this.dir;
  }

  ChooseLang(lang: string): void {
    switch (lang) {
      case 'ar':
        this.dir = 'rtl';
        this._dir.next(this.dir);
        localStorage.setItem(LocalStorageEnum.languageDirection, "ar");
        localStorage.setItem(LocalStorageEnum.displayDirection, "rtl");
        this.translationService.use('ar');
        this.CheckDirection(this.dir);
        break;
      case 'en':
        this.dir = 'ltr';
        this._dir.next(this.dir);
        localStorage.setItem(LocalStorageEnum.languageDirection, "en");
        localStorage.setItem(LocalStorageEnum.displayDirection, "ltr");
        this.translationService.use('en');
        this.CheckDirection(this.dir);
        break;
      default:
        break;
    }
  }

  CheckDirection(dir: string) {
    switch (dir) {
      case 'rtl':
        document.body.dir = 'rtl'
        break;
      case 'ltr':
        document.body.dir = 'ltr'
        break;
      default:
        break;
    }
  }
}