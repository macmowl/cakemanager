import mongoose from 'mongoose';
import validator from "validator";

const ClientSchema = new mongoose.Schema({
    name: {
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
    adress: {
        type: String,
    },
    zipCode: {
        type: Number,
    },
    city: {
        type: String,
    },
    phone: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    }
});

module.exports = mongoose.models.Client || mongoose.model("Client", ClientSchema);