const Note = require('../models/note');

exports.create = async (req, res)=> {
    try {
        const userID = req.user._id;
        const newNote = new Note({user: userID});
        await newNote.save();

        if (newNote){
            return res.status(201).json(newNote);
        }

    } catch(err) {
        return res.status(500).json({message: "server error"});
    }
    
}

exports.index = async (req, res)=> {
    
}

exports.select = async (req, res)=> {
    
}

exports.write = async (req, res)=> {
    
}

exports.delete = async (req, res)=> {
    
}