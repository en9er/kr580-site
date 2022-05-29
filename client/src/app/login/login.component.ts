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
  response: boolean;
  form = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {
    this.response = true;
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
          data => {
            localStorage.setItem('token', JSON.parse(JSON.stringify(data.body))["token"]);
            this.router.navigate(['/admin']);
          },
          error => {
            this.response = false
          }
        );
    }
  }
}
