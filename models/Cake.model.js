import mongoose from 'mongoose';

const CakeSchema = new mongoose.Schema({
    nbrPersons: {
        type: Number,
        required: true,
    },
    shape: {
        type: String,
        required: true,
    },
    tastes: {
        type: [String],
        required: true,
    },
    vegan: {
        type: Boolean,
    },
    decoration: {
        type: [String],
    },
    specificities: {
        type: String,
    },
    client: {
        id: {
            type: mongoose.ObjectId,
        },
        name: {
            type: String
        }
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    creator: {
        id: {
            type: mongoose.ObjectId,
        },
        username: {
            type: String
        }
    }
});

module.exports = mongoose.models.Cake || mongoose.model("Cake", CakeSchema);