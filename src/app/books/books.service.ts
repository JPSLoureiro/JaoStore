import { environment } from './../../environments/environment';
import { Book } from './store/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, of, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http:HttpClient) { }

  get(){
    return this.http.get<Book[]>(`${environment.baseURL}books`).pipe(
      retry(3),
      catchError(e => {
        console.error("Deu ruim aqui")
        const x: any = {assasdsa: ''}
        return of(x)
      })
    )
  }

  create(payload: Book){
    return this.http.post<Book>(`http://localhost:3000/books`, payload)
  }

  update(payload: Book){
    return this.http.put<Book>(`http://localhost:3000/books/${payload.id}`, payload)
  }

  delete(id: number){
    return this.http.delete<Book>(`http://localhost:3000/books/${id}`)
  }
}
