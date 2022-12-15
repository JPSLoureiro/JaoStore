import { setAPIStatus } from './../../shared/store/app.action';
import { selectAppState } from './../../shared/store/app.selector';
import { Appstate } from './../../shared/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI, invokeSaveBookAPI, invokeUpdateBookAPI } from './../store/books.action';
import { Book } from '../store/book';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { switchMap } from 'rxjs';
import { selectBookById, selectBooks } from './books.selector';


@Injectable()
export class BooksFacade {


  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private route: ActivatedRoute
    ){}

    books$ = this.store.pipe(select(selectBooks));

    loadAllBooks(){
    this.store.dispatch(invokeBooksAPI())
    }


    save(bookForm: Book) {
      this.store.dispatch(invokeSaveBookAPI({ payload: { ...bookForm } }));
      let appState$ = this.appStore.pipe(select(selectAppState));
      appState$.subscribe((data) => {
        if (data.apiStatus === 'success') {
          this.appStore.dispatch(
            setAPIStatus({ apiStatus: { apiStatus: '', apiResponseMessage: '' } })
          );
          this.router.navigate(['/']);
        }
      });
    }

    update(bookForm: Book){
      this.store.dispatch(invokeUpdateBookAPI({payload:{...bookForm}}))

      let appState$ = this.appStore.pipe(select(selectAppState))
      appState$.subscribe((data) => {
        if(data.apiStatus === 'success'){
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
          this.router.navigate(['/'])
        }
      })
    }


    delete(idToDelete: number){
      this.store.dispatch(invokeDeleteBookAPI({id: idToDelete}))

      let appState$ = this.appStore.pipe(select(selectAppState))
      appState$.subscribe((data) => {
        if(data.apiStatus === 'success'){
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
        }
      })
    }

}
