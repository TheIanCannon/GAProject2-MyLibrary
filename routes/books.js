const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');
const isLoggedIn = require('../config/auth');

// ALL ROUTES HERE START WITH "BOOKS"
router.get('/', booksCtrl.index);
router.get('/new', isLoggedIn, booksCtrl.new);
router.post('/', isLoggedIn, booksCtrl.create);
router.get('/:id', booksCtrl.show);
router.get('/:id/edit', isLoggedIn, booksCtrl.edit);
router.put('/:id', isLoggedIn, booksCtrl.update);

module.exports = router;