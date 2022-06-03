import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';

import { VentasModule } from './ventas/ventas.module';
import { TarjetasModule } from './tarjetas/tarjetas.module';
import { LayoutModule } from '../shared/layout/layout.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [FeaturesComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    FeaturesRoutingModule,
    VentasModule,
    TarjetasModule,
    LayoutModule,
  ],
})
export class FeaturesModule {}
