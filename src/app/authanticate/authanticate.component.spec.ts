import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthanticateComponent } from './authanticate.component';

describe('AuthanticateComponent', () => {
  let component: AuthanticateComponent;
  let fixture: ComponentFixture<AuthanticateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthanticateComponent]
    });
    fixture = TestBed.createComponent(AuthanticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
