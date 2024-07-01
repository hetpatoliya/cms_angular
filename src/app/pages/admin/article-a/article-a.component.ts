import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article.service';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-a',
  templateUrl: './article-a.component.html',
  styleUrls: ['./article-a.component.scss']
})
export class ArticleAComponent implements OnInit{

  allArticle: IArticle[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.getAllArticles();
  }

  getAllArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (value) => {
        this.allArticle = (value as { articles: IArticle[] }).articles;
      }
    });
  }

  deleteArticle(article: IArticle) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(article._id).subscribe({
          next: (value) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your article has been deleted.",
              icon: "success"
            }).then(() => {
              this.getAllArticles();
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops..',
              text: `${err}`
            });
          },
        })
      }
    });
  }
}