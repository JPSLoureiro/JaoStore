import { Book } from './book';
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectBooks = createFeatureSelector<Book[]>("mybooks")

export const selectBookById = (bookId: number) => {
  return createSelector(selectBooks, (books: Book[]) => {
    let bookById = books.filter(_ => _.id == bookId);
    if(bookById.length == 0){
      return null;
    }
    return bookById[0];
  })
}
