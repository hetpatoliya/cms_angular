import { Component, ElementRef, ViewChild } from '@angular/core';
import { MediaService } from 'src/app/core/services/media.service';
import { IMedia } from 'src/app/shared/interfaces/media.interface';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {

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

  openMedia(link: string) {
    this.viewMedia.nativeElement.href = link;
    this.viewMedia.nativeElement.click();
  }
}
