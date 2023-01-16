const { celebrate, Joi } = require('celebrate');

module.exports.createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/https?:\/\/\S+/),
  }),
});

module.exports.cardIdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/\S+/),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/\S+/),
  }),
});

module.exports.userIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});
