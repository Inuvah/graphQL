const { isInteger, identity } = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    name: String,
    amount: String,
    date: String,
    id: String
})

module.exports = mongoose.model('purchase', purchaseSchema);