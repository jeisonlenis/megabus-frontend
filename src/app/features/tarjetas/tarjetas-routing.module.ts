import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TarjetasAddComponent } from './tarjetas-add/tarjetas-add.component';
import { TarjetasEditComponent } from './tarjetas-edit/tarjetas-edit.component';
import { TarjetasListComponent } from './tarjetas-list/tarjetas-list.component';
import { TarjetasComponent } from './tarjetas.component';

const routes: Routes = [
  {
    path: '',
    component: TarjetasComponent,
    children: [
      {
        path: 'tarjetas-add',
        component: TarjetasAddComponent,
      },
      {
        path: 'tarjetas-edit',
        component: TarjetasEditComponent,
      },
      {
        path: 'tarjetas-list',
        component: TarjetasListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarjetasRoutingModule {}
