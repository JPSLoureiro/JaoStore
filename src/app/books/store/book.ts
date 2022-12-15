export interface Book {
  id: number;
  title: string;
  author: string;
  cost: number;
  image: string;
}

export interface BookState{
  books:Book[]
}
