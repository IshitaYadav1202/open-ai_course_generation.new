import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LessonPlanGenerator } from './components/LessonPlanGenerator';
import { QuizBuilder } from './components/QuizBuilder';
import { LiveQuiz } from './components/LiveQuiz';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

type ActiveView = 'dashboard' | 'lessons' | 'quizzes' | 'live' | 'leaderboard' | 'profile';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'lessons':
        return <LessonPlanGenerator />;
      case 'quizzes':
        return <QuizBuilder />;
      case 'live':
        return <LiveQuiz />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 transition-all duration-300 ease-in-out lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;