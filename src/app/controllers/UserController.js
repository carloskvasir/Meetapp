import User from '../models/User';

class UserController {
  async store(req, res) {
    const newUser = await User.create({
      name: 'aaa',
      email: '3aaa@aa.aa',
      password_hash: '123456',
    });

    return res.json(newUser);
  }
}

export default new UserController();
