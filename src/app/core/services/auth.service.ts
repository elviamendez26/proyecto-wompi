import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, of } from 'rxjs';
import { AppSettingsService } from '../app-configs/app-settings.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authenticated: boolean = false;


  constructor(
    private _appSettings: AppSettingsService,
    private _utilityService: UtilityService,
    ) { }


  postSession() {
    let data = {
      "userName": environment.userName,
      "password": btoa(environment.password)
    }
    console.log(data)
    return this._utilityService.postQuery(this._appSettings.auth.url.base, data)
      .pipe(map((res: any) => {
        this.saveSession(res.data);
        return true;
      }));
  }

  // inicioSesion(user: string, pass: string) {
  //   let data = {
  //     "userName": user,
  //     "password": btoa(pass)
  //   }
  //   return this._utilityService.postQuery(this._appSettings.auth.url.inicio, data)
  //     .pipe(map((res: any) => {
      

  //       this.saveSession(res.data);
  //       return true;
  //     }));
  // }






  saveSession(res: any = {}) {

    localStorage.setItem('accessToken', res.token);
    localStorage.setItem('infoauth', JSON.stringify(res));

    // Store the access token in the local storage
    this.accessToken = res.token;

    // Set the authenticated flag to true
    this._authenticated = true;

    // Return a new observable with the response
    return of(res);
  }
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }
}
