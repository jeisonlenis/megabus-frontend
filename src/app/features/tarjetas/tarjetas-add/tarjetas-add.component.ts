import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tarjetas } from 'src/app/core/models/tarjetas';
import { GlobalService } from 'src/app/core/services/global.service';

@Component({
  selector: 'app-tarjetas-add',
  templateUrl: './tarjetas-add.component.html',
  styleUrls: ['./tarjetas-add.component.css'],
})
export class TarjetasAddComponent implements OnInit {
  private tarjeta = new Tarjetas();

  constructor(private globalService: GlobalService) {}

  addTarjetasForm = new FormGroup({
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
      Validators.pattern('^[0-9]*$'),
    ]),
  });

  ngOnInit(): void {}

  createTarjeta() {
    this.tarjeta.nombre = this.addTarjetasForm.get('nombre').value;
    this.tarjeta.precio = this.addTarjetasForm.get('precio').value;
    this.tarjeta.unidades = this.addTarjetasForm.get('unidades').value;
    this.tarjeta.valor_recaudos = '0';
    this.globalService.saveCard(this.tarjeta).subscribe();
  }
}
