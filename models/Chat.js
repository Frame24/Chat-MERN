const {Schema, model, Types} = require('mongoose')

const chat = new Schema({
    /*_id: {type: String, required: true},
    seq: { type: Number, default: 0 },*/
    name: {type: String, required: true},
    password: {type: String, required: true},
    history: [{type: Types.ObjectId, ref: 'Message'}],
    owner: {type: Types.ObjectId, ref: 'User'},
    users: [{type: Types.ObjectId, ref: 'User', unique: false}],
    date: {type: Date, default: Date.now},
})

var counter = model('Chat', chat)

/*var entitySchema = new Schema({
    testvalue: {type: String}
});

entitySchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        doc.testvalue = counter.seq;
        next();
    });
});*/

module.exports = counter