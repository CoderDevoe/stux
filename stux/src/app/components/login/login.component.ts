import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  password: string;
  showLoader: boolean;
  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }, {});
    this.showLoader = false;
  }

  ngOnInit() {}


  async login(value) {
    this.username = value.username;
    this.password = value.password;
    this.showLoader = true;
    await this.authService.login(this.username, this.password);
    this.showLoader = false;
  }
}
