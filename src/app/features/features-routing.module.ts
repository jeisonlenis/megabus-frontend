import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { HomeComponent } from './home/home.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'ventas',
        loadChildren: () =>
          import('./ventas/ventas.module').then((m) => m.VentasModule),
      },
    ],
  },
  {
    path: '',
    component: TarjetasComponent,
    children: [
      {
        path: 'tarjetas',
        loadChildren: () =>
          import('./tarjetas/tarjetas.module').then((m) => m.TarjetasModule),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
