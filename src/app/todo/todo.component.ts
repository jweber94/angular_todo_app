import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  // Members of the ToDoComponent class
  @Input() todo_data = {
    // javascript object
    todo_key: '',
    todo_status: false,
  }

  @Input() calling_index = 0 // on default it is the element zero

  @Output() todoIndex = new EventEmitter<number>() // we want to send a number back to the caller
  @Output() todoIndexDelete = new EventEmitter<number>()

  // constructor
  constructor() {}

  // class methods
  ngOnInit(): void {}

  getIndexForStatusChange(): void {
    // change status of the data that we have received from the calling app.component.ts
    this.todoIndex.emit(this.calling_index)
  }

  getIndexForDeletion(): void {
    this.todoIndexDelete.emit(this.calling_index)
  }
}
