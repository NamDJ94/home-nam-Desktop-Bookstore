import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';

import {HomeComponent} from './Components/Pages/Home/home.component';
import {CateComponent} from './Components/Pages/Cate/cate.component';
import {DetailComponent} from './Components/Pages/Detail/detail.component';

const routes: Routes = [
  {path: 'cate', component : CateComponent},
  {path: 'detail', component : DetailComponent},
  {path: '**', component : HomeComponent}
];

@NgModule({
  declarations: [
    CateComponent, DetailComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
