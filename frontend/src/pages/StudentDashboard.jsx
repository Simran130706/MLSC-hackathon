import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Users,
  AlertCircle,
  ChevronRight,
  Zap,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  // Mock data
  const stats = {
    attendance: 85,
    activePolls: 2,
    upcomingClasses: 3,
    certificates: 5,
    libraryBooks: 1
  };

  const recentActivity = [
    {
      id: 1,
      type: 'attendance',
      title: 'Attendance Recorded',
      description: 'Data Structures Lab',
      time: '2 hours ago',
      icon: CheckCircle2,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'poll',
      title: 'New Poll Available',
      description: 'Best Cultural Event Theme',
      time: '5 hours ago',
      icon: Users,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'certificate',
      title: 'Certificate Issued',
      description: 'Hackathon Winner 2025',
      time: '1 day ago',
      icon: Award,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: 'Data Structures',
      type: 'Lab',
      time: '10:00 AM - 12:00 PM',
      room: 'Lab 301',
      instructor: 'Dr. Sharma'
    },
    {
      id: 2,
      subject: 'Computer Networks',
      type: 'Theory',
      time: '2:00 PM - 3:00 PM',
      room: 'Room 205',
      instructor: 'Prof. Gupta'
    },
    {
      id: 3,
      subject: 'Machine Learning',
      type: 'Tutorial',
      time: '4:00 PM - 5:00 PM',
      room: 'Lab 402',
      instructor: 'Dr. Patel'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Rahul! 👋</h1>
            <p className="text-primary-100">Here's what's happening with your studies today</p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-primary-100">Student ID</p>
              <p className="text-2xl font-bold">21CS01</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Attendance Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              +5%
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Attendance</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{stats.attendance}%</p>
            <p className="text-sm text-gray-500">17/20 classes</p>
          </div>
          <div className="mt-4 bg-gray-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.attendance}%` }}
            ></div>
          </div>
        </div>

        {/* Active Polls */}
        <Link to="/voting" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Action Required
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Polls</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{stats.activePolls}</p>
            <p className="text-sm text-gray-500">waiting for vote</p>
          </div>
          <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
            Vote now <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Certificates */}
        <Link to="/certificates" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Award className="w-6 h-6 text-white" />
            </div>
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Certificates</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{stats.certificates}</p>
            <p className="text-sm text-gray-500">earned</p>
          </div>
          <div className="mt-4 flex items-center text-purple-600 font-medium text-sm group-hover:gap-2 transition-all duration-200">
            View all <ChevronRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Library Books */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Library Books</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">{stats.libraryBooks}</p>
            <p className="text-sm text-gray-500">issued</p>
          </div>
          <div className="mt-4 text-orange-600 font-medium text-sm">
            Due in 3 days
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary-600" />
              Today's Schedule
            </h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {upcomingClasses.map((classItem, index) => (
              <div
                key={classItem.id}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{classItem.subject}</h3>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {classItem.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{classItem.time}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📍 {classItem.room}</span>
                    <span>👨‍🏫 {classItem.instructor}</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors duration-200">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              Recent Activity
            </h2>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm">{activity.title}</h4>
                    <p className="text-sm text-gray-600 truncate">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="w-full mt-6 py-2 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors duration-200">
            View All Activity
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-xl">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/attendance" className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-center group">
            <Calendar className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
            <p className="font-medium text-sm">View Attendance</p>
          </Link>
          <Link to="/voting" className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-center group">
            <Users className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
            <p className="font-medium text-sm">Vote Now</p>
          </Link>
          <Link to="/certificates" className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-center group">
            <Award className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
            <p className="font-medium text-sm">Certificates</p>
          </Link>
          <Link to="/analytics" className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:bg-white/20 transition-all duration-200 text-center group">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
            <p className="font-medium text-sm">Analytics</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
