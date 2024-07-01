import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article.service';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  allArticle: IArticle[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getArticle();
  }

  getArticle() {
    this.articleService.getAllArticles().subscribe({
      next: (value) => {
        this.allArticle = (value as { articles: IArticle[] }).articles;
      }
    });
  }
}
