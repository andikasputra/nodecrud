var express = require('express');
var router = express.Router();

const models = require('../models');
const User = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.findAll()
	.then((users) => {
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

router.get('/:id/edit', (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			res.render('user/edit', user.dataValues)
		}).catch((err) => {
			res.render('error', err);
		})
})

router.put('/:id/edit', (req, res) => {
	User.update({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email
	}, {
		where: {
			id: req.params.id
		}
	}).then((user) => {
		res.redirect('/users')
	}).catch((err) => {
		res.render('error', err);
	})
})

router.get('/:id/delete', (req, res) => {
	User.destroy({
		where: {
			id: req.params.id
		}
	}).then((user) => {
		res.redirect('/users')
	}).catch((err) => {
		res.render('error', err)
	})
})

module.exports = router;
