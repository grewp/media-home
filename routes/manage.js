let router = require('express').Router();


router.get('/', (req, res) => {
    let coll = null;
    let movies = null;

    render(res, movies);
});


//out of the box search solution, can be improved a lot
router.get('/find/:search', (req, res) =>  {
    let search = req.params.search;

    let coll = req.database.getCollection('movies');
    let movies = coll.find({ name: { '$regex': new RegExp(search, 'i') } });

    render(res, movies);
});


router.get('/entry', (req, res) =>  {
    res.render('entry', { title: 'Custom Entry' })
});

router.post('/entry', (req, res) => {
    let m_name = req.body.movie;
    let coll = req.database.getCollection('movies');

    coll.insert({
      name: m_name,
      ID: '',
      owned: true,
      available: true
    });

    res.redirect('/manage');
});


router.post('/update', (req, res) => {
    //look up the entry in the db
    let m_name = req.body.movie;
    let coll = req.database.getCollection('movies');
    let movie = coll.findOne({ name: m_name });
    
    //toggle its owned status
    if(movie.owned == false) {
        movie.owned = true;
        movie.available = true;
    } else {
        movie.owned = false;
        movie.available = false;
    }
    coll.update(movie)

    //render the existing page with this updated
    backURL=req.header('Referer');
    res.redirect(backURL);
});


router.post('/rent', (req, res) => {
    //look up the entry in the db
    let m_name = req.body.movie;
    let coll = req.database.getCollection('movies');
    let movie = coll.findOne({ name: m_name });
    
    //toggle its available status
    if(movie.available == false) {
        movie.available = true;
    } else {
        movie.available = false;
    }
    coll.update(movie)

    //render the existing page with this updated
    backURL=req.header('Referer');
    res.redirect(backURL);
});

function render(res, movies, admin) {
    res.render('manage_database', {
        title: 'Manage movies',
        movies: movies
    });
}


module.exports = router;
