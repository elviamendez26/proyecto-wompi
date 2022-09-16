import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';

import { PagosRoutingModule } from './pagos-routing.module';
import { GridPagosComponent } from './grid-pagos/grid-pagos.component';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    GridPagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class PagosModule { }
