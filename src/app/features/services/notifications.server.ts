import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { NotificationsResponse } from "../models/notifications.interface";

@Injectable({
  providedIn: 'root',
})
export class NotificationsServer {
    private readonly httpClient = inject(HttpClient);
    getAllNotifications():Observable<NotificationsResponse>{
        return this.httpClient.get<NotificationsResponse>(environment.base_url+"/notifications") ; 

    }
    makeAllasRead():Observable<any>{
        return this.httpClient.patch<any>(environment.base_url+"/notifications/read-all",{}) ; 
    }
    makeNotificationAsRead(notificationId:string):Observable<any>{
        return this.httpClient.patch<any>(environment.base_url+`/notifications/${notificationId}/read`,{}) ; 
    } 
    getUnreadCount():Observable<any>{
      return  this.httpClient.get(environment.base_url + "/notifications/unread-count")
    }
    
    
}
