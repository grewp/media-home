let router = require('express').Router();

router.get('/', (req, res) => {
    res.render('login', {
    	title: 'Login'
    });
});
router.post('/', (req, res) => {
    //super hacky auth. need to eventually sanitize, encrypt, etc.
    if (req.body.login == 'username' && req.body.password == 'password') {
        //storing this on a cookie session is also unsecure
        req.session.isAuthenticated = true;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

module.exports = router;