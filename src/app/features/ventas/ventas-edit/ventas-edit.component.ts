import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlobalService } from 'src/app/core/services/global.service';
import { VentasService } from 'src/app/core/services/ventas.service';

import { Estaciones } from 'src/app/core/models/estaciones';
import { Tarjetas } from 'src/app/core/models/tarjetas';
import { Ventas } from 'src/app/core/models/ventas';
@Component({
  selector: 'app-ventas-edit',
  templateUrl: './ventas-edit.component.html',
  styleUrls: ['./ventas-edit.component.css'],
})
export class VentasEditComponent implements OnInit {
  public estaciones: Estaciones[] = [];
  public tarjetas: Tarjetas[] = [];
  private id: any;
  public venta = new Ventas();
  public vendedor;
  public nombres;
  public apellidos;

  editVentasForm = new FormGroup({
    nombre_cliente: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    numdoc_cliente: new FormControl('', [
      Validators.minLength(6),
      Validators.pattern('[0-9]*'),
    ]),
    estacion: new FormControl('', [Validators.required]),
    tarjeta: new FormControl('', [Validators.required]),
  });

  constructor(
    private ventasservice: VentasService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idVenta').replace(/['"]+/g, '');
    this.id = parseInt(this.id);

    this.ventasservice.getVentaById(this.id).subscribe((data) => {
      this.venta = data;

      this.vendedor = data;

      /* Desestruturacion de la interfaz Vendedor para tomar los datos de nombre
       y apellidos que llegan desde el objeto de ventas */
      const { nombres, apellidos } = this.vendedor;

      this.nombres = nombres;
      this.apellidos = apellidos;

      this.setValues();
    });

    this.getGlobals();
  }

  updateVenta() {
    this.venta.nombre_cliente = this.editVentasForm.get('nombre_cliente').value;
    this.venta.numdoc_cliente = this.editVentasForm.get('numdoc_cliente').value;
    this.venta.busstation_id = this.editVentasForm.get('estacion').value;
    this.venta.card_id = this.editVentasForm.get('tarjeta').value;
    this.id = localStorage.getItem('idVenta').replace(/['"]+/g, '');
    this.id = parseInt(this.id);
    this.venta.id = this.id;
    localStorage.removeItem('idVenta');

    this.ventasservice.updateVenta(this.venta, this.venta.id).subscribe();
  }

  setValues() {
    this.editVentasForm.patchValue({
      nombre_cliente: this.venta.nombre_cliente,
      numdoc_cliente: this.venta.numdoc_cliente,
      estacion: this.venta.busstation_id,
      tarjeta: this.venta.card_id,
    });
  }

  getGlobals() {
    this.globalService.getBusstations().subscribe((...data) => {
      this.estaciones = data;
    });
    this.globalService.getCards().subscribe((...data) => {
      this.tarjetas = data;
    });
  }
}
