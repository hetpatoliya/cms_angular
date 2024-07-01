import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMedia } from 'src/app/shared/interfaces/media.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  url = 'http://localhost:3000/media/';

  constructor(private http: HttpClient) { }

  getMedia() {
    return this.http.get(this.url);
  }

  getMediaById(userId:string){
    return this.http.get(this.url + `${userId}`);
  }

  addMedia(media: FormData) {
    return this.http.post(this.url, media);
  }

  updateMedia(media: IMedia) {
    return this.http.put(this.url + `${media._id}`, media);
  }

  deleteMedia(mediaId: string) {
    return this.http.delete(this.url + `${mediaId}`);
  }
}
