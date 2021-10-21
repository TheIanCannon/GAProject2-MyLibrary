const Book = require('../models/book');

module.exports = {
    index,
    new: newBook,
    create,
    show,
    edit,
    update,
};

function index(req, res) {
    Book.find({}, function(err, books) {
        res.render('books/index', { title: 'All Books', books });
    });
}

function newBook(req, res) {
    res.render('books/new', { title: 'New Book' })
}

function create(req, res) {
    req.body.user = req.user._id;
    const book = new Book(req.body);
    book.save(function(err) {
        if (err) return res.redirect('/books/new');
        res.redirect(`/books/`);
    });
}

function show(req, res) {
    Book.findById(req.params.id, function(err, book) {
        res.render('books/show', {
            title: "Book Details",
            book,
        });
    });
}

function edit(req, res) {
    Book.findById(req.params.id, function(err, book) {
        if (!book.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        res.render('books/edit', { book });
    });
}

function update(req, res) {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, book) {
        if (!book.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
        if (err || !book) return res.redirect('/books');
        res.redirect(`/books/${req.params.id}`)
    });
}