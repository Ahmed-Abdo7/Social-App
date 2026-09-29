import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ProfileServer } from '../../../../../features/services/profile.server';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isDropdownOpen: boolean = false;
  private readonly router = inject(Router);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly profileService = inject(ProfileServer);

  // استخدام Signals بدلاً من متغيرات عادية
  unreadCount = signal<any>(0);
  photo = signal<string>('');

  constructor() {
    afterNextRender(() => {
      initFlowbite();
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.plat_id)) {
      this.unreadCount.set(localStorage.getItem('unreadCount') || 0);
      this.getPhoto();
    }
  }

  getPhoto() {
    this.profileService.getProfile().subscribe({
      next: (res) => {
        // تحديث الـ Signal فوراً ليتم تحديث الـ DOM تلقائياً
        this.photo.set(res.data.user.photo);
      },
      error: (err) => {
        console.error('Error fetching profile photo:', err);
      }
    });
  }

  removeToken() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
