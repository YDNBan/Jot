const express = require('express');
const controller = require('../controllers/noteController');
const {verifyToken} = require('../middleware/verifyToken')

const router = express.Router();

router.post('/', verifyToken, controller.create); // Create Note
router.get('/', verifyToken, controller.index); // Fetch all Notes
router.get('/:id', verifyToken, controller.select); // Fetch a Note
router.put('/:id', verifyToken, controller.write); // Edit a Note
router.delete('/:id', verifyToken, controller.delete); // Delete a Note


