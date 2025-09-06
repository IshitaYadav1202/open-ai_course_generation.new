import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Trophy, 
  BookOpen,
  PenTool,
  Target,
  Calendar,
  Edit3,
  Save,
  Medal,
  Star,
  TrendingUp,
  Clock,
  Award
} from 'lucide-react';

export const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@edu.example.com',
    role: 'Educator',
    institution: 'Springfield High School',
    subject: 'Mathematics',
    bio: 'Passionate educator with 8+ years of experience in making math engaging and accessible to all students.'
  });

  const stats = [
    {
      label: 'Lesson Plans Created',
      value: 24,
      icon: BookOpen,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      change: '+3 this week'
    },
    {
      label: 'Quizzes Built',
      value: 18,
      icon: PenTool,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
      change: '+2 this week'
    },
    {
      label: 'Students Reached',
      value: 156,
      icon: Target,
      color: 'text-green-600',
      bg: 'bg-green-100',
      change: '+12 this month'
    },
    {
      label: 'Total XP',
      value: '2,450',
      icon: Star,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
      change: '+85 today'
    }
  ];

  const recentActivity = [
    {
      type: 'lesson',
      title: 'Advanced Algebra Lesson Plan',
      time: '2 hours ago',
      status: 'completed'
    },
    {
      type: 'quiz',
      title: 'Geometry Quiz: Triangles',
      time: '4 hours ago',
      status: 'published'
    },
    {
      type: 'live',
      title: 'Live Math Review Session',
      time: '1 day ago',
      status: 'completed'
    },
    {
      type: 'achievement',
      title: 'Earned "Quiz Master" badge',
      time: '2 days ago',
      status: 'unlocked'
    },
    {
      type: 'lesson',
      title: 'Fractions for Beginners',
      time: '3 days ago',
      status: 'completed'
    }
  ];

  const achievements = [
    {
      name: 'Quiz Master',
      description: 'Created 15+ interactive quizzes',
      icon: '🎯',
      rarity: 'rare',
      progress: 100
    },
    {
      name: 'Lesson Architect',
      description: 'Built 20+ comprehensive lesson plans',
      icon: '📚',
      rarity: 'rare', 
      progress: 100
    },
    {
      name: 'Engagement Expert',
      description: 'Achieved 90%+ student engagement',
      icon: '⭐',
      rarity: 'legendary',
      progress: 100
    },
    {
      name: 'Speed Creator',
      description: 'Create 5 resources in one day',
      icon: '⚡',
      rarity: 'common',
      progress: 80
    },
    {
      name: 'Innovation Leader',
      description: 'First to try 3 new features',
      icon: '🚀',
      rarity: 'rare',
      progress: 67
    },
    {
      name: 'Community Helper',
      description: 'Share 10 resources publicly',
      icon: '🤝',
      rarity: 'common',
      progress: 30
    }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to a backend
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case 'quiz':
        return <PenTool className="h-4 w-4 text-purple-600" />;
      case 'live':
        return <Trophy className="h-4 w-4 text-green-600" />;
      case 'achievement':
        return <Award className="h-4 w-4 text-orange-600" />;
      default:
        return <Star className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'common':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile</h2>
        <p className="text-gray-600">Manage your account and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4" />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <h4 className="text-xl font-bold text-gray-900">{profileData.name}</h4>
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">15</span>
                </div>
              </div>
              <p className="text-gray-600 font-medium">{profileData.role}</p>
              <p className="text-sm text-gray-500">{profileData.institution}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                <input
                  type="text"
                  value={profileData.institution}
                  onChange={(e) => setProfileData({...profileData, institution: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Primary Subject</label>
                <input
                  type="text"
                  value={profileData.subject}
                  onChange={(e) => setProfileData({...profileData, subject: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Level Progress</h3>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-600 mb-1">Level 15</div>
              <div className="text-sm text-gray-600">Educational Expert</div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Current XP</span>
                <span className="font-medium">2,450 / 3,000</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: '82%' }}></div>
              </div>
              <div className="text-center text-sm text-gray-500">550 XP to Level 16</div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${stat.bg}`}>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs font-medium text-gray-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-green-600">{stat.change}</div>
                </div>
              );
            })}
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-lg
                        bg-gradient-to-r ${getRarityColor(achievement.rarity)}
                      `}>
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{achievement.name}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{achievement.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${achievement.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className={`
                        text-xs px-2 py-1 rounded-full
                        ${activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                          activity.status === 'published' ? 'bg-blue-100 text-blue-700' :
                          activity.status === 'unlocked' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }
                      `}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};