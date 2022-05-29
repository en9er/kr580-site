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
  constructor(private translateService: TranslatePageService, private authService: AuthService, public router: Router) {
    this.supportLanguages = translateService.supportLanguages;
  }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"))
  }

  onLangChange(lang: string){
    this.translateService.switchLanguage(lang)
  }
  selectLang(target: any) {
    this.translateService.switchLanguage(target.value)
  }

  isLoggedIn()
  {
    return localStorage.getItem("token") !== null
  }

  currentLang():string{
    return this.translateService.currentLang();
  }

  onLogOut() {
    localStorage.removeItem("token")
    this.authService.logout().subscribe()
    //this.router.navigate(['../'])
  }
}
