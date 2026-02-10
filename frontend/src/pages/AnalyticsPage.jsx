import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Award,
  Target
} from 'lucide-react';

const AnalyticsPage = () => {
  // Attendance trend data
  const attendanceData = [
    { month: 'Aug', attendance: 78 },
    { month: 'Sep', attendance: 82 },
    { month: 'Oct', attendance: 85 },
    { month: 'Nov', attendance: 88 },
    { month: 'Dec', attendance: 86 },
    { month: 'Jan', attendance: 90 },
    { month: 'Feb', attendance: 85 }
  ];

  // Subject-wise attendance
  const subjectData = [
    { subject: 'DS', attendance: 92 },
    { subject: 'CN', attendance: 88 },
    { subject: 'ML', attendance: 85 },
    { subject: 'DB', attendance: 90 },
    { subject: 'OS', attendance: 87 }
  ];

  // Voting participation
  const votingData = [
    { name: 'Participated', value: 234, color: '#10b981' },
    { name: 'Pending', value: 66, color: '#f59e0b' }
  ];

  // Feedback sentiment
  const feedbackData = [
    { name: 'Positive', value: 65, color: '#10b981' },
    { name: 'Neutral', value: 25, color: '#3b82f6' },
    { name: 'Negative', value: 10, color: '#ef4444' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" />
          Analytics Dashboard
        </h1>
        <p className="text-indigo-100">Track your academic progress and engagement</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              +5%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Attendance</h3>
          <p className="text-3xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-500 mt-1">This semester</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
              100%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Poll Participation</h3>
          <p className="text-3xl font-bold text-gray-900">78%</p>
          <p className="text-sm text-gray-500 mt-1">12/15 polls</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-purple-600 text-sm font-semibold">
              +2
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Certificates</h3>
          <p className="text-3xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-500 mt-1">This year</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-red-600 text-sm font-semibold">
              <TrendingDown className="w-4 h-4" />
              -2%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Target</h3>
          <p className="text-3xl font-bold text-gray-900">90%</p>
          <p className="text-sm text-gray-500 mt-1">Attendance goal</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Attendance Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#0ea5e9"
                strokeWidth={3}
                dot={{ fill: '#0ea5e9', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600">Monthly average</span>
            <span className="text-green-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +12% from last semester
            </span>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Subject-wise Attendance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="attendance" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-gray-600">
            Best performance: <span className="font-semibold text-gray-900">Data Structures (92%)</span>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Voting Participation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Voting Participation</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={votingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {votingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">234</p>
              <p className="text-sm text-gray-600">Participated</p>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">66</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
          </div>
        </div>

        {/* Feedback Sentiment */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Feedback Sentiment</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={feedbackData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {feedbackData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-xl font-bold text-green-600">65%</p>
              <p className="text-xs text-gray-600">Positive</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <p className="text-xl font-bold text-blue-600">25%</p>
              <p className="text-xs text-gray-600">Neutral</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <p className="text-xl font-bold text-red-600">10%</p>
              <p className="text-xs text-gray-600">Negative</p>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">AI-Powered Insights</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Great Progress!</p>
              <p className="text-sm text-blue-700">
                Your attendance has improved by 5% this month. Keep it up!
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Action Required</p>
              <p className="text-sm text-blue-700">
                You need to attend 3 more classes to reach your 90% target.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-blue-900">Achievement Unlocked</p>
              <p className="text-sm text-blue-700">
                You've participated in all polls this month. Well done!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
