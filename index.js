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


sequelize.sync().then(() => {
    console.log('Connected to database');
    app.listen(8000, () => {
        console.log('Webserver is running on port 8000');
    });
});