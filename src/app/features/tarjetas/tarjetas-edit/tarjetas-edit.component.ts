import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tarjetas } from 'src/app/core/models/tarjetas';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-tarjetas-edit',
  templateUrl: './tarjetas-edit.component.html',
  styleUrls: ['./tarjetas-edit.component.css'],
})
export class TarjetasEditComponent implements OnInit {
  public tarjetas: Tarjetas[] = [];
  private id: any;
  public tarjeta = new Tarjetas();

  editTarjetasForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
      Validators.pattern('[a-zA-Z ]*'),
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('[0-9]*'),
    ]),
    unidades: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('[0-9]*'),
    ]),
  });

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('idTarjeta').replace(/['"]+/g, '');
    localStorage.removeItem('idTarjeta');
    this.id = parseInt(this.id);

    this.globalService.getCard(this.id).subscribe((data) => {
      this.tarjeta = data;
      this.setValues();
    });
  }

  updateVenta() {
    this.tarjeta.nombre = this.editTarjetasForm.get('nombre').value;
    this.tarjeta.precio = this.editTarjetasForm.get('precio').value;
    this.tarjeta.unidades = this.editTarjetasForm.get('unidades').value;
    this.globalService.updateCard(this.tarjeta, this.tarjeta.id).subscribe();
  }

  setValues() {
    this.editTarjetasForm.patchValue({
      nombre: this.tarjeta.nombre,
      precio: this.tarjeta.precio,
      unidades: this.tarjeta.unidades,
    });
  }
}
