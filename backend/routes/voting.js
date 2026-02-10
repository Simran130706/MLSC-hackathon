const express = require('express');
const router = express.Router();
const algorandService = require('../blockchain/algorand');

// In-memory storage (later replace with MongoDB)
let votes = [];
let polls = [];

/* ===========================
   CREATE POLL (Teacher)
=========================== */
router.post('/create', (req, res) => {
  const { title, options } = req.body;

  const poll = {
    pollId: `POLL-${Date.now()}`,
    title,
    options,
    createdAt: new Date(),
    active: true
  };

  polls.push(poll);

  res.json({
    success: true,
    message: 'Poll created successfully',
    data: poll
  });
});

/* ===========================
   GET ALL POLLS
=========================== */
router.get('/polls', (req, res) => {
  res.json({
    success: true,
    data: polls
  });
});

/* ===========================
   CAST VOTE
=========================== */
router.post('/cast', async (req, res) => {
  try {
    const { pollId, studentId, option } = req.body;

    // Check if already voted
    const existingVote = votes.find(
      v => v.pollId === pollId && v.studentId === studentId
    );

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted'
      });
    }

    const voteData = {
      pollId,
      option,
      timestamp: Date.now()
    };

    // Store on blockchain
    const blockchainResult = await algorandService.storeVoteConfirmation(voteData);

    const receiptId = `VR-${Date.now()}-${Math.random().toString().slice(2, 6)}`;

    const vote = {
      receiptId,
      pollId,
      studentId,
      option,
      timestamp: new Date().toISOString(),
      blockchainTx: blockchainResult.transactionId,
      explorerUrl: blockchainResult.explorerUrl
    };

    votes.push(vote);

    res.json({
      success: true,
      message: 'Vote recorded successfully',
      data: {
        receiptId: vote.receiptId,
        timestamp: vote.timestamp,
        blockchainTx: vote.blockchainTx
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to cast vote',
      error: error.message
    });
  }
});

/* ===========================
   VERIFY RECEIPT
=========================== */
router.get('/verify/:receiptId', (req, res) => {
  const vote = votes.find(v => v.receiptId === req.params.receiptId);

  if (!vote) {
    return res.status(404).json({
      success: false,
      message: 'Receipt not found'
    });
  }

  res.json({
    success: true,
    data: {
      receiptId: vote.receiptId,
      timestamp: vote.timestamp,
      blockchainTx: vote.blockchainTx,
      verified: true
    }
  });
});

module.exports = router;
