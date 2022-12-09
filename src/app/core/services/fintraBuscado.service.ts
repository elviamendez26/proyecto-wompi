import { Injectable } from '@angular/core';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { UtilityService } from './utility.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FintraBuscadoService {

constructor(
  private _appSettings: AppSettingsService,
  private _utilityService: UtilityService
) { }

getData(data: string) {
  return this._utilityService.getQuery(this._appSettings.fintraSeach.url.listadoFactura + data)
    .pipe(map((res: any) => {
      return res;
    }));
}
configuracionPasarela() {
  return this._utilityService.getQuery(this._appSettings.fintraSeach.url.configuracionPasarela)
    .pipe(map((res: any) => {
      return res;
    }));
}
referenciaPago(data:any) {
  return this._utilityService.postQuery(this._appSettings.fintraSeach.url.referenciaPago,data)
    .pipe(map((res: any) => {
      return res;
    }));
}
}
