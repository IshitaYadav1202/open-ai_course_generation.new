import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Target, 
  Download,
  Share2,
  Wand2,
  Plus,
  Check
} from 'lucide-react';

export const LessonPlanGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: '',
    gradeLevel: '',
    duration: '',
    topic: '',
    learningObjectives: '',
    studentCount: '',
    difficulty: 'intermediate'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Art', 'Music', 'Physical Education', 'Computer Science', 'Languages'
  ];

  const gradeLevels = [
    'Elementary (K-5)', 'Middle School (6-8)', 'High School (9-12)', 'College/University'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPlan({
        title: `${formData.subject}: ${formData.topic}`,
        duration: formData.duration,
        objectives: [
          'Students will understand key concepts',
          'Students will apply learned principles',
          'Students will demonstrate critical thinking'
        ],
        activities: [
          {
            name: 'Introduction & Hook',
            duration: '10 min',
            description: 'Engage students with interactive opening activity'
          },
          {
            name: 'Core Learning',
            duration: '20 min', 
            description: 'Present main concepts with visual aids and examples'
          },
          {
            name: 'Practice Activity',
            duration: '15 min',
            description: 'Students work in groups to apply concepts'
          },
          {
            name: 'Assessment & Wrap-up',
            duration: '10 min',
            description: 'Quick assessment and summary of key points'
          }
        ],
        materials: [
          'Whiteboard/Projector',
          'Handout materials',
          'Interactive props',
          'Assessment rubric'
        ],
        assessment: 'Formative assessment through group activities and exit tickets'
      });
      setIsGenerating(false);
      setCurrentStep(3);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grade Level *</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.gradeLevel}
            onChange={(e) => setFormData({...formData, gradeLevel: e.target.value})}
          >
            <option value="">Select Grade Level</option>
            {gradeLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration *</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
          >
            <option value="">Select Duration</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">1 hour</option>
            <option value="90 minutes">1.5 hours</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Students</label>
          <input 
            type="number"
            placeholder="e.g., 25"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={formData.studentCount}
            onChange={(e) => setFormData({...formData, studentCount: e.target.value})}
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lesson Topic *</label>
        <input 
          type="text"
          placeholder="e.g., Introduction to Fractions"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.topic}
          onChange={(e) => setFormData({...formData, topic: e.target.value})}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Learning Objectives</label>
        <textarea 
          rows={4}
          placeholder="What should students learn or be able to do after this lesson?"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={formData.learningObjectives}
          onChange={(e) => setFormData({...formData, learningObjectives: e.target.value})}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
        <div className="flex space-x-4">
          {['beginner', 'intermediate', 'advanced'].map(level => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                value={level}
                checked={formData.difficulty === level}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="mr-2"
              />
              <span className="capitalize">{level}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        {isGenerating ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        ) : (
          <Wand2 className="h-8 w-8 text-white" />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {isGenerating ? 'Generating Your Lesson Plan...' : 'Ready to Generate!'}
      </h3>
      <p className="text-gray-600 mb-8">
        {isGenerating ? 
          'Our AI is crafting a personalized lesson plan based on your requirements.' :
          'Click the button below to generate your AI-powered lesson plan.'
        }
      </p>
      {!isGenerating && (
        <button
          onClick={handleGenerate}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
        >
          Generate Lesson Plan
        </button>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{generatedPlan?.title}</h3>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {generatedPlan?.duration}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {formData.studentCount} students
              </span>
              <span className="flex items-center">
                <Target className="h-4 w-4 mr-1" />
                {formData.difficulty}
              </span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Objectives */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">Learning Objectives</h4>
          <ul className="space-y-2">
            {generatedPlan?.objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Materials Needed */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-semibold text-gray-900 mb-4">Materials Needed</h4>
          <ul className="space-y-2">
            {generatedPlan?.materials.map((material: string, index: number) => (
              <li key={index} className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-gray-700">{material}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lesson Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-4">Lesson Activities</h4>
        <div className="space-y-4">
          {generatedPlan?.activities.map((activity: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium text-gray-900">{activity.name}</h5>
                <span className="text-sm text-blue-600 font-medium">{activity.duration}</span>
              </div>
              <p className="text-gray-600">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Assessment */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">Assessment Strategy</h4>
        <p className="text-gray-700">{generatedPlan?.assessment}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Lesson Plan Generator</h2>
        <p className="text-gray-600">Create engaging, personalized lesson plans in minutes</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                ${currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
                }
              `}>
                {step}
              </div>
              {step < 3 && (
                <div className={`
                  w-16 h-1 mx-2
                  ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}

        {/* Navigation */}
        {currentStep < 3 && !isGenerating && (
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep === 1) {
                  setCurrentStep(2);
                }
              }}
              disabled={!formData.subject || !formData.topic || !formData.gradeLevel || !formData.duration}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300"
            >
              {currentStep === 1 ? 'Next' : 'Generate'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};