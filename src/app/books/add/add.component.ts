import { BooksFacade } from './../store/books.facade';
import { setAPIStatus } from './../../shared/store/app.action';
import { selectAppState } from './../../shared/store/app.selector';
import { Appstate } from './../../shared/store/appstate';
import { invokeSaveBookAPI } from './../store/books.action';
import { Book } from '../store/book';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  bookForm: Book = {
    id: '',
    author: '',
    title: '',
    cost: 0,
    image: '',
  };



  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router,
    private BooksFacade: BooksFacade
  ) {}


  ngOnInit(): void {}


  uploadfile(e: any) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }


  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.bookForm.image = reader.result;
    console.log(this.bookForm.image);
  }


  save() {
    this.BooksFacade.save(this.bookForm);
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
}
