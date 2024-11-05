import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SliderComponent } from './slider/slider.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    SliderComponent
  ], 
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    HomePageComponent
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
