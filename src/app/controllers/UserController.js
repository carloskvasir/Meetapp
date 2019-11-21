import User from '../models/User';

class UserController {
  async store(req, res) {
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
