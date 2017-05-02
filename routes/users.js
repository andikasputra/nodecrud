var express = require('express');
var fs = require('fs');
var router = express.Router();
// handle multipart form data
const multer = require('multer');
const path = require('path');

const models = require('../models');
const User = models.User;

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		// set uploads directory
		cb(null, 'uploads/photo/')
	},
	filename: (req, file, cb) => {
		// save file with current timestamp + user email + file extension
		cb(null, Date.now() + path.extname(file.originalname));
	}
})

// initialize the multer configuration
const upload = multer({storage: storage});

/* GET users listing. */
router.get('/', function(req, res, next) {
	User.findAll()
	.then((users) => {
	  res.render('user/index', {users: users});
	})
});

router.post('/', upload.single('photo'), (req, res) => {
	User.create({
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email,
		photo: !req.file ? 'placeholder.jpg' : req.file.filename
	}).then((user) => {
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

router.put('/:id/edit', upload.single('photo'), (req, res) => {
	const user = {
		first_name: req.body.firstname,
		last_name: req.body.lastname,
		email: req.body.email
	}
	// if user upload new photo, then remove old photo and save photo's name in database
	if (req.file) {
		// if old photo exists (old photo not empty) then unlink / remove the photo in directory
		if (req.body.old_photo !== '')
			fs.unlink(`uploads/photo/${req.body.old_photo}`);
		user.photo = req.file.filename
	}
	User.update(user, {
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
	User.findById(req.params.id)
		.then((user) => {
			console.log(user.dataValues.photo)
			fs.unlink(`uploads/photo/${user.dataValues.photo}`, () => {
				User.destroy({
					where: {
						id: user.dataValues.id
					}
				}).then(() => {
					res.redirect('/users')
				}).catch((err) => {
					res.render('error', err)
				})
			})
		}).catch((err) => {
			res.render('error', err)
		})
})

module.exports = router;
