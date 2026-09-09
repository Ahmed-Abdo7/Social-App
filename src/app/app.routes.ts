import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { guestGuard } from './core/guards/guest-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [guestGuard],
        children: [
            {
                path: 'login',
                loadComponent: () => import('./core/auth/components/login/login.component').then(m => m.LoginComponent),
                title : 'Login'
            },
            {
                path: 'sign-up',
                loadComponent: () => import('./core/auth/components/register/register.component').then(m => m.RegisterComponent), 
                title : 'Register'
            }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'feed',
                loadComponent: () => import('./features/feed/feed.component').then(m => m.FeedComponent) ,
                title : 'Feed'
            } , 
            {
                path : 'profile',
                loadComponent : () => import('./features/profile/profile.component').then(m => m.ProfileComponent) ,
                title : 'Profile'
            },
            {
                path : 'notifications',
                loadComponent : () => import('./features/notifications/notifications.component').then(m => m.NotificationsComponent) ,
                title : 'Notifications'
            },
            {
                path : 'change-password',
                loadComponent : () => import('./features/change-password/change-password.component').then(m => m.ChangePasswordComponent) ,
                title : 'Change Password'
            }
        ]
    }
    , {
        path: '**',
        loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) , 
        title : 'Not Found'
    }
];
