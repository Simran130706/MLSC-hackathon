const express = require('express');
const router = express.Router();
const algorandService = require('../blockchain/algorand');

let attendanceRecords = [];

// Record attendance
router.post('/record', async (req, res) => {
  try {
    const { studentId, sessionId, status } = req.body;

    const attendanceData = {
      studentId,
      sessionId,
      status,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    const blockchainResult = await algorandService.storeAttendanceProof(attendanceData);

    const record = {
      ...attendanceData,
      blockchainTx: blockchainResult.transactionId,
      explorerUrl: blockchainResult.explorerUrl
    };

    attendanceRecords.push(record);

    res.json({ success: true, data: record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get attendance history
router.get('/:studentId', (req, res) => {
  const records = attendanceRecords.filter(
    r => r.studentId === req.params.studentId
  );
  res.json({ success: true, data: records });
});

module.exports = router;
