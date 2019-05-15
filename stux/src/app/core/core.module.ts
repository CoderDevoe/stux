import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '.';
import { FooterComponent } from '.';

const components = [
  HeaderComponent,
  FooterComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [...components]
})
export class CoreModule {}
