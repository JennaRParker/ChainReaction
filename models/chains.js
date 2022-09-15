const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reaction = new Schema(
    {
        order: {type: String, required: true },
        comment: {type: String, required: true },
        rating: {type: Number, required: true }, 
        menu: {type: String},
    },
);

const chainSchema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        reaction: [Reaction]
    }
);

const Chain = mongoose.model('Chain', chainSchema);
module.exports = Chain;