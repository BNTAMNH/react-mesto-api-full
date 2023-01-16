const router = require('express').Router();
const {
  getUsers,
  getUserById,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

const {
  updateAvatarValidator,
  updateUserValidator,
  userIdValidator,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:id', userIdValidator, getUserById);
router.patch('/me', updateUserValidator, updateUserInfo);
router.patch('/me/avatar', updateAvatarValidator, updateUserAvatar);

module.exports = router;
