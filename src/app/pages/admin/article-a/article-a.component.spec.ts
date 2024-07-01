import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAComponent } from './article-a.component';

describe('ArticleAComponent', () => {
  let component: ArticleAComponent;
  let fixture: ComponentFixture<ArticleAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleAComponent]
    });
    fixture = TestBed.createComponent(ArticleAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
