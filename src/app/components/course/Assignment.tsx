import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { FileText, Upload, Sparkles, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface AssignmentProps {
  course: any;
  userRole: string;
}

export function Assignment({ course, userRole }: AssignmentProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionText, setSubmissionText] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAiHelp, setShowAiHelp] = useState(false);

  // Sample assignments
  const assignments = [
    {
      id: 1,
      title: 'Module 1 Assignment: Foundations',
      description: 'Complete a comprehensive analysis of the fundamental concepts covered in Module 1.',
      dueDate: '2026-03-10',
      points: 100,
      status: 'open',
      requirements: [
        'Minimum 500 words',
        'Include at least 3 key concepts',
        'Provide real-world examples',
        'Cite your sources',
      ],
      prompts: [
        'What are the main concepts covered in this module?',
        'How do these concepts apply to real-world scenarios?',
        'What challenges might you face when implementing these concepts?',
        'How does this module connect to your learning goals?',
      ],
    },
    {
      id: 2,
      title: 'Module 2 Assignment: Practical Application',
      description: 'Demonstrate your understanding through a practical project or case study.',
      dueDate: '2026-03-20',
      points: 150,
      status: 'open',
      requirements: [
        'Include diagrams or visuals',
        'Minimum 800 words',
        'Address all provided questions',
        'Show step-by-step process',
      ],
      prompts: [
        'Describe your approach to the problem',
        'What methodology did you use?',
        'What were your key findings?',
        'How can your solution be improved?',
      ],
    },
    {
      id: 3,
      title: 'Final Project: Comprehensive Analysis',
      description: 'Create a comprehensive project that demonstrates mastery of all course concepts.',
      dueDate: '2026-04-01',
      points: 200,
      status: 'upcoming',
      requirements: [
        'Minimum 1500 words',
        'Integrate concepts from all modules',
        'Include research and citations',
        'Present a complete solution or analysis',
      ],
      prompts: [
        'How do the course concepts work together?',
        'What is your thesis or main argument?',
        'What evidence supports your conclusions?',
        'What are the implications of your findings?',
      ],
    },
  ];

  const handleSelectAssignment = (assignment: any) => {
    setSelectedAssignment(assignment);
    setSubmissionText('');
    setAiSuggestions([]);
    setIsSubmitted(false);
    setShowAiHelp(false);
  };

  const handleGetAiHelp = () => {
    // Simulate AI suggestions
    const suggestions = [
      `Consider starting with an introduction that outlines your main argument about ${course.title}.`,
      `Include specific examples from the course materials to support your points.`,
      `Structure your response to address each of the assignment prompts systematically.`,
      `Use transition sentences to connect different sections of your submission.`,
      `Conclude by summarizing your key insights and their practical applications.`,
    ];
    setAiSuggestions(suggestions);
    setShowAiHelp(true);
  };

  const handleGetAiReview = () => {
    // Simulate AI review of the submission
    const wordCount = submissionText.trim().split(/\s+/).length;
    const feedback = [];

    if (wordCount < 500) {
      feedback.push('Your submission is shorter than the minimum requirement. Consider expanding your analysis.');
    } else {
      feedback.push('Good job! Your submission meets the word count requirement.');
    }

    if (submissionText.includes('example') || submissionText.includes('for instance')) {
      feedback.push('Great! You\'ve included examples to illustrate your points.');
    } else {
      feedback.push('Consider adding specific examples to strengthen your arguments.');
    }

    if (submissionText.split('\n\n').length < 3) {
      feedback.push('Try organizing your content into clear paragraphs for better readability.');
    } else {
      feedback.push('Excellent paragraph structure!');
    }

    feedback.push('Remember to proofread for grammar and clarity before final submission.');

    alert('AI Review:\n\n' + feedback.join('\n\n'));
  };

  const handleSubmitAssignment = () => {
    // Save submission to localStorage
    const submissions = JSON.parse(localStorage.getItem('lms_submissions') || '[]');
    submissions.push({
      assignmentId: selectedAssignment.id,
      courseTitle: course.title,
      submissionText,
      submittedAt: new Date().toISOString(),
      status: 'submitted',
    });
    localStorage.setItem('lms_submissions', JSON.stringify(submissions));
    setIsSubmitted(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Assignment List View
  if (!selectedAssignment) {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="text-2xl">Course Assignments</h2>
              <p className="text-gray-600">Complete assignments to demonstrate your understanding</p>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {assignments.map((assignment) => {
            const daysUntilDue = getDaysUntilDue(assignment.dueDate);
            return (
              <Card key={assignment.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl">{assignment.title}</h3>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        {daysUntilDue >= 0 && (
                          <span className={daysUntilDue <= 3 ? 'text-red-600' : 'text-gray-600'}>
                            ({daysUntilDue} days left)
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Points: {assignment.points}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Button
                      onClick={() => handleSelectAssignment(assignment)}
                      disabled={userRole !== 'student'}
                    >
                      {userRole === 'student' ? 'Start Assignment' : 'View Details'}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  // Assignment Submission View
  if (isSubmitted) {
    return (
      <div className="space-y-4">
        <Card className="p-8 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl mb-2">Assignment Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Your submission has been received. Your instructor will review it and provide feedback soon.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
            <h3 className="mb-2">Submission Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Assignment:</span>
                <span>{selectedAssignment.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Submitted:</span>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Word Count:</span>
                <span>{submissionText.trim().split(/\s+/).length} words</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600">Submitted - Pending Review</span>
              </div>
            </div>
          </div>
          <Button onClick={() => setSelectedAssignment(null)}>
            Back to Assignments
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Assignment Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl mb-2">{selectedAssignment.title}</h2>
            <p className="text-gray-600 mb-4">{selectedAssignment.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Badge className={getStatusColor(selectedAssignment.status)}>
                {selectedAssignment.status}
              </Badge>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Due: {new Date(selectedAssignment.dueDate).toLocaleDateString()}
              </span>
              <span>Points: {selectedAssignment.points}</span>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="bg-white rounded-lg p-4">
          <h3 className="mb-2">Requirements:</h3>
          <ul className="space-y-2">
            {selectedAssignment.requirements.map((req: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Assignment Prompts */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Assignment Prompts</h3>
        <div className="space-y-3">
          {selectedAssignment.prompts.map((prompt: string, index: number) => (
            <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-600 flex-shrink-0">{index + 1}.</span>
              <p className="text-gray-700">{prompt}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Help Section */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl">AI Writing Assistant</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Get intelligent suggestions to help structure and improve your submission
        </p>
        {!showAiHelp ? (
          <Button onClick={handleGetAiHelp} variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-100">
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Suggestions
          </Button>
        ) : (
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-purple-200">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-1" />
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Submission Area */}
      <Card className="p-6">
        <h3 className="text-xl mb-4">Your Submission</h3>
        <Textarea
          value={submissionText}
          onChange={(e) => setSubmissionText(e.target.value)}
          placeholder="Type your assignment response here... Address all the prompts above."
          className="min-h-[400px] mb-4"
          disabled={userRole !== 'student'}
        />
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Word count: {submissionText.trim().split(/\s+/).filter(word => word.length > 0).length} words
          </span>
          {userRole === 'student' && (
            <Button
              variant="outline"
              onClick={handleGetAiReview}
              disabled={!submissionText.trim()}
              className="border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Review
            </Button>
          )}
        </div>

        {/* File Upload */}
        <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Attach supporting files (optional)</p>
          <Input type="file" className="max-w-xs mx-auto" disabled={userRole !== 'student'} />
        </div>

        <div className="flex gap-4">
          {userRole === 'student' && (
            <Button
              onClick={handleSubmitAssignment}
              disabled={!submissionText.trim() || submissionText.trim().split(/\s+/).length < 100}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Assignment
            </Button>
          )}
          <Button variant="outline" onClick={() => setSelectedAssignment(null)}>
            Back to Assignments
          </Button>
        </div>

        {userRole !== 'student' && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">Only students can submit assignments</span>
          </div>
        )}
      </Card>
    </div>
  );
}
