import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const plat_ID = inject(PLATFORM_ID) ; 
  if(isPlatformBrowser(plat_ID)){
const token = localStorage.getItem('token');
  if(token) {
    return true;
  }else{
    return router.createUrlTree(['/login']);

  }
  }
  return true;
};
