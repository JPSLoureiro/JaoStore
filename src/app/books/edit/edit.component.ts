import { Appstate } from './../../shared/store/appstate';
import { invokeUpdateBookAPI } from './../store/books.action';
import { switchMap } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Book } from './../store/book';
import { Component, OnInit } from '@angular/core';
import { selectBookById } from '../store/books.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { BooksFacade } from './../store/books.facade';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private store: Store, private route: ActivatedRoute, private router:Router, private appStore:Store<Appstate>, private BooksFacade: BooksFacade) { }

  bookForm : Book = {
    id:'',
    author: '',
    title: '',
    cost:0,
    image: ''
  }

  ngOnInit(): void {
    let fetchFormData$ = this.route.paramMap.pipe(
      switchMap((param) => {
        console.log(param);

        const id = String(param.get('id'));
        console.log("Id: " + id);

        return this.store.pipe(select(selectBookById(id)))
      })
    )

    fetchFormData$.subscribe((data) => {
      if(data){
        this.bookForm = {...data};
      }
      else{
        this.router.navigate(['/'])
      }
    })
  }

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

  update(){
    this.BooksFacade.update(this.bookForm);
    let appState$ = this.appStore.pipe(select(selectAppState))
      appState$.subscribe((data) => {
        if(data.apiStatus === 'success'){
          this.appStore.dispatch(setAPIStatus({apiStatus:{apiStatus:'', apiResponseMessage:''}}));
          this.router.navigate(['/'])
        }
      })
  }
}
