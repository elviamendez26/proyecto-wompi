import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FintraBuscadoService } from 'app/core/services/fintraBuscado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grid-pagos',
  templateUrl: './grid-pagos.component.html',
  styleUrls: ['./grid-pagos.component.scss']
})
export class GridPagosComponent implements OnInit {

  formularioPagos: FormGroup;
  datoPagar: any[] = [];
  constructor(
    public _fintraBuscadoService: FintraBuscadoService,
    public fb: FormBuilder
  ) {
    this.formularioPagos = this.fb.group({
      tipo: [''],
      numeroDoc: ['901217835']
    });
  }

  ngOnInit(): void {

  }
  configuracion() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._fintraBuscadoService.configuracionPasarela().subscribe((res) => {
      console.log(res.data)
      Swal.close();
    });
  }


  enviarDatos(): any {
    let data = this.formularioPagos.value
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._fintraBuscadoService.getData(data.numeroDoc).subscribe((res) => {

      res.data.forEach((data: any, index) => {

        this.datoPagar.push({ ...data, check: false })
      })
      Swal.close();
    });
  }

  pagarWompy(dato: any) {
    
  }

}
