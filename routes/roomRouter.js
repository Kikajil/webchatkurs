const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

router.get('/:id', roomController.getRoom);
router.post('/', roomController.createRoom);
router.delete('/:id', roomController.deleteRoom);

module.exports = router;
