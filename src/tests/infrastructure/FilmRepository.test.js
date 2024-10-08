const FilmRepository = require('../../interface/repositories/FilmRepository');
const StarWarsApi = require('../../infrastructure/external/StarWarsApi');
const Film = require('../../domain/entities/Film');
const Character = require('../../domain/entities/Character');
const { ExternalApiError } = require('../../utils/CustomError');

describe('FilmRepository', () => {
    let filmRepository;
    let mockStarWarsApi;

    beforeEach(() => {
        mockStarWarsApi = {
            getAllFilms: jest.fn(),
            getCharactersByFilm: jest.fn()
        };
        filmRepository = new FilmRepository(mockStarWarsApi);
    });

    describe('getAllFilms', () => {
        it('should return a list of Film entities', async () => {
            const mockFilms = [
                { id: 1, title: 'A New Hope' },
                { id: 2, title: 'The Empire Strikes Back' }
            ];
            mockStarWarsApi.getAllFilms.mockResolvedValue(mockFilms);

            const films = await filmRepository.getAllFilms();

            expect(films).toEqual([new Film(1, 'A New Hope'), new Film(2, 'The Empire Strikes Back')]);
        });

        it('should throw ExternalApiError if the API call fails', async () => {
            mockStarWarsApi.getAllFilms.mockRejectedValue(new Error('API Error'));

            await expect(filmRepository.getAllFilms()).rejects.toThrow(ExternalApiError);
        });
    });

    describe('getCharactersByFilm', () => {
        it('should return a list of Character entities', async () => {
            const mockCharacters = [
                { name: 'Luke Skywalker', gender: 'male', homeworld: 'Tatooine', speciesName: 'Human' },
                { name: 'Darth Vader', gender: 'male', homeworld: 'Tatooine', speciesName: 'Human' }
            ];
            mockStarWarsApi.getCharactersByFilm.mockResolvedValue(mockCharacters);

            const characters = await filmRepository.getCharactersByFilm(1);

            expect(characters).toEqual([
                new Character('Luke Skywalker', 'male', 'Tatooine', 'Human'),
                new Character('Darth Vader', 'male', 'Tatooine', 'Human')
            ]);
        });

        it('should throw ExternalApiError if the API call fails', async () => {
            mockStarWarsApi.getCharactersByFilm.mockRejectedValue(new Error('API Error'));

            await expect(filmRepository.getCharactersByFilm(1)).rejects.toThrow(ExternalApiError);
        });
    });
});
