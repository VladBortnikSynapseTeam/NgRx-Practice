import { Action, createReducer, on } from '@ngrx/store';
import { ToDoActions } from '../actions/todo.action';



var ID_COUNTER = 2;

export interface IToDoListItem {
id: number;
name: string,
createdDate: Date,
complete: boolean
};
export interface IToDo{
    toDoList: IToDoListItem[],
}

export const initialState: IToDo ={ 
    toDoList: [
        {id:  0, name: "Do something 1", createdDate: new Date(), complete: false},
        {id:  1, name: "Do something 2", createdDate: new Date(), complete: false}
    ]
};

const toDoReducer = createReducer(
    initialState,
    on(ToDoActions.createToDo, (state, { name }) => {
        const newTodos = {id: ID_COUNTER, name, createdDate: new Date(), complete: false}
        ID_COUNTER++;
        return {...state,toDoList: [...state.toDoList , newTodos]};
      }),
    // on(ToDoActions.completeChange, (state, {id}) => {
    //     const updatedToDo: any = state.toDoList.map(
    //        todo => {
    //            if(todo.id == id){
    //                todo.complete = !todo.complete;
    //                return todo;
    //            }else{
    //                return todo;
    //            }
    //        }
    //     )
    //     return {...state, toDoList: updatedToDo}
    // })
    on(ToDoActions.completeChange, (state, {id}) => {
        return {
                      ...state,
                      toDoList: state.toDoList.map(todo =>
                          todo.id === id ?
                              { ...todo, complete: !todo.complete } :
                              todo
                          )
                  };
      }
    )
);
export function ToDoReducer(state: IToDo | undefined, action: Action) {
    return toDoReducer(state, action);
}
