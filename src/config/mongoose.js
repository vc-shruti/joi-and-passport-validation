import mongoose, { mongo } from "mongoose";

// Exit application on error
mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

//connection
mongoose.connection.once('open', () => {
    console.log(`MongoDB connection`);
});

exports.connect = (envconfig, env) => {
    mongoose.connect( envconfig.mongoUri,  {useNewUrlParser: true});
    return mongoose.connection;
}