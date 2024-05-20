const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.get('/:id', chatController.getChat);
router.post('/:id/message', chatController.sendMessage);

module.exports = router;
