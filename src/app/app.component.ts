import { Component } from '@angular/core';

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

  postContent() {
    const newPost = {'post' : this.post, 'type': 'text'};
    this.postItemList.push(newPost);
    
    this.post = '';
  }
}
