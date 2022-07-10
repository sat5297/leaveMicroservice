const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leavesController');

router.route('/apply')
        .post(leaveController.applyLeave)

router.route('/approve')
        .post(leaveController.approveLeave)

router.route('/request')
        .post(leaveController.leaveRequest)

module.exports = router;