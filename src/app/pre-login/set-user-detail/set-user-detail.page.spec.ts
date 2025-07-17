import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetUserDetailPage } from './set-user-detail.page';

describe('SetUserDetailPage', () => {
  let component: SetUserDetailPage;
  let fixture: ComponentFixture<SetUserDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SetUserDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
