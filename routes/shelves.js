const express = require('express');
const router = express.Router();
const shelvesCtrl = require('../controllers/shelves');
const isLoggedIn = require('../config/auth');

// ALL ROUTES HERE START WITH "SHELVES"
router.get('/', isLoggedIn, shelvesCtrl.index);
router.post('/', isLoggedIn, shelvesCtrl.create);
router.delete('/:id', isLoggedIn, shelvesCtrl.delete);
router.post('/:id', isLoggedIn, shelvesCtrl.addTitle);
router.delete('/:shelfid/books/:titleid', isLoggedIn, shelvesCtrl.removeTitle);

module.exports = router;