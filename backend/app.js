require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { createUserValidator, loginValidator } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
}));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', () => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
