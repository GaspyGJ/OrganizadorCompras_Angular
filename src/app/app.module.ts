import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SecondComponentComponent } from './second-component/second-component.component';
import { ProductoComponent } from './producto/producto.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponentComponent } from './first-component/first-component.component';


const NombreRoutes:Routes=
[ //en imports agregamos "RouterModule.forRoot( NombreRoutes )"
{path:'', component:  FirstComponentComponent},
{path:'deCompras', component: SecondComponentComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SecondComponentComponent,
    ProductoComponent,
    FirstComponentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot( NombreRoutes )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
