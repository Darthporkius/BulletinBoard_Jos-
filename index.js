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

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//Middleware that prints HTTP requests
app.use(morgan('dev'));

//setup view engine to pug.
app.set('view engine', 'pug');

//We need bodyParser to parse user input text into a JS string.
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

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

//This will create a new entery into the notice table.
//notice.create sets the new info in the table.
//request.body will take all the input of the user in the new post
//form. It uses de name of the input fields.
//Finally it will redirect to the bulletin board page (/board url) after
//teh new entery has been created. 
app.post('/new-notice', (request, response) => {
    notice.create(request.body).then(() => {
        response.redirect('/board');
    });
});


sequelize.sync().then(() => {
    console.log('Connected to database');
    app.listen(8000, () => {
        console.log('Webserver is running on port 8000');
    });
});