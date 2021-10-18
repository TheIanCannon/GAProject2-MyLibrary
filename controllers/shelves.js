const Shelf = require('../models/shelf');

module.exports = {
    index,
    create,
};

function index(req, res) {
    Shelf.find({}, function(err, shelves) {
        res.render('shelves/index', { title: 'Your Library', shelves });
    });
}

function create(req, res) {
    Shelf.findById(req.params.id, function(err, shelf) {
        shelf.shelves.push(req.body);
        shelf.save(function(err) {
            res.redirect(`/shelves/${req.params.id}`);
        });
    });
}