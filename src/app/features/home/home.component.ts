import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor() {}

  tecnologias: string[] = [
    'Angular V10.0.8',
    'Bootstrap 5',
    'JQuery 3.6.0',
    'Laravel 9.8.1',
  ];
}
