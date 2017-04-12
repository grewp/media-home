let router = require('express').Router();


router.get('/', (req, res) => {
    let coll = req.database.getCollection('movies');
    let movies = coll.chain().simplesort('name').data();
    let admin = false;

    if (req.session.isAuthenticated) {
        console.log("Admin");
        console.log(req.session.isAuthenticated);
        admin = true;
    } 

    render(res, movies, admin);
});

//out of the box search solution, can be improved a lot
router.get('/find/:search', (req, res) =>  {
    let search = req.params.search;

    let coll = req.database.getCollection('movies');
    let movies = coll.find({ name: { '$regex': new RegExp(search, 'i') } });

    render(res, movies);
});

function render(res, movies, admin) {
    res.render('database', {
        title: 'Movies',
        movies: movies,
        admin: admin
    });
}


module.exports = router;
