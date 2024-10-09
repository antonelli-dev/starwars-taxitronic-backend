const express = require("express");
const cors = require('cors');
const errorMiddleware = require("./utils/ErrorMidleware");
const FilmController = require("./interface/controllers/FilmController");
const FilmRepository = require("./interface/repositories/FilmRepository");

const app = express();
const port = process.env.PORT || 3000;

const filmRepository = new FilmRepository();
const filmController = new FilmController(filmRepository);

app.use(cors());

app.get("/starwars/v1/films", (req, res, next) => filmController.getFilms(req, res, next));
app.get('/starwars/v1/films/:filmId/characters', (req, res, next) => filmController.getCharactersByFilm(req, res, next));



app.use(errorMiddleware);

app.listen(port, () => console.log(`Server running on port ${port}`));
