const Shelf = require('../models/shelf');

module.exports = {
    index,
    create,
    delete: deleteShelf,
    create: addTitle,
};

function index(req, res) {
    Shelf.find({}, function(err, shelves) {
        res.render('shelves/index', { title: 'Your Library', shelves });
    });
}

function create(req, res) {
    const shelf = new Shelf(req.body);
    shelf.save(function(err) {
        console.log(err);
        if (err) return res.redirect('/shelves');
        res.redirect(`/shelves`);
    });
}

function deleteShelf(req, res) {
    Shelf.findByIdAndDelete(req.params.id, function(err) {
        res.redirect(`/shelves`);
    });
}

function addTitle(req, res) {
    const book = book.title(req.params.id, "title");
    Shelf.findById(req.params.id, function(err, book) {
        Shelf.push('books/:_id');
        res.redirect('/shelves/:_id');
    });
}