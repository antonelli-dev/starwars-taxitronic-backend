const IFilmRepository = require('../../repositories/IFilmRepository');
const StarWarsApi = require('./StarWarsApi');
const Film = require('../../domain/entities/Film');
const Character = require('../../domain/entities/Character');
const ExternalApiError = require('../../utils/CustomError').ExternalApiError;

class FilmRepository extends IFilmRepository {
    constructor(starWarsApi = new StarWarsApi()) {
        super();
        this.starWarsApi = starWarsApi; 
    }

    async getAllFilms() {
        try {
            const films = await this.starWarsApi.getAllFilms();
            return films.map(film => new Film(film.id, film.title)); 
        } catch (error) {
            throw new ExternalApiError('Failed to fetch films from Star Wars API');
        }
    }

    async getCharactersByFilm(filmId) {
        try {
            const characters = await this.starWarsApi.getCharactersByFilm(filmId);
            return characters.map(character => new Character(character.name, character.gender, character.homeworld, character.speciesName));
        } catch (error) {
            throw new ExternalApiError('Failed to fetch characters from Star Wars API');
        }
    }
}

module.exports = FilmRepository;
