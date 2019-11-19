import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const newUser = await User.create({
    name: 'aaa',
    email: 'aaa@aa.aa',
    password_hash: '123456',
  });

  return res.json(newUser);
});

export default routes;
