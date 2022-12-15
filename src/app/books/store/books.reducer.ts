import { deletedBook, invokedBooks, savedBook, updatedBook } from './books.action';
import { Book } from './book';
import { createReducer, on } from '@ngrx/store';
import { state } from '@angular/animations';

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
  initialState,
  on(invokedBooks, (state, {allBooks}) => { return allBooks }),

  on(savedBook, (state, {saved}) => {
    let newState = [...state];
    newState.unshift(saved);
    return newState;
  }),

  on(updatedBook, (state, {updated}) => {
    let newState = state.filter(_ => _.id !== updated.id)
    newState.unshift(updated);
    return newState;
  }),

  on(deletedBook, (state, {id}) => {
    let newState = state.filter(_ => _.id !== id)
    return newState;
  })
)
