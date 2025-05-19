import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HymnService } from '../../services/hymn.service';
import { Hymn } from '../../interfaces/hymn.interface';

@Component({
  selector: 'app-hymn-list',
  templateUrl: './hymn-list.page.html',
  styleUrls: ['./hymn-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HymnListPage implements OnInit {
  hymns: Hymn[] = [];
  searchTerm: string = '';

  constructor(private hymnService: HymnService) { }

  ngOnInit() {
    this.hymnService.getHymns().subscribe(hymns => {
      this.hymns = hymns;
    });
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.hymnService.searchHymns(this.searchTerm).subscribe(hymns => {
        this.hymns = hymns;
      });
    } else {
      this.hymnService.getHymns().subscribe(hymns => {
        this.hymns = hymns;
      });
    }
  }
}
