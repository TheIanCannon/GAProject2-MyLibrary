const Book = require('../models/book');

module.exports = {
    create,
    delete: deleteReview,
};

function create(req, res) {
    Book.findById(req.params.id, function(err, book) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        book.reviews.push(req.body);
        book.save(function(err) {
            res.redirect(`/books/${book._id}`);
        });
    });
}

function deleteReview(req, res) {

    Book.findOne({ 'reviews._id': req.params.id, 'reviews.userId': req.user._id },
        function(err, book) {
            if (!book || err) return res.redirect(`/books/${book._id}`);
            book.reviews.remove(req.params.id);
            book.save(function(err) {
                res.redirect(`/books/${book._id}`);
            });
        }
    );
}

//async function deleteReview(req, res) {
//    const book = await Book.findOne({ 'reviews._id': req.params.id });
//    const review = book.reviews.id(req.params.id);
//    if (!review.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
//    review.remove();
//    await book.save();
//    res.redirect(`/books/${book._id}`);
//}