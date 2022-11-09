import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/core/services/auth.service';
import { FintraBuscadoService } from 'app/core/services/fintraBuscado.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { EventoComponent } from '../evento/evento.component';

@Component({
  selector: 'app-grid-pagos',
  templateUrl: './grid-pagos.component.html',
  styleUrls: ['./grid-pagos.component.scss']
})
export class GridPagosComponent implements OnInit {
  public safeSrc: SafeResourceUrl;
  formularioPagos: FormGroup;
  formularioFactura: FormGroup;
  datoPagar: any[] = [];
  details: any[] = [];
  paso: number = 1;
  configuracionPasarela: any
  dataReferencia: any;
  metodoPago: number;
  mostrarpago: boolean = true;
  ruta: string;
  identificacion: any;
  numeroSolicitud: any;
  nombreCliente: any;
  TipoIdentificacion: string;
  sumTotal: number = 0;
  panelOpenState = false;

  constructor(
    public _fintraBuscadoService: FintraBuscadoService,
    private _authService: AuthService,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {
    this.formularioPagos = this.fb.group({
      tipo: ['', [Validators.required]],
      numeroDoc: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.formularioFactura = this.fb.group({
      total: [0, [Validators.required, Validators.min(1)]],

    });
  }

  ngOnInit(): void {
    this.inicioSecion();
  }
  inicioSecion() {
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._authService.postSession().subscribe((res) => {
      Swal.close();
      if (res) {
        this.configuracion();
      }
    });
  }

  configuracion() {
    // Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._fintraBuscadoService.configuracionPasarela().subscribe((res) => {
      console.log(res.data)
      this.configuracionPasarela = res.data;
      // Swal.close();
    });
  }


  enviarDatos(): any {
    let data = this.formularioPagos.value
    Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
    this._fintraBuscadoService.getData(data.numeroDoc).subscribe((res) => {
      Swal.close();
      if (res.data.length == 0) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: '¡No tienes facturas pendientes!',
        })
        return
      }
      this.paso = 2;
      this.datoPagar = [];
      res.data.forEach((dato: any, index) => {
        this.datoPagar.push({ ...dato, check: false })
      })
      this.sumTotal = 0;

      this.numeroSolicitud = this.datoPagar[0].numeroSolicitud;
      this.identificacion = data.numeroDoc;
      this.TipoIdentificacion = data.tipo == 'CC' ? 'Cedula' : 'NIT';
      this.nombreCliente = this.datoPagar[0].nombreCliente;

    });
  }

  referenciaPago() {
    if (!this.metodoPago) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Elige un metodo de pago!',
      })
      return;
    }
    if (this.details.length > 0) {
      let data = {
        "numeroSolicitud": this.numeroSolicitud,
        "identificacion": this.identificacion,
        "details": this.details,
        "idPasarela": this.metodoPago
      }
      console.log(data)
      debugger
      Swal.fire({ title: 'Cargando', html: 'Buscando información...', timer: 500000, didOpen: () => { Swal.showLoading() }, }).then((result) => { });
      this._fintraBuscadoService.referenciaPago(data).subscribe((res) => {
        Swal.close()
        console.log(res.data)
        this.dataReferencia = res.data;
        this.pagar();
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Tiene que seleccionar al menos una factura!',
      })

    }
  }
  almacenarDato(dato, evento) {
    //   console.log(evento)
    if (evento.checked) {
      this.details.push({
        documentoCxc: dato.documentoCxC
      })
      this.sumTotal += dato.valorFactura;
    } else {
      let array = this.details.filter(word => word.documentoCxc == dato.documentoCxC);
      let index = this.details.indexOf(array[0])
      this.details.splice(index, 1)
      this.sumTotal -= dato.valorFactura;

    }
    // this.formularioFactura['total'].setValue(this.sumTotal)
    this.formularioFactura.patchValue({
      total: this.sumTotal
    });
  }

  pagar() {
    if (!this.metodoPago) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: '¡Elige un metodo de pago!',
      })
      return;
    }

    switch (this.metodoPago) {
      case 1:
        // this.mostrarPago='wompi';
        this.mostrarpago = false;
        this.dataReferencia.valorFactura = this.dataReferencia.valorFactura == 0 ? 54000 : this.dataReferencia.valorFactura;
        this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/wompi.html/?numeroFactura=${this.dataReferencia.referenciaPago}&valorFactura=${this.dataReferencia.valorFactura}&codigoConvenio=${this.dataReferencia.codigoConvenio}`);
        // this.ruta = `assets/wompi.html/?numeroFactura=${this.dataReferencia.referenciaPago}&valorFactura=${this.dataReferencia.valorFactura}`
        break;
      case 2:
        // const dialogRef = this.dialog.open(EventoComponent);
        console.log(this.dataReferencia)
        const dialogRef = this.dialog.open(EventoComponent, {
          width: "30em",
          disableClose: true,
          data: {
            valorFactura:this.dataReferencia.valorFactura,
            referenciaPago:this.dataReferencia.referenciaPago,
            convenio: this.dataReferencia.codigoConvenio,
            identificacion: this.identificacion},
        });
        dialogRef.afterClosed().subscribe(result => {
          this.paso=1;
        });
        break;

      default:
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: '¡Este metodo aun no se ha configurado!',
        })
        break;
    }
  }

  puntos(numero){
    return numero.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
}
