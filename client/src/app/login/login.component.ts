import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  responseData: any;
  form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(
          data => {
            localStorage.setItem('token', data.toString());
            this.router.navigate(['/admin']);
          },
          error => { }
        );
    }
  }
}
