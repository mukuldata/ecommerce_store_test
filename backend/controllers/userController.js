const User = require('../models/User');

// Get the user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user); // user id from the JWT
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User profile', user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile' });
  }
};

module.exports = { getUserProfile };
