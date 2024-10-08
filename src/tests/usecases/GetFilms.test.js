const GetFilms = require('../../usecases/GetFilms');

describe('GetFilms Use Case', () => {
    let getFilms;
    let mockFilmRepository;

    beforeEach(() => {
        mockFilmRepository = {
            getAllFilms: jest.fn()
        };

        getFilms = new GetFilms(mockFilmRepository);
    });

    it('should return a list of films from the repository', async () => {
        const mockFilms = [
            { id: 1, title: 'A New Hope' },
            { id: 2, title: 'The Empire Strikes Back' }
        ];
        mockFilmRepository.getAllFilms.mockResolvedValue(mockFilms);

        const films = await getFilms.execute();

        expect(films).toEqual(mockFilms);
        expect(mockFilmRepository.getAllFilms).toHaveBeenCalledTimes(1);
    });

    it('should propagate errors from the repository', async () => {
        mockFilmRepository.getAllFilms.mockRejectedValue(new Error('Repository error'));

        await expect(getFilms.execute()).rejects.toThrow('Repository error');
    });
});
