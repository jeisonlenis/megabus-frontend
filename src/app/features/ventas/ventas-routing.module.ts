import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VentasAddComponent } from './ventas-add/ventas-add.component';
import { VentasEditComponent } from './ventas-edit/ventas-edit.component';
import { VentasListComponent } from './ventas-list/ventas-list.component';
import { VentasComponent } from './ventas.component';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      {
        path: 'ventas-add',
        component: VentasAddComponent,
      },
      {
        path: 'ventas-edit',
        component: VentasEditComponent,
      },
      {
        path: 'ventas-list',
        component: VentasListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule {}
