//Here The nesessary dependancies are required.
const express = require('express'),
    Sequelize = require('Sequelize');

//This creates a new router object.
//A router object is an isolated instance of middleware and routes. 
//You can think of it as a “mini-application,” capable only of performing 
//middleware and routing functions. Every Express application 
//has a built-in app router.
const router = express.Router();
module.exports = router;

//This is the Connection to the database.
const sequelize = new Sequelize(
    'bulletinboard',
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD, {
        dialect: 'postgres'
    });

var notice = sequelize.define('notice', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

//This will get the root url request and render the 
//new post form.
router.get('/', (request, response) => {
    response.render('notices/index');
});