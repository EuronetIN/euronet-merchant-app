import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-page',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./pre-login/signin/signin.page').then((m) => m.SigninPage),
  },
  {
    path: 'virtual-numeric-keyboard',
    loadComponent: () =>
      import(
        './shared/virtual-numeric-keyboard/virtual-numeric-keyboard.page'
      ).then((m) => m.VirtualNumericKeyboardPage),
  },
  // {
  //   path: 'validate-number',
  //   loadComponent: () => import('./validate-number/validate-number.page').then( m => m.ValidateNumberPage)
  // },
  {
    path: 'validate-number',
    loadComponent: () =>
      import('./pre-login/validate-number/validate-number.page').then(
        (m) => m.ValidateNumberPage
      ),
  },
  {
    path: 'verify-otp',
    loadComponent: () =>
      import('./shared/verify-otp/verify-otp.page').then(
        (m) => m.VerifyOtpPage
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'set-user-detail',
    loadComponent: () =>
      import('./pre-login/set-user-detail/set-user-detail.page').then(
        (m) => m.SetUserDetailPage
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pre-login/register/register.page').then((m) => m.RegisterPage),
  },
];
