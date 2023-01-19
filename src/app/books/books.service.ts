import { BooksFacade } from './store/books.facade';
import { invokedBooks } from './store/books.action';
import {
  Firestore,
  collection,
  collectionData,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from '@angular/fire/firestore';
import { environment } from './../../environments/environment';
import { Book } from './store/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, retry, Observable, from, tap } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient, private firestore: Firestore, private booksFacade: BooksFacade) {}

  // get(){
  //   return this.http.get<Book[]>(`${environment.baseURL}books`).pipe(
  //     retry(3),
  //     catchError(e => {
  //       console.error("Erro ao obter livros")
  //       const x: any = {assasdsa: ''}
  //       return of(x)
  //     })
  //   )
  // }

  get(): void {
    collectionData(collection(this.firestore, 'Books'), {
      idField: 'id',
    }).subscribe((books: any) => {
      this.booksFacade.saveAll(books)
    });
  }

  // create(payload: Book){
  //   return this.http.post<Book>(`http://localhost:3000/books`, payload)
  // }

  create(payload: Book) {
    return addDoc(collection(this.firestore, 'Books'), payload);
  }

  // update(payload: Book){
  //   return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`, payload)
  // }

  update(payload: any) {
    return from(updateDoc(doc(this.firestore, `Books/${payload.id}`), payload));
  }

  // delete(id: number){
  //   return this.http.delete<Book>(`http://localhost:3000/books/${id}`)
  // }

  delete(id: string) {
    return deleteDoc(doc(this.firestore, 'Books', id));
  }
}
