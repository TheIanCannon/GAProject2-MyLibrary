const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

// ALL ROUTES HERE START FROM ROOT
router.post('/books/:id/reviews', reviewsCtrl.create);
router.delete('/reviews/:id', reviewsCtrl.delete);

module.exports = router;