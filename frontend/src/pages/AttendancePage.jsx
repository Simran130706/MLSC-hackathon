import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Camera,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  RefreshCw,
  Shield,
  ExternalLink,
  History
} from 'lucide-react';
import toast from 'react-hot-toast';

const AttendancePage = ({ user }) => {
  const [qrData, setQrData] = useState('');
  const [timeLeft, setTimeLeft] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Mock attendance data
  useEffect(() => {
    setAttendanceRecords([
      {
        id: 1,
        date: '2025-02-10',
        subject: 'Data Structures',
        status: 'present',
        time: '10:30 AM',
        blockchainTx: 'ALG-7X9K2M4N',
        edits: []
      },
      {
        id: 2,
        date: '2025-02-09',
        subject: 'Computer Networks',
        status: 'present',
        time: '2:15 PM',
        blockchainTx: 'ALG-3P5R8T1W',
        edits: []
      },
      {
        id: 3,
        date: '2025-02-08',
        subject: 'Machine Learning',
        status: 'edited',
        time: '4:00 PM',
        blockchainTx: 'ALG-6Q9M3X7Y',
        edits: [
          {
            editedBy: 'Dr. Sharma',
            reason: 'Technical issue during scan',
            timestamp: '2025-02-08 5:30 PM',
            originalStatus: 'absent',
            newStatus: 'present'
          }
        ]
      },
      {
        id: 4,
        date: '2025-02-07',
        subject: 'Database Systems',
        status: 'absent',
        time: '-',
        blockchainTx: null,
        edits: []
      }
    ]);
  }, []);

  // Generate rotating QR code
  const generateQR = () => {
    const sessionId = `ATT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const data = JSON.stringify({
      sessionId,
      studentId: user.id,
      timestamp: Date.now(),
      expiresIn: 120
    });
    setQrData(data);
    setTimeLeft(120);
    setIsActive(true);
  };

  // Timer countdown
  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          generateQR(); // Auto-regenerate
          return 120;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  const handleScanAttendance = () => {
    toast.loading('Scanning QR code...', { duration: 1000 });
    
    setTimeout(() => {
      const txId = `ALG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      toast.success(
        <div>
          <p className="font-semibold">Attendance Recorded!</p>
          <p className="text-xs mt-1">Blockchain TX: {txId}</p>
        </div>,
        { duration: 3000 }
      );
      
      // Add new record
      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        subject: 'Data Structures Lab',
        status: 'present',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        blockchainTx: txId,
        edits: []
      };
      
      setAttendanceRecords([newRecord, ...attendanceRecords]);
    }, 1500);
  };

  const getStatusBadge = (status) => {
    const styles = {
      present: 'bg-green-100 text-green-700',
      absent: 'bg-red-100 text-red-700',
      edited: 'bg-yellow-100 text-yellow-700',
      pending: 'bg-blue-100 text-blue-700'
    };

    const icons = {
      present: <CheckCircle2 className="w-3 h-3" />,
      absent: <XCircle className="w-3 h-3" />,
      edited: <History className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Calculate attendance percentage
  const calculatePercentage = () => {
    const present = attendanceRecords.filter(r => r.status === 'present' || r.status === 'edited').length;
    const total = attendanceRecords.length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  if (user.role === 'student') {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Attendance Tracking</h1>
          <p className="text-gray-600">Scan QR code to mark your attendance</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-sm font-medium text-green-100 mb-2">Overall Attendance</h3>
            <p className="text-4xl font-bold mb-1">{calculatePercentage()}%</p>
            <p className="text-sm text-green-100">
              {attendanceRecords.filter(r => r.status === 'present' || r.status === 'edited').length}/
              {attendanceRecords.length} classes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">This Week</h3>
            <p className="text-3xl font-bold text-gray-900">95%</p>
            <p className="text-sm text-gray-500">19/20 classes</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">This Month</h3>
            <p className="text-3xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-gray-500">73/80 classes</p>
          </div>
        </div>

        {/* QR Scanner */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Mark Your Attendance</h2>
            <p className="text-gray-600 mb-6">Show this QR code to your teacher's scanner</p>

            {!qrData && (
              <button
                onClick={generateQR}
                className="btn-primary mb-6"
              >
                <RefreshCw className="w-5 h-5 inline mr-2" />
                Generate QR Code
              </button>
            )}

            {qrData && (
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-xl border-4 border-primary-500 inline-block shadow-lg">
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">
                    Expires in: <span className="font-bold text-primary-600">{timeLeft}s</span>
                  </span>
                </div>

                <button
                  onClick={handleScanAttendance}
                  className="btn-primary"
                >
                  Simulate Scan (Demo)
                </button>

                <p className="text-xs text-gray-500">
                  QR code refreshes automatically every 2 minutes for security
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary-600" />
              Attendance History
            </h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              Download Report
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Subject</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Blockchain</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr
                    key={record.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4 text-sm text-gray-900">
                      {new Date(record.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">{record.subject}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{record.time}</td>
                    <td className="py-4 px-4">{getStatusBadge(record.status)}</td>
                    <td className="py-4 px-4">
                      {record.blockchainTx ? (
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
                            {record.blockchainTx}
                          </code>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      {record.edits.length > 0 && (
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1">
                          View Log
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Teacher view would go here
  return <div>Teacher Attendance Management</div>;
};

export default AttendancePage;
