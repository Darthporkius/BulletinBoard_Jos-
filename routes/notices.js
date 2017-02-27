//Here The nesessary dependancies are required.
const express = require('express'),
    Sequelize = require('Sequelize');

//This creates a new router object.
//A router object is an isolated instance of middleware and routes. 
//You can think of it as a “mini-application,” capable only of performing 
//middleware and routing functions. Every Express application 
//has a built-in app router.
const router = express.Router();


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

//example of the expected request (http://localhost:8000/notices/2)
//This will find all the data within a row of the notice table
//by the id. Finally the data will be renderd with the show.pug file.
router.get('/:id', (request, response) => {
    notice.findById(request.params.id).then((notice) => {
        response.render('notices/show', { notice: notice });
    });
});

//Delete a notice and redirect to the bulletin board
router.delete('/:id', (request, response) => {
    notice.destroy({
        where: {
            id: request.params.id
        }
    }).then(() => {
        response.redirect('/board');
    });
});

//edit a notice 
router.get('/:id/edit', (req, res) => {
    notice.findOne({
        where: {
            id: req.params.id
        }
    }).then((notice) => {
        res.render('notices/edit', { notice: notice });
    });
});

router.put('/:id', (request, response) => {
    notice.update(request.body, {
        where: {
            id: request.params.id,
        }
    }).then(() => {
        response.redirect('/notices/' + request.params.id);
    });
});

//This exports router so it can be used in index.js
module.exports = router;