import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class SplashPage implements OnInit, OnDestroy {

  progressText: string = 'Loading hymns...';
  private textInterval: any;
  private redirectTimeout: any;
  
  // Textos mais rápidos para 5 segundos
  private loadingTexts: string[] = [
    'Loading hymns...',
    'Preparing songs...',
    'Almost ready...',
    'Welcome to worship!'
  ];
  constructor(private router: Router) { }

  ngOnInit() {
    this.startProgressTextCycle();
    this.startRedirectTimer();
  }

  ngOnDestroy() {
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
  }

  private startProgressTextCycle() {
    let textIndex = 0;
    
    // Muda o texto a cada 1.25 segundos (5s / 4 textos = 1.25s cada)
    this.textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % this.loadingTexts.length;
      this.progressText = this.loadingTexts[textIndex];
    }, 1250); // 1.25 segundos
  }

  private startRedirectTimer() {
    // Redireciona após 5 segundos
    this.redirectTimeout = setTimeout(() => {
      this.router.navigate(['/hymn-list']);
    }, 50000); // ← MUDANÇA AQUI: 5 segundos
  }

  skipSplash() {
    if (this.redirectTimeout) {
      clearTimeout(this.redirectTimeout);
    }
    if (this.textInterval) {
      clearInterval(this.textInterval);
    }
    this.router.navigate(['/hymn-list']);
  }
}
