import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { HymnListPageRoutingModule } from './hymn-list-routing.module';

@NgModule({
  imports: [
    IonicModule,
    RouterModule,
    HymnListPageRoutingModule
  ]
})
export class HymnListPageModule {}
