import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    // Create Schema for input
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required(),
    });

    // Validare input using schema
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation of input fail' });
    }
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
      user: {
        id,
        name,
        email,
      },
      // Data for jwt
      token: jwt.sign({ id }, authConfig.secretKey, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
