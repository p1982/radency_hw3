import NotesRepository from "../../dal/notes/notes.repository";
import { Note, PagedNotes } from "../../types/notes.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class NotesService {
  constructor(private notesRepository: NotesRepository) {}

  getAllNotes = (params: any) => {
    return this.notesRepository.getAllNotes(params);
  };

  getNoteById = (id: string) => {
    return this.notesRepository.getNoteById(id);
  };

  createANote = (note: Note, id:string) => {
    return this.notesRepository.createANote(note, id);
  };
  deleteANote = (id:string) => {
    return this.notesRepository.deleteANote(id);
  }
}

export default NotesService;
