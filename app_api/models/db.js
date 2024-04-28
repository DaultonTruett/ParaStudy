const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/parastudy`;
const readLine = require('readline');

const connect = () => {
    setTimeout( () => mongoose.connect(dbURI, {
    }), 1000);
};


// monitor connections
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to: ', dbURI)
});

mongoose.connection.on('erroor', err => {
    console.log("Mongoose connection error: ", err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

if(process.platform === 'win32'){
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
};

const gracefulShutdown = (msg) => {
    mongoose.connection.close( () => {
        console.log('Mongoose disconnected through', msg);
    });
};

// nodemon
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemone restart');
        process.kill(process.pid, 'SIGUSR2');
});

// app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination');
        process.exit(0);
});

// container termination
process.on('SIGTERM', () => {
    gracefulShutdown('app shutdown');
    process.exit(0);
});

// make connection
connect();

// pull in models
require('./medications');


module.exports = mongoose;