import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SecondComponentComponent } from './second-component/second-component.component';
import { ProductoComponent } from './producto/producto.component';
import { FormsModule } from '@angular/forms';
import { ThirdComponentComponent } from './third-component/third-component.component';

@NgModule({
  declarations: [
    AppComponent,
    SecondComponentComponent,
    ProductoComponent,
    ThirdComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
