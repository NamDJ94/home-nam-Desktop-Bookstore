import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { MenuComponent} from './Components/Blocks/Menu/menu.component';
import {SliderComponent} from './Components/Blocks/Slider/slider.component';
import {LoginComponent} from './Components/Blocks/Login/login.components';
import {CategoriesComponent} from './Components/Blocks/Categories/categories.component';


import { from } from 'rxjs';
import { BookService } from './Services/book.module';
import { HomeComponent } from './Components/Pages/Home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SliderComponent,
    LoginComponent,
    CategoriesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
