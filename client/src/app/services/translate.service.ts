import { Injectable } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {TranslateModule} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslatePageService {
  supportLanguages = ["en", "ru"];
  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.supportLanguages);
    this.translateService.setDefaultLang("en");


    const browserLang = this.translateService.getBrowserLang();
    // get user selected language from local storage to set after reload
    const userSelectedLang = localStorage.getItem('selectedLanguage');
    // if user choose language
    if(userSelectedLang)
    {

      this.translateService.use(userSelectedLang);
    }
    else
    {
      // choose browser default language if user didn't choose the language or set english if browser lang is undefined
      this.translateService.use(browserLang? browserLang:"en");
    }
  }

  public switchLanguage(lang: string) {
    this.translateService.use(lang);
    // save lang to local storage
    localStorage.setItem('selectedLanguage', lang);
  }

  public currentLang(): string {
    return this.translateService.currentLang
  }
}
