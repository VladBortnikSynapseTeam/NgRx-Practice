import { Action, createReducer, on } from '@ngrx/store';
import { ToDoActions } from '../actions/todo.action';
import { generateGuid } from 'src/app/helpers/generate-guid';

export interface IToDoListItem {
    id: string;
    name: string,
    createdDate: Date,
    complete: boolean
};

export interface IToDo{
    toDoList: IToDoListItem[],
}

export const initialState: IToDo ={ 
    toDoList: [
        {id: generateGuid(), name: "Do something 1", createdDate: new Date(), complete: false},
        {id: generateGuid(), name: "Do something 2", createdDate: new Date(), complete: false}
    ]
};

const toDoReducer = createReducer(
    initialState,
    on(ToDoActions.createToDo, (state, { name }) => {
        const newTodos = {id: generateGuid(), name, createdDate: new Date(), complete: false}
        return {...state, toDoList: [...state.toDoList, newTodos]};
      }),
    on(ToDoActions.completeChange, (state, {id}) => {
        return {
            ...state,
            toDoList: state.toDoList.map(todo => todo.id === id ?{ ...todo, complete: !todo.complete } : todo)
        };
      }
    )
);

export function ToDoReducer(state: IToDo | undefined, action: Action) {
    return toDoReducer(state, action);
}