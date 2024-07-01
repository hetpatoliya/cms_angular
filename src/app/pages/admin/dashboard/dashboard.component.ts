import { Component } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';
import { IMedia } from 'src/app/shared/interfaces/media.interface';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { ArticleService } from 'src/app/core/services/article.service';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  allMedia: IMedia[] = [];
  allArticle: IArticle[] = [];
  allUsers: IUser[] = [];
  viewers: IUser[] = [];
  editors: IUser[] = [];
  admin: IUser[] = [];

  constructor(private mediaService: MediaService, private articleService: ArticleService, private userService: UserService) { }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (value) => {
        this.allUsers = (value as { users: IUser[] }).users;
        this.allUsers.forEach((user) => {
          if (user.role == 'viewer') {
            this.viewers.push(user);
          }
          else if (user.role == 'editor') {
            this.editors.push(user);
          }
          else {
            this.admin.push(user);
          }
        })
      },
    })
  }

  getMedia() {
    this.mediaService.getMedia().subscribe({
      next: (value) => {
        this.allMedia = (value as { media: IMedia[] }).media;
        this.getArticles();
      }
    });
  }

  getArticles() {
    this.articleService.getAllArticles().subscribe({
      next: (value) => {
        this.allArticle = (value as { articles: IArticle[] }).articles;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        this.data = {
          labels: ['Media', 'Article'],
          datasets: [
            {
              data: [this.allMedia.length, this.allArticle.length],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
          ]
        };

        this.options = {
          cutout: '60%',
          plugins: {
            legend: {
              labels: {
                color: textColor
              }
            }
          }
        };
      },
    })
  }

  data: any;
  options: any;

  ngOnInit() {
    this.getMedia();
    this.getAllUsers();
  }

}
