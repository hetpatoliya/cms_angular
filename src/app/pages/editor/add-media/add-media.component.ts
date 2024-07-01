import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from 'src/app/core/services/media.service';
import { IMedia } from 'src/app/shared/interfaces/media.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  allMedia: IMedia[] = [];
  mediaForm!: FormGroup;
  submitted = false;
  selectedFile!: File;
  mediaId = '';
  imgMedia: IMedia[] = [];
  videoMedia: IMedia[] = [];
  @ViewChild('link') viewMedia!: ElementRef;
  url!: any;
  format!: string;
  @ViewChild('closeBtn') closeBtn!: ElementRef;
  user: IUser = JSON.parse(sessionStorage.getItem('user') as string);
  userId = this.user._id;

  constructor(private mediaService: MediaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.mediaForm = this.fb.group({
      title: ['', Validators.required],
      type: ['media'],
      description: ['', Validators.required],
      file: [null, Validators.required]
    });
    this.getMediaById();
  }

  getMediaById() {
    this.mediaService.getMediaById(this.userId).subscribe({
      next: (value) => {
        this.allMedia = (value as { media: IMedia[] }).media;
        this.allMedia.forEach((media) => {
          let extension = media.url.split('.')[1];
          if (extension === 'jpeg' || extension === 'jpg' || extension === 'png' || extension === 'gif') {
            this.imgMedia.push(media);
          }
          else {
            this.videoMedia.push(media);
          }
        })
      }
    });
  }

  submitMedia() {
    this.submitted = true;

    if (this.mediaForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('title', this.mediaForm.controls['title'].value);
    formData.append('type', this.mediaForm.controls['type'].value);
    formData.append('description', this.mediaForm.controls['description'].value);
    formData.append('file', this.selectedFile, this.selectedFile.name);
    this.mediaService.addMedia(formData).subscribe({
      next: (value) => {
        Swal.fire({
          icon: 'success',
          title: 'Media uploaded successfully!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.getMediaById();
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

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      var reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      if (this.selectedFile.type.indexOf('image') > -1) {
        this.format = 'image';
      } else if (this.selectedFile.type.indexOf('video') > -1) {
        this.format = 'video';
      }
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
      }
    }
  }

  editMedia(media: IMedia) {

  }


  deleteMedia(media: IMedia) {
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
        this.mediaService.deleteMedia(media._id).subscribe({
          next: (value) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your article has been deleted.",
              icon: "success"
            }).then(() => {
              this.getMediaById();
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

  openMedia(link: string) {
    this.viewMedia.nativeElement.href = link;
    this.viewMedia.nativeElement.click();
  }

  onReset() {
    this.submitted = false;
    this.mediaForm.reset();
    this.closeBtn.nativeElement.click();
    this.url = undefined;
    this.mediaForm.controls['type'].setValue('media');
  }
}