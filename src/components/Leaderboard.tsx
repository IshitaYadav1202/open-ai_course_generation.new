import React, { useState } from 'react';
import { 
  Trophy, 
  Medal, 
  Star, 
  TrendingUp,
  Calendar,
  Users,
  Award,
  Zap,
  Target,
  Clock
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'legendary';
  unlockedAt: string;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  level: number;
  xp: number;
  totalQuizzes: number;
  averageScore: number;
  streak: number;
  rank: number;
  badges: Achievement[];
  recentActivity: string;
}

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'weekly' | 'achievements'>('global');

  const topUsers: LeaderboardUser[] = [
    {
      id: '1',
      name: 'Emma Johnson',
      avatar: 'EJ',
      level: 18,
      xp: 3450,
      totalQuizzes: 127,
      averageScore: 92,
      streak: 12,
      rank: 1,
      badges: [],
      recentActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'MC',
      level: 16,
      xp: 2890,
      totalQuizzes: 98,
      averageScore: 88,
      streak: 8,
      rank: 2,
      badges: [],
      recentActivity: '4 hours ago'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      avatar: 'SW',
      level: 15,
      xp: 2650,
      totalQuizzes: 105,
      averageScore: 85,
      streak: 15,
      rank: 3,
      badges: [],
      recentActivity: '1 day ago'
    },
    {
      id: '4',
      name: 'Alex Johnson',
      avatar: 'AJ',
      level: 15,
      xp: 2450,
      totalQuizzes: 89,
      averageScore: 84,
      streak: 5,
      rank: 4,
      badges: [],
      recentActivity: 'Active now'
    },
    {
      id: '5',
      name: 'David Brown',
      avatar: 'DB',
      level: 14,
      xp: 2320,
      totalQuizzes: 76,
      averageScore: 81,
      streak: 3,
      rank: 5,
      badges: [],
      recentActivity: '3 hours ago'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      name: 'Quiz Master',
      description: 'Complete 100 quizzes',
      icon: '🎓',
      rarity: 'rare',
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Perfect Score',
      description: 'Get 100% on 10 quizzes',
      icon: '💯',
      rarity: 'legendary',
      unlockedAt: '2024-01-20'
    },
    {
      id: '3',
      name: 'Speed Demon',
      description: 'Answer 50 questions in under 5 seconds each',
      icon: '⚡',
      rarity: 'rare',
      unlockedAt: '2024-01-12'
    },
    {
      id: '4',
      name: 'Streak Champion',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      rarity: 'common',
      unlockedAt: '2024-01-08'
    },
    {
      id: '5',
      name: 'Knowledge Seeker',
      description: 'Complete quizzes in 5 different subjects',
      icon: '📚',
      rarity: 'common',
      unlockedAt: '2024-01-05'
    },
    {
      id: '6',
      name: 'Team Player',
      description: 'Participate in 25 live quiz sessions',
      icon: '👥',
      rarity: 'rare',
      unlockedAt: '2024-01-18'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'common':
        return 'from-green-500 to-teal-500';
    }
  };

  const renderGlobalLeaderboard = () => (
    <div className="space-y-6">
      {/* Top 3 Podium */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">🏆 Top Performers</h3>
        
        <div className="flex justify-center items-end space-x-8 mb-8">
          {/* 2nd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-lg">{topUsers[1].avatar}</span>
            </div>
            <div className="bg-gradient-to-t from-gray-100 to-gray-50 px-4 py-6 rounded-lg border border-gray-200">
              <Medal className="h-6 w-6 text-gray-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">{topUsers[1].name}</p>
              <p className="text-sm text-gray-600">{topUsers[1].xp} XP</p>
              <div className="text-xs text-gray-500 mt-1">Level {topUsers[1].level}</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-3 ring-4 ring-yellow-200">
              <span className="text-white font-bold text-xl">{topUsers[0].avatar}</span>
            </div>
            <div className="bg-gradient-to-t from-yellow-50 to-yellow-25 px-6 py-8 rounded-lg border border-yellow-200">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <p className="font-bold text-gray-900 text-lg">{topUsers[0].name}</p>
              <p className="text-yellow-600 font-semibold">{topUsers[0].xp} XP</p>
              <div className="text-sm text-gray-600 mt-1">Level {topUsers[0].level}</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mb-3">
              <span className="text-white font-bold text-lg">{topUsers[2].avatar}</span>
            </div>
            <div className="bg-gradient-to-t from-amber-50 to-amber-25 px-4 py-6 rounded-lg border border-amber-200">
              <Award className="h-6 w-6 text-amber-600 mx-auto mb-2" />
              <p className="font-semibold text-gray-900">{topUsers[2].name}</p>
              <p className="text-sm text-gray-600">{topUsers[2].xp} XP</p>
              <div className="text-xs text-gray-500 mt-1">Level {topUsers[2].level}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Global Rankings</h3>
        <div className="space-y-3">
          {topUsers.map((user, index) => (
            <div 
              key={user.id}
              className={`
                flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md
                ${index === 3 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}
              `}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{user.avatar}</span>
                </div>
                
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{user.name}</h4>
                    {index === 3 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">You</span>}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Level {user.level}</span>
                    <span>•</span>
                    <span>{user.totalQuizzes} quizzes</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Zap className="h-3 w-3 mr-1 text-orange-500" />
                      {user.streak} day streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">{user.xp} XP</div>
                <div className="text-sm text-gray-600">{user.averageScore}% avg</div>
                <div className="text-xs text-gray-500">{user.recentActivity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWeeklyLeaderboard = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">This Week's Champions</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Jan 15 - Jan 21, 2024</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {topUsers.slice(0, 10).map((user, index) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-bold text-sm">
                {index + 1}
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{user.avatar}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{user.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{Math.floor(Math.random() * 200 + 100)} XP this week</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-green-600">#{index + 1}</div>
              <div className="text-xs text-gray-500">{Math.floor(Math.random() * 15 + 5)} quizzes</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {achievements.map(achievement => (
        <div key={achievement.id} className={`
          bg-white rounded-xl shadow-sm p-6 border-2 border-transparent
          bg-gradient-to-br from-white to-gray-50
          hover:shadow-md transition-all duration-200
        `}>
          <div className="text-center">
            <div className={`
              w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl
              bg-gradient-to-r ${getRarityColor(achievement.rarity)}
            `}>
              <span className="filter drop-shadow-sm">{achievement.icon}</span>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-2">{achievement.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
            
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className={`
                text-xs px-3 py-1 rounded-full font-medium capitalize
                ${achievement.rarity === 'legendary' 
                  ? 'bg-purple-100 text-purple-700' 
                  : achievement.rarity === 'rare'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
                }
              `}>
                {achievement.rarity}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 flex items-center justify-center">
              <Clock className="h-3 w-3 mr-1" />
              Unlocked {achievement.unlockedAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Leaderboard & Achievements</h2>
        <p className="text-gray-600">Track your progress and compete with other learners</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Your Rank</p>
              <p className="text-2xl font-bold text-gray-900">#4</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total XP</p>
              <p className="text-2xl font-bold text-gray-900">2,450</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Achievements</p>
              <p className="text-2xl font-bold text-gray-900">{achievements.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Zap className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Current Streak</p>
              <p className="text-2xl font-bold text-gray-900">5 days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { key: 'global', label: 'Global Leaderboard', icon: Trophy },
            { key: 'weekly', label: 'Weekly Leaders', icon: Calendar },
            { key: 'achievements', label: 'Achievements', icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`
                  flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'global' && renderGlobalLeaderboard()}
      {activeTab === 'weekly' && renderWeeklyLeaderboard()}
      {activeTab === 'achievements' && renderAchievements()}
    </div>
  );
};