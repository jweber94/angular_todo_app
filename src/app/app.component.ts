import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo_list';

  todo_test = [
    {
      todo_key: 'programming',
      todo_status: false
    },
    {
      todo_key: 'cleaning',
      todo_status: true
    },
    { 
      todo_key: 'learning',
      todo_status: false
    }
  ];
}
