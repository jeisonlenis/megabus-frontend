import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ventas } from 'src/app/core/models/ventas';
import { Estaciones } from 'src/app/core/models/estaciones';
import { VentasService } from 'src/app/core/services/ventas.service';
import { GlobalService } from 'src/app/core/services/global.service';
import { Tarjetas } from 'src/app/core/models/tarjetas';

@Component({
  selector: 'app-ventas-add',
  templateUrl: './ventas-add.component.html',
  styleUrls: ['./ventas-add.component.css'],
})
export class VentasAddComponent implements OnInit {
  public estaciones: Estaciones[] = [];
  public tarjetas: Tarjetas;

  private venta = new Ventas();
  private inventario;

  constructor(
    private ventasservice: VentasService,
    private globalService: GlobalService
  ) {}

  addVentasForm = new FormGroup({
    nombre_cliente: new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    numdoc_cliente: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^[0-9]*$'),
    ]),
    estacion: new FormControl('', [Validators.required]),
    tarjeta: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getGlobals();
  }

  private recaudo: any;
  createVenta() {
    this.venta.nombre_cliente = this.addVentasForm.get('nombre_cliente').value;
    this.venta.numdoc_cliente = this.addVentasForm.get('numdoc_cliente').value;
    this.venta.busstation_id = this.addVentasForm.get('estacion').value;
    this.venta.card_id = this.addVentasForm.get('tarjeta').value;
    this.venta.vendedor_id = localStorage.getItem('idVendedor');

    this.ventasservice.saveVenta(this.venta).subscribe();
    this.ventasservice
      .getTarjetaById(this.addVentasForm.get('tarjeta').value)
      .subscribe((...data) => {
        this.recaudo = data[0].precio + data[0].valor_recaudos;
        this.tarjetas[0].valor_recaudos = this.recaudo;

        localStorage.setItem(
          'dataRecaudoUpdate',
          JSON.stringify(this.tarjetas[0])
        );
      });
    this.updateInventario();
  }

  updateInventario() {
    this.inventario = JSON.parse(localStorage.getItem('dataRecaudoUpdate'));
    this.ventasservice.updateInventario(this.inventario.id, this.inventario);
    this.removeLocalStorage();
  }

  getGlobals() {
    this.globalService.getBusstations().subscribe((...data) => {
      this.estaciones = data;
    });
    this.globalService.getCards().subscribe((data) => {
      this.tarjetas = data;
    });
  }

  removeLocalStorage() {
    localStorage.removeItem('dataRecaudoUpdate');
  }
}
