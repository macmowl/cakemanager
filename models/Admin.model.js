import mongoose from 'mongoose';
import validator from "validator";

const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Email is invalid"]
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    phone: {
        type: String,
    },
}, {
    timestamps: true
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);