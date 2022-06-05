import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  // Members of the ToDoComponent class
  @Input() todo_data = { // javascript object
    todo_key: "",
    todo_status: false
  }

  @Input() calling_index = 0; // on default it is the element zero

  // constructor
  constructor() {
    
  }

  // class methods
  ngOnInit(): void {
  }

}
