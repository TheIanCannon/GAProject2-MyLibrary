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
    console.log("Hi!");
    const shelf = new Shelf(req.body);
    shelf.save(function(err) {
        console.log(err);
        if (err) return res.redirect('/shelves');
        res.redirect(`/shelves`);
    });
}