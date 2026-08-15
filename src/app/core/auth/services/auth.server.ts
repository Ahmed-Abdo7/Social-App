import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { RegisterResponse } from '../models/register.interface';

@Injectable({ providedIn: 'root' })
export class AuthServer { 

    private readonly _httpClient = inject(HttpClient);

    register(body : any):Observable<RegisterResponse>{
        return this._httpClient.post<RegisterResponse>(environment.base_url + "/users/signup" , body) 
    }
    login(body : any):Observable<RegisterResponse>{
        return this._httpClient.post<RegisterResponse>(environment.base_url + "/users/signin" , body) 
    }
    

    

}
