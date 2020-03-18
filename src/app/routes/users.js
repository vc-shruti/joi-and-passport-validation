import { Router } from 'express';


const router = Router();

router.get('/users', function(req, res) {
    res.send('hii');
});

module.exports = router; 
