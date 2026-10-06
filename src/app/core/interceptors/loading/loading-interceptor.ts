import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  if (activeRequests === 0) {
    spinner.show();
  }
  activeRequests++;

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests <= 0) {
        activeRequests = 0;
        spinner.hide();
      }
    })
  );
};

