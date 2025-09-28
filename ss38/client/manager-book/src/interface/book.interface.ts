export interface Book {
  id?: number;
  title?: string;
  author?: string;
  year?: number;
  category?: string;
}

export interface InitialStateType {
  status: "idle" | "pending" | "success" | "failed";
  data: Book[];
  error: null | undefined | string;
  book: Book | null;
}
