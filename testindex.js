var express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    pg = require('pg'),
    pgHstore = require('pg-hstore'),
    pug = require('pug'),
    Sequelize = require('sequelize');


var connection = new Sequelize(
    'bulletinboard', 
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD, 
    { dialect: 'postgres'
}); 
  
  notices.create({
        title: 'post 5',
        body: 'blur derp'
    })

  .findById(4).then(function (article){
        console.log(notices.dataValues);
    });

// var Notices = connection.define('notices', {

//     title: Sequelize.STRING,
//     body: Sequelize.TEXT
// });

// connection.sync().then(function () {
//     Notices.create({
//         title: 'post 4',
//         body: 'blur derp'
//     });

// });

// connection.sync().then(function () {
//     Notices.findById(4).then(function (article){
//         console.log(notices.dataValues);
//     });
// });
