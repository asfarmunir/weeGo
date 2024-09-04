
const router = require('express').Router();

const { registerNewUser, loginUser, getLoggedInUser, addDriverProfile } = require('../controllers/user');

router.post('/register', registerNewUser).post('/login', loginUser).post('/', getLoggedInUser).post('/addDriverProfile', addDriverProfile);

module.exports = router;


