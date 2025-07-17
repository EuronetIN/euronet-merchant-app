import { Routes } from '@angular/router';
import { DashboardPage } from './dashboard.page';

export const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../dashboard/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: 'transaction-history',
        loadComponent: () =>
          import('./transaction-history/transaction-history.page').then(
            (m) => m.TransactionHistoryPage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
