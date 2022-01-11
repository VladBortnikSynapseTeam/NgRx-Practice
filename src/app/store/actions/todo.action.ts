import { createAction, props } from "@ngrx/store";

export namespace ToDoActions {
    export const createToDo = createAction("CREATE_TODO", props<{name: string}>());
    export const completeChange = createAction("COMPLETE_CHANGE", props<{id: string}>())
}
