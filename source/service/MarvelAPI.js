const axios = require('axios');
const debug = require('debug')('MarvelAPI:service');
const crypto = require('crypto');

class MarvelAPI {
  constructor(publicKey, privateKey) {
    debug(`Public Key: ${publicKey}`);
    debug(`Private Key: ${privateKey}`);

    this.publicKey = publicKey;
    this.privateKey = privateKey;
  }

  getAPIParameters() {
    const timeStamp = Date.now();
    const hashValue = crypto.createHash('md5').update(timeStamp + this.privateKey + this.publicKey).digest('hex');
    const apiParams = `ts=${timeStamp}&apikey=${this.publicKey}&hash=${hashValue}`;

    return apiParams;
  }

  getCharacter(characterName) {
    const apiParams = this.getAPIParameters();
    const url = `https://gateway.marvel.com:443/v1/public/characters?${apiParams}&nameStartsWith=${characterName}`;

    return new Promise((resolve, reject) => {
      axios.get(url)
        .then((response) => {
          resolve(response.data.data.results);
        })
        .catch((error) => {
          debug(error);
          reject(error);
        });
    });
  }
}

module.exports = MarvelAPI;
