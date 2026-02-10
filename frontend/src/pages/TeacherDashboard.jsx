import React from 'react';
import {
  Users,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  BarChart3,
  AlertCircle
} from 'lucide-react';

const TeacherDashboard = () => {
  const stats = {
    totalStudents: 120,
    todayAttendance: 95,
    activePolls: 3,
    pendingReviews: 8
  };

  const recentClasses = [
    {
      id: 1,
      subject: 'Data Structures',
      time: '10:00 AM',
      students: 45,
      attendance: 42,
      percentage: 93
    },
    {
      id: 2,
      subject: 'Algorithms',
      time: '2:00 PM',
      students: 38,
      attendance: 35,
      percentage: 92
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Welcome, Dr. Singh! 👋</h1>
        <p className="text-indigo-100">Manage your classes and track student progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Students</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Today's Attendance</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.todayAttendance}%</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Polls</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.activePolls}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Reviews</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingReviews}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Classes</h2>
        <div className="space-y-4">
          {recentClasses.map((cls) => (
            <div key={cls.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900">{cls.subject}</h3>
                <p className="text-sm text-gray-600">{cls.time}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{cls.percentage}%</p>
                <p className="text-sm text-gray-600">{cls.attendance}/{cls.students} present</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
