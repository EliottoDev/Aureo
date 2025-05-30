import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent), 
    title: 'Aureo' 
  },
  { 
    path: 'dashboard', 
    redirectTo: '', 
    pathMatch: 'full' 
  },
  { 
    path: 'wallet', 
    loadComponent: () => import('./wallet/wallet.component').then(m => m.WalletComponent), 
    title: 'Wallet' 
  },
  { 
    path: 'inversions', 
    loadComponent: () => import('./inversions/inversions.component').then(m => m.InversionsComponent), 
    title: 'Inversions' 
  },
  { 
    path: 'notifications', 
    loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent), 
    title: 'Notifications' 
  },
  { 
    path: 'settings', 
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent), 
    title: 'Settings' 
  }
];
