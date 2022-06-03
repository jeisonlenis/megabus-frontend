import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VentasService } from '../../../core/services/ventas.service';
import { Ventas } from '../../../core/models/ventas';
import { Subscription } from 'rxjs';
import { Estacion } from 'src/app/core/interfaces/estacion';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-ventas-list',
  templateUrl: './ventas-list.component.html',
  styleUrls: ['./ventas-list.component.css'],
})
export class VentasListComponent implements OnInit, OnDestroy {
  public ventas: Ventas;
  public estacion: Estacion;
  public nombreEstacion: string;

  public titles: string[] = [
    'Id',
    'Nombre',
    'Documento',
    'Estacion',
    'Tarjeta',
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

  constructor(
    private ventasService: VentasService,
    private globalService: GlobalService
  ) {
    localStorage.setItem('idVendedor', this.idVenderor.toString());
  }

  ngOnInit(): void {
    this.active = false;
    this.multiItem = 5;
    this.finalItem = this.multiItem;
    this.getVentas(this.currentPage);
    this.suscription = this.ventasService.refresh$.subscribe(() => {
      this.getVentas(this.currentPage);
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

  addVenta() {
    this.add = true;
  }

  editVenta(id) {
    this.id = id;
    console.log(this.id);

    localStorage.setItem('idVenta', JSON.stringify(this.id));
    this.edit = true;
  }

  removeVenta(id) {
    this.remove = true;
    localStorage.setItem('idVentaBorrar', JSON.stringify(id));
  }

  deleteItem() {
    this.idBorrar = localStorage.getItem('idVentaBorrar').replace(/['"]+/g, '');
    localStorage.removeItem('idVentaBorrar');
    this.ventasService.deleteVenta(this.idBorrar).subscribe();
  }

  resetComponent() {
    this.add = false;
    this.edit = false;
    this.remove = false;
  }

  getBusstation(id) {
    this.globalService.getBusstation(id).subscribe((data) => {
      this.nombreEstacion = data.nombre;
    });
  }

  getVentas(page) {
    this.ventasService.getVentas().subscribe((data) => {
      this.ventas = data;
      this.getBusstation(this.ventas[0]?.busstation_id);

      this.datos = this.ventas;

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
