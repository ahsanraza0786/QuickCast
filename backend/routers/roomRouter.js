const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roomController = require('../controllers/roomController');

router.post('/create', auth, roomController.createRoom);
router.get('/presenter', auth, roomController.getPresenterRooms);
router.get('/:code', auth, roomController.getRoomByCode);
router.get('/:code/check', roomController.checkRoom);
router.post('/join/:code', roomController.joinRoom);
router.get('/:code/participants', auth, roomController.getParticipants);
router.get('/:code/polls', roomController.getRoomPolls);
router.delete('/:code', auth, roomController.deleteRoom);
router.get('/:code/details', auth, roomController.getRoomDetails);
router.post('/:code/presentation', auth, roomController.updatePresentation);
router.get('/all', roomController.getAllRooms);

module.exports = router;
