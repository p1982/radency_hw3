import "reflect-metadata";
import NotesRepository from "./dal/notes/notes.repository";
import NotesService from "./bll/notes/notes.service";
import App from "./server/app";
import NotesController from "./server/notes/notes.controller";
import Container from "typedi";

const app = new App([Container.get(NotesController)], 3000);

app.listen();
