import FileDb from "./fileDb";

const INotesSchema = {
  id: Number,
  title: String,
  text: String,
  createDate: Date,
};

FileDb.registerSchema("notes", INotesSchema);
const notesSchema = FileDb.getTable("notes");
