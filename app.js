const express = require('express');
const morgan = require('morgan');
const path = require('path');
const MarvelAPI = require('./source/service/MarvelAPI');
const MarvelAPIcontroller = require('./source/controller/MarvelAPIController');
const MarvelAPIRouter = require('./source/router/MarvelAPIRouter');

// Enviroment Values
const port = process.env.PORT || 3000;

// Express
const app = express();

// Morgan for logging http requests
app.use(morgan('tiny'));

// Making static files accessible
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'semantic-ui', 'dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'semantic-ui', 'dist', 'components')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'semantic-ui', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'block-ui')));
app.set('views', './view');
app.set('view engine', 'ejs');

// Route Settings
const router = express.Router();
const marvelAPI = new MarvelAPI('', '');
const marvelAPIController = new MarvelAPIcontroller(marvelAPI);
const marvelAPIRouter = new MarvelAPIRouter(marvelAPIController, router);

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/api', marvelAPIRouter.route());

// Listen on port
app.listen(port);
