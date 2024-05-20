const express = require('express');
const participantController = require('../controllers/participantController');
const router = express.Router();

router.post('/join', participantController.join);
router.post('/leave', participantController.leave);
router.put('/constraints', participantController.changeConstraints);

module.exports = router;
