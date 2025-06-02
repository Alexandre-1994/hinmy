import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hymn } from '../interfaces/hymn.interface';

@Injectable({
  providedIn: 'root'
})
export class HymnService {
  private hymns: Hymn[] = [];
  private hymnsSubject = new BehaviorSubject<Hymn[]>([]);
  private normalizeString = (str: string) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  constructor(private http: HttpClient) {
    this.loadHymns();
  }

  getHymns(): Observable<Hymn[]> {
    return this.hymnsSubject.asObservable();
  }

  searchHymns(query: string): Observable<Hymn[]> {
    const normalizedQuery = this.normalizeString(query);
    
    const filteredHymns = this.hymns.filter(hymn => {
      // Normalize the title for better search
      const normalizedTitle = this.normalizeString(hymn.title);
      const numberStr = hymn.number.toString();
      
      // Check if it's a number search
      if (/^\d+$/.test(query)) {
        return numberStr.startsWith(query);
      }
      
      // Check title match
      return normalizedTitle.includes(normalizedQuery);
    });

    return new BehaviorSubject(filteredHymns).asObservable();
  }

  getHymnById(id: number): Hymn | undefined {
    return this.hymns.find(hymn => hymn.id === id);
  }

  private loadHymns() {
    this.http.get<Hymn[]>('assets/data/hymns.json').subscribe(hymns => {
      this.hymns = hymns;
      this.hymnsSubject.next(this.hymns);
    });
  }
}
  