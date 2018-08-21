var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    firstName: { type: String, required: [true, 'First Name cannot be empty!'] },
    lastName: { type: String, required: [true, 'Last Name cannot be empty!'] },
    email: { type: String, required: [true, 'Email cannot be empty!'] },
    password: { type: String, minlength: 8, maxlength: 15 }
});

module.exports = User = mongoose.model('User', userSchema);