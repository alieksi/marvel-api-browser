class Character {
  constructor(serviceObject) {
    this.name = serviceObject.name;
    this.description = serviceObject.description;
    this.thumbnail = `${serviceObject.thumbnail.path}.${serviceObject.thumbnail.extension}`;
    this.resourceURI = serviceObject.resourceURI;
    this.urls = serviceObject.urls;
  }
}

module.exports = Character;
