const jwt = require('jsonwebtoken');
const User = require('../../models/auth/User');

const verifyToken = async (req, res, next) => {
  try {
    // Check if Authorization header exists and starts with 'Bearer'
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.',
      });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    // Verify token is valid and not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check user still exists in DB (e.g. account wasn't deleted after token was issued)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User no longer exists.',
      });
    }

    // Attach user to request so controllers can access it via req.user
    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token.',
      });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired. Please log in again.',
      });
    }
    next(err);
  }
};

module.exports = { verifyToken };