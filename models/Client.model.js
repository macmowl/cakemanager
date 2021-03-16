import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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