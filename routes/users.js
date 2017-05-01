var express = require('express');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const User = models.User;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + req.body.email + path.extname(file.originalname));
	}
})

const upload = multer({storage: storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.findAll()
	.then((users) => {
	  res.render('user/index', {users: users});
	})
});

router.post('/', upload.single('photo'), (req, res) => {
	console.log(req.file)
	User.create({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email,
		photo: req.file.filename
	}).then((user) => {
		console.log(user);
		res.redirect('/users')
	}).catch((err) => {
		res.render('error', err);
	})
})

router.get('/:id/detail', (req, res) => {
	User.findById(req.params.id)
		.then((user) => {
			res.render('user/show', user.dataValues)
		}).catch((err) => {
			res.render('error', err)
		})
})

router.get('/new', (req, res) => {
	console.log('aa')
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
