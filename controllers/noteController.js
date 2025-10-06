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
    try {
        const userID = req.user._id;       
        // We only want the title and updatedAt field
        const userNotes = await Note.find({user: userID}).select('title updatedAt').sort({updatedAt: -1});
        return res.json({success: true, notes: userNotes})
    } catch(err){
        return res.status(500).json({success: false, message: "server error"});
    }
}

exports.select = async (req, res)=> {
    try {
        const userID = req.user._id;
        const noteID = req.note._id; // Will fix to "const noteID = req.params.id;"
        const note = await Note.findOne({user: userID, _id: noteID});
        // If note not found
        if(!note){ return res.status(404).json({success: false, message: "Note not found"})}

        return res.json({success: true, note})
    } catch(err) {
        return res.status(500).json({success: false, message: "server error"});
    }
}

exports.write = async (req, res)=> {
    
}

exports.delete = async (req, res)=> {
    try {
        const userID = req.user._id;
        const noteID = req.params.id;
        const result = await Note.deleteOne({user: userID, _id: noteID});
        if (result.deletedCount == 0){
            return res.status(404).json({message: "Note not found"})
        }
        return res.status(200).json({message: "Delete Succesful"});
    } catch (err){
                return res.status(500).json({success: false, message: "server error"});
    }
}