import { Note, PagedNotes } from "../../types/notes.interface";
import Params from "../../types/params.interface";
import { Service } from "typedi";

@Service()
class NotesRepository {
  private notes: Note[] = [
    {
      id: 1,
      name: "Note 1",
      created: new Date("2023-07-31T10:00:00"),
      category: "Task",
      content: "This is the content of Note 1",
      dates: ["2023-09-01", "2023-09-03"],
      archive: false,
    },
    {
      id: 2,
      name: "Note 2",
      created: new Date("2023-06-25T11:30:00"),
      category: "Quote",
      content: "This is the content of Note 2",
      dates: ["2023-08-02", "2023-08-04"],
      archive: false,
    },
    {
      id: 3,
      name: "Note 3",
      created: new Date("2023-07-15T14:15:00"),
      category: "Idea",
      content: "This is the content of Note 3",
      dates: ["2023-08-26"],
      archive: false,
    },
    {
      id: 4,
      name: "Note 4",
      created: new Date("2023-05-28T21:15:00"),
      category: "Quote",
      content: "This is the content of Note 4",
      dates: ["2023-08-04"],
      archive: false,
    },
    {
      id: 5,
      name: "Note 5",
      created: new Date("2023-07-01T14:00:00"),
      category: "Task",
      content: "This is the content of Note 5",
      dates: ["2023-08-17"],
      archive: false,
    },
    {
      id: 6,
      name: "Note 6",
      created: new Date("2023-07-22T00:15:00"),
      category: "Random Thought",
      content: "This is the content of Note 6",
      dates: ["2023-08-12"],
      archive: false,
    },
    {
      id: 7,
      name: "Note 7",
      created: new Date("2023-07-07T13:15:00"),
      category: "Idea",
      content: "This is the content of Note 7",
      dates: ["2023-09-01", "2023-09-03"],
      archive: false,
    },
    {
      id: 8,
      name: "Note 8",
      created: new Date("2023-08-01T13:15:00"),
      category: "Idea",
      content: "This is the content of Note 8",
      dates: ["2023-10-01", "2023-11-03"],
      archive: false,
    },
    {
      id: 9,
      name: "Note 9",
      created: new Date("2023-07-22T00:15:00"),
      category: "Random Thought",
      content: "This is the content of Note 9",
      dates: ["2023-08-12"],
      archive: true,
    },
    {
      id: 10,
      name: "Note 10",
      created: new Date("2023-07-07T13:15:00"),
      category: "Idea",
      content: "This is the content of Note 10",
      dates: ["2023-09-01"],
      archive: true,
    },
    {
      id: 11,
      name: "Note 11",
      created: new Date("2023-08-01T13:15:00"),
      category: "Idea",
      content: "This is the content of Note 11",
      dates: ["2023-10-01", "2023-11-03"],
      archive: true,
    },
  ];
  findNote = (id: string) => {
    const notes = [...this.notes];
    const finded = notes.find((note) => note.id === Number(id));
    const index = finded ? notes.findIndex((note) => note.id === Number(id)) : null
    return {finded, index};
  };

  getAllNotes = (params: any) => {
    const notes = [...this.notes];
    

    //const total = result.length;

    // if (params.size != null && params.page != null) {
    //   result = result.splice(params.page * params.size, params.size);
    // }
    if(params){
      
      const archive =  notes.filter(note=>note.archive)
      const unarchive =  notes.filter(note=>!note.archive)
      const archiveTask =  archive.filter(note=>note.category==="Task")
      const archiveIdea=  archive.filter(note=>note.category==="Idea")
      const archiveQuote =  archive.filter(note=>note.category==="Quote")
      const archiveRandom =  archive.filter(note=>note.category==="Random Thought")
      const unarchiveTask =  unarchive.filter(note=>note.category==="Task")
      const unarchiveIdea =  unarchive.filter(note=>note.category==="Idea")
      const unarchiveQuote =  unarchive.filter(note=>note.category==="Quote")
      const unarchiveRandom =  unarchive.filter(note=>note.category==="Random Thought")
      return {
        Task: {
          id: "Task",
          archive:archiveTask.length,
          unarchive:unarchiveTask.length
        },
        Quote: {
          id: "Quote",
          archive:archiveQuote.length,
          unarchive:unarchiveQuote.length
        },
        Idea: {
          id: "Idea",
          archive:archiveIdea.length,
          unarchive:unarchiveIdea.length
        },
        "Randon Thought": {
          id: "Randon Thought",
          archive:archiveRandom.length,
          unarchive:unarchiveRandom.length
        }
      }
    }

    return notes;
  };

  getNoteById = (id: string) => {
    const findedById = this.findNote(id);
    if (!findedById) {
      return { message: "not found note", status: 404 };
    }
    return findedById;
  };

  createANote = (note: Note, id: string) => {    
    const findedById = id ? this.findNote(id) : null;
    if (findedById && findedById.finded && findedById.index) {
      //this.notes = this.notes.toSpliced(index, 1, note)
      this.notes = [...this.notes].splice(findedById.index, 1, note)
      return note
    }
    [...this.notes, note];
    return note;
  };
  deleteANote = (id: string) => {
    let findedById = id ? this.findNote(id) : null;
    if (findedById) {
      this.notes = [...this.notes].splice(findedById.index, 1)
    }
    
      return {message: "success delete"}
  }
}

export default NotesRepository;
