import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ProfileResponse } from '../models/profile.interface';
import { profilePost } from '../models/profile-posts.interface';


@Injectable({
  providedIn: 'root',
})
export class ProfileServer {
    private readonly httpClient =inject(HttpClient);

    getProfile():Observable<ProfileResponse>{
        return this.httpClient.get<ProfileResponse>(environment.base_url+ "/users/profile-data") ;
    }
      
    getMyPosts(userId:string):Observable<profilePost[]>{
        return this.httpClient.get<profilePost[]>(environment.base_url+ `/users/${userId}/posts`) ;
    }

    getSavedPosts():Observable<any>{
        return this.httpClient.get<any>(environment.base_url+ "/users/bookmarks");
    }
    updateProfilePhoto(photo:any):Observable<any>{
        return this.httpClient.put<any>(environment.base_url+ "/users/upload-photo",photo);
    }
}

