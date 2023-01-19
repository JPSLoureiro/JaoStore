import { setAPIStatus } from './../../shared/store/app.action';
import { Appstate } from './../../shared/store/appstate';
import { Store } from '@ngrx/store';
import { BooksService } from '../books.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { invokeBooksAPI, invokedBooks, invokeSaveBookAPI, savedBook, invokeUpdateBookAPI, updatedBook, invokeDeleteBookAPI, deletedBook } from './books.action';
import { switchMap, map, tap } from 'rxjs';
import { Book } from './book';


@Injectable()
export class BooksEffects {
  constructor(private actions$:Actions,
    private bookService: BooksService,
    private appStore:Store<Appstate>){}


  loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeBooksAPI),
      tap(()=> this.bookService.get())
  ), {dispatch: false});

  saveNewBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeSaveBookAPI),
      // switchMap((action) => {
      //   this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
      //   return this.bookService.create(action.payload)
      //   .pipe(
      //     map((data) => {
      //       this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
      //       return savedBook({saved: data})
      //     })
      //   )
      // })
      tap((action) => {
        this.bookService.create(action.payload).then(resp => {
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
          return savedBook({saved:resp})
        })
      })
    ), { dispatch: false }
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeUpdateBookAPI),
      switchMap((action) => {
        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
        return this.bookService.update(action.payload)
        .pipe(
          map((data) => {
            this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
            return updatedBook({updated: data})
          })
        )
      })
      // tap((action) => {
      //   this.bookService.update(action.payload).then(resp => {
      //     this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}}))
      //     return updatedBook({updated: resp})
      //   })
      // })
    ), //{dispatch: false}
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokeDeleteBookAPI),
      tap((action) => this.bookService.delete(action.id))
    ), { dispatch: false}
  );
}
