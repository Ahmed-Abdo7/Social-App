import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NotificationsServer } from '../services/notifications.server';
import { Notification } from '../models/notifications.interface';
import { DatePipe, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit{
    private readonly notificationsServer = inject(NotificationsServer);

 // false = All, true = Unread
  flag: boolean = false; 
  private readonly plat_id = inject(PLATFORM_ID) ; 

  setFilter(isUnread: boolean) {
    this.flag = isUnread;
  }
  ngOnInit(): void {
    if(isPlatformBrowser(this.plat_id)){
      localStorage.removeItem('unreadCount');
    }
    this.getAllNotifications();
  }
  notifications = signal<Notification[]>([]);

  getAllNotifications(){
    this.notificationsServer.getAllNotifications().subscribe({
      next:(res:any)=>{
        this.notifications.set(res.data.notifications);
      }
    })

  }
  makeAllasRead(){
    this.notificationsServer.makeAllasRead().subscribe({
      next:(res:any)=>{
        this.getAllNotifications();
      }
    })
    
  }
makeNotificationAsRead(notificationId:string){
  this.notificationsServer.makeNotificationAsRead(notificationId).subscribe({
    next:(res:any)=>{
      this.getAllNotifications();
    }
  })
}
  
}
