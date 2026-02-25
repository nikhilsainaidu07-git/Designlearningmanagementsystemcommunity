import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, CheckSquare, Award, TrendingUp, Clock, Target } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';
import { mockCourses } from '../../data/mockData';

const statsData = [
  { icon: BookOpen, label: 'Enrolled Courses', value: '3', color: 'blue' },
  { icon: CheckSquare, label: 'Assignments Due', value: '2', color: 'orange' },
  { icon: Award, label: 'Completed Courses', value: '5', color: 'green' },
  { icon: Target, label: 'Current GPA', value: '3.8', color: 'indigo' },
];

export function StudentDashboard() {
  const enrolledCourses = mockCourses.filter((c) => c.enrolled);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Student Dashboard</h1>
        <p className="text-gray-600">Track your learning journey and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <h2 className="mt-2">{stat.value}</h2>
                  </div>
                  <div
                    className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Continue Learning */}
      <Card>
        <CardHeader>
          <CardTitle>Continue Learning</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-full sm:w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    Continue Course
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Build a Todo App',
                  course: 'Introduction to React',
                  dueDate: 'March 5, 2026',
                  daysLeft: 9,
                },
                {
                  title: 'Marketing Campaign Analysis',
                  course: 'Digital Marketing Strategy',
                  dueDate: 'March 15, 2026',
                  daysLeft: 19,
                },
              ].map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{assignment.title}</p>
                    <p className="text-sm text-gray-600">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-orange-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{assignment.daysLeft} days</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{assignment.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Component Lifecycle Quiz',
                  course: 'Introduction to React',
                  grade: 45,
                  maxGrade: 50,
                  percentage: 90,
                },
                {
                  title: 'JavaScript Fundamentals Test',
                  course: 'Advanced JavaScript',
                  grade: 85,
                  maxGrade: 100,
                  percentage: 85,
                },
              ].map((grade, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{grade.title}</p>
                      <p className="text-sm text-gray-600">{grade.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {grade.grade}/{grade.maxGrade}
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          grade.percentage >= 90
                            ? 'text-green-600'
                            : grade.percentage >= 80
                            ? 'text-blue-600'
                            : 'text-orange-600'
                        }`}
                      >
                        {grade.percentage}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
