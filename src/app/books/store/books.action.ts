import { Book } from './book';
import { createAction, props } from "@ngrx/store";

export const invokeBooksAPI = createAction(
  "[Books API] invoke books Fetch API"
)

export const invokedBooks = createAction(
  "[Books API] Books invoked success",
  props<{allBooks:Book[]}>()
)

export const invokeSaveBookAPI = createAction(
  "[Books API] invoke save book Api",
  props<{payload:Book}>()
)

export const savedBook = createAction(
  "[Books API] Saved books success",
  props<{saved:Book}>()
)

export const invokeUpdateBookAPI = createAction(
  "[Books API] invoke update book Api",
  props<{payload:Book}>()
)

export const updatedBook = createAction(
  "[Books API] Updated books success",
  props<{updated:Book}>()
)

export const invokeDeleteBookAPI = createAction(
  "[Books API] invoke Delete book Api",
  props<{id:number}>()
)

export const deletedBook = createAction(
  "[Books API] Deleted books success",
  props<{id:number}>()
)
