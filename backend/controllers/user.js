const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'weyoungins'

const registerNewUser = async (req, res) => {
  try {
    console.log('Incoming data:', req.body);
    const { data } = req.body;

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;



    const user = new User(data);
    await user.save();
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);
    
    return res.status(201).json({
      message: 'User created successfully',
       user,
      token
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return res.status(400).json({ error: error.message });
  }
};


const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET);
        return res.status(200).json({ message: 'User logged in successfully', token , user });
        
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(400).json({ error: error.message });
    }
}

const getLoggedInUser = async (req, res) => {
    try {
        const { token } = req.body;

        const userData = jwt.verify(token, JWT_SECRET);
        if (!userData) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        const user = await User.findOne({ email : userData.email });
        return res.status(200).json({ message: 'User fetched:', data: user });
        

    }
    catch (error) {
        console.error('Error during user login:', error);
        return res.status(400).json({ error: error.message });
    }
}







module.exports = { registerNewUser, loginUser,getLoggedInUser };
