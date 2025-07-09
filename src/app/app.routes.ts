import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
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
];
