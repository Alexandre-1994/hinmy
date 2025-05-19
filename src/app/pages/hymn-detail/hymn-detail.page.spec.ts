import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HymnDetailPage } from './hymn-detail.page';

describe('HymnDetailPage', () => {
  let component: HymnDetailPage;
  let fixture: ComponentFixture<HymnDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HymnDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
