import { Router } from 'express';
import passport from 'passport';
const validator = require('express-joi-validation').createValidator({});
//imports files
import usersController from '../controllers/users/usersDetail.controller'
import bodySchema from '../validation/usersValidation';
import userRoutes from './users';

const router = Router();


//make routes for registration
router.post( '/registration', validator.body(bodySchema), usersController.save );

//make routes for registration
router.post( '/login', validator.body(bodySchema), usersController.login ); 

router.get( '/getUserInformation', passport.authenticate('jwt',{ session: false }), usersController.getUserInformation );

router.get('/users', userRoutes);


//exports routers
module.exports = router; 