import {Component, OnInit, ViewChild} from '@angular/core'
import {LoggingService} from './logging.service'

export class AppModule {}

// needs to be defined to initialize a valid todo_test array with the correct datatype
interface ITodoElement {
  todo_key: string
  todo_status: boolean
}
// Also this makes our todo data more explicit, since we could not add furter attributes on any part of our application (which would be possible if we do not define the interface)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  @ViewChild('entry') inputEntry: any // accessing the reference element

  constructor(private logger: LoggingService) {}

  inputTextModel: string = ''

  logging(msg: string) {
    this.logger.Log(msg)
  }

  ngOnInit(): void {
    const data = localStorage.getItem('todoApp_todos')
    if (data !== '' && data != null) {
      this.todo_test = JSON.parse(data)
    }
  }

  title = 'todo_list'

  // This is only the name of the inputed element - it needs to be emplaced into the data array with the correct datastructure
  add_todo_str: string = ''

  todo_test: ITodoElement[] = []

  storeToDos(): void {
    localStorage.setItem('todoApp_todos', JSON.stringify(this.todo_test))
    this.logging('Stored ToDos')
  }

  changeToDoStatus(idx: number): void {
    this.todo_test[idx].todo_status = !this.todo_test[idx].todo_status
    this.storeToDos() // save the current todo list status

    this.logging(
      'Changed status of ' +
        this.todo_test[idx].todo_key +
        ' to ' +
        this.todo_test[idx].todo_status
    )
  }

  deleteToDo(idx: number): void {
    this.logging('Deleteing todo ' + this.todo_test[idx].todo_key)
    this.todo_test.splice(idx, 1)
    this.storeToDos()
  }

  setToDo(event: KeyboardEvent): void {
    this.add_todo_str = (event.target as HTMLInputElement).value
  }

  appendToTodo(todoElem: string): void {
    if (todoElem === '') {
      return
    }
    this.todo_test.push({todo_key: todoElem, todo_status: false})
    this.storeToDos() // save the current todo list status
    this.logging('Added todo ' + todoElem)
  }

  getNumOpenTodos() {
    const undone_todos = this.todo_test.filter((item) => {
      return !item.todo_status
    })
    return undone_todos.length
  }

  resetAll(): void {
    this.todo_test.splice(0, this.todo_test.length)
    this.storeToDos() // save the current todo list status
  }

  clearEntry(): void {
    this.inputEntry.nativeElement.value = ''
    this.add_todo_str = ''
  }
}
