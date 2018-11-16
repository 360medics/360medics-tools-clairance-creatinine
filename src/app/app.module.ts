import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Components
import { CreatinineComponent } from './creatinine/creatinine.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent, InputComponent, RadioComponent, TextareaComponent } from './components/form';
import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CreatinineComponent,
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    RadioComponent,
    TextareaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
