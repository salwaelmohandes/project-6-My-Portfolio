var express = require('express');
var router = express.Router();
const {projects} = require('../data.json');

// GET home page and render it. 
router.get('/', (req, res, next) => {
    res.render('index', {projects});
});

/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about',{projects});
});

/* GET project page. */
router.get('/projects/:id', function(req, res, next) {
    const projectId = req.params.id;
    const project = projects[projectId - 1];
    if (project) {
      // 2. Pass the project data to the 'project' template
      res.render('project',{project});
    } else { 
      res.status(404).send('Oops, page not found. Looks like that route does not exist.');
    }
});

module.exports = router;