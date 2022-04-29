import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondComponentComponent } from '../second-component/second-component.component';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  listProductos:string[];
  listProductosActivos:string[]; 
  SecondComponent:SecondComponentComponent;

  constructor(private router?:Router) {
    this.SecondComponent= new SecondComponentComponent();
    this.listProductosActivos=[]; 
    this.listProductos=
    ['Aceite',
      'Lechuga', 'Tomate', 'Papa', 'Zapallito', 'Zanahoria',
      'Manzana', 'Banana', 'Uvas', 'Durazno', 'Naranja', 'Mandarina',
      'Fideo monito', 'Fideo chiquito', 'Fideo tirabuzon', 'Fideo codito', 'Fideo Cabello de Angel',
      'Fideo Largo', 'Fideo Mostachol',
      'Capeletinis',
      'Arroz',
      'Polenta',
      'Carne Picada', 'Bifes',
      'Milanesa de Soja', 'Milanesa de Pollo', 'Milanesa de Carne',
      'Salchichas',
      'Atun',
      'Garbanzos', 'Lentejas', 'Porotos', 'Arvejas',
      'Huevos',
      'Pure de Tomate',
      'Sal',
      'Mermelada De Durazno Gaspy', 'Otra Mermelada',
      'Azucar', 'Yerba',
      'Capuchino', 'Mate Cocido', 'Te',
      'Jugo de Limon',
      'Pan Lactal', 'Pan de Pancho', 'Otro Pan',
      'Yogurt', 'Yogurt Bebible',
      'Leche', 'Crema', 'Queso Crema',
      'Queso Cremoso',
      'Fiambre Jamon y Queso', 'Fiambres Varios',
      'Aderezo Mayonesa', 'Aderezo Ketchup', 'Aderezo Barbacoa',
      'Aderezo Moztaza Con Miel', 'Otro Aderezo',
      'Pasta de Dientes', 'Acondicionador', 'Shampoo', 'Jabon Banio',
      'Servilleta Papel', 'Papel Higenico',
      'Jugo Tang Varios',
      'Masitas Varias'].sort();
  }
  ngOnInit(): void {}

  checkboxClick(checkbox:HTMLInputElement,nombreProducto:HTMLParagraphElement){
    /*si el boton esta apretado que se ponga verde ,
    si se desclickea se ponga denuevo en blancquito*/
     if(checkbox.checked){
      nombreProducto.style.color='rgb(62, 255, 44)';
      this.listProductosActivos.push(nombreProducto.innerHTML);
     } 
     else{
      nombreProducto.style.color='rgb(236, 243, 243)';
      //de la lista productosActivos eliminar el elemento de indice donde 'elemento==nombreProducto'
      this.listProductosActivos.splice(this.listProductosActivos.findIndex(elemento=>elemento==nombreProducto.innerHTML),1);
    //this.listProductosActivos.splice(this.listProductosActivos.findIndex(function(elemento){elemento==nombreProducto.innerHTML}),1);
    }
  }
  ListaTerminada():void{
    this.SecondComponent.recibirListaProductosActivos(this.listProductosActivos);
    console.log('Se envio la lista',this.listProductosActivos);
    this.router?.navigate(["/deCompras"]);
  }

   get getListaProductosActivos(){
    return this.listProductosActivos
  }

}

