// In this MVC arch. the model files represent the schema of whatever 
// our model is for our specific choice of database, which is MongoDB in this case.

// Create User model
// username, email, password
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define Schema
const userSchema = new mongoose.Schema
(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true, lowercase: true},
        password: {type: String, required: true}
    },
    {timestamps: true}
);

// Scehma logic and functionality v

    // Password saving functionaility

userSchema.pre('save', async function (next) { // pre('save', functiom) tells mongoose to execute this function first before saving
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); // This lets mongoose know the logic is done and to save the document. Mongoose will not save without this
});

    // Password comparing functionaility
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

// Schema logic and functionality ^


const User = mongoose.model('User', userSchema); 
//  ^ Here, we officially named the model that we registered to Mongoose as "User" ^
module.exports = User;