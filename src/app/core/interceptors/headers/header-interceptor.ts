import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const plat_id = inject(PLATFORM_ID);
  if(isPlatformBrowser(plat_id)){
   
  const token = localStorage.getItem('token');

  if (token) {
    if(req.url.includes('posts') || req.url.includes('comments') || req.url.includes('notifications') || req.url.includes('users/suggestions') || req.url.includes('posts/') || req.url.includes('users') || req.url.includes('users/bookmarks')|| req.url.includes('users/change-password') ) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token: token,
      },
    });
  }
}
  }
  return next(req);
};

