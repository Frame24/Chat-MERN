const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    caption: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'User'},
})

module.exports = model('Note',schema)