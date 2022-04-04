import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrganizadorCompras';

  totalActual:number=0;

  actualizarTotal(sumatoria:number){
    this.totalActual=sumatoria;
  }

}
