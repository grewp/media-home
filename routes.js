

function create(app) {
    app.use('/',         require('./routes/database'));
    app.use('/login',	 require('./routes/login'));
    app.use('/manage',	 require('./routes/manage'));

    app.use((req, res, next) => {
        res.status(404);
        res.render('404', { title: '404', message: 'This page does not exist.' });
    });
}


module.exports = {
    create: create
};
