import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpClient} from '@angular/common/http';


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

  private domSanitizer: DomSanitizer;
  private http: HttpClient;
  constructor(domSanitizer: DomSanitizer, http: HttpClient) {
    this.domSanitizer = domSanitizer;
    this.http = http;
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

      this.postImage2Server(currentFile);
    } catch (err) {
      console.log(err);
    }
  }

  public postImage2Server(currentFile) {
    try {
        const url = 'http://localhost:3006/upload/imgpost';
        const formData = new FormData();
        formData.append('imgpost', currentFile, currentFile.name);


        // OPTION-1
        this.http.post(url, formData).subscribe((data) => {
          console.log(data);
        });

        this.http.post(url, formData).subscribe(function(data) {
          console.log(data);
        });

        // OPTION-2
        this.http.post(url, formData).subscribe(
          (data) => {
            console.log(data);
          },

          (err) => {
            console.log('OPTION2 ADV', err);
          }
        );

        this.http.post(url, formData).subscribe(function(data) {
            console.log(data);
        }, function(err) {
            console.log('OPtion2 Old', err);
        });


        // OPTION-3
        this.http.post(url, formData).subscribe({
          next(data) {
            console.log(data);
          },

          error(err) {
            console.log(err);
          }
        });
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
