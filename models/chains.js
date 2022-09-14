const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chainSchema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
    }
);

const Chain = mongoose.model('Chain', chainSchema);
module.exports = Chain;