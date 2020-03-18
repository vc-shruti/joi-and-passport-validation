import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import passport from 'passport';

import User from "../../models/users.model";
import config from "../../../config/config";
import sendEmails from '../../../utils/email';


require('../../../config/passport')(passport);

exports.save = async (req, res) => {
    try {
        let users = new User(req.body);
        await users.save( function( err, user ) {
            if( err ) {
                console.log(new Error(err));
                res.status(200).send({
                    msg: "cant saved user..!!",
                    user: user,
                    error: []
                });
            } else {
                let params = {
                    to : user.email,
                    subject : 'User Registration ...!!',
                    text : 'successful saved user...!!',
                    html : '<h5>welcome...!!1</h5>'
                };
                sendEmails(params, (err, data) => {
                    if( err ) {
                        console.log(new Error(err));
                        res.status(400).send({
                            msg : "cant send Email",
                            user : []
                        });
                    } else {
                        res.status(200).send({
                            msg: "successful saved data..!!",
                            user: data,
                            error: []
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(new Error(err));
        res.status(400).send({
            msg: "failed to load request",
            error: err,
            user: []
        });
    }
};


exports.login = async( req, res ) => {
    try {
        await User.findOne({ email: req.body.email }, (err, user) => {
            if ( err ) {
                console.log(new Error(err));
                res.status(400).send({
                    msg: "error..!!",
                    token: [],
                    error: err
                });
            } 
            if (!user) {
                res.status(400).send({
                    msg: "The email is not registered..!!",
                    token: [],
                    error: []
                });
            } 
            bcrypt.compare(req.body.password, user.password, function( err ) {
                if ( err ) {
                    console.log(new Error(err));
                    res.status(400).send({
                        msg: "incoreect password",
                        token: [],
                        error: err
                    });
                } else {
                    jwt.sign({ userId : user._id}, config.JWTSecret, { expiresIn: '1h' }, function( err, token ) {
                        if ( err ) {
                            console.log(new Error(err));
                            res.status(400).send({
                                msg: "Token not generated...!!",
                                token: [],
                                error: []
                            });
                        } else {
                            res.status(200).send({
                                msg: "successfull login...!!",
                                user: token,
                                error: []
                            });
                        }
                    });
                } 
            });
        });
    } catch(err) {
        console.log(new Error(err));
        res.status(400).send({  
            msg: "Failed to login request",
            error: err,
            token: []
        });
    }
}

exports.getUserInformation = async( req, res ) => {
    try {
        User.findById(req.user._id, function(err, user) {
            if( err ) {
                console.log(new Error(err));
                res.status(400).send({
                    msg : "error..!!",
                    user : [],
                    err : err
                });
            } else {
                if( user ) {
                    res.status(200).send({
                        msg: "find user..!!!",
                        user: user,
                        err: err
                    });
                } else {
                    res.status(400).send({
                        msg: "Cant find user..!!!",
                        user: [],
                        err: []
                    });
                }
            }
        });
    } catch( err ) {
        console.log(new Error(err));
        res.status(400).send({  
            msg: "Failed to getUser request",
            error: err,
            token: []
        });
    }
}