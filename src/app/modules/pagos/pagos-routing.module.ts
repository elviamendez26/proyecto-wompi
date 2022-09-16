import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridPagosComponent } from './grid-pagos/grid-pagos.component';

const routes: Routes = [
  {
    path: '',
    component: GridPagosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagosRoutingModule { }
