const { Router } = require('express');
const passport = require('../config/passport');
const {
  UserController,
} = require('../controllers');

const router = Router();

router.post('/login', passport.authenticate('login', { session: false }), UserController.authenticate);
router.post('/logout', UserController.logout);
router.post('/register', UserController.register);

router.route('/user/:id')
  .put(UserController.update)
  .delete(UserController.delete);

module.exports = router;