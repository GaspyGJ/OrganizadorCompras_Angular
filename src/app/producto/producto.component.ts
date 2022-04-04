import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {

  nombre:string;
  precio:number;
  cantidad:number;


  //q onda los @Inject(String) y eso .... porq los tengo q poner?
  constructor(@Inject(String)nombre:string,@Inject(Number)cantidad:number,@Inject(Number)precio:number){
    this.nombre=nombre;
    this.cantidad=cantidad;
    this.precio=precio;
   }


  ngOnInit(): void {
  }

}
