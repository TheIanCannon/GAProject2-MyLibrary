const Book = require('../models/book');

module.exports = {
    index,
    show,
    new: newBook,
    create
};

function index(req, res) {
    Book.find({}, function(err, books) {
        res.render('books/index', { title: 'All Books', books });
    });
}

function show(req, res) {
    Book.findById(req.params.id)
        .populate('cast')
        .exec(function(err, book) {
            Performer.find(
                // query object
                { _id: { $nin: book.cast } },
                function(err, performers) {
                    console.log(performers)
                    res.render('books/show', { title: 'Book Detail', book, performers });
                }
            );
        });
}

function newBook(req, res) {
    res.render('books/new', { title: 'Add Book' });
}

function create(req, res) {
    // convert nowShowing's checkbox of nothing or "on" to boolean
    req.body.nowShowing = !!req.body.nowShowing;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const book = new Book(req.body);
    book.save(function(err) {
        if (err) return res.redirect('/books/new');
        console.log(book);
        res.redirect(`/books/${book._id}`);
    });
}