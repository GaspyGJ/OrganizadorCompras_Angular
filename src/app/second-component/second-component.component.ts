import { Component, OnInit } from '@angular/core';
import { ProductoComponent } from '../producto/producto.component';


@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css']
})
export class SecondComponentComponent implements OnInit {

  totalActual:number=0;

  flagEdit:boolean=false;
  numberEdit:number|null=null;

  productos:ProductoComponent[]=[new ProductoComponent('producto1',1,1),new ProductoComponent('producto2 mucho producto tiene el producto 2',2,2)];

  constructor(){}

  ngOnInit(): void {}

  addProductoToTable(reseteador: HTMLInputElement,nombreProducto:string,cantidadProducto:string,precioProducto:string){

    //Si estan todos los campos completados
    if(nombreProducto!='' && cantidadProducto!='' && precioProducto!='' && 
    nombreProducto!=' ' && cantidadProducto!=' ' && precioProducto!=' ')
    {
      //creo un producto y lo agrego a la lista
      let nuevoProducto=new ProductoComponent(nombreProducto,parseInt(cantidadProducto),parseInt(precioProducto));
      this.productos.push(nuevoProducto);
      
      //sumo el precio del producto al total
      this.totalActual+=nuevoProducto.precio*nuevoProducto.cantidad

      //hago click en el reseteador para que vuelva a cargar los inputs y no queden rellenos
      reseteador.click()
      
    }

    else{
        alert('Hay datos en BLANCO');
    }
  }

  eliminarProducto(producto:ProductoComponent,posicion:number){
    this.productos.splice(posicion,1);
    this.totalActual-=producto.precio*producto.cantidad
  }

  modificarProducto(producto:ProductoComponent,posicion:number){
    this.flagEdit=true;
    this.numberEdit=posicion;
  }

  editAccepted(producto:ProductoComponent,posicion:number,nombreProducto:string,cantidadProducto:string,precioProducto:string){
    
    this.totalActual-=producto.precio*producto.cantidad

    producto.setCantidad(cantidadProducto);
    producto.setNombre(nombreProducto);
    producto.setPrecio(precioProducto);

    this.totalActual+=producto.precio*producto.cantidad

    this.flagEdit=false;
    this.numberEdit=null;
  }


}




