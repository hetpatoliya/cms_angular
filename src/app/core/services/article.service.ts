import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticle } from 'src/app/shared/interfaces/article.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = 'http://localhost:3000/article/'
  constructor(private http: HttpClient) { }

  getAllArticles() {
    return this.http.get(this.url);
  }

  getArticleById(userId: string) {
    return this.http.get(this.url + `${userId}`);
  }

  addArticle(article: IArticle) {
    return this.http.post(this.url, article);
  }

  updateArticle(article: IArticle, articleId: string) {
    return this.http.put(this.url + `${articleId}`, article);
  }

  deleteArticle(articleId: string) {
    return this.http.delete(this.url + `${articleId}`);
  }
}
