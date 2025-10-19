import authService from '../services/authService.js';

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await authService.registerUser(username, email, password);
    res.status(201).json({ msg: 'User registered successfully. Please log in.' });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] }); // Send specific error message
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.loginUser(email, password);
    res.json({ token, user });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ errors: [{ msg: err.message }] }); // Send specific error message
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};