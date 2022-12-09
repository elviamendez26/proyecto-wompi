import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<EventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  puntos(numero){
    return numero.toString().replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
} 
