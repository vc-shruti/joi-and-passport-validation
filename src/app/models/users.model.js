import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import passport from 'passport';

//const salt = 13;
//define schema of userSchema
var usersSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        index: true
    },
    password : {
        type : String   
    }
},{collection: 'userRegistration'});

//make bcrypt 
usersSchema.pre('save', function(next) {
    var user = this;
    //console.log(user);
    if( this.isNew ) {
        bcrypt.genSalt(13, (err, salt) => {
            if (err) {
                return next(err);
            }
            console.log(this.password);
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                console.log(hash);
                this.password = hash;   
                next();
            });
       });
    } else {
        return next();
    }
});

// usersSchema.methods.comparePassword = function(password, cb) {
//     console.log(this.password);
//     bcrypt.compare(password, this.password, function(err, isMatch) {
//         if ( err ) {
//             cb(err);
//         } 
//         cb(null, isMatch);
//     });
// };

//make model of users
var users = mongoose.model( 'userRegistration', usersSchema );

//exports model of users
module.exports = users;