import { Component, inject, OnInit, signal } from '@angular/core';
import { NotificationsServer } from '../services/notifications.server';
import { Notification } from '../models/notifications.interface';
import { DatePipe } from '@angular/common';

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

  setFilter(isUnread: boolean) {
    this.flag = isUnread;
  }
  ngOnInit(): void {
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
