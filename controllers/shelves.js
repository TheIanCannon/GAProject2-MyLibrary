const Shelf = require('../models/shelf');
const Book = require('../models/book');

module.exports = {
    index,
    create,
    delete: deleteShelf,
    addTitle,
    removeTitle,
};

function index(req, res) {
    Shelf.find({ user: req.user._id }).populate("books").exec(function(err, shelves) {
        res.render('shelves/index', { title: 'Your Library', shelves });
    });
}

function create(req, res) {
    const shelf = new Shelf(req.body);
    shelf.user = req.user._id;
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
    const regex = new RegExp(req.body.title, "i");
    Book.findOne({ title: { $regex: regex } }, function(err, book) {
        Shelf.findById(req.params.id, function(err, shelf) {
            console.log(book._id);
            shelf.books.push(book._id);
            shelf.save(function(err) {
                res.redirect(`/shelves`);
            });
        });
    });
}

function removeTitle(req, res) {
    Shelf.findById(req.params.shelfid, function(err, shelf) {
        shelf.books.remove(req.params.titleid);
        shelf.save(function(err) {
            res.redirect(`/shelves`);
        });
    });
}