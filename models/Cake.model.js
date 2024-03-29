import mongoose from 'mongoose';
require('./Client.model');
require('./Admin.model');

const CakeSchema = new mongoose.Schema({
    nbrPersons: {
        type: Number,
        default: 6,
    },
    shape: {
        type: String,
        default: 'circle',
    },
    tastes: {
        type: [String],
        required: true,
    },
    vegan: {
        type: Boolean,
        default: false,
    },
    decoration: {
        type: [String],
    },
    specificities: {
        type: String,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
    state: {
        type: String,
        default: 'Not started'
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    isForDelivery: {
        type: Boolean
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }
}, {timestamps: true});

module.exports = mongoose.models.Cake || mongoose.model("Cake", CakeSchema);