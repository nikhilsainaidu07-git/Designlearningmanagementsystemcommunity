import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { BookOpen, Users, CheckSquare, TrendingUp, Clock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const statsData = [
  { icon: BookOpen, label: 'My Courses', value: '3', color: 'blue' },
  { icon: Users, label: 'Total Students', value: '423', color: 'indigo' },
  { icon: CheckSquare, label: 'Pending Grades', value: '12', color: 'orange' },
  { icon: Star, label: 'Avg. Rating', value: '4.8', color: 'green' },
];

const performanceData = [
  { course: 'React', completion: 85, students: 156 },
  { course: 'JavaScript', completion: 72, students: 89 },
  { course: 'Data Science', completion: 45, students: 178 },
];

export function InstructorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Instructor Dashboard</h1>
        <p className="text-gray-600">Manage your courses and track student progress</p>
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

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Course Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="course" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="completion" fill="#4f46e5" radius={[8, 8, 0, 0]} name="Completion %" />
              <Bar dataKey="students" fill="#818cf8" radius={[8, 8, 0, 0]} name="Students" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  student: 'Suhail',
                  assignment: 'Build a Todo App',
                  course: 'React',
                  time: '2 hours ago',
                },
                {
                  student: 'Jane Smith',
                  assignment: 'Async Programming Challenge',
                  course: 'JavaScript',
                  time: '4 hours ago',
                },
                {
                  student: 'Mike Johnson',
                  assignment: 'Data Analysis Project',
                  course: 'Data Science',
                  time: '1 day ago',
                },
              ].map((submission, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{submission.student}</p>
                    <p className="text-sm text-gray-600">{submission.assignment}</p>
                    <Badge className="mt-1 bg-blue-100 text-blue-700">{submission.course}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{submission.time}</p>
                    <Button size="sm" className="mt-2">
                      Grade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start h-12" variant="outline">
                <BookOpen className="w-5 h-5 mr-3" />
                Create New Course
              </Button>
              <Button className="w-full justify-start h-12" variant="outline">
                <CheckSquare className="w-5 h-5 mr-3" />
                Create Assignment
              </Button>
              <Button className="w-full justify-start h-12" variant="outline">
                <Users className="w-5 h-5 mr-3" />
                View All Students
              </Button>
              <Button className="w-full justify-start h-12" variant="outline">
                <TrendingUp className="w-5 h-5 mr-3" />
                View Analytics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
