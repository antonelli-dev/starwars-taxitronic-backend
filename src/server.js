const express = require("express");
const FilmController = require("./interface/controllers/FilmController");
const FilmRepository = require("./infrastructure/api/FilmRepository");
const errorMiddleware = require("./utils/ErrorMidleware");

const app = express();
const port = process.env.PORT || 3000;

const filmRepository = new FilmRepository();
const filmController = new FilmController(filmRepository);

app.get("/starwars/v1/films", (req, res) => filmController.getFilms(req, res));
app.get('/starwars/v1/films/:filmId/characters', (req, res) => filmController.getCharactersByFilm(req, res));
app.use(errorMiddleware);
app.listen(port, () => console.log(`Server running on port ${port}`));
