import {Component, OnInit} from '@angular/core';
import {TranslatePageService} from "../../services/translate.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public supportLanguages;
  loggedIn = false;
  constructor(private translateService: TranslatePageService, private authService: AuthService, private router: Router) {
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

  isLoggedIn()
  {
    return this.authService.loggedIn()
  }
  currentLang():string{
    return this.translateService.currentLang();
  }

  onLogOut() {
    this.authService.logout()
    this.router.navigate(['../'])
  }
}
