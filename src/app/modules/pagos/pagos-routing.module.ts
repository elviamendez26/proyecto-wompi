import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { GridPagosComponent } from './grid-pagos/grid-pagos.component';

const routes: Routes = [
  {
    path: '',
    component: GridPagosComponent
  },
  {
    path: 'evento',
    component: EventoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
