import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualNumericKeyboardPage } from './virtual-numeric-keyboard.page';

describe('VirtualNumericKeyboardPage', () => {
  let component: VirtualNumericKeyboardPage;
  let fixture: ComponentFixture<VirtualNumericKeyboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualNumericKeyboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
