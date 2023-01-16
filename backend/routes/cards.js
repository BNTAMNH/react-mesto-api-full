const router = require('express').Router();

const {
  createCard,
  getCards,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { createCardValidator, cardIdValidator } = require('../middlewares/validation');

router.post('/', createCardValidator, createCard);
router.get('/', getCards);
router.delete('/:cardId', cardIdValidator, deleteCardById);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
