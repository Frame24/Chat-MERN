const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: false},
    chats: [{type: Types.ObjectId, ref: 'Chat'}],
    isOauth: {type: Boolean, default: false},
    vkUserId: {type: String, required: false},
    vkAccessToken: {type: String, required: false},
    vkUserName: {type: String, required: false},
})

module.exports = model('User', schema)