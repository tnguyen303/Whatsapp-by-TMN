const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: [5, 'Password has to be 5 characters minimum!']
    }
})

const User = mongoose.model('User', UserSchema);
module.exports = User;