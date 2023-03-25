const mongoose = require('mongoose');
const Book = require('./book');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

authorSchema.pre('deleteOne', { document: true, query: false }, async function (next) {

    try {
        const hasBook = await Book.exists({ author: this._id });

        if (hasBook) {
            next(new Error("This author still has books."));
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }

})

module.exports = mongoose.model('Author', authorSchema);