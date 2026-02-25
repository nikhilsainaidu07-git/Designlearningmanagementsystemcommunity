import { useState } from 'react';
import { ArrowLeft, BookOpen, FileText, Trophy, Lightbulb, Play, CheckCircle, Clock, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Quiz } from './Quiz';
import { Assignment } from './Assignment';
import { VirtualExamples } from './VirtualExamples';

interface CourseDetailProps {
  course: any;
  onBack: () => void;
  userRole: string;
}

export function CourseDetail({ course, onBack, userRole }: CourseDetailProps) {
  const [activeTab, setActiveTab] = useState('theory');
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
  };

  const getProgressPercentage = () => {
    const totalSections = course.modules?.length || 0;
    return totalSections > 0 ? (completedSections.length / totalSections) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>

      {/* Course Header Card */}
      <Card className="p-6 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {course.level}
              </span>
            </div>
            <h1 className="text-3xl mb-2">{course.title}</h1>
            <p className="text-blue-100 mb-4">{course.description}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.modules?.length || 0} Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Instructor: {course.instructor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar for Students */}
        {userRole === 'student' && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Your Progress</span>
              <span className="text-sm">{Math.round(getProgressPercentage())}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2 bg-white/20" />
          </div>
        )}
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="theory" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Theory</span>
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span className="hidden sm:inline">Quizzes</span>
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Assignments</span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Examples</span>
          </TabsTrigger>
        </TabsList>

        {/* Theory Content */}
        <TabsContent value="theory" className="space-y-4 mt-6">
          <Card className="p-6">
            <h2 className="text-2xl mb-4">Course Content</h2>
            <div className="space-y-6">
              {course.modules && course.modules.map((module: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl">Module {index + 1}: {module.title}</h3>
                        {completedSections.includes(`module-${index}`) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      
                      {/* Module Content */}
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        {module.topics && module.topics.map((topic: string, topicIndex: number) => (
                          <div key={topicIndex} className="flex items-center gap-2">
                            <Play className="w-4 h-4 text-blue-600" />
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>

                      {/* Learning Content */}
                      {module.content && (
                        <div className="mt-4 prose max-w-none">
                          <div className="bg-white rounded-lg p-4 border">
                            <p className="text-gray-700 leading-relaxed">{module.content}</p>
                          </div>
                        </div>
                      )}

                      {/* Mark Complete Button */}
                      {userRole === 'student' && (
                        <Button
                          onClick={() => markSectionComplete(`module-${index}`)}
                          disabled={completedSections.includes(`module-${index}`)}
                          className="mt-4"
                          variant={completedSections.includes(`module-${index}`) ? 'outline' : 'default'}
                        >
                          {completedSections.includes(`module-${index}`) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Completed
                            </>
                          ) : (
                            'Mark as Complete'
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* If no modules, show basic content */}
              {!course.modules && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {course.fullDescription || course.description}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </TabsContent>

        {/* Quizzes */}
        <TabsContent value="quizzes" className="mt-6">
          <Quiz course={course} userRole={userRole} />
        </TabsContent>

        {/* Assignments */}
        <TabsContent value="assignments" className="mt-6">
          <Assignment course={course} userRole={userRole} />
        </TabsContent>

        {/* Virtual Examples */}
        <TabsContent value="examples" className="mt-6">
          <VirtualExamples course={course} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
