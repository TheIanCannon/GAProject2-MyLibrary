const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: String,
    rating: { type: Number, min: 1, max: 5, default: 3 },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    userName: String,
    userAvatar: String
}, {
    timestamps: true
});

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    pubDate: { type: Date },
    reviews: [reviewSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);