import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecondComponentComponent } from './second-component/second-component.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OrganizadorCompras';
}
