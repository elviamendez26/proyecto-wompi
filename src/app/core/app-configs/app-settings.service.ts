import { Injectable } from '@angular/core';
import { EndPoints } from './end-points';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  /**
   * @description: End-point auth
   */
  public auth = {
    url: {
      base: EndPoints.urlBase('api-fintra/api/private/iniciar-sesion'),
      inicio: EndPoints.urlBase('api-fintra/api/private/portal/iniciar-sesion')
    }
  };

  /**
   * @description: End-point simulador
  */
  public fintraSeach={
    url:{
      listadoFactura:EndPoints.urlBase("api-fintra/api/generic/qry/tk/factura-clientes-ultracem/"),
      configuracionPasarela:EndPoints.urlBase("api-fintra/api/generic/qry/pasarelas-pagos"),
      referenciaPago:EndPoints.urlBase("api-fintra/api/generic/generar-referencia-pago-wompi"),
    }
  }
}
