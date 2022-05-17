import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstComponentComponent } from '../first-component/first-component.component';
import { ProductoComponent } from '../producto/producto.component';

import swal from 'sweetalert';

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
      else {
        swal('Cuidado!', 'No se permiten numeros pegativos', 'warning');
      }

    }

    else {
      swal('Cuidado!!', 'Hay datos necesarios para agregar el producto que estan en blanco.', 'warning');
    }

  }

  eliminarProducto(producto: ProductoComponent, posicion: number) {
    swal({
      title: "Estas seguro?",
      text: `Seguro que quiere eliminar ${producto.nombre}" de la tabla`,
      icon: "warning",
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.listaProductosEnTabla.splice(posicion, 1);
          this.listaProductosEnTabla2.splice(posicion, 1);
          this.totalActual -= producto.precio * producto.cantidad
        }
      });
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

  /* .swal-overlay .swal-overlay--show-modal{
     background-color: rgb(63, 110, 114);
 }
 .swal-modal{
     background-color: rgb(63, 110, 114);
 }
 
 .swal-icon .swal-icon--warning{
     background-color: transparent;
 }*/


  volverArmarLista(): void {
    swal({
      title: "Estas seguro?",
      text: "Si regresa a 'Armar Lista' se borraran los datos introducidos en la tabla \n\nRecuerde que si falto algun producto puede agregarlo al carrito sin necesidad de que este en la lista\n\nDesea Regresar a Armar la Lista?",
      icon: "warning",
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.router?.navigate([""]);
        }
      });

  }

  exportarTabla_BBDD(): void {
    console.log("Guardados ('Mentira')");
    /*const mysql= require('mysql')

    //creo una conexion a la base de datos
    const conexion = mysql.createConnection({
        host:'localhost',
        user:'root',
        passsword:'Gaspy',
        database:'comprasuper'
    })

      //me conecto a la base de datos
    conexion.connect((error:any)=>{
      if(error) throw error
      console.log('La Conexion ah sido realizada correctamente')
    })

    //Inserto la "Compra" con la fecha y el precio total
      let FechaHoy = new Date();
      let FechaHoyS = String(FechaHoy.getFullYear()+'/'+ String(FechaHoy.getMonth() + 1).padStart(2, '0')+'/'+ FechaHoy.getDate()).padStart(2, '0');
      console.log('La fecha de hoy es = '+ FechaHoyS);
      conexion.query(`INSERT INTO comprasuper.compra(FechaCompra,PrecioTotal) VALUES ( '${FechaHoyS}' , ${111})`,
      (error:any,rows:any)=>{
       if(error) throw error
       //rows son las filas de la tabla de la consulta.
       //es un array de objetos
        console.log("Se insertaron Correctamente"); 
      });

      conexion.query('SELECT * FROM comprasuper.compra',
        (error:any,rows:any)=>{
        if(error) throw error
        console.log(rows); 
      })
    */
  }


}







