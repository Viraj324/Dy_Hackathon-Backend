// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 1) {
        // User is an admin, proceed to the next middleware
        next();
    } else {
        // User is not an admin, send a forbidden response
        res.status(403).json({ error: 'Permission denied. Admins only.' });
    }
};

// Middleware to check if the user is a normal user
const isNormalUser = (req, res, next) => {
    if (req.user && req.user.role === 0) {
        // User is a normal user, proceed to the next middleware
        next();
    } else {
        // User is not a normal user, send a forbidden response
        res.status(403).json({ error: 'Permission denied. Normal users only.' });
    }
};

module.exports = { isAdmin, isNormalUser };