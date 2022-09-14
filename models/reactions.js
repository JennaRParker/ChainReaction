const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reactionSchema = new Schema(
    {
        name: {type: String, required: true },
        photo: String,
        comment: {type: String, required: true },
        rating: {type: Number, required: true },
        
    },
    { timestamps: true }
);

const Reaction = mongoose.model('Reaction', reactionSchema);
module.exports = Reaction