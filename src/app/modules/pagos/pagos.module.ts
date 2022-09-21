import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PagosRoutingModule } from './pagos-routing.module';
import { GridPagosComponent } from './grid-pagos/grid-pagos.component';
import {MatSelectModule} from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';




@NgModule({
  declarations: [
    GridPagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule, 
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [GridPagosComponent]



 
})
export class PagosModule { }
