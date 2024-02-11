const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// Example hashPassword function using bcrypt
const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

// Example generateAuthToken function (you may use a library like jsonwebtoken)
const generateAuthToken = (user) => {
    const secretKey = 'your-secret-key'; // Replace with a secure secret key
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    return token;
};
//Makingg Changes Addng Commit
// Example comparePasswords function using bcrypt
const comparePasswords = async (inputPassword, hashedPassword) => {
    return bcrypt.compare(inputPassword, hashedPassword);
};


const registerController = async (req, res) => {
    try {
        // Assuming you are using a body parser to parse JSON data from the request
        const { username, email, password } = req.body;
        

        // Perform validation on input data
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the user already exists in the database (pseudo-code)
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Hash the password (you may want to use a library like bcrypt)
        const hashedPassword = await hashPassword(password);

        // Create a new user in the database (pseudo-code)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save(); // Save the user to the database
        const token = generateAuthToken(newUser);

        // You may also generate a token for authentication at this point

        res.status(201).json({ suceess: true, message: 'User registered successfully', newUser,token });
    } catch (error) {
        console.error('Error in registration controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginController = async (req, res) => {
    try {
        // Assuming you are using a body parser to parse JSON data from the request
        const { email, password } = req.body;
        console.log(email,password);

        // Perform validation on input data
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Check if the user exists in the database (pseudo-code)
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password (you may want to use a library like bcrypt)
        const isPasswordValid = await comparePasswords(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a token for authentication (pseudo-code)
        const token = generateAuthToken(user);

        res.status(200).json({ success:true, user, token });
    } catch (error) {
        console.error('Error in login controller:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};






module.exports = { registerController , loginController};

