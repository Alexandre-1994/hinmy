import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'hymn-list',
    loadChildren: () => import('./pages/hymn-list/hymn-list.module').then(m => m.HymnListPageModule)
  },
  {
    path: 'hymn-detail/:id',
    loadChildren: () => import('./pages/hymn-detail/hymn-detail.module').then(m => m.HymnDetailPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about-routing.module').then(m => m.AboutPageRoutingModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
