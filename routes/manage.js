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


router.post('/update', (req, res) => {
    //look up the entry in the db
    let m_name = req.body.movie;
    let coll = req.database.getCollection('movies');
    let movie = coll.findOne({ name: m_name });
    
    //toggle its owned status
    if(movie.owned == false) {
        movie.owned = true;
    } else {
        movie.owned = false;
    }
    coll.update(movie)

    //render the existing page with this updated
    backURL=req.header('Referer');
    res.redirect(backURL);

})

function render(res, movies, admin) {
    res.render('manage_database', {
        title: 'Manage movies',
        movies: movies
    });
}


module.exports = router;
