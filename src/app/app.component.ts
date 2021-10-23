import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
 
  blogTitle = '';

  blogPost = '';

  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.fetchData();
  }


  onSubmit(data) {
    this.http.post('https://todo-firebase-angular-default-rtdb.firebaseio.com/posts.json', data)
    .subscribe(response => {
      console.log(response);
    })
  }

  fetchData() {
    this.http.get('https://todo-firebase-angular-default-rtdb.firebaseio.com/posts.json').pipe()
    .subscribe(posts => {
      console.log(posts)
    })
  }
}
