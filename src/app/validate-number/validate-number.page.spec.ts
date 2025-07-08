import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateNumberPage } from './validate-number.page';

describe('ValidateNumberPage', () => {
  let component: ValidateNumberPage;
  let fixture: ComponentFixture<ValidateNumberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
