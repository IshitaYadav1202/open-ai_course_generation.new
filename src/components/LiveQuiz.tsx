import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Users, 
  Trophy,
  Clock,
  CheckCircle,
  XCircle,
  Zap
} from 'lucide-react';

interface LiveParticipant {
  id: string;
  name: string;
  score: number;
  correctAnswers: number;
  streak: number;
  avatar: string;
}

interface LiveQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  timeLimit: number;
}

export const LiveQuiz: React.FC = () => {
  const [mode, setMode] = useState<'setup' | 'active' | 'results'>('setup');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [participants, setParticipants] = useState<LiveParticipant[]>([
    {
      id: '1',
      name: 'Emma Johnson',
      score: 850,
      correctAnswers: 7,
      streak: 3,
      avatar: 'EJ'
    },
    {
      id: '2',
      name: 'Michael Chen',
      score: 720,
      correctAnswers: 6,
      streak: 2,
      avatar: 'MC'
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      score: 680,
      correctAnswers: 5,
      streak: 1,
      avatar: 'SW'
    },
    {
      id: '4',
      name: 'David Brown',
      score: 590,
      correctAnswers: 5,
      streak: 0,
      avatar: 'DB'
    }
  ]);

  const sampleQuestions: LiveQuestion[] = [
    {
      id: '1',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      timeLimit: 30
    },
    {
      id: '2',
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mercury', 'Earth', 'Mars'],
      correctAnswer: 1,
      timeLimit: 25
    },
    {
      id: '3',
      question: 'What is 2 + 2 × 3?',
      options: ['8', '10', '12', '14'],
      correctAnswer: 0,
      timeLimit: 20
    }
  ];

  const [responses, setResponses] = useState<{[participantId: string]: number}>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0 && mode === 'active') {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && mode === 'active') {
      setShowAnswers(true);
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode]);

  const startQuiz = () => {
    setMode('active');
    setCurrentQuestion(0);
    setTimeLeft(sampleQuestions[0].timeLimit);
    setIsActive(true);
    setShowAnswers(false);
    setResponses({});
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(sampleQuestions[currentQuestion + 1].timeLimit);
      setIsActive(true);
      setShowAnswers(false);
      setResponses({});
    } else {
      setMode('results');
    }
  };

  const pauseQuiz = () => {
    setIsActive(!isActive);
  };

  const resetQuiz = () => {
    setMode('setup');
    setCurrentQuestion(0);
    setTimeLeft(30);
    setIsActive(false);
    setShowAnswers(false);
    setResponses({});
  };

  const renderSetup = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Play className="h-10 w-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Live Quiz?</h3>
        <p className="text-gray-600 mb-8">
          Share the quiz code with your students and click start when everyone has joined.
        </p>

        {/* Quiz Code */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Quiz Code</h4>
          <div className="text-4xl font-bold text-blue-600 tracking-wider">QUIZ2024</div>
          <p className="text-sm text-gray-600 mt-2">Students can join at: educraft.com/join</p>
        </div>

        {/* Participants Preview */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Participants ({participants.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {participants.map(participant => (
              <div key={participant.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold text-sm">{participant.avatar}</span>
                </div>
                <p className="text-sm font-medium text-gray-900">{participant.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Info */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{sampleQuestions.length}</div>
            <div className="text-sm text-gray-600">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">~5 min</div>
            <div className="text-sm text-gray-600">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{participants.length}</div>
            <div className="text-sm text-gray-600">Players</div>
          </div>
        </div>

        <button
          onClick={startQuiz}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          Start Live Quiz
        </button>
      </div>
    </div>
  );

  const renderActiveQuiz = () => {
    const question = sampleQuestions[currentQuestion];
    const totalResponses = Object.keys(responses).length;
    const responsePercentages = [0, 1, 2, 3].map(option => {
      const count = Object.values(responses).filter(r => r === option).length;
      return totalResponses > 0 ? (count / totalResponses) * 100 : 0;
    });

    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-900">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </span>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">{participants.length} players</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                timeLeft <= 10 ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
              }`}>
                <Clock className="h-5 w-5" />
                <span className="font-bold text-2xl">{timeLeft}</span>
              </div>
              
              {/* Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={pauseQuiz}
                  className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>
                <button
                  onClick={resetQuiz}
                  className="p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {question.question}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctAnswer;
                  const responseCount = Object.values(responses).filter(r => r === index).length;
                  
                  return (
                    <div
                      key={index}
                      className={`
                        relative p-6 rounded-xl border-2 transition-all duration-300
                        ${showAnswers
                          ? isCorrect
                            ? 'bg-green-50 border-green-500'
                            : responseCount > 0
                            ? 'bg-red-50 border-red-300'
                            : 'bg-gray-50 border-gray-200'
                          : 'bg-blue-50 border-blue-200 hover:border-blue-400'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-medium text-gray-900">{option}</span>
                        {showAnswers && (
                          <div className="flex items-center space-x-2">
                            {isCorrect ? (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : responseCount > 0 ? (
                              <XCircle className="h-6 w-6 text-red-600" />
                            ) : null}
                            <span className="text-sm font-medium text-gray-600">
                              {responseCount} ({responsePercentages[index].toFixed(0)}%)
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {showAnswers && responsePercentages[index] > 0 && (
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                isCorrect ? 'bg-green-500' : 'bg-red-400'
                              }`}
                              style={{ width: `${responsePercentages[index]}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {showAnswers && (
                <div className="mt-8 text-center">
                  <button
                    onClick={nextQuestion}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'View Results'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Leaderboard</h3>
            <div className="space-y-3">
              {participants.sort((a, b) => b.score - a.score).map((participant, index) => (
                <div 
                  key={participant.id}
                  className={`
                    flex items-center justify-between p-3 rounded-lg transition-all
                    ${index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold
                      ${index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gray-400'}
                    `}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{participant.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-600">
                        <span>{participant.correctAnswers} correct</span>
                        {participant.streak > 1 && (
                          <span className="flex items-center text-orange-600">
                            <Zap className="h-3 w-3 mr-1" />
                            {participant.streak}x
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-gray-900">{participant.score}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="h-10 w-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete! 🎉</h2>
        <p className="text-gray-600 mb-8">Great job everyone! Here are the final results.</p>

        {/* Winner */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl mb-8 border border-yellow-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">🏆 Winner</h3>
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">{participants[0].avatar}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{participants[0].name}</p>
              <p className="text-lg text-yellow-600 font-medium">{participants[0].score} points</p>
            </div>
          </div>
        </div>

        {/* Final Leaderboard */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Leaderboard</h3>
          <div className="space-y-3">
            {participants.sort((a, b) => b.score - a.score).map((participant, index) => (
              <div key={participant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                    ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'}
                  `}>
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{participant.name}</p>
                    <p className="text-sm text-gray-600">
                      {participant.correctAnswers}/{sampleQuestions.length} correct
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xl text-gray-900">{participant.score}</p>
                  <p className="text-sm text-gray-600">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            New Quiz
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Download Results
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Quiz Session</h2>
        <p className="text-gray-600">Run real-time quizzes with instant feedback and leaderboards</p>
      </div>

      {/* Content */}
      {mode === 'setup' && renderSetup()}
      {mode === 'active' && renderActiveQuiz()}
      {mode === 'results' && renderResults()}
    </div>
  );
};