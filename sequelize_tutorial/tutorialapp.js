var Sequelize = require('sequelize');

var connection = new Sequelize('demo_db', 'postgres', 'password', {
    dialect: 'postgres'
}); 

var Article = connection.define('article', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
});

connection.sync().then(function () {
    Article.create({
        title: 'demo title2',
        body: 'blur blur blarg derp'
    });
});

connection.sync().then(function () {
    Article.findById(1).then(function (article){
        console.log(article.dataValues);
    });
});