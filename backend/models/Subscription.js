const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required : true
    },
    subscribable: {
        type: Schema.Types.ObjectId,
        required : true
    },
    subscribableType: {
        type: String,
        required : true,
        enum: ['User','Category']
    }
    }, {
    timestamps: true
    });
    
    module.exports = mongoose.model('Subscription', subscriptionSchema);