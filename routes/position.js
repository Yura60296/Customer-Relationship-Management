const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/position');

router.get('/:category', passport.authenticate('jwt', {session: false}), controller.getByCategory);

router.post('/', passport.authenticate('jwt', {session: false}), controller.create);

router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.changeById);

router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);




module.exports = router;