import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect('mongodb+srv://macmowl:jpCsnwXqPI14l0Dg@cakecluster.dnwm1.mongodb.net/cakemanager?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;