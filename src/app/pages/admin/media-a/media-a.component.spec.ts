import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAComponent } from './media-a.component';

describe('MediaAComponent', () => {
  let component: MediaAComponent;
  let fixture: ComponentFixture<MediaAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MediaAComponent]
    });
    fixture = TestBed.createComponent(MediaAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
