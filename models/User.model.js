import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'An valid email is required'],
        match: /.+\@.+\..+/,
        unique: true
    },
    password: {
        type: String,
        minlength: [8, 'A password cannot be less than 8 characters'],
        required: [true, 'A password is required']
    },
    username: {
        type: String,
        required: [true, 'A username is required'],
        minlength: [3, 'A username cannot be less than 3 characters']
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);