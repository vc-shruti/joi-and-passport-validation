import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';

import routes from './app/routes';
import environment from '../environment';
import mongoose from './config/mongoose';

require('./config/passport')(passport);


// env variables setup
const env = process.env.NODE_ENV;      // getting application environment
const envConfig = environment[env];    // getting application config based on environment
const PORT = envConfig.port || 3000;   // setting port value


//instance of express
const app = express();

// open mongoose connection
mongoose.connect(envConfig, env);

//bodyParser for Pasre body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit:"100kb" }));

// mount api routes
app.use('/', routes);

app.use(passport.initialize());

app.listen(PORT, function() {
    console.log('helloo...server');
});