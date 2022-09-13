const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const reactionSchema = new Schema(
//     {
//         name: {type: String, required: true },
//         photo: String,
//         comment: {type: String, required: true },
//         rating: {type: Number, required: true },
        
//     },
//     { timestamps: true }
// );

const chainSchema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        reaction: {
            name: {type : String },
            photo: {type : String},
            comment: {type: String},
            rating: {type: Number}, 
        }
    }
);

const Chain = mongoose.model('Chain', chainSchema);
module.exports = Chain;