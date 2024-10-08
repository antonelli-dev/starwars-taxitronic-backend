const FilmController = require('../../interface/controllers/FilmController');
const { NotFoundError } = require('../../utils/CustomError');
const GetFilms = require('../../usecases/GetFilms');
const GetCharacterByFilm = require('../../usecases/GetCharacterByFilm');

jest.mock('../../usecases/GetFilms');
jest.mock('../../usecases/GetCharacterByFilm');

describe('FilmController', () => {
    let filmController;
    let mockRes;
    let mockNext;

    beforeEach(() => {
        const mockFilmRepository = {};

        const mockGetFilms = new GetFilms(mockFilmRepository);
        const mockGetCharacterByFilm = new GetCharacterByFilm(mockFilmRepository);

        filmController = new FilmController(mockFilmRepository);
        filmController.getFilmsUseCase = mockGetFilms;
        filmController.getCharactersByFilmUseCase = mockGetCharacterByFilm;

        mockRes = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn().mockReturnThis(),
        };

        mockNext = jest.fn();
    });

    describe('getFilms', () => {
        it('should return a list of films', async () => {

            filmController.getFilmsUseCase.execute.mockResolvedValue([{ id: 1, title: 'A New Hope' }]);

            await filmController.getFilms({}, mockRes, mockNext);

            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: '',
                data: [{ id: 1, title: 'A New Hope' }]
            });
        });

        it('should throw NotFoundError if no films are found', async () => {
            filmController.getFilmsUseCase.execute.mockResolvedValue([]);

            await filmController.getFilms({}, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
            expect(mockNext.mock.calls[0][0].message).toBe('No films found');
        });
    });


    describe('getFilms', () => {
        it('should call next with error if something goes wrong', async () => {
            const unexpectedError = new Error('Unexpected Error');
            filmController.getFilmsUseCase.execute.mockRejectedValue(unexpectedError);

            await filmController.getFilms({}, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(unexpectedError);
        });
    });

    describe('getCharactersByFilm', () => {
        it('should call next with error if something goes wrong', async () => {
            const unexpectedError = new Error('Unexpected Error');
            filmController.getCharactersByFilmUseCase.execute.mockRejectedValue(unexpectedError);

            const req = { params: { filmId: 1 } };

            await filmController.getCharactersByFilm(req, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(unexpectedError);
        });
    });

    describe('getCharactersByFilm', () => {
        it('should handle missing filmId in request params', async () => {
            const req = { params: {} };

            await filmController.getCharactersByFilm(req, mockRes, mockNext);


            expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
        });
    });

    describe('getFilms', () => {
        it('should set 200 status code for successful request', async () => {
            filmController.getFilmsUseCase.execute.mockResolvedValue([{ id: 1, title: 'A New Hope' }]);

            await filmController.getFilms({}, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

    describe('getCharactersByFilm', () => {
        it('should return a list of characters for a film', async () => {
            filmController.getCharactersByFilmUseCase.execute.mockResolvedValue([{ name: 'Luke Skywalker', gender: 'male' }]);

            const req = { params: { filmId: 1 } };

            await filmController.getCharactersByFilm(req, mockRes, mockNext);

            expect(mockRes.json).toHaveBeenCalledWith({
                success: true,
                message: '',
                data: [{ name: 'Luke Skywalker', gender: 'male' }]
            });
        });

        it('should throw NotFoundError if no characters are found for the film', async () => {
            filmController.getCharactersByFilmUseCase.execute.mockResolvedValue([]);

            const req = { params: { filmId: 1 } };

            await filmController.getCharactersByFilm(req, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(expect.any(NotFoundError));
            expect(mockNext.mock.calls[0][0].message).toBe('No characters found for film ID 1');
        });
    });
});
