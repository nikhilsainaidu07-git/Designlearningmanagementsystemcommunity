import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, XCircle, Trophy, Brain, Sparkles } from 'lucide-react';
import { Progress } from '../ui/progress';

interface QuizProps {
  course: any;
  userRole: string;
}

export function Quiz({ course, userRole }: QuizProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [aiHintUsed, setAiHintUsed] = useState<{ [key: number]: boolean }>({});

  // Sample quizzes for different courses
  const quizzes = [
    {
      id: 1,
      title: 'Module 1 Quiz',
      description: 'Test your understanding of the basics',
      questions: [
        {
          id: 1,
          question: 'What is the primary purpose of this course?',
          options: [
            'To understand fundamental concepts',
            'To memorize facts',
            'To pass an exam',
            'To complete assignments',
          ],
          correctAnswer: 0,
          aiHint: 'Think about the long-term learning goals rather than short-term objectives.',
          explanation: 'The primary purpose is to understand fundamental concepts, which forms the foundation for advanced learning.',
        },
        {
          id: 2,
          question: 'Which learning approach is most effective?',
          options: [
            'Passive reading',
            'Active practice and application',
            'Watching videos only',
            'Listening to lectures',
          ],
          correctAnswer: 1,
          aiHint: 'Research shows that engaging with material actively leads to better retention.',
          explanation: 'Active practice and application helps reinforce learning through hands-on experience.',
        },
        {
          id: 3,
          question: 'How often should you review the material?',
          options: [
            'Once before the exam',
            'Never, just learn it once',
            'Regularly through spaced repetition',
            'Only when you forget',
          ],
          correctAnswer: 2,
          aiHint: 'Consider techniques backed by cognitive science for optimal retention.',
          explanation: 'Spaced repetition is proven to be the most effective way to retain information long-term.',
        },
      ],
      timeLimit: 10,
      passingScore: 70,
    },
    {
      id: 2,
      title: 'Module 2 Assessment',
      description: 'Advanced concepts and applications',
      questions: [
        {
          id: 1,
          question: 'What is the key to mastering complex topics?',
          options: [
            'Reading more books',
            'Breaking them into smaller parts',
            'Studying for longer hours',
            'Memorizing everything',
          ],
          correctAnswer: 1,
          aiHint: 'Think about cognitive load theory and how our brains process information.',
          explanation: 'Breaking complex topics into smaller, manageable parts makes learning more effective.',
        },
        {
          id: 2,
          question: 'Which practice enhances understanding?',
          options: [
            'Rereading the same material',
            'Teaching others or explaining concepts',
            'Highlighting text',
            'Taking long breaks',
          ],
          correctAnswer: 1,
          aiHint: 'The Feynman Technique suggests that explaining concepts is a powerful learning tool.',
          explanation: 'Teaching others forces you to understand the material deeply and identify knowledge gaps.',
        },
      ],
      timeLimit: 8,
      passingScore: 75,
    },
    {
      id: 3,
      title: 'Final Assessment',
      description: 'Comprehensive evaluation of all modules',
      questions: [
        {
          id: 1,
          question: 'What indicates true mastery of a subject?',
          options: [
            'Getting high scores on tests',
            'Being able to apply knowledge in new contexts',
            'Finishing the course quickly',
            'Remembering all the details',
          ],
          correctAnswer: 1,
          aiHint: 'True mastery involves transfer of knowledge to novel situations.',
          explanation: 'The ability to apply knowledge in new, unfamiliar contexts demonstrates true understanding.',
        },
      ],
      timeLimit: 15,
      passingScore: 80,
    },
  ];

  const handleStartQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setAiHintUsed({});
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const handleUseAiHint = () => {
    setAiHintUsed({
      ...aiHintUsed,
      [currentQuestion]: true,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    selectedQuiz.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedQuiz.questions.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Quiz Selection View
  if (!selectedQuiz) {
    return (
      <div className="space-y-4">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <div>
              <h2 className="text-2xl">Course Quizzes</h2>
              <p className="text-gray-600">Test your knowledge and track your progress</p>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Questions:</span>
                    <span>{quiz.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Limit:</span>
                    <span>{quiz.timeLimit} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Passing Score:</span>
                    <span>{quiz.passingScore}%</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => handleStartQuiz(quiz)}
                className="w-full"
                disabled={userRole !== 'student'}
              >
                Start Quiz
              </Button>
              {userRole !== 'student' && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Only students can take quizzes
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Results View
  if (showResults) {
    const score = calculateScore();
    const passed = score >= selectedQuiz.passingScore;

    return (
      <div className="space-y-4">
        <Card className="p-8 text-center">
          <div className={`text-6xl mb-4 ${passed ? 'text-green-500' : 'text-yellow-500'}`}>
            {passed ? <Trophy className="w-24 h-24 mx-auto" /> : '📊'}
          </div>
          <h2 className="text-3xl mb-2">Quiz Complete!</h2>
          <p className={`text-5xl mb-4 ${getScoreColor(score)}`}>{score}%</p>
          <p className="text-gray-600 mb-6">
            You answered {Object.keys(selectedAnswers).filter((key) => selectedAnswers[parseInt(key)] === selectedQuiz.questions[parseInt(key)].correctAnswer).length} out of {selectedQuiz.questions.length} questions correctly
          </p>
          {passed ? (
            <p className="text-green-600 mb-6">
              🎉 Congratulations! You passed the quiz!
            </p>
          ) : (
            <p className="text-yellow-600 mb-6">
              Keep practicing! You need {selectedQuiz.passingScore}% to pass.
            </p>
          )}
          <div className="flex gap-4 justify-center">
            <Button onClick={() => handleStartQuiz(selectedQuiz)}>
              Retake Quiz
            </Button>
            <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
              Back to Quizzes
            </Button>
          </div>
        </Card>

        {/* Review Answers */}
        <Card className="p-6">
          <h3 className="text-xl mb-4">Review Your Answers</h3>
          <div className="space-y-6">
            {selectedQuiz.questions.map((question: any, index: number) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={question.id} className="border-l-4 pl-4" style={{ borderColor: isCorrect ? '#22c55e' : '#ef4444' }}>
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="mb-2">{question.question}</p>
                      <div className="text-sm space-y-1">
                        <p className="text-gray-600">
                          Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                            {question.options[selectedAnswers[index]]}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600">
                            Correct answer: {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-blue-600 bg-blue-50 p-2 rounded mt-2">
                          💡 {question.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  // Quiz Taking View
  const question = selectedQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {selectedQuiz.questions.length}
          </span>
          <span className="text-sm text-gray-600">{selectedQuiz.title}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </Card>

      {/* Question Card */}
      <Card className="p-8">
        <h3 className="text-2xl mb-6">{question.question}</h3>

        {/* AI Hint */}
        {aiHintUsed[currentQuestion] && (
          <div className="mb-6 p-4 bg-purple-50 border-l-4 border-purple-500 rounded">
            <div className="flex items-start gap-2">
              <Brain className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-purple-900">
                  <strong>AI Hint:</strong> {question.aiHint}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* AI Hint Button */}
        {!aiHintUsed[currentQuestion] && (
          <Button
            variant="outline"
            onClick={handleUseAiHint}
            className="mb-6 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Get AI Hint
          </Button>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <div className="flex gap-2">
            {currentQuestion < selectedQuiz.questions.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== selectedQuiz.questions.length}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </Card>

      <Button variant="outline" onClick={() => setSelectedQuiz(null)}>
        Exit Quiz
      </Button>
    </div>
  );
}
