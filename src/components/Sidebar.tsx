import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  PenTool, 
  Radio, 
  Trophy, 
  User,
  X
} from 'lucide-react';

type ActiveView = 'dashboard' | 'lessons' | 'quizzes' | 'live' | 'leaderboard' | 'profile';

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { name: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' as ActiveView },
  { name: 'Lesson Plans', icon: BookOpen, key: 'lessons' as ActiveView },
  { name: 'Quiz Builder', icon: PenTool, key: 'quizzes' as ActiveView },
  { name: 'Live Quizzes', icon: Radio, key: 'live' as ActiveView },
  { name: 'Leaderboard', icon: Trophy, key: 'leaderboard' as ActiveView },
  { name: 'Profile', icon: User, key: 'profile' as ActiveView },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView, 
  isOpen, 
  onClose 
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 pt-16
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)]
      `}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="flex justify-end p-4 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.key;
              
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveView(item.key);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`
                    mr-3 h-5 w-5 transition-transform group-hover:scale-110
                    ${isActive ? 'text-white' : 'text-gray-500'}
                  `} />
                  {item.name}
                </button>
              );
            })}
          </nav>
          
          {/* User stats */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Your Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">XP Points</span>
                  <span className="font-medium text-blue-600">2,450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-xs text-gray-500">550 XP to Level 16</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};