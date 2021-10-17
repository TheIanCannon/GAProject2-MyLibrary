const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shelfSchema = new Schema({
    name: { type: String, required: true },
    books: [books],
}, {
    timestamps: true
});

module.exports = mongoose.model('Shelf', shelfSchema);