import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { mockCourses } from '../../data/mockData';
import { BookOpen, Clock, Users, Star, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CourseDetail } from '../course/CourseDetail';

export function MyCourses() {
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const enrolledCourses = mockCourses.filter((c) => c.enrolled);
  const activeCourses = enrolledCourses.filter((c) => (c.progress || 0) < 100);
  const completedCourses = []; // Mock - would be courses with 100% progress

  // If a course is selected, show the course detail view
  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        userRole="student"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">My Courses</h1>
        <p className="text-gray-600">Continue learning and track your progress</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active ({activeCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Course Header */}
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">📚</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Instructor: {course.instructor}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-700">{course.category}</Badge>
                          <Badge className="bg-purple-100 text-purple-700">{course.level}</Badge>
                        </div>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Course Progress</span>
                        <span className="font-medium text-gray-900">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Continue Learning
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedCourse(course)}>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="mb-2">No Completed Courses Yet</h3>
              <p className="text-gray-600">
                Keep learning! Complete your active courses to see them here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enrolled Courses</p>
                <h2 className="mt-2">{enrolledCourses.length}</h2>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hours This Week</p>
                <h2 className="mt-2">19.0</h2>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Progress</p>
                <h2 className="mt-2">
                  {Math.round(
                    enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) /
                      enrolledCourses.length
                  )}
                  %
                </h2>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
