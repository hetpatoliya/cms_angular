import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/core/services/article.service';
import { IArticle } from 'src/app/shared/interfaces/article.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponentE {
  allArticle: IArticle[] = [];
  articleForm!: FormGroup;
  submitted = false;
  data: string = 'dfdf';
  editMode = false;
  articleId = '';
  user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
  userId = this.user._id;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  @ViewChild('openBtn') openBtn!: ElementRef;
  @ViewChild('editor') editor!: any;

  constructor(private articleService: ArticleService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      type: ['article'],
      body: ['', Validators.required]
    });
    this.getArticleById();
  }

  getArticleById() {
    this.articleService.getArticleById(this.userId).subscribe({
      next: (value) => {
        this.allArticle = (value as { articles: IArticle[] }).articles;
      }
    });
  }

  submitMedia() {
    this.submitted = true;

    if (this.articleForm.invalid) {
      return;
    }
    if (this.editMode) {
      this.articleService.updateArticle(this.articleForm.value, this.articleId).subscribe({
        next: (value) => {
          Swal.fire({
            icon: 'success',
            title: 'Article updated successfully!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.getArticleById();
            this.onReset();
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
      return;
    }
    this.articleService.addArticle(this.articleForm.value).subscribe({
      next: (value) => {
        Swal.fire({
          icon: 'success',
          title: 'Article added successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.getArticleById();
          this.onReset();
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops..',
          text: `${err}`
        });
      },
    });
  }

  editArticle(article: IArticle) {
    this.openBtn.nativeElement.click();
    this.editMode = true;
    this.articleForm.patchValue(article);
    const editorElement: HTMLElement = this.editor.el.nativeElement.children[0].children[1].children[0].children[0]; // Adjust based on p-editor component structure
    editorElement.innerHTML = article.body;
    this.articleId = article._id;
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
              this.getArticleById();
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

  onReset() {
    this.submitted = false;
    this.articleId = '';
    this.editMode = false;
    this.articleForm.reset();
    this.closeBtn.nativeElement.click();
    this.articleForm.controls['type'].setValue('article');
  }
}
