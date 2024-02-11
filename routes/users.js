const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');
const {isAdmin, isNormalUser} = require('../middlewares/auth');

const router = express.Router();

//register
router.post('/register', registerController);

//login
router.post('/login', loginController);




// Example route for admin authentication
router.get('/admin-auth', isAdmin, (req, res) => {
    // If the middleware passes, this route is only accessible to admins
    res.json({ message: 'Admin authenticated successfully.' });
});

// Example route for user authentication
router.get('/user-auth', isNormalUser, (req, res) => {
    // If the middleware passes, this route is only accessible to normal users
    res.json({ message: 'Normal user authenticated successfully.' });
});



module.exports = router;