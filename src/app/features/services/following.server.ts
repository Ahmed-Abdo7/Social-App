import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FollowingResponse } from '../models/following.interface';
import { UserfollowResponse } from '../models/userfollow.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowingServer {
    private readonly httpClient = inject(HttpClient) ; 
    getSuggestions():Observable<FollowingResponse>{
        return this.httpClient.get<FollowingResponse>(environment.base_url +  '/users/suggestions') ; 
}
    followUser(userId:string):Observable<UserfollowResponse>{ 
      return this.httpClient.put<UserfollowResponse>(environment.base_url +`/users/${userId}/follow` , null) ; 
    }
        
}
