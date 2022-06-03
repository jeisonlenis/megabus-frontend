import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasEditComponent } from './ventas-edit/ventas-edit.component';
import { VentasAddComponent } from './ventas-add/ventas-add.component';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { VentasComponent } from './ventas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    VentasComponent,
    VentasAddComponent,
    VentasEditComponent,
    VentasListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    VentasRoutingModule,
  ],
})
export class VentasModule {}
