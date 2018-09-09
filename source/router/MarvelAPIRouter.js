const debug = require('debug')('MarvelAPI:MarvelAPIRouter');

class MarvelAPIRouter {
  constructor(marvelAPIController, router) {
    this.marvelAPIController = marvelAPIController;
    this.router = router;
  }

  route() {
    this.router.route('/getCharacter/:characterName').get((req, res) => {
      debug(`Character: ${req.params.characterName}`);
      this.marvelAPIController.getCharacter(req.params.characterName)
        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          res.status(404).send(error);
        });
    });

    return this.router;
  }
}

module.exports = MarvelAPIRouter;
