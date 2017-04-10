let router = require('express').Router();

router.get('/', (req, res) => {
	// console.log(res.body.login);
 //   	console.log(req.body.login);
    res.render('login', {
    	title: 'Login'
    });
});
router.post('/', (req, res) => {
    console.log(req.body.login);
    console.log(req.body.password);

    res.render('login', {
    	title: 'Login'
    });
    })

module.exports = router;