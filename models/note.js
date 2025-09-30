const mongoose = require('mongoose');


const noteSchema = new mongoose.Schema(
    {
        title: {type: String, default: "Untitled", },
        content: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }, 
    {timestamps: true }
);