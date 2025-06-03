import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VersionService } from '../../services/version.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class AboutPage {
  version: string;

  constructor(private versionService: VersionService) {
    this.version = this.versionService.getFullVersion();
  }
}
