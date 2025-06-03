import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HymnService } from '../../services/hymn.service';
import { Hymn } from '../../interfaces/hymn.interface';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hymn-list',
  templateUrl: './hymn-list.page.html',
  styleUrls: ['./hymn-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HymnListPage implements OnInit, OnDestroy {
  
  hymns: Hymn[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  isTransitioning: boolean = false;
  
  // Timing constants
  private readonly LOADING_DURATION = 300; // Tempo total do loading
  private readonly TRANSITION_DELAY = 50;  // Delay para animações suaves
  
  // Search Subjects
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  
  // ===== CONFIGURAÇÕES DE CONTROLE DE FONTE =====
  currentFontSize: number = 16;      // Tamanho padrão
  minFontSize: number = 12;          // Tamanho mínimo
  maxFontSize: number = 24;          // Tamanho máximo
  fontSizeStep: number = 2;          // Incremento/decremento
  
  // ===== FEEDBACK VISUAL =====
  showFontFeedback: boolean = false;
  fontFeedbackMessage: string = '';
  private feedbackTimeout: any;
  
  // ===== PERSISTÊNCIA =====
  private readonly FONT_SIZE_KEY = 'hymn-list-font-size';

  constructor(private hymnService: HymnService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.performSearch(searchTerm);
      });
  }

  ngOnInit() {
    this.loadSavedFontSize();
    this.loadHymns();
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
    
    if (this.feedbackTimeout) {
      clearTimeout(this.feedbackTimeout);
    }
  }

  private loadHymns() {
    this.isLoading = true;
    this.isTransitioning = true;
    
    this.hymnService.getHymns().subscribe({
      next: (hymns) => {
        const newHymns = hymns;
        
        // Primeiro timeout para o loading
        setTimeout(() => {
          this.isLoading = false;
          
          // Segundo timeout para a transição dos itens
          setTimeout(() => {
            this.hymns = newHymns;
            
            // Terceiro timeout para finalizar a transição
            setTimeout(() => {
              this.isTransitioning = false;
            }, this.TRANSITION_DELAY);
          }, this.TRANSITION_DELAY);
        }, this.LOADING_DURATION);
      },
      error: (error) => {
        console.error('Error loading hymns:', error);
        this.isLoading = false;
        this.isTransitioning = false;
      }
    });
  }

  // New search methods
  onSearchInput(event: any) {
    const term = event.target.value || '';
    this.searchSubject.next(term.trim());
  }

  private performSearch(term: string) {
    if (!term.trim()) {
      this.loadHymns();
      return;
    }

    this.isLoading = true;
    this.isTransitioning = true;
    
    this.hymnService.searchHymns(term).subscribe({
      next: (hymns) => {
        const newHymns = hymns;
        
        // Primeiro timeout para o loading
        setTimeout(() => {
          this.isLoading = false;
          
          // Segundo timeout para a transição dos itens
          setTimeout(() => {
            this.hymns = newHymns;
            
            // Terceiro timeout para finalizar a transição
            setTimeout(() => {
              this.isTransitioning = false;
            }, this.TRANSITION_DELAY);
          }, this.TRANSITION_DELAY);
        }, this.LOADING_DURATION);
      },
      error: (error) => {
        console.error('Error searching hymns:', error);
        this.isLoading = false;
        this.isTransitioning = false;
      }
    });
  }

  shouldShowEmptyState(): boolean {
    return !this.isLoading && !this.isTransitioning && this.hymns.length === 0;
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

  // Track by function for better performance
  trackByHymnId(index: number, hymn: Hymn): number {
    return hymn.id;
  }

  // ===== MÉTODOS PRIVADOS DE FONTE =====

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
    
    if (percentage <= 75) return 'Small';
    if (percentage === 100) return 'Normal';
    if (percentage <= 125) return 'Large';
    return 'Too Large';
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

  // ===== MÉTODOS DE NAVEGAÇÃO =====

  /**
   * Navega para detalhes do hino (pode adicionar animações aqui)
   */
  navigateToHymn(hymnId: number, event: Event): void {
    // Se quiser adicionar animações específicas antes da navegação
    // const itemEl = (event.target as HTMLElement).closest('ion-item');
    // Adicionar lógica de animação aqui se necessário
  }
}