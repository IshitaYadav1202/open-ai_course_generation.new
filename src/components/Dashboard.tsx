import React from 'react';
import { 
  BookOpen, 
  PenTool, 
  Users, 
  Trophy, 
  TrendingUp,
  Clock,
  Star,
  Play
} from 'lucide-react';

type ActiveView = 'dashboard' | 'lessons' | 'quizzes' | 'live' | 'leaderboard' | 'profile';

interface DashboardProps {
  setActiveView: (view: ActiveView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  const stats = [
    {
      label: 'Lesson Plans Created',
      value: '24',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      change: '+12%'
    },
    {
      label: 'Quizzes Built',
      value: '18',
      icon: PenTool,
      color: 'from-purple-500 to-purple-600',
      change: '+8%'
    },
    {
      label: 'Students Engaged',
      value: '156',
      icon: Users,
      color: 'from-green-500 to-green-600',
      change: '+24%'
    },
    {
      label: 'Achievement Points',
      value: '2,450',
      icon: Trophy,
      color: 'from-orange-500 to-orange-600',
      change: '+15%'
    }
  ];

  const recentActivity = [
    {
      type: 'lesson',
      title: 'Advanced Mathematics Lesson Plan',
      time: '2 hours ago',
      students: 24
    },
    {
      type: 'quiz',
      title: 'History Quiz: World War II',
      time: '4 hours ago',
      students: 18
    },
    {
      type: 'live',
      title: 'Science Live Quiz Session',
      time: '1 day ago',
      students: 32
    }
  ];

  const quickActions = [
    {
      title: 'Create Lesson Plan',
      description: 'Generate AI-powered lesson plans',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      action: () => setActiveView('lessons')
    },
    {
      title: 'Build Quiz',
      description: 'Create interactive quizzes',
      icon: PenTool,
      color: 'from-purple-500 to-purple-600',
      action: () => setActiveView('quizzes')
    },
    {
      title: 'Start Live Session',
      description: 'Launch real-time quiz',
      icon: Play,
      color: 'from-green-500 to-green-600',
      action: () => setActiveView('live')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="mb-4 lg:mb-0">
            <h2 className="text-2xl font-bold mb-2">Welcome back, Alex! 🎓</h2>
            <p className="text-blue-100">Ready to create amazing educational experiences?</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold">Level 15</div>
              <div className="text-sm text-blue-200">Educator</div>
            </div>
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Star className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">{stat.change}</span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'lesson' ? 'bg-blue-100' :
                    activity.type === 'quiz' ? 'bg-purple-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'lesson' ? (
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    ) : activity.type === 'quiz' ? (
                      <PenTool className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Play className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-500">{activity.students} students</p>
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