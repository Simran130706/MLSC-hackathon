import React, { useState } from 'react';
import {
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Award,
  Calendar,
  Building2,
  GraduationCap
} from 'lucide-react';

const VerificationPage = () => {
  const [searchType, setSearchType] = useState('certificate');
  const [searchQuery, setSearchQuery] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (searchType === 'certificate') {
        setVerificationResult({
          type: 'certificate',
          verified: true,
          data: {
            certificateId: searchQuery,
            title: 'Hackathon Winner - TechFest 2025',
            studentName: 'Rahul Sharma',
            studentId: '21CS01',
            issuedBy: 'Department of Computer Science',
            issuedDate: '2025-02-08',
            blockchainTx: 'ALG-K9M3X7Y2P',
            blockExplorer: 'https://algoexplorer.io/tx/ALG-K9M3X7Y2P'
          }
        });
      } else if (searchType === 'vote') {
        setVerificationResult({
          type: 'vote',
          verified: true,
          data: {
            receiptId: searchQuery,
            pollTitle: 'Best Cultural Event Theme',
            timestamp: '2025-02-10 3:45 PM',
            blockchainTx: 'ALG-9K3M7X2P',
            isAnonymous: true,
            blockExplorer: 'https://algoexplorer.io/tx/ALG-9K3M7X2P'
          }
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl mb-6">
            <GraduationCap className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">EduChain Verification</h1>
          <p className="text-xl text-primary-100">Verify certificates and votes on the blockchain</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8 animate-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Verify Authenticity</h2>
              <p className="text-gray-600">Enter ID to verify on blockchain</p>
            </div>
          </div>

          {/* Type Selector */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setSearchType('certificate')}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 ${
                searchType === 'certificate'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Award className="w-5 h-5 inline mr-2" />
              Certificate
            </button>
            <button
              onClick={() => setSearchType('vote')}
              className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 ${
                searchType === 'vote'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 inline mr-2" />
              Vote Receipt
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === 'certificate' 
                    ? 'Enter Certificate ID (e.g., CERT-2025-001)' 
                    : 'Enter Vote Receipt ID (e.g., VR-2025-001234)'
                }
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !searchQuery.trim()}
              className="w-full bg-gradient-to-r from-primary-600 to-primary-500 text-white py-4 rounded-lg font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Verifying on blockchain...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Verify Now
                </span>
              )}
            </button>
          </form>

          {/* Demo IDs */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">Try these demo IDs:</p>
            <div className="space-y-1 text-sm text-blue-700">
              <p><strong>Certificate:</strong> CERT-2025-001</p>
              <p><strong>Vote Receipt:</strong> VR-2025-001234</p>
            </div>
          </div>
        </div>

        {/* Verification Result */}
        {verificationResult && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            {verificationResult.verified ? (
              <>
                {/* Success Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Verified ✓</h2>
                      <p className="text-green-100">This {verificationResult.type} is authentic</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 space-y-6">
                  {verificationResult.type === 'certificate' ? (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Award className="w-4 h-4" />
                            Certificate Title
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {verificationResult.data.title}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Issued Date
                          </p>
                          <p className="text-lg font-semibold text-gray-900">
                            {new Date(verificationResult.data.issuedDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Student Name</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {verificationResult.data.studentName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Student ID</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {verificationResult.data.studentId}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <p className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <Building2 className="w-4 h-4" />
                          Issued By
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {verificationResult.data.issuedBy}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Poll Title</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {verificationResult.data.pollTitle}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Vote Time</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {verificationResult.data.timestamp}
                          </p>
                        </div>
                      </div>

                      {verificationResult.data.isAnonymous && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-sm text-blue-900">
                            <strong>Anonymous Poll:</strong> Voter identity is protected by blockchain encryption
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {/* Blockchain Info */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-green-600 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-semibold text-green-900 mb-2">Blockchain Verification</h3>
                        <p className="text-sm text-green-700 mb-3">
                          This record is permanently stored on the Algorand blockchain and cannot be altered or forged.
                        </p>
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-green-700 mb-1">Transaction ID</p>
                            <code className="text-sm bg-white px-3 py-1.5 rounded font-mono text-green-900 inline-block">
                              {verificationResult.data.blockchainTx}
                            </code>
                          </div>
                          <a
                            href={verificationResult.data.blockExplorer}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium"
                          >
                            View on Blockchain Explorer
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Error Header */}
                <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Not Found</h2>
                      <p className="text-red-100">This ID could not be verified</p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <p className="text-gray-700">
                    The {verificationResult.type} ID you entered could not be found in the blockchain. 
                    Please check the ID and try again.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Secure</h3>
            <p className="text-sm text-primary-100">Blockchain-based verification ensures authenticity</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Instant</h3>
            <p className="text-sm text-primary-100">Real-time verification in seconds</p>
          </div>
          <div className="text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-xl flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8" />
            </div>
            <h3 className="font-bold mb-2">Transparent</h3>
            <p className="text-sm text-primary-100">Public verification for anyone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
