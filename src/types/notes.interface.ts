export interface Note {
  id: number;
  name: string;
  content: string;
  category: string;
  created: Date;
  dates: Array<string>;
  archive: boolean
}

export interface PagedNotes {
  result: Note[];
  total: number;
  size: number;
  page: number;
}

