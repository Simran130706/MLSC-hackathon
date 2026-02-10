const algosdk = require('algosdk');
const crypto = require('crypto');

/**
 * Algorand Blockchain Integration
 * This module handles all blockchain operations for EduChain
 */

class AlgorandService {
  constructor() {
    // Algorand TestNet configuration
    this.algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    this.algodServer = 'https://testnet-api.algonode.cloud';
    this.algodPort = '';
    
    this.algodClient = new algosdk.Algodv2(this.algodToken, this.algodServer, this.algodPort);
    
    // For demo purposes - In production, use secure key management
    this.account = null;
  }

  /**
   * Initialize account from mnemonic
   * In production, use environment variables and secure key storage
   */
  async initializeAccount(mnemonic) {
    try {
      this.account = algosdk.mnemonicToSecretKey(mnemonic);
      console.log('Algorand account initialized:', this.account.addr);
      return this.account.addr;
    } catch (error) {
      console.error('Error initializing account:', error);
      throw error;
    }
  }

  /**
   * Create hash of data for blockchain storage
   */
  createHash(data) {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(data))
      .digest('hex');
  }

  /**
   * Store attendance proof on blockchain
   */
  async storeAttendanceProof(attendanceData) {
    try {
      // Create hash of attendance data
      const hash = this.createHash({
        studentId: attendanceData.studentId,
        date: attendanceData.date,
        sessionId: attendanceData.sessionId,
        status: attendanceData.status,
        timestamp: Date.now()
      });

      // Get suggested transaction parameters
      const params = await this.algodClient.getTransactionParams().do();

      // Create note with hash
      const note = new Uint8Array(Buffer.from(hash));

      // Create transaction (0 ALGO payment to self with note)
      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: this.account.addr,
        to: this.account.addr,
        amount: 0,
        note: note,
        suggestedParams: params
      });

      // Sign transaction
      const signedTxn = txn.signTxn(this.account.sk);

      // Submit transaction
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();

      // Wait for confirmation
      await this.waitForConfirmation(txId);

      console.log('Attendance proof stored on blockchain:', txId);

      return {
        success: true,
        transactionId: txId,
        hash: hash,
        explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
      };
    } catch (error) {
      console.error('Error storing attendance proof:', error);
      throw error;
    }
  }

  /**
   * Store vote confirmation on blockchain
   */
  async storeVoteConfirmation(voteData) {
    try {
      // Create anonymous hash (doesn't include voter identity)
      const hash = this.createHash({
        pollId: voteData.pollId,
        option: voteData.option,
        timestamp: Date.now(),
        // Add salt for uniqueness
        salt: crypto.randomBytes(16).toString('hex')
      });

      const params = await this.algodClient.getTransactionParams().do();
      const note = new Uint8Array(Buffer.from(hash));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: this.account.addr,
        to: this.account.addr,
        amount: 0,
        note: note,
        suggestedParams: params
      });

      const signedTxn = txn.signTxn(this.account.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      await this.waitForConfirmation(txId);

      console.log('Vote confirmation stored on blockchain:', txId);

      return {
        success: true,
        transactionId: txId,
        hash: hash,
        explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
      };
    } catch (error) {
      console.error('Error storing vote confirmation:', error);
      throw error;
    }
  }

  /**
   * Store certificate hash on blockchain
   */
  async storeCertificateHash(certificateData) {
    try {
      const hash = this.createHash({
        certificateId: certificateData.certificateId,
        studentId: certificateData.studentId,
        title: certificateData.title,
        issuedBy: certificateData.issuedBy,
        issuedDate: certificateData.issuedDate,
        timestamp: Date.now()
      });

      const params = await this.algodClient.getTransactionParams().do();
      const note = new Uint8Array(Buffer.from(hash));

      const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: this.account.addr,
        to: this.account.addr,
        amount: 0,
        note: note,
        suggestedParams: params
      });

      const signedTxn = txn.signTxn(this.account.sk);
      const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
      await this.waitForConfirmation(txId);

      console.log('Certificate hash stored on blockchain:', txId);

      return {
        success: true,
        transactionId: txId,
        hash: hash,
        explorerUrl: `https://testnet.algoexplorer.io/tx/${txId}`
      };
    } catch (error) {
      console.error('Error storing certificate hash:', error);
      throw error;
    }
  }

  /**
   * Verify transaction on blockchain
   */
  async verifyTransaction(txId) {
    try {
      const txInfo = await this.algodClient.pendingTransactionInformation(txId).do();
      
      return {
        verified: true,
        confirmedRound: txInfo['confirmed-round'],
        note: txInfo.txn.txn.note ? Buffer.from(txInfo.txn.txn.note).toString() : null
      };
    } catch (error) {
      console.error('Error verifying transaction:', error);
      return {
        verified: false,
        error: error.message
      };
    }
  }

  /**
   * Wait for transaction confirmation
   */
  async waitForConfirmation(txId) {
    const timeout = 10; // rounds
    let lastRound = (await this.algodClient.status().do())['last-round'];
    
    while (true) {
      const pendingInfo = await this.algodClient.pendingTransactionInformation(txId).do();
      
      if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
        console.log(`Transaction confirmed in round ${pendingInfo['confirmed-round']}`);
        return pendingInfo;
      }
      
      lastRound++;
      await this.algodClient.statusAfterBlock(lastRound).do();
      
      if (lastRound > pendingInfo['pool-error'] + timeout) {
        throw new Error('Transaction not confirmed after ' + timeout + ' rounds');
      }
    }
  }

  /**
   * Get account balance
   */
  async getBalance() {
    try {
      const accountInfo = await this.algodClient.accountInformation(this.account.addr).do();
      return {
        balance: accountInfo.amount / 1000000, // Convert microAlgos to Algos
        address: this.account.addr
      };
    } catch (error) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }
}

// Export singleton instance
module.exports = new AlgorandService();
