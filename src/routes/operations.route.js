const express = require('express');
const { performOperation, getHistory, clearHistory, resetHistory} 
     = require('../controllers/operation.controller.js');

const router = express.Router();

router.post('/operations', performOperation);
router.get('/operations', getHistory);
router.delete('/operations/:id', clearHistory);
router.delete('/operations', resetHistory);

module.exports = router;