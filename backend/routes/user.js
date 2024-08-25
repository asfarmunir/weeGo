
const router = require('express').Router();

const { registerNewUser, loginUser, getLoggedInUser } = require('../controllers/user');

router.post('/register', registerNewUser).post('/login', loginUser).post('/', getLoggedInUser);

module.exports = router;


