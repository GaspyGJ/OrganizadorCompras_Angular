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
  listaProductosEnTabla2: string[]; //solo existe porq necesito una lista de productos en tabla con solo los nombres

  static listaProductosSeleccionados: string[] = [];

  flagTerminado = false;

  ngOnInit(): void { }

  constructor(private router?: Router) {
    this.flagEdit = false;
    this.numberEdit = null;
    this.totalActual = 0;
    this.listaProductosEnTabla = [];
    this.listaProductosEnTabla2 = [];
  }

  get getListaProductosSeleccionados() {
    //porque es un elemento Statico
    return SecondComponentComponent.listaProductosSeleccionados;
  }

  recibirListaProductosActivos(listProductosActivos: string[]) {
    //porque es un elemento Statico
    SecondComponentComponent.listaProductosSeleccionados = listProductosActivos;
  }


  addProductoToTable(reseteador: HTMLInputElement, nombreProducto: string, cantidadProducto: string, precioProducto: string) {

    //Si estan todos los campos completados

    if (nombreProducto != '' && cantidadProducto != '' && precioProducto != '' &&
      nombreProducto != ' ' && cantidadProducto != ' ' && precioProducto != ' ') {

      if (parseInt(cantidadProducto) >= 1 && parseInt(precioProducto) >= 1) {
        //creo un producto y lo agrego a la lista
        let nuevoProducto = new ProductoComponent(nombreProducto, parseInt(cantidadProducto), parseInt(precioProducto));
        this.listaProductosEnTabla.push(nuevoProducto);
        this.listaProductosEnTabla2.push(nuevoProducto.nombre);
        //sumo el precio del producto al total
        this.totalActual += nuevoProducto.precio * nuevoProducto.cantidad

        //hago click en el reseteador para que vuelva a cargar los inputs y no queden rellenos
        reseteador.click()
      }
      else{
        alert('\n\nCuidado!! No se Permiten numeros Negativos');
      }

    }

    else {
      alert('\nCuidado!! Hay datos necesarios para agregar el producto que estan en blanco.');
    }

  }

  eliminarProducto(producto: ProductoComponent, posicion: number) {
    if( window.confirm(`\n\nSeguro que quiere eliminar "${producto.nombre}" de la tabla\n\n\n `)){
      this.listaProductosEnTabla.splice(posicion, 1);
      this.listaProductosEnTabla2.splice(posicion, 1);
      this.totalActual -= producto.precio * producto.cantidad
    }
  }

  modificarProducto(producto: ProductoComponent, posicion: number) {
    this.flagEdit = true;
    this.numberEdit = posicion;
  }

  editAccepted(producto: ProductoComponent, posicion: number, nombreProducto: string, cantidadProducto: string, precioProducto: string) {

    //borro el total actual que afectaba este producto editado
    this.totalActual -= producto.precio * producto.cantidad

    producto.setCantidad(cantidadProducto);
    producto.setNombre(nombreProducto);
    producto.setPrecio(precioProducto);

    //agrego el nuevo total actual con las modificaciones
    this.totalActual += producto.precio * producto.cantidad

    this.flagEdit = false;
    this.numberEdit = null;
  }

  getListProductosRestantes(): string[] {

    let listaProductosFaltantes = this.getListaProductosSeleccionados.filter(
      i => !(this.listaProductosEnTabla2.includes(i)));

    return listaProductosFaltantes;
    //listaProductosEnTabla TIPO PRODUCTO
    //listaProductosSeleccionados TIPO STRING
  }

  volverArmarLista(): void {
    if( window.confirm('\n\nSi regresa a "Armar Lista" se borraran los datos introducidos en la tabla \n\nRecuerde que si falto algun producto puede agregarlo al carrito sin necesidad de que este en la lista\n\nDesea Regresar a Armar la Lista?\n ')){
      this.router?.navigate([""]);
    }
    
  }

}




