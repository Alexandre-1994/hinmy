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
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule),
    data: { animation: 'splash' }  // ← Identificador para animação
  },
  {
    path: 'hymn-list',
    loadChildren: () => import('./pages/hymn-list/hymn-list.module').then(m => m.HymnListPageModule),
    // data: { animation: 'hymn-list' }  // ← Identificador para animação
  },
  {
    path: 'hymn-detail/:id',
    loadChildren: () => import('./pages/hymn-detail/hymn-detail.module').then(m => m.HymnDetailPageModule),
    // data: { animation: 'hymn-detail' }  // ← Identificador para animação
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about-routing.module').then(m => m.AboutPageRoutingModule),
    // data: { animation: 'about' }  // ← Identificador para animação
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,  // ← Desabilitar em produção para performance
      onSameUrlNavigation: 'reload'  // ← Comportamento para mesma URL
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }