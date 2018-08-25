const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('MarvelAPI');
const morgan = require('morgan');
const path = require('path');

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
app.set('views', './view');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// Listen on port
app.listen(port, () => {
  debug(`Listening on port ${chalk.green(port)}`);
});
