import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);
  
  return next(req).pipe(catchError((error) => {
    if (isPlatformBrowser(platformId)) {
      toastr.error(error.error?.message, 'Social Media App');
    }
    return throwError(() => error);
  }));
};
