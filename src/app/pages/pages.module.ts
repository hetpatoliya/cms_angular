import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { AdminComponent } from './admin/admin.component';
import { ViewerComponent } from './viewer/viewer.component';
import { EditorComponent } from './editor/editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { AddMediaComponent } from './editor/add-media/add-media.component';
import { ArticleComponentE } from './editor/article/article.component';
import { MediaComponent } from './viewer/media/media.component';
import { ArticleComponent } from './viewer/article/article.component';
import { ChartModule } from 'primeng/chart';
import { MediaAComponent } from './admin/media-a/media-a.component';
import { ArticleAComponent } from './admin/article-a/article-a.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';


@NgModule({
  declarations: [
    PagesComponent,
    AdminComponent,
    ViewerComponent,
    EditorComponent,
    AddMediaComponent,
    ArticleComponentE,
    MediaComponent,
    ArticleComponent,
    MediaAComponent,
    ArticleAComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    EditorModule,
    ChartModule
  ]
})
  export class PagesModule { }
