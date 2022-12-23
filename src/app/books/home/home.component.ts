import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Appstate } from './../../shared/store/appstate';
import { invokeBooksAPI, invokeDeleteBookAPI } from './../store/books.action';
import { selectBooks } from './../store/books.selector';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { BooksFacade } from './../store/books.facade';
import { Book } from '../store/book';
import { Observable, tap } from 'rxjs';
import { persistenceEnabled } from '../../app.module';
import { Firestore, collection, addDoc, collectionData, doc } from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$ = this.authService.user;
  imagem = 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg';
  private itemsCollection!: AngularFirestoreCollection<any>;

  loginButton = this.authService.showLoginButton
  logoutButton = this.authService.showLogoutButton

  books$ = this.BooksFacade.books$;


  booksView: Book[] = [];
  deleteModal: any;
  idToDelete: string = '';
  searchBar = '';

  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private BooksFacade: BooksFacade,
    private authService: AuthService,
    private firestore: Firestore
  ) {}



  public testDocValue$!: Observable<any>;
  public readonly persistenceEnabled = persistenceEnabled;

  ngOnInit(): void {
    this.BooksFacade.loadAllBooks();

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.books$.subscribe((bookList) => (this.booksView = bookList));
  }

  openDeleteModal(id: string) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.BooksFacade.delete(this.idToDelete);
    let appState$ = this.appStore.pipe(select(selectAppState))
      appState$.subscribe((data) => {
        if(data.apiStatus === 'success'){
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
        }
      })
    this.deleteModal.hide();
  }

  search(bookName: any) {
    this.books$.subscribe(
      (BookFilter) =>
        (this.booksView = BookFilter.filter((item: Book) => {
          return (
            item.title.toLowerCase().includes(bookName.toLowerCase()) ||
            item.author.toLowerCase().includes(bookName.toLowerCase())
          );
        }))
    );
  }

  login() {
    this.authService.loginWithGoogle();
  }
  logout() {
    this.authService.logout();
  }
}
