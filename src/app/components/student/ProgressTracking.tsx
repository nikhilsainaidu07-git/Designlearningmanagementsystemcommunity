import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { mockCourses } from '../../data/mockData';
import { Target, TrendingUp, Award, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function ProgressTracking() {
  const enrolledCourses = mockCourses.filter((c) => c.enrolled);

  const overallProgress = Math.round(
    enrolledCourses.reduce((acc, course) => acc + (course.progress || 0), 0) / enrolledCourses.length
  );

  const progressData = [
    { name: 'Completed', value: overallProgress, color: '#4f46e5' },
    { name: 'Remaining', value: 100 - overallProgress, color: '#e5e7eb' },
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.0 },
    { day: 'Wed', hours: 1.5 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 3.5 },
    { day: 'Sun', hours: 2.5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Progress Tracking</h1>
        <p className="text-gray-600">Monitor your learning journey and achievements</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Overall Progress</p>
                <h2>{overallProgress}%</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <h2>5 Courses</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <h2>19.0 hrs</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Study Streak</p>
                <h2>12 Days</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-8">
            <div className="relative">
              <ResponsiveContainer width={250} height={250}>
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-gray-900">{overallProgress}%</h1>
                <p className="text-sm text-gray-600">Complete</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyActivity.map((day) => (
                <div key={day.day} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{day.day}</span>
                    <span className="text-gray-600">{day.hours} hours</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      style={{ width: `${(day.hours / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course-wise Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                  </div>
                  <Badge
                    className={
                      (course.progress || 0) >= 80
                        ? 'bg-green-100 text-green-700'
                        : (course.progress || 0) >= 50
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-orange-100 text-orange-700'
                    }
                  >
                    {course.progress}% Complete
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={course.progress} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <p className="text-xs text-gray-500">Lessons</p>
                      <p className="font-medium text-gray-900">
                        {Math.floor(((course.progress || 0) / 100) * 20)}/20
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assignments</p>
                      <p className="font-medium text-gray-900">
                        {Math.floor(((course.progress || 0) / 100) * 5)}/5
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Quizzes</p>
                      <p className="font-medium text-gray-900">
                        {Math.floor(((course.progress || 0) / 100) * 3)}/3
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: '🏆', title: 'Course Champion', description: 'Completed 5 courses' },
              { icon: '⚡', title: 'Quick Learner', description: '12-day study streak' },
              { icon: '⭐', title: 'Top Performer', description: '3.8 GPA maintained' },
            ].map((achievement, index) => (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg text-center"
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-medium text-gray-900 mb-1">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
