import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatinineComponent } from './creatinine/creatinine.component';


const routes: Routes = [
  { path: '', component: CreatinineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
