import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule) },
  { path: '**', redirectTo: '' }  // Przekierowanie na stronę główną, jeśli ścieżka jest nieprawidłowa
];
