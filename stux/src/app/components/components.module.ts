import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { NgxCaptchaModule } from 'ngx-captcha';

@NgModule({
  declarations: [HomeComponent, LoginComponent, AboutComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ]
})
export class ComponentsModule {}
