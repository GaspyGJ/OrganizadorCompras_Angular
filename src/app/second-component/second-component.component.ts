import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstComponentComponent } from '../first-component/first-component.component';
import { ProductoComponent } from '../producto/producto.component';

@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css']
})
export class SecondComponentComponent implements OnInit {

  totalActual: number;
  flagEdit: boolean;
  numberEdit: number | null;
  //[new ProductoComponent('producto1', 1, 1), new ProductoComponent('producto2 mucho producto tiene el producto 2', 2, 2)];
  listaProductosEnTabla: ProductoComponent[];
  listaProductosEnTabla2: string[]; //solo existe porq necesito una lista de prodcutos en tabla con solo los nombres
  static listaProductosSeleccionados: string[]=[];

  get getListaProductosSeleccionados(){
    return SecondComponentComponent.listaProductosSeleccionados;
  }

  flagTerminado=false;

  ngOnInit(): void {}

  constructor(private router?:Router) {
    this.flagEdit = false;
    this.numberEdit = null;
    this.totalActual = 0;
    this.listaProductosEnTabla=[]; 
    this.listaProductosEnTabla2=[];
  }

  recibirListaProductosActivos(listProductosActivos:string[]){
    SecondComponentComponent.listaProductosSeleccionados=listProductosActivos;
  }


  addProductoToTable(reseteador: HTMLInputElement, nombreProducto: string, cantidadProducto: string, precioProducto: string) {

    //Si estan todos los campos completados

    if (nombreProducto != '' && cantidadProducto != '' && precioProducto != '' &&
      nombreProducto != ' ' && cantidadProducto != ' ' && precioProducto != ' ') {
      //creo un producto y lo agrego a la lista
      let nuevoProducto = new ProductoComponent(nombreProducto, parseInt(cantidadProducto), parseInt(precioProducto));
      this.listaProductosEnTabla.push(nuevoProducto);
      this.listaProductosEnTabla2.push(nuevoProducto.nombre); 
      //sumo el precio del producto al total
      this.totalActual += nuevoProducto.precio * nuevoProducto.cantidad

      //hago click en el reseteador para que vuelva a cargar los inputs y no queden rellenos
      reseteador.click()
    }

    else {
      alert('Hay datos en BLANCO');
    }

  }

  eliminarProducto(producto: ProductoComponent, posicion: number) {
    this.listaProductosEnTabla.splice(posicion, 1);
    this.listaProductosEnTabla2.splice(posicion, 1);
    this.totalActual -= producto.precio * producto.cantidad
  }

  modificarProducto(producto: ProductoComponent, posicion: number) {
    this.flagEdit = true;
    this.numberEdit = posicion;
  }

  editAccepted(producto: ProductoComponent, posicion: number, nombreProducto: string, cantidadProducto: string, precioProducto: string) {

    this.totalActual -= producto.precio * producto.cantidad

    producto.setCantidad(cantidadProducto);
    producto.setNombre(nombreProducto);
    producto.setPrecio(precioProducto);

    this.totalActual += producto.precio * producto.cantidad

    this.flagEdit = false;
    this.numberEdit = null;
  }

  getListProductosRestantes():string[]{
    
    let listaProductosFaltantes=this.getListaProductosSeleccionados.filter(
      i=> !(this.listaProductosEnTabla2.includes(i)));
        
      console.log('lista producto faltantes=',listaProductosFaltantes);
    return listaProductosFaltantes;
    //listaProductosEnTabla TIPO PRODUCTO
    //listaProductosSeleccionados TIPO STRING
  }

  volverArmarLista():void{
    this.router?.navigate([""]);
  }


}




