class Character {
  constructor(serviceObject) {
    this.name = serviceObject.name;
    this.description = serviceObject.description;
    this.thumbnail = `${serviceObject.thumbnail.path}.${serviceObject.thumbnail.extension}`;
    this.resourceURI = serviceObject.resourceURI;
  }
}

module.exports = Character;
