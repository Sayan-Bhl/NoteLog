const mongoose = require('mongoose');
const { Schema } = mongoose;


const notesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    ufile:{
		data: Buffer,
		contentType: String,
        name:String
	},
    date: {
        type: Date,
        default: Date.now
    },
    backgroundColor: {
        type:String,
        default: null
    }
})


module.exports = mongoose.model('notes', notesSchema)