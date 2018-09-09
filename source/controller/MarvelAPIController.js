const debug = require('debug')('MarvelAPI:APIController');
const Character = require('../data/Character');

class MarvelAPIController {
  constructor(marvelAPI) {
    this.marvelAPI = marvelAPI;
  }

  getCharacter(characterName) {
    return new Promise((resolve, reject) => {
      this.marvelAPI.getCharacter(characterName)
        .then((response) => {
          const characterData = [];
          response.forEach(serviceObject => characterData.push(new Character(serviceObject)));
          resolve(characterData);
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }
}

module.exports = MarvelAPIController;
