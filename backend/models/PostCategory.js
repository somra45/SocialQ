const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postCategorySchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required : true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required : true
    }
    }, {
    timestamps: true
    });
    
    module.exports = mongoose.model('PostCategory', postCategorySchema);