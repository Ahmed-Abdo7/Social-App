import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SittingServer {
  private readonly httpClient = inject(HttpClient);
  changePassWord(body: object): Observable<any> {
    return this.httpClient.patch<any>(environment.base_url + '/users/change-password', body,{
      
    });
  }
}
