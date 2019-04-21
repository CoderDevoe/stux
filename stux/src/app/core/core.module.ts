import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '.';
import { FooterComponent } from '.';

const components = [
  HeaderComponent,
  FooterComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class CoreModule {}
