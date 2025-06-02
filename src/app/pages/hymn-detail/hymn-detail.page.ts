import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HymnService } from '../../services/hymn.service';
import { Hymn } from '../../interfaces/hymn.interface';

@Component({
  selector: 'app-hymn-detail',
  templateUrl: './hymn-detail.page.html',
  styleUrls: ['./hymn-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HymnDetailPage implements OnInit, OnDestroy {
  
  hymn?: Hymn;
  
  // ===== CONFIGURAÇÕES DE CONTROLE DE FONTE =====
  currentFontSize: number = 16;      // Tamanho padrão
  minFontSize: number = 12;          // Tamanho mínimo
  maxFontSize: number = 28;          // Tamanho máximo
  fontSizeStep: number = 2;          // Incremento/decremento
  
  // ===== FEEDBACK VISUAL =====
  showFontFeedback: boolean = false;
  fontFeedbackMessage: string = '';
  private feedbackTimeout: any;
  
  // ===== PERSISTÊNCIA =====
  private readonly FONT_SIZE_KEY = 'hymn-font-size';

  constructor(
    private route: ActivatedRoute,
    private hymnService: HymnService
  ) {}

  ngOnInit() {
    // Carregar tamanho de fonte salvo
    this.loadSavedFontSize();
    
    // Carregar hino
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hymn = this.hymnService.getHymnById(id);
  }

  ngOnDestroy() {
    // Limpar timeout se existir
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }
  }

  // ===== MÉTODOS DE CONTROLE DE FONTE =====

  /**
   * Aumenta o tamanho da fonte
   */
  increaseFontSize(): void {
    if (this.currentFontSize < this.maxFontSize) {
      this.currentFontSize += this.fontSizeStep;
      this.saveFontSize();
      this.showFontChangeFeedback(`Font: ${this.currentFontSize}px`);
      this.provideFeedback();
    }
  }

  /**
   * Diminui o tamanho da fonte
   */
  decreaseFontSize(): void {
    if (this.currentFontSize > this.minFontSize) {
      this.currentFontSize -= this.fontSizeStep;
      this.saveFontSize();
      this.showFontChangeFeedback(`Font: ${this.currentFontSize}px`);
      this.provideFeedback();
    }
  }

  /**
   * Reseta o tamanho da fonte para o padrão
   */
  resetFontSize(): void {
    this.currentFontSize = 16; // Tamanho padrão
    this.saveFontSize();
    this.showFontChangeFeedback('Reset font');
    this.provideFeedback();
  }

  // ===== MÉTODOS PRIVADOS =====

  /**
   * Mostra feedback visual temporário
   */
  private showFontChangeFeedback(message: string): void {
    this.fontFeedbackMessage = message;
    this.showFontFeedback = true;
    
    // Limpar timeout anterior se existir
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }
    
    // Esconder feedback após 2 segundos
    this.feedbackTimeout = setTimeout(() => {
      this.showFontFeedback = false;
    }, 2000);
  }

  /**
   * Fornece feedback tátil
   */
  private provideFeedback(): void {
    // Feedback tátil (vibração) se disponível
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  }

  /**
   * Salva o tamanho da fonte no localStorage
   */
  private saveFontSize(): void {
    try {
      localStorage.setItem(this.FONT_SIZE_KEY, this.currentFontSize.toString());
    } catch (error) {
      console.warn('Unable to save font size:', error);
    }
  }

  /**
   * Carrega o tamanho da fonte salvo do localStorage
   */
  private loadSavedFontSize(): void {
    try {
      const savedSize = localStorage.getItem(this.FONT_SIZE_KEY);
      if (savedSize) {
        const size = parseInt(savedSize, 10);
        // Verificar se o tamanho está dentro dos limites permitidos
        if (size >= this.minFontSize && size <= this.maxFontSize) {
          this.currentFontSize = size;
        }
      }
    } catch (error) {
      console.warn('The saved font size could not be loaded:', error);
      // Usar tamanho padrão em caso de erro
      this.currentFontSize = 16;
    }
  }

  // ===== MÉTODOS UTILITÁRIOS =====

  /**
   * Retorna uma descrição do tamanho atual da fonte
   */
  getFontSizeDescription(): string {
    const percentage = Math.round((this.currentFontSize / 16) * 100);
    
    if (percentage <= 75) return 'Very small';
    if (percentage <= 87) return 'Small';
    if (percentage === 100) return 'Normal';
    if (percentage <= 125) return 'Large';
    if (percentage <= 150) return 'Too Large';
    return 'Extra Large';
  }

  /**
   * Verifica se pode aumentar a fonte
   */
  canIncreaseFontSize(): boolean {
    return this.currentFontSize < this.maxFontSize;
  }

  /**
   * Verifica se pode diminuir a fonte
   */
  canDecreaseFontSize(): boolean {
    return this.currentFontSize > this.minFontSize;
  }

  /**
   * Retorna a porcentagem do tamanho atual em relação ao padrão
   */
  getFontSizePercentage(): number {
    return Math.round((this.currentFontSize / 16) * 100);
  }
}