import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Vote,
  CheckCircle2,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Download,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const VotingPage = ({ user }) => {
  const [selectedPoll, setSelectedPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const activePolls = [
    {
      id: 1,
      title: 'Best Cultural Event Theme',
      description: 'Vote for the annual fest theme for TechFest 2025',
      options: ['Retro 80s', 'Futuristic Neon', 'Traditional Indian', 'Hollywood Glamour'],
      endDate: '2025-02-15',
      totalVotes: 234,
      isAnonymous: true,
      status: 'active'
    },
    {
      id: 2,
      title: 'Preferred Exam Schedule',
      description: 'Choose your preferred examination time slot',
      options: ['Morning (9 AM - 12 PM)', 'Afternoon (2 PM - 5 PM)', 'Evening (5 PM - 8 PM)'],
      endDate: '2025-02-12',
      totalVotes: 187,
      isAnonymous: false,
      status: 'active'
    }
  ];

  const completedPolls = [
    {
      id: 3,
      title: 'Best Teacher Award',
      myVote: 'Dr. Sharma',
      votedAt: '2025-02-08',
      receiptId: 'VR-2025-001234',
      blockchainTx: 'ALG-9K3M7X2P'
    }
  ];

  const handleVote = () => {
    if (!selectedOption) {
      toast.error('Please select an option');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmVote = () => {
    toast.loading('Recording vote on blockchain...', { duration: 1500 });

    setTimeout(() => {
      const newReceipt = {
        pollTitle: selectedPoll.title,
        option: selectedPoll.options[selectedOption],
        timestamp: new Date().toLocaleString(),
        receiptId: `VR-2025-${Math.random().toString().slice(2, 8)}`,
        blockchainTx: `ALG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        isAnonymous: selectedPoll.isAnonymous
      };

      setReceipt(newReceipt);
      setShowConfirmation(false);
      setSelectedPoll(null);
      setSelectedOption(null);

      toast.success(
        <div>
          <p className="font-semibold">Vote Recorded Successfully!</p>
          <p className="text-xs mt-1">Receipt ID: {newReceipt.receiptId}</p>
        </div>,
        { duration: 3000 }
      );
    }, 2000);
  };

  if (receipt) {
    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
        {/* Success Message */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-8 text-white text-center shadow-xl">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Vote Recorded Successfully!</h1>
          <p className="text-green-100">Your vote has been securely stored on the blockchain</p>
        </div>

        {/* Receipt */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6 text-white text-center">
            <h2 className="text-xl font-bold mb-1">VOTE RECEIPT</h2>
            <p className="text-primary-100 text-sm">Blockchain-Verified Proof</p>
          </div>

          {/* Receipt Content */}
          <div className="p-8 space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg border-2 border-primary-500">
                <QRCodeSVG
                  value={JSON.stringify({
                    receiptId: receipt.receiptId,
                    blockchainTx: receipt.blockchainTx,
                    timestamp: receipt.timestamp
                  })}
                  size={150}
                  level="H"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 mb-1">Poll Title</p>
                <p className="text-lg font-semibold text-gray-900">{receipt.pollTitle}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 mb-1">Your Vote</p>
                <p className="text-lg font-semibold text-gray-900">{receipt.option}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 mb-1">Timestamp</p>
                <p className="text-gray-900">{receipt.timestamp}</p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <p className="text-sm text-gray-600 mb-1">Receipt ID</p>
                <code className="text-sm bg-gray-100 px-3 py-1.5 rounded font-mono text-gray-900 inline-block">
                  {receipt.receiptId}
                </code>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-green-900 mb-1">Blockchain Verified</p>
                    <p className="text-xs text-green-700 mb-2">
                      This vote has been permanently recorded on the Algorand blockchain
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded font-mono text-green-900 inline-block">
                      TX: {receipt.blockchainTx}
                    </code>
                  </div>
                </div>
              </div>

              {receipt.isAnonymous && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">Anonymous Poll:</span> Your identity is protected
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Receipt
              </button>
              <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2">
                <ExternalLink className="w-5 h-5" />
                View on Blockchain
              </button>
            </div>

            <button
              onClick={() => setReceipt(null)}
              className="w-full text-primary-600 hover:text-primary-700 font-medium text-sm py-2"
            >
              Back to Polls
            </button>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-900 mb-1">Important Notice</p>
              <p className="text-sm text-yellow-700">
                Your vote cannot be changed once submitted. Please save this receipt for verification purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="max-w-md mx-auto mt-12 animate-scale-in">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Vote</h2>
            <p className="text-gray-600">Please review your selection carefully</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Poll</p>
              <p className="font-semibold text-gray-900">{selectedPoll.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Vote</p>
              <p className="text-lg font-bold text-primary-600">{selectedPoll.options[selectedOption]}</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-900 font-medium">
              ⚠️ Your vote cannot be changed once submitted
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmation(false)}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={confirmVote}
              className="flex-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Confirm Vote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Vote className="w-7 h-7 text-primary-600" />
          Voting Portal
        </h1>
        <p className="text-gray-600">Participate in polls and make your voice heard</p>
      </div>

      {/* Active Polls */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Polls</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activePolls.map((poll, index) => (
            <div
              key={poll.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{poll.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{poll.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {poll.totalVotes} votes
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Ends {new Date(poll.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {poll.isAnonymous && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Anonymous
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedPoll(poll);
                  setSelectedOption(null);
                }}
                className="w-full bg-primary-600 text-white py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
              >
                Vote Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Voting Modal */}
      {selectedPoll && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 p-6 text-white">
              <h2 className="text-xl font-bold mb-2">{selectedPoll.title}</h2>
              <p className="text-primary-100 text-sm">{selectedPoll.description}</p>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Select your option:</p>
              {selectedPoll.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(index)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === index
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === index
                          ? 'border-primary-500 bg-primary-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {selectedOption === index && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option}</span>
                  </div>
                </button>
              ))}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setSelectedPoll(null)}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleVote}
                  disabled={selectedOption === null}
                  className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Vote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed Polls */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Completed Polls</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {completedPolls.map((poll) => (
            <div key={poll.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{poll.title}</h3>
                <p className="text-sm text-gray-600 mb-2">Your vote: <span className="font-medium">{poll.myVote}</span></p>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-600" />
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                    {poll.receiptId}
                  </code>
                </div>
              </div>
              <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                View Receipt
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingPage;
