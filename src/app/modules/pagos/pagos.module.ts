import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { GridPagosComponent } from './grid-pagos/grid-pagos.component';


@NgModule({
  declarations: [
    GridPagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
