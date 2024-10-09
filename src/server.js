const express = require("express");
const cors = require('cors');
const errorMiddleware = require("./utils/ErrorMidleware");
const FilmController = require("./interface/controllers/FilmController");
const FilmRepository = require("./interface/repositories/FilmRepository");


const app = express();
const port = process.env.PORT || 3000;

const filmRepository = new FilmRepository();
const filmController = new FilmController(filmRepository);

const corsOptions = {
    origin: 'https://taxitronic-frontend.vercel.app',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/starwars/v1/films", (req, res) => filmController.getFilms(req, res));
app.get('/starwars/v1/films/:filmId/characters', (req, res) => filmController.getCharactersByFilm(req, res));
app.use(errorMiddleware);
app.listen(port, () => console.log(`Server running on port ${port}`));
