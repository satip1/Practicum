// мидлверы для авторизации и защиты роутов

const jwt = require('jsonwebtoken');

const ErrorLogin = require('../errors/ErrorLogin');
const { SECRET_CODE } = require('../constants/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  // если авторизации нет или не содержит Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorLogin('Необходима авторизация 1'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_CODE);
  } catch (err) {
    return next(new ErrorLogin('Необходима авторизация 2'));
  }

  req.user = payload;
  // console.log('auth _id ', req.user._id);
  return next();
};
