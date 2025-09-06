import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Play, 
  Copy,
  CheckCircle,
  XCircle,
  Clock,
  Users
} from 'lucide-react';

interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
  timeLimit?: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number;
  attempts: number;
}

export const QuizBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library'>('create');
  const [currentQuiz, setCurrentQuiz] = useState<Quiz>({
    id: '',
    title: '',
    description: '',
    questions: [],
    timeLimit: 30,
    attempts: 1
  });
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const savedQuizzes = [
    {
      id: '1',
      title: 'World History: Ancient Civilizations',
      description: 'Test knowledge of ancient civilizations',
      questions: 15,
      completions: 124,
      averageScore: 78
    },
    {
      id: '2', 
      title: 'Mathematics: Algebra Basics',
      description: 'Fundamental algebra concepts',
      questions: 20,
      completions: 89,
      averageScore: 82
    },
    {
      id: '3',
      title: 'Science: Cell Biology',
      description: 'Understanding cellular structures',
      questions: 12,
      completions: 156,
      averageScore: 75
    }
  ];

  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice', icon: '⊙' },
    { value: 'true-false', label: 'True/False', icon: '✓✗' },
    { value: 'short-answer', label: 'Short Answer', icon: '✏️' }
  ];

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type: 'multiple-choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
      timeLimit: 30
    };
    setEditingQuestion(newQuestion);
    setShowQuestionModal(true);
  };

  const saveQuestion = () => {
    if (!editingQuestion) return;
    
    const updatedQuestions = editingQuestion.id && currentQuiz.questions.find(q => q.id === editingQuestion.id)
      ? currentQuiz.questions.map(q => q.id === editingQuestion.id ? editingQuestion : q)
      : [...currentQuiz.questions, editingQuestion];
    
    setCurrentQuiz({
      ...currentQuiz,
      questions: updatedQuestions
    });
    
    setShowQuestionModal(false);
    setEditingQuestion(null);
  };

  const deleteQuestion = (questionId: string) => {
    setCurrentQuiz({
      ...currentQuiz,
      questions: currentQuiz.questions.filter(q => q.id !== questionId)
    });
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion({ ...question });
    setShowQuestionModal(true);
  };

  const renderQuestionModal = () => {
    if (!showQuestionModal || !editingQuestion) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingQuestion.id && currentQuiz.questions.find(q => q.id === editingQuestion.id) ? 'Edit' : 'Add'} Question
          </h3>
          
          <div className="space-y-6">
            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Question Type</label>
              <div className="grid grid-cols-3 gap-3">
                {questionTypes.map(type => (
                  <button
                    key={type.value}
                    onClick={() => setEditingQuestion({
                      ...editingQuestion,
                      type: type.value as Question['type'],
                      options: type.value === 'multiple-choice' ? ['', '', '', ''] : undefined
                    })}
                    className={`p-3 border rounded-lg text-center transition-all ${
                      editingQuestion.type === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{type.icon}</div>
                    <div className="text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <textarea
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your question..."
                value={editingQuestion.question}
                onChange={(e) => setEditingQuestion({...editingQuestion, question: e.target.value})}
              />
            </div>

            {/* Options (for multiple choice) */}
            {editingQuestion.type === 'multiple-choice' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Answer Options</label>
                <div className="space-y-3">
                  {editingQuestion.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={editingQuestion.correctAnswer === index.toString()}
                        onChange={() => setEditingQuestion({
                          ...editingQuestion, 
                          correctAnswer: index.toString()
                        })}
                        className="text-blue-600"
                      />
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(editingQuestion.options || [])];
                          newOptions[index] = e.target.value;
                          setEditingQuestion({...editingQuestion, options: newOptions});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* True/False */}
            {editingQuestion.type === 'true-false' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Correct Answer</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="truefalse"
                      checked={editingQuestion.correctAnswer === 'true'}
                      onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: 'true'})}
                      className="mr-2 text-blue-600"
                    />
                    True
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="truefalse"
                      checked={editingQuestion.correctAnswer === 'false'}
                      onChange={() => setEditingQuestion({...editingQuestion, correctAnswer: 'false'})}
                      className="mr-2 text-blue-600"
                    />
                    False
                  </label>
                </div>
              </div>
            )}

            {/* Short Answer */}
            {editingQuestion.type === 'short-answer' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sample Answer</label>
                <input
                  type="text"
                  placeholder="Enter a sample correct answer..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editingQuestion.correctAnswer}
                  onChange={(e) => setEditingQuestion({...editingQuestion, correctAnswer: e.target.value})}
                />
              </div>
            )}

            {/* Settings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editingQuestion.points}
                  onChange={(e) => setEditingQuestion({...editingQuestion, points: parseInt(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (seconds)</label>
                <input
                  type="number"
                  min="10"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={editingQuestion.timeLimit}
                  onChange={(e) => setEditingQuestion({...editingQuestion, timeLimit: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={() => {
                setShowQuestionModal(false);
                setEditingQuestion(null);
              }}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={saveQuestion}
              disabled={!editingQuestion.question || !editingQuestion.correctAnswer}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              Save Question
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderCreateTab = () => (
    <div className="space-y-6">
      {/* Quiz Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiz Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
            <input
              type="text"
              placeholder="Enter quiz title..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={currentQuiz.title}
              onChange={(e) => setCurrentQuiz({...currentQuiz, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (minutes)</label>
            <input
              type="number"
              min="1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={currentQuiz.timeLimit}
              onChange={(e) => setCurrentQuiz({...currentQuiz, timeLimit: parseInt(e.target.value)})}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={3}
            placeholder="Brief description of the quiz..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={currentQuiz.description}
            onChange={(e) => setCurrentQuiz({...currentQuiz, description: e.target.value})}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Questions ({currentQuiz.questions.length})
          </h3>
          <button
            onClick={addQuestion}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Question
          </button>
        </div>

        {currentQuiz.questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Plus className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No questions added yet. Click "Add Question" to get started.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentQuiz.questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-blue-600">
                        Question {index + 1}
                      </span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {questionTypes.find(t => t.value === question.type)?.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {question.points} point{question.points !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <p className="text-gray-900 font-medium">{question.question}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => editQuestion(question)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteQuestion(question.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {question.type === 'multiple-choice' && (
                  <div className="space-y-1">
                    {question.options?.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center space-x-2 text-sm">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          question.correctAnswer === optIndex.toString()
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300'
                        }`}>
                          {question.correctAnswer === optIndex.toString() && (
                            <CheckCircle className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span className={question.correctAnswer === optIndex.toString() ? 'font-medium' : ''}>
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'true-false' && (
                  <div className="flex items-center space-x-4 text-sm">
                    <span className={`flex items-center ${
                      question.correctAnswer === 'true' ? 'text-green-600 font-medium' : 'text-gray-500'
                    }`}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      True
                    </span>
                    <span className={`flex items-center ${
                      question.correctAnswer === 'false' ? 'text-green-600 font-medium' : 'text-gray-500'
                    }`}>
                      <XCircle className="h-4 w-4 mr-1" />
                      False
                    </span>
                  </div>
                )}

                {question.type === 'short-answer' && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Sample answer:</span> {question.correctAnswer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {currentQuiz.questions.length > 0 && (
          <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </button>
            <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Play className="h-4 w-4 mr-2" />
              Publish Quiz
            </button>
          </div>
        )}
      </div>

      {renderQuestionModal()}
    </div>
  );

  const renderLibraryTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedQuizzes.map(quiz => (
        <div key={quiz.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-900 mb-2">{quiz.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Questions:</span>
              <span className="font-medium">{quiz.questions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completions:</span>
              <span className="font-medium">{quiz.completions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg. Score:</span>
              <span className="font-medium text-green-600">{quiz.averageScore}%</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              <Play className="h-4 w-4 mr-1" />
              Start
            </button>
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              <Copy className="h-4 w-4" />
            </button>
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
              <Edit3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Builder</h2>
        <p className="text-gray-600">Create engaging quizzes with multiple question types</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {[
            { key: 'create', label: 'Create Quiz', icon: Plus },
            { key: 'library', label: 'Quiz Library', icon: Copy }
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
      {activeTab === 'create' && renderCreateTab()}
      {activeTab === 'library' && renderLibraryTab()}
    </div>
  );
};