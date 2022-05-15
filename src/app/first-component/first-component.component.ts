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
    //second component es una instancia de SecondComponentComponent
    this.SecondComponent= new SecondComponentComponent();
    this.listProductosActivos=[]; 
    this.listProductos=
    [
      //-----------Verduras Y Frutas------------
      'Lechuga', 'Tomate', 'Papa', 'Zapallito', 'Zanahoria',
      'Manzana', 'Banana', 'Uvas', 'Durazno', 'Naranja', 'Mandarina',
       //-----------Fideos y similares------------
      'Fideo monito', 'Fideo chiquito', 'Fideo tirabuzon', 'Fideo codito', 'Fideo Cabello de Angel',
      'Fideo Largo', 'Fideo Mostachol','Capeletinis','Arroz',
      //-----------Carnes y Similares------------
      'Carne Picada', 'Bifes','Milanesa de Soja', 'Milanesa de Pollo', 'Milanesa de Carne','Salchichas',
      'Hamburgesas de Carne','Hamburgesas de Pollo','Patitas de Pollo','Medallones de Pollo',
      //-----------Latas------------
      'Atun','Garbanzos', 'Lentejas', 'Porotos', 'Arvejas','Choclo',
      //-----------Cosas de Cocina------------
      'Aceite','Huevos','Pure de Tomate','Sal','Jugo de Limon','Polenta',
      'Tapas de Empanada','Rapiditas','Sopas',
      //-----------Merienda/Madrugada------------
      'Mermelada Gaspy','Mermelada','Miel','Azucar', 'Yerba',
      'Capuchino','Cafe','Cafe Latte', 'Mate Cocido', 'Te',
      //-----------Panaderia------------
      'Pan Lactal', 'Pan de Pancho', 'Pan comun','Bizcochos','Facturas','Pan',
      //-----------Lacteos------------
      'Leche', 'Crema','Queso Crema','Queso Cremoso',
      'Yogurt', 'Yogurt Bebible',
     //-----------Fiambres------------
      'Fiambre Jamon y Queso', 'Fiambres Varios','Fiambre Salame',
      //-----------Aderezos------------
      'Aderezo Mayonesa', 'Aderezo Ketchup', 'Aderezo Barbacoa',
      'Aderezo Mostaza Con Miel', 'Aderezo',
      //-----------Banio/Limpieza------------
      'Pasta de Dientes', 'Acondicionador', 'Shampoo', 'Jabon Banio','Algodon','Detergente','Esponja acero',
      'Servilleta Papel', 'Papel Higenico','Cepillo de Dientes','Deshodorante','Talco','Esponja',
      'Bolsas de Basura',
      //-----------Extra------------
      'Jugos Tang','Masitas Varias','Postre',
      ].sort();
  }
  ngOnInit(): void {}

  checkboxClick(checkbox:HTMLInputElement,nombreProducto:HTMLParagraphElement){
  /*si el boton esta apretado que se ponga verde , si se desclickea se ponga denuevo en negro*/
     if(checkbox.checked){
      nombreProducto.style.color='rgb(21, 190, 15)';
      this.listProductosActivos.push(nombreProducto.innerHTML);
     } 
     else{
      nombreProducto.style.color='rgb(236, 243, 243)';
      checkbox.style.backgroundColor='#FF99CC';
      //de la lista productosActivos eliminar el elemento de indice donde 'elemento==nombreProducto'
      this.listProductosActivos.splice(this.listProductosActivos.findIndex(elemento=>elemento==nombreProducto.innerHTML),1);
      //this.listProductosActivos.splice(this.listProductosActivos.findIndex(function(elemento){elemento==nombreProducto.innerHTML}),1);
    }
  }

  ListaTerminada():void{ //Termino la lista y se apreto 'Ir a Gestionar Compra'
    //la variable SecondComponent es una instancia de SecondComponentComponent
    //el metodo recibir lista es un metodo Statico
    this.SecondComponent.recibirListaProductosActivos(this.listProductosActivos);
    this.router?.navigate(["/deCompras"]);
  }

   get getListaProductosActivos(){
    return this.listProductosActivos
  }

}

