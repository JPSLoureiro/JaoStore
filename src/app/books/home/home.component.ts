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

declare let window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imagem = "https://islandpress.org/sites/default/files/default_book_cover_2015.jpg";

  constructor(private store: Store, private appStore:Store<Appstate>, private BooksFacade: BooksFacade) { }

  books$ = this.BooksFacade.books$;
  booksView : Book[] = [];
  deleteModal:any;
  idToDelete: number = 0;
  searchBar = "";


  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById("deleteModal")
    );

    this.BooksFacade.loadAllBooks();

    this.books$.subscribe(bookList => this.booksView =bookList)

  }



  openDeleteModal(id: number){
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete(){
    this.BooksFacade.delete(this.idToDelete);
    this.deleteModal.hide();
  }

  search(bookName: any){
     this.books$.subscribe(BookFilter => this.booksView = BookFilter.filter((item: Book) => {
      return item.title.toLowerCase().includes(bookName.toLowerCase()) || item.author.toLowerCase().includes(bookName.toLowerCase());
     }))
  }
}
