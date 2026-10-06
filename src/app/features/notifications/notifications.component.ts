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
export class NotificationsComponent implements OnInit {
  private readonly notificationsServer = inject(NotificationsServer);
  private readonly plat_id = inject(PLATFORM_ID);

  // false = All, true = Unread
  flag: boolean = false;
  notifications = signal<Notification[]>([]);

  setFilter(isUnread: boolean) {
    this.flag = isUnread;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      localStorage.removeItem('unreadCount');
      this.getAllNotifications();
    }
  }

  getAllNotifications() {
    this.notificationsServer.getAllNotifications().subscribe({
      next: (res: any) => {
        this.notifications.set(res?.data?.notifications || []);
      },
      error: (err) => {
        console.error('Error fetching notifications:', err);
      }
    });
  }

  makeAllasRead() {
    this.notificationsServer.makeAllasRead().subscribe({
      next: () => {
        this.notifications.update((list) =>
          list.map((n) => ({ ...n, isRead: true }))
        );
      },
      error: (err) => {
        console.error('Error marking all as read:', err);
      }
    });
  }

  makeNotificationAsRead(notificationId: string) {
    this.notificationsServer.makeNotificationAsRead(notificationId).subscribe({
      next: () => {
        this.notifications.update((list) =>
          list.map((n) =>
            n._id === notificationId ? { ...n, isRead: true } : n
          )
        );
      },
      error: (err) => {
        console.error('Error marking notification as read:', err);
      }
    });
  }

  getNotificationText(noti: Notification): string {
    switch (noti.type) {
      case 'like_post':
        return 'liked your post';
      case 'comment_post':
        return 'commented on your post';
      case 'follow_user':
        return 'started following you';
      case 'share_post':
        return 'shared your post';
      default:
        return noti.type ? noti.type.replace(/_/g, ' ') : 'interacted with you';
    }
  }
}
