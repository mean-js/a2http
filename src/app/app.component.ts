import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'DACBOOK';
  public postLabel: string = 'Heyy, Watsapp...'; 
  public post: string = '';

  public postItemList: any[] = [];

  constructor(private domSanitizer: DomSanitizer) {
  }

  public postContent(): void {
    const newPost = {'post' : this.post, 'type': 'text'};
    this.postItemList.push(newPost);

    this.post = '';
  }


  public postImage(fileRef): void {
    try {
      const currentFile = fileRef.files[0];
      const srcUrl =  URL.createObjectURL(currentFile);
      const src =  this.domSanitizer.bypassSecurityTrustResourceUrl(srcUrl);

      const newPost = {'type': 'image', 'src': src};
      this.postItemList.push(newPost);
    } catch (err) {
      console.log(err);
    }
  }

  public postVideo(fileRef): void {
    try {
      const currentFile = fileRef.files[0];
      const srcUrl =  URL.createObjectURL(currentFile);
      const src =  this.domSanitizer.bypassSecurityTrustResourceUrl(srcUrl);

      const newPost = {'type': 'video', 'src': src};
      this.postItemList.push(newPost);
    } catch (err) {
      console.log(err);
    }
  }
}
