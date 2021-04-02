import express from 'express';
const router = express.Router();
import auth from '../../../middleware/auth';
import signIn from './signin';
import home from './home';

router.post('/auth/signin', (req, res) => {
    signIn.signIn(req, res)
});

router.get('/', auth, (req, res) => {
    home.home(req.res);
})

module.exports = router;