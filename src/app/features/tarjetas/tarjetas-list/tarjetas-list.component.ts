import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Estacion } from 'src/app/core/interfaces/estacion';
import { Tarjetas } from 'src/app/core/models/tarjetas';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tarjetas-list.component.html',
  styleUrls: ['./tarjetas-list.component.css'],
})
export class TarjetasListComponent implements OnInit {
  public tarjetas: Tarjetas;
  public estacion: Estacion;
  public nombreEstacion: string;

  public titles: string[] = [
    'Id',
    'Nombre',
    'Precio',
    'Unidades',
    'Valor Recaudos',
    '',
  ];
  public idVenderor: number = 35154;

  //estado de componentes
  public add: boolean = false;
  public edit: boolean = false;
  public remove: boolean = false;

  //Array de datos de la lista para pagination
  private datos;

  //id de usuario para update y edit
  private id: number;
  private idBorrar;

  //Pagination
  public currentItem = 0;
  public finalItem = 0;
  private totalRows: number;
  private multiItem;
  public pages;
  private totalPages;
  private currentPage = 1;
  public positivePage;
  public negativePage;

  //estado buttons pagination
  public last = false;
  public active = false;

  public suscription: Subscription;

  constructor(private tarjetasService: GlobalService) {
    localStorage.setItem('idTarjeta', this.idVenderor.toString());
  }

  ngOnInit(): void {
    this.active = false;
    this.multiItem = 5;
    this.finalItem = this.multiItem;
    this.getTarjetas(this.currentPage);
    this.suscription = this.tarjetasService.refresh$.subscribe(() => {
      this.getTarjetas(this.currentPage);
      this.add = false;
      this.edit = false;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  startPage() {
    this.last = false;
    this.active = false;
    this.currentItem = 0;
    this.finalItem = this.multiItem;
  }

  nextPage(currentItem: number, finalItem: number) {
    if (this.currentItem === 0) {
      this.active = true;
    }
    this.currentItem = currentItem + this.multiItem;
    this.finalItem = finalItem + this.multiItem;
    if (this.pages.length * this.multiItem === this.finalItem) {
      this.last = true;
    }
  }

  prevPage(currentItem: number, finalItem: number) {
    this.last = false;
    this.finalItem = finalItem - this.multiItem;
    this.currentItem = currentItem - this.multiItem;
  }

  perPage(page) {
    if (this.active === true) {
      this.last = false;
    }
    if (this.pages.length === page) {
      this.last = true;
    } else if (page * this.multiItem === this.finalItem) {
      this.last = false;
    }
    this.finalItem = this.multiItem * page;
    this.currentItem = this.finalItem - this.multiItem;
  }

  endPage() {
    this.active = true;
    this.last = true;
    if (this.pages.length > 0) {
      this.totalPages = this.pages.length;
    }
    this.totalPages = this.totalPages * this.multiItem;
    this.currentItem = this.totalPages - this.multiItem;
    this.finalItem = this.pages.length * this.multiItem;
  }

  addTarjeta() {
    this.add = true;
  }

  editTarjeta(id) {
    this.id = id;
    localStorage.setItem('idTarjeta', JSON.stringify(this.id));
    this.edit = true;
  }

  removeTarjeta(id) {
    this.remove = true;
    localStorage.setItem('idTarjetaBorrar', JSON.stringify(id));
  }

  deleteItem() {
    this.idBorrar = localStorage
      .getItem('idTarjetaBorrar')
      .replace(/['"]+/g, '');
    localStorage.removeItem('idTarjetaBorrar');
    /* this.tarjetasService.deleteTarjeta(this.idBorrar).subscribe(); */
  }

  resetComponent() {
    this.add = false;
    this.edit = false;
    this.remove = false;
  }

  getTarjetas(page) {
    this.tarjetasService.getCards().subscribe((data) => {
      this.tarjetas = data;

      this.datos = this.tarjetas;

      if (this.datos.length >= 0) {
        this.active = true;

        this.totalRows = this.datos.length;
      }

      let toInt = this.totalRows / this.multiItem;

      toInt = Math.ceil(toInt);
      let pages: any[] = [];

      for (let index: any = 0; index < toInt; index++) {
        pages.push(index + 1);
      }

      this.pages = pages;

      this.currentPage = page;
      this.positivePage = this.currentPage + 1;
      this.negativePage = this.currentPage - 1;
    });
  }
}
