const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema(
    {
        name: String,
        photo: String,
        comment: String,
        rating: Number,
    }
);

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction;

const chainSchema = new Schema(
    {
        name: String,
        logo: String,
        breakfast: { type: Boolean, default: true },
        dessert: { type: Boolean, default: true },
        drinks: { type: Boolean, default: true},
    }
);

const Chain = mongoose.model('Chain', chainSchema);
module.exports = Chain;