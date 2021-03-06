import { Component, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ],
  animations: [
    trigger('fade',[
      transition('void => *', style({opacity: 0})),
      animate(2000)
    ])
  ]
})
export class AppComponent implements OnInit  {
 
  blogTitle = '';

  show: boolean = false;
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
    this.http.get('https://todo-firebase-angular-default-rtdb.firebaseio.com/posts.json').pipe(map(responseData => {
    const postArray = [];
    for(const key in responseData) {
      postArray.push({...responseData[key], id: key})
    }
    postArray.push({blogTitle: 'Defly', blogPost: 'I pushed this in on the fly men!', id: 'DealWithIt' })
    return postArray
  })
    )
    .subscribe(posts => {
      console.log(posts)
    })
  }
}
