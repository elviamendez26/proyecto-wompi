import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) { }


  /**
  * @description: peticion get
  * @param url: string endpoind
  */
  getQuery(url: string) {
    return this._httpClient.get(url).pipe(catchError(this.handleError));
  }

  /**
  * @description: peticion post
  * @param url: string endpoind
  * @param data: json a enviar
  */
  postQuery(url: string, data: any) {
    return this._httpClient.post(url, data).pipe(catchError(this.handleError));
  }

  /**
   * @description: para fallas de errores en las peticiones.
   */
  handleError = (err: any): Observable<HttpEvent<any>> => {

    let errorMessage = 'No hay respuesta, favor intente nuevamente';
    // console.log("Algo se daño");
    let res: any = {};
    if (err.error instanceof ErrorEvent) {
      errorMessage = `Error: ${err.error.msg}`;
    } else {
      switch (err.status) {
        case 401:
        case 402:
          localStorage.clear();
          localStorage.clear();
          setTimeout(() => {
            localStorage.setItem('closeSession', 'true');
            this.router.navigate(['/login'])
          }, 100);
          break;
        case 403:
          errorMessage = `No tiene permiso para ejecutar esta acción`;
          break;
        case 400:
          if (err.error.msg == 'La session ha expirado') {
            localStorage.clear();
            localStorage.clear();
            setTimeout(() => {
              localStorage.setItem('closeSession', 'true');
              this.router.navigate(['/login'])
            }, 100);
          }
          if (
            err.error.msg !== undefined &&
            typeof err.error.msg == 'string'
          ) {
            errorMessage = `${err.error.msg}`;
          }
          break;
        case 404:
          errorMessage = `${err.error.msg}`;
          break;
        case 500:
          errorMessage = `${err.error.msg}`;
          break;
        default:
          errorMessage = `${err.statusText.msg}`;
          break;
      }
    }
    if (err.error !== 'La session ha expirado') {
      if (
        errorMessage != 'undefined' &&
        errorMessage !== undefined &&
        errorMessage != null &&
        errorMessage != '' &&
        errorMessage != 'UNKNOWN ERROR!'
      ) {
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Cerrar',
        }).then();
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No hubo respuesta por parte del servidor, favor intente nuevamente',
          icon: 'error',
          confirmButtonText: 'Cerrar',
        }).then();
      }
    }
    return throwError(errorMessage);
  };

  getRouteForm(step: string): string {
    switch (step) {
      case '1':
        return "general";
      case '2':
        return "personal";
      case '3':
        return "laboral";
      case '4':
        return "referencia";
      case '5':
        return "financiera";
      case '6':
        return "legales"
      default:
        return 'general'
    }
  }
}

