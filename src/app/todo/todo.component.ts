import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDoActions } from '../store/actions/todo.action';
import { IToDo } from '../store/reducers/todo.reducer';
import { ToDoSelectors } from '../store/selectors/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  toDoItems$: Observable<IToDo>; 
  toDoGroup: FormGroup = new FormGroup({
    toDoTitle: new FormControl('')
  });

  constructor(private $store: Store) { 
    this.toDoItems$ = this.$store.select(ToDoSelectors.state);
  }

  addToDo() {
    if(this.toDoGroup.value.toDoTitle) {
      this.$store.dispatch(ToDoActions.createToDo({ name: this.toDoGroup.value.toDoTitle }))
    }
  }

  doneChange(id: string) {
    this.$store.dispatch(ToDoActions.completeChange({id}))
  }
}
