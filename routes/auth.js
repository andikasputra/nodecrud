var express = require('express');
var fs = require('fs');
var passport = require('passport');
var router = express.Router();

router.get('/login', (req, res) => {
	res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {failureRedirect: '/auth/login'}), (req, res) => {
	res.send('Authenticated')
})

module.exports = router;