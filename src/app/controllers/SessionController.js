import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    // This user exists?
    if (!user) {
      return res.status(401).json({ error: 'User not found 😒' });
    }

    // This is right pass?
    if (!(await user.checkThisPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    return res.json({
      user: { id, name, email },

      // Data for jwt
      token: jwt.sing({ id }, authConfig.secretKey, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
