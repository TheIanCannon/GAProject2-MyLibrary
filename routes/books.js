const express = require('express');
const router = express.Router();
const booksCtrl = require('../controllers/books');

// ALL ROUTES HERE START WITH "BOOKS"
router.get('/', booksCtrl.index);
router.get('/new', booksCtrl.new);
router.post('/', booksCtrl.create);
router.get('/:id', booksCtrl.show);

module.exports = router;