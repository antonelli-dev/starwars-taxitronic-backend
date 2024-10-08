const { BadRequestError } = require('../utils/CustomError');

class GetCharacterByFilm {
    constructor(filmRepository) {
        this.filmRepository = filmRepository;
    }

    async execute(filmId) {
        if (!filmId || isNaN(filmId)) {
            throw new BadRequestError('Invalid or missing film ID');
        }
        return this.filmRepository.getCharactersByFilm(filmId);
    }
}

module.exports = GetCharacterByFilm;
