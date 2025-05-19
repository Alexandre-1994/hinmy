import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HymnListPage } from './hymn-list.page';

describe('HymnListPage', () => {
  let component: HymnListPage;
  let fixture: ComponentFixture<HymnListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HymnListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
