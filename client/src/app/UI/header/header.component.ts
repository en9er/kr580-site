import { Component, OnInit } from '@angular/core';
import {TranslatePageService} from "../../services/translate.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public supportLanguages;
  constructor(private translateService: TranslatePageService) {
    this.supportLanguages = translateService.supportLanguages;
  }

  ngOnInit(): void {
  }

  onLangChange(lang: string){
    this.translateService.switchLanguage(lang)
  }

  selectLang(target: any) {
    this.translateService.switchLanguage(target.value)
  }

  currentLang():string{
    return this.translateService.currentLang();
  }
}
