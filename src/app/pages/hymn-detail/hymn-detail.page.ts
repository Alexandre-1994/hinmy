import { Component, OnInit } from '@angular/core';
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
export class HymnDetailPage implements OnInit {
  hymn?: Hymn;

  constructor(
    private route: ActivatedRoute,
    private hymnService: HymnService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hymn = this.hymnService.getHymnById(id);
  }
}
