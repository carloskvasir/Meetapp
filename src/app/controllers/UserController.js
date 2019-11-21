import Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    // Create Schema for input data
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    // Verify if input is valid
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Data is not valid' });
    }
    const userExits = await User.findOne({ where: { email: req.body.email } });

    if (userExits)
      return res.status(403).json({ error: 'This user already exists. 😢' });

    const { id, name, email } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    // Create Schema for input data
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPasswod: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        // if oldPassword password is required
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      // if password is confirmPassword required
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    // Valitade
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fail.' });
    }

    const { email, oldPasswod } = req.body;

    const user = await User.findByPk(req.userId);

    // If request change of email
    if (email && email !== user.email) {
      const emailIsUsed = await User.findOne({ where: { email } });

      if (emailIsUsed) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
    }

    // Just if updating password
    if (oldPasswod && !(await user.checkThisPassword(oldPasswod))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    const { id, name } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
