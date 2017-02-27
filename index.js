const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    pug = require('pug'),
    Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize(
        'bulletinboard',
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD, {
            dialect: 'postgres'
        });

//Here we require the route to the notices.js file.
var noticesRouter = require('./routes/notices');

//Here we create a table in the bulletinboard database.
var notice = sequelize.define('notice', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

//Middleware that prints HTTP requests
app.use(morgan('dev'));

//setup view engine to pug.
app.set('view engine', 'pug');

//We need bodyParser to parse user input text into a JS string.
app.use(bodyParser.urlencoded({ extended: false }));

//Here we say that if a /notices url request is made we want the
//js file defined in noticesRouter (notices.js) to handel it.
app.use('/notices', noticesRouter);

//Here we set the homepage (url '/') te be set to the
// notices (url '/notices') url. 
app.get('/', (request, response) => {
    response.redirect('/notices');
});

//get request to /board url (when you click bulletin board)
//findAll will return everything in the notice table of the db.
//then the board.pug is rendered and notices will be renderd in it. 
app.get('/board', (request, response) => {
    notice.findAll().then((notices) => {
        response.render('notices/board', { notices: notices });
    });
});









sequelize.sync().then(() => {
    console.log('Connected to database');
    app.listen(8000, () => {
        console.log('Webserver is running on port 8000');
    });
});