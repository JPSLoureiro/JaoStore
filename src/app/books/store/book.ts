export interface Book {
  id: string;
  title: string;
  author: string;
  cost: number;
  image: string;
}

export interface BookState{
  books:Book[]
}
