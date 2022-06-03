import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarjetasRoutingModule } from './tarjetas-routing.module';
import { TarjetasComponent } from './tarjetas.component';
import { TarjetasAddComponent } from './tarjetas-add/tarjetas-add.component';
import { TarjetasEditComponent } from './tarjetas-edit/tarjetas-edit.component';
import { TarjetasListComponent } from './tarjetas-list/tarjetas-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TarjetasComponent,
    TarjetasAddComponent,
    TarjetasEditComponent,
    TarjetasListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TarjetasRoutingModule,
  ],
})
export class TarjetasModule {}
