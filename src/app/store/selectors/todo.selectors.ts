import { createFeatureSelector } from "@ngrx/store";
import { IToDo } from "../reducers/todo.reducer";

export namespace ToDoSelectors {
    export const state = createFeatureSelector<IToDo>('todo');
}