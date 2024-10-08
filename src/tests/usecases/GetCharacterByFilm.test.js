const GetCharacterByFilm = require('../../usecases/GetCharacterByFilm');
const { BadRequestError } = require('../../utils/ErrorMidleware');

describe('GetCharacterByFilm Use Case', () => {
    let getCharacterByFilm;
    let mockFilmRepository;

    beforeEach(() => {
        mockFilmRepository = {
            getCharactersByFilm: jest.fn()
        };

        getCharacterByFilm = new GetCharacterByFilm(mockFilmRepository);
    });

    it('should throw BadRequestError if filmId is missing', async () => {
        await expect(getCharacterByFilm.execute(null)).rejects.toThrow(BadRequestError);
        await expect(getCharacterByFilm.execute(undefined)).rejects.toThrow(BadRequestError);
    });

    it('should throw BadRequestError if filmId is not a number', async () => {
        await expect(getCharacterByFilm.execute('abc')).rejects.toThrow(BadRequestError);
        await expect(getCharacterByFilm.execute('')).rejects.toThrow(BadRequestError);
    });

    it('should call filmRepository.getCharactersByFilm with valid filmId', async () => {

        mockFilmRepository.getCharactersByFilm.mockResolvedValue([
            { name: 'Luke Skywalker', gender: 'male', homeworld: 'Tatooine', speciesName: 'Human' }
        ]);

        await getCharacterByFilm.execute(1);

        expect(mockFilmRepository.getCharactersByFilm).toHaveBeenCalledWith(1);
    });

    it('should propagate any errors from the repository', async () => {

        mockFilmRepository.getCharactersByFilm.mockRejectedValue(new Error('Repository error'));

        await expect(getCharacterByFilm.execute(1)).rejects.toThrow('Repository error');
    });
});
