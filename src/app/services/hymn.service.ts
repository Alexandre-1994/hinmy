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

  constructor(private http: HttpClient) {
    this.loadHymns();
  }

  getHymns(): Observable<Hymn[]> {
    return this.hymnsSubject.asObservable();
  }

  searchHymns(query: string): Observable<Hymn[]> {
    const filteredHymns = this.hymns.filter(hymn => 
      hymn.title.toLowerCase().includes(query.toLowerCase()) ||
      hymn.number.toString().includes(query.toString())
    );
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
  