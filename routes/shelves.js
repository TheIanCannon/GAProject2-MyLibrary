const express = require('express');
const router = express.Router();
const shelvesCtrl = require('../controllers/shelves');

// ALL ROUTES HERE START WITH "SHELVES"
router.get('/', shelvesCtrl.index);
router.post('/', shelvesCtrl.create);
router.delete('/:id', shelvesCtrl.delete);
router.post('/:id', shelvesCtrl.addTitle);
router.delete('/:shelfid/books/:titleid', shelvesCtrl.removeTitle);

module.exports = router;