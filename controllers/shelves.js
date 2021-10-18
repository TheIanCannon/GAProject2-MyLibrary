const Shelf = require('../models/shelf');

module.exports = {
    index,
};

function index(req, res) {
    Shelf.find({}, function(err, books) {
        res.render('/shelves/index', { title: 'All Books', books });
    });
}