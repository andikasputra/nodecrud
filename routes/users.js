var express = require('express');
var router = express.Router();

const models = require('../models');
const User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.findAll()
	.then((users) => {
		console.log(users[0].dataValues.id)
	  res.render('user/index', {users: users});
	})
});

router.post('/', (req, res) => {
	User.create({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email
	}).then((user) => {
		res.redirect('/users')
	}).catch((err) => {
		res.render('error', err);
	})
})

router.get('/new', (req, res) => {
	res.render('user/create');
})

module.exports = router;
