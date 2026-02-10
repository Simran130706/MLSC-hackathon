const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const algorandService = require('./blockchain/algorand');
const attendanceRoutes = require('./routes/attendance');


const votingRoutes = require('./routes/voting');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/voting', votingRoutes);
app.use('/api/attendance', attendanceRoutes);
// Demo data (replace with MongoDB in production)
let attendanceRecords = [];
let votes = [];
let certificates = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduChain API is running' });
});

// ============================================
// ATTENDANCE ROUTES
// ============================================

// Record attendance
app.post('/api/attendance/record', async (req, res) => {
  try {
    const { studentId, sessionId, status } = req.body;
    
    const attendanceData = {
      studentId,
      sessionId,
      status,
      date: new Date().toISOString(),
      timestamp: Date.now()
    };

    // Store on blockchain
    const blockchainResult = await algorandService.storeAttendanceProof(attendanceData);
    
    // Store in database (mock)
    const record = {
      ...attendanceData,
      blockchainTx: blockchainResult.transactionId,
      explorerUrl: blockchainResult.explorerUrl
    };
    
    attendanceRecords.push(record);

    res.json({
      success: true,
      message: 'Attendance recorded successfully',
      data: record
    });
  } catch (error) {
    console.error('Error recording attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record attendance',
      error: error.message
    });
  }
});

// Get attendance history
app.get('/api/attendance/:studentId', (req, res) => {
  const { studentId } = req.params;
  const records = attendanceRecords.filter(r => r.studentId === studentId);
  res.json({ success: true, data: records });
});

// ============================================
// VOTING ROUTES
// ============================================

// Cast vote
app.post('/api/votes/cast', async (req, res) => {
  try {
    const { pollId, studentId, option } = req.body;
    
    // Check if already voted
    const existingVote = votes.find(v => v.pollId === pollId && v.studentId === studentId);
    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: 'You have already voted in this poll'
      });
    }

    const voteData = {
      pollId,
      option,
      timestamp: Date.now()
    };

    // Store on blockchain (anonymous)
    const blockchainResult = await algorandService.storeVoteConfirmation(voteData);
    
    const receiptId = `VR-${Date.now()}-${Math.random().toString().slice(2, 8)}`;
    
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
        blockchainTx: vote.blockchainTx,
        explorerUrl: vote.explorerUrl,
        timestamp: vote.timestamp
      }
    });
  } catch (error) {
    console.error('Error casting vote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cast vote',
      error: error.message
    });
  }
});

// Verify vote receipt
app.get('/api/votes/verify/:receiptId', (req, res) => {
  const { receiptId } = req.params;
  const vote = votes.find(v => v.receiptId === receiptId);
  
  if (!vote) {
    return res.status(404).json({
      success: false,
      message: 'Vote receipt not found'
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

// ============================================
// CERTIFICATE ROUTES
// ============================================

// Issue certificate
app.post('/api/certificates/issue', async (req, res) => {
  try {
    const { studentId, title, issuedBy } = req.body;
    
    const certificateId = `CERT-${Date.now()}-${Math.random().toString().slice(2, 6)}`;
    
    const certificateData = {
      certificateId,
      studentId,
      title,
      issuedBy,
      issuedDate: new Date().toISOString()
    };

    // Store on blockchain
    const blockchainResult = await algorandService.storeCertificateHash(certificateData);
    
    const certificate = {
      ...certificateData,
      blockchainTx: blockchainResult.transactionId,
      explorerUrl: blockchainResult.explorerUrl
    };
    
    certificates.push(certificate);

    res.json({
      success: true,
      message: 'Certificate issued successfully',
      data: certificate
    });
  } catch (error) {
    console.error('Error issuing certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to issue certificate',
      error: error.message
    });
  }
});

// Verify certificate
app.get('/api/certificates/verify/:certificateId', (req, res) => {
  const { certificateId } = req.params;
  const certificate = certificates.find(c => c.certificateId === certificateId);
  
  if (!certificate) {
    return res.status(404).json({
      success: false,
      message: 'Certificate not found'
    });
  }

  res.json({
    success: true,
    data: {
      ...certificate,
      verified: true
    }
  });
});

// Get student certificates
app.get('/api/certificates/:studentId', (req, res) => {
  const { studentId } = req.params;
  const studentCerts = certificates.filter(c => c.studentId === studentId);
  res.json({ success: true, data: studentCerts });
});



// ============================================
// PARTICIPATION SCORE ROUTES
// ============================================

app.get('/api/participation/:studentId', (req, res) => {
  const { studentId } = req.params;

  // Attendance count
  const attendanceCount = attendanceRecords.filter(
    r => r.studentId === studentId
  ).length;

  // Votes count
  const voteCount = votes.filter(
    v => v.studentId === studentId
  ).length;

  // Certificates count
  const certificateCount = certificates.filter(
    c => c.studentId === studentId
  ).length;

  // Simple scoring formula
  const score =
    attendanceCount * 2 +
    voteCount * 3 +
    certificateCount * 5;

  res.json({
    success: true,
    data: {
      attendanceCount,
      voteCount,
      certificateCount,
      participationScore: score
    }
  });
});


// ============================================
// BLOCKCHAIN ROUTES
// ============================================

// Get account info
app.get('/api/blockchain/account', async (req, res) => {
  try {
    const balance = await algorandService.getBalance();
    res.json({
      success: true,
      data: balance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get account info',
      error: error.message
    });
  }
});

// Verify transaction
app.get('/api/blockchain/verify/:txId', async (req, res) => {
  try {
    const { txId } = req.params;
    const result = await algorandService.verifyTransaction(txId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to verify transaction',
      error: error.message
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ============================================
// START SERVER
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 EduChain API Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Blockchain: Algorand TestNet`);
});

module.exports = app;
