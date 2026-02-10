import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Award,
  Shield,
  Download,
  ExternalLink,
  Calendar,
  CheckCircle2,
  Share2
} from 'lucide-react';

const CertificatesPage = ({ user }) => {
  const certificates = [
    {
      id: 'CERT-2025-001',
      title: 'Hackathon Winner - TechFest 2025',
      issuedBy: 'Department of Computer Science',
      issuedDate: '2025-02-08',
      blockchainTx: 'ALG-K9M3X7Y2P',
      category: 'Achievement',
      verified: true
    },
    {
      id: 'CERT-2025-002',
      title: 'AI Workshop Completion',
      issuedBy: 'IEEE Student Chapter',
      issuedDate: '2025-01-25',
      blockchainTx: 'ALG-P4R8T1W6Q',
      category: 'Participation',
      verified: true
    },
    {
      id: 'CERT-2024-089',
      title: 'Best Project Award',
      issuedBy: 'Final Year Project Committee',
      issuedDate: '2024-12-15',
      blockchainTx: 'ALG-3Q9M7X2N',
      category: 'Excellence',
      verified: true
    },
    {
      id: 'CERT-2024-067',
      title: 'Sports Tournament - Chess Championship',
      issuedBy: 'Sports Department',
      issuedDate: '2024-11-20',
      blockchainTx: 'ALG-6K2P8M4R',
      category: 'Sports',
      verified: true
    },
    {
      id: 'CERT-2024-045',
      title: 'Leadership Workshop',
      issuedBy: 'Student Development Cell',
      issuedDate: '2024-10-10',
      blockchainTx: 'ALG-9X3T7Q1M',
      category: 'Skill Development',
      verified: true
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Achievement': 'bg-gradient-to-br from-yellow-400 to-orange-500',
      'Participation': 'bg-gradient-to-br from-blue-400 to-indigo-500',
      'Excellence': 'bg-gradient-to-br from-purple-400 to-pink-500',
      'Sports': 'bg-gradient-to-br from-green-400 to-emerald-500',
      'Skill Development': 'bg-gradient-to-br from-cyan-400 to-blue-500'
    };
    return colors[category] || 'bg-gradient-to-br from-gray-400 to-gray-500';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <Award className="w-8 h-8" />
              My Certificates
            </h1>
            <p className="text-purple-100">All your achievements in one place</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-5xl font-bold">{certificates.length}</p>
            <p className="text-purple-100">Total Earned</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">
            {certificates.filter(c => c.category === 'Achievement').length}
          </p>
          <p className="text-sm text-gray-600">Achievements</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">
            {certificates.filter(c => c.category === 'Participation').length}
          </p>
          <p className="text-sm text-gray-600">Participations</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">
            {certificates.filter(c => c.category === 'Sports').length}
          </p>
          <p className="text-sm text-gray-600">Sports</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <p className="text-2xl font-bold text-gray-900">100%</p>
          <p className="text-sm text-gray-600">Verified</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            className="bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-200 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Certificate Header */}
            <div className={`${getCategoryColor(cert.category)} p-6 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <Award className="w-12 h-12" />
                  {cert.verified && (
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
                <p className="text-sm opacity-90">{cert.issuedBy}</p>
              </div>
            </div>

            {/* Certificate Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Issued on {new Date(cert.issuedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                <code className="text-sm bg-gray-100 px-3 py-1.5 rounded font-mono text-gray-900 inline-block">
                  {cert.id}
                </code>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-green-900 mb-1">Blockchain Verified</p>
                    <code className="text-xs bg-white px-2 py-1 rounded font-mono text-green-800 inline-block">
                      {cert.blockchainTx}
                    </code>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex justify-center pt-2">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <QRCodeSVG
                    value={`https://educhain.com/verify?cert=${cert.id}&tx=${cert.blockchainTx}`}
                    size={100}
                    level="H"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 flex flex-col items-center gap-1">
                  <Download className="w-5 h-5" />
                  <span className="text-xs font-medium">Download</span>
                </button>
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 flex flex-col items-center gap-1">
                  <Share2 className="w-5 h-5" />
                  <span className="text-xs font-medium">Share</span>
                </button>
                <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 flex flex-col items-center gap-1">
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-xs font-medium">Verify</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verification Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-2">Why Blockchain Verification?</h3>
            <p className="text-sm text-blue-800 mb-3">
              All certificates are permanently stored on the Algorand blockchain, ensuring they cannot be forged or tampered with. 
              Anyone can verify the authenticity of your certificates using the blockchain transaction ID.
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              Learn more about verification
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificatesPage;
