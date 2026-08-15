import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorsInterceptor } from './core/interceptors/errors/error-interceptor';
import { headerInterceptor } from './core/interceptors/headers/header-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideToastr(),
    provideHttpClient(withFetch(), withInterceptors([errorsInterceptor, headerInterceptor, loadingInterceptor])),
    NgxSpinnerModule , 
  ]
};
