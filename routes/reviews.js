const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/books/:id/reviews', reviewsCtrl.create);
router.post('/books/:_id/reviews/:_id', reviewsCtrl.delete);

module.exports = router;