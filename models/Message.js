const {Schema, model, Types} = require('mongoose')

const message = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    chat: {type: Types.ObjectId, ref: 'Chat'},
})


module.exports = model('Message', message)