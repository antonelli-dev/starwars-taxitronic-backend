class GetFilms {
    constructor(filmRepository) {
        this.filmRepository = filmRepository;
    }

    async execute() {
        return await this.filmRepository.getAllFilms();
    }
}

module.exports = GetFilms;
