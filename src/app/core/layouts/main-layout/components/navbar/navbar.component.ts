import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  private readonly router = inject(Router)
  private readonly plat_id = inject(PLATFORM_ID);

  unreadCount: any = 0;
  constructor() {
    afterNextRender(() => {
      initFlowbite(); // يعمل بأمان بعد انتهاء الهيدريشن تماماً
    });
    if (isPlatformBrowser(this.plat_id)) {
     this.unreadCount = localStorage.getItem('unreadCount')
    }
  }
  
  removeToken() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
