const Shelf = require('../models/shelf');

module.exports = {
    index,
    create,
    delete: deleteShelf,
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

function deleteShelf(req, res) {
    Shelf.findByIdAndDelete(req.params.id, function(err) {
        res.redirect(`/shelves`);
    });
}

// function deleteShelf(req, res) {
//   Shelf.findOne({ 'shelves._id': req.params.id }, function(err, shelves) {
//        const shelfSubdoc = shelf.shelves.id(req.params.id);
//        shelfSubdoc.remove();
//        shelf.save(function(err) {
//            res.redirect(`shelves/index`);
//        });
//    });
//}