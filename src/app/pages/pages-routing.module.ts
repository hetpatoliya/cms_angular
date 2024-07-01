import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AddMediaComponent } from './editor/add-media/add-media.component';
import { ArticleComponentE } from './editor/article/article.component';
import { MediaComponent } from './viewer/media/media.component';
import { ArticleComponent } from './viewer/article/article.component';
import { MediaAComponent } from './admin/media-a/media-a.component';
import { ArticleAComponent } from './admin/article-a/article-a.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  },
  {
    path: 'editor',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'media',
        component: AddMediaComponent
      },
      {
        path: 'article',
        component: ArticleComponentE
      }
    ]
  },
  {
    path: 'viewer',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'media',
        component: MediaComponent
      },
      {
        path: 'article',
        component: ArticleComponent
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'media',
        component: MediaAComponent
      },
      {
        path: 'article',
        component: ArticleAComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
