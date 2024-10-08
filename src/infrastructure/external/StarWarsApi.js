const fetchData = require('./FetchDataHandler');
const Film = require('../../domain/entities/Film');
const Character = require('../../domain/entities/Character');

class StarWarsApi {

    BaseURL = "https://swapi.dev/api/";

    async getAllFilms() {
        const filmsData = await fetchData('https://swapi.dev/api/films/', 'Error fetching films');
        return filmsData.results.map(film => new Film(film.episode_id, film.title));
    }

    async getCharacter(characterUrl) {
        console.log(characterUrl)
        return fetchData(characterUrl, 'Error fetching character');
    }

    async getSpecies(speciesUrl) {
        if(!speciesUrl ) return "Undefined";
        const species = await fetchData(speciesUrl, 'Error fetching species');
        console.log("Valor", speciesUrl)
        console.log("get pecies",species)

        return species.name;
    }

    async getHomeWorld(homeWorldURL) {
        const homeWorld = await fetchData(homeWorldURL, 'Error fetching home world');
        return homeWorld.name;
    }

    async getCharactersByFilm(filmId) {
        const response = await fetchData(`https://swapi.dev/api/films/${filmId}`, 'Error fetching film');
        const characterUrls = response.characters;

        const characters = await Promise.all(
            characterUrls.map(async (characterUrl) => {
                const character = await this.getCharacter(characterUrl);
                const speciesName = await this.getSpecies(character.species[0])
                const homeWorld = await this.getHomeWorld(character.homeworld);
                return new Character(character.name, character.gender, homeWorld, speciesName); 
            })
        );

        return characters;
    }
}

module.exports = StarWarsApi;
