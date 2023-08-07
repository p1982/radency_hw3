import NotesService from "../../bll/notes/notes.service";
//import Ajv from "ajv";
//import addFormats from "ajv-formats";
import notesSchema from "./notes.schema";
import { Service } from "typedi";
import * as express from "express";
import { Note } from "../../types/notes.interface";
import { AppError, ValidationError } from "../utils/customErrors";
import logger from "../utils/logger";

@Service()
class NotesController {
  public path = "/notes";
  public router = express.Router();
  private notesValidator;

  constructor(private notesService: NotesService) {
    // this.initializeValidators();
    this.initializeRoutes();
  }

  // public initializeValidators() {
  //   const ajv = new Ajv({ allErrors: true });
  //   addFormats(ajv);
  //   this.noteValidator = ajv.compile(notesSchema);
  // }

  public initializeRoutes() {
    this.router.get("/:id", this.getNoteById);
    this.router.get("/", this.getAllNotes);
    
    this.router.post("/", this.createANote);
    this.router.patch("/:id", this.createANote);
    this.router.delete("/:id", this.deleteNote);
  }

  getAllNotes = (request: express.Request, response: express.Response) => {
    // const params = {
    //   size: request.query.size ? Number(request.query.size) : null,
    //   page: request.query.page ? Number(request.query.page) : null,
    //   filter: request.query.filter || {},
    // };
    const params = request.query.stats
    const pagedPosts = this.notesService.getAllNotes(params);
    response.send(pagedPosts);
  };

  getNoteById = (request: express.Request, response: express.Response) => {
    const pagedPosts = this.notesService.getNoteById(request.params.id);
    response.send(pagedPosts);
  };

  createANote = (request: express.Request, response: express.Response) => {
    const note: Note = request.body;
    const id: string = request.params.id
    logger.info("BODY:" + request.body);
    logger.info("FIELDS:" + request["fields"]);
    //const valid = this.noteValidator(note);
    // if (!valid) {
    //   throw new ValidationError({
    //     message: this.noteValidator.errors.map((e) => e.message),
    //   });
    // }
    try {
      const createdNote = this.notesService.createANote(note, id);
      response.send(createdNote);
    } catch (e) {
      throw new AppError({ message: e.message });
    }
  };
  deleteNote = (request: express.Request, response: express.Response) => {
    const id: string = request.params.id
    try {
      const createdNote = this.notesService.deleteANote(id);
      response.send(createdNote);
    } catch (e) {
      throw new AppError({ message: e.message });
    }
  };
}

export default NotesController;
