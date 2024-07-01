import { Component, ElementRef, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';
import { IMedia } from 'src/app/shared/interfaces/media.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-media-a',
  templateUrl: './media-a.component.html',
  styleUrls: ['./media-a.component.scss']
})
export class MediaAComponent {

  allMedia: IMedia[] = [];
  imgMedia: IMedia[] = [];
  videoMedia: IMedia[] = [];
  @ViewChild('link') viewMedia!: ElementRef;

  constructor(private mediaService: MediaService) { }

  ngOnInit(): void {
    this.getAllMedia();
  }

  getAllMedia() {
    this.mediaService.getMedia().subscribe({
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
              this.getAllMedia();
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
}
