const GetFilms = require("../../usecases/GetFilms");
const GetCharacterByFilm = require("../../usecases/GetCharacterByFilm");
const { NotFoundError } = require("../../utils/CustomError");

class FilmController {
    constructor(filmRepository) {
        this.getFilmsUseCase = new GetFilms(filmRepository);
        this.getCharactersByFilmUseCase = new GetCharacterByFilm(filmRepository);
    }

    async getFilms(_, res, next) {
        try {
            const films = await this.getFilmsUseCase.execute();
            if (!films.length) {
                throw new NotFoundError("No films found");
            }
            res.status(200).json({ success: true, message: "", data: films });
        } catch (error) {
            next(error); 
        }
    }

    async getCharactersByFilm(req, res, next) {
        try {
            const { filmId } = req.params;
            if (!filmId) {
                throw new BadRequestError("Film ID is required");
            }

            const characters = await this.getCharactersByFilmUseCase.execute(filmId);
            if (!characters.length) {
                throw new NotFoundError(`No characters found for film ID ${filmId}`);
            }
            res.status(200).json({ success: true, message: "", data: characters });
        } catch (error) {
            next(error); 
        }
    }
}


module.exports = FilmController;
