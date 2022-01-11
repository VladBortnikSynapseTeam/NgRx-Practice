import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToDoActions } from '../store/actions/todo.action';
import { IToDo, IToDoListItem } from '../store/reducers/todo.reducer';
import { ToDoSelectors } from '../store/selectors/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  toDoItems$: Observable<IToDo>; 
  toDoGroup: FormGroup = new FormGroup({
    toDoTitle: new FormControl('')
  });
  constructor(private $store: Store) { 
   this.toDoItems$ = this.$store.select(ToDoSelectors.state);
  }
  ngOnInit(): void {
    this.$store.select(ToDoSelectors.state).subscribe(data => console.log(data))
  } 
  addToDo(title: string){
    this.$store.dispatch(ToDoActions.createToDo({name: title }))
  }
  doneChange(id: number){
   this.$store.dispatch(ToDoActions.completeChange({id: id}))
  }
}
