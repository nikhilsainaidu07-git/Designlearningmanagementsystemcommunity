import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Users, BookOpen, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const statsData = [
  { icon: Users, label: 'Total Users', value: '2,547', change: '+12%', color: 'blue' },
  { icon: BookOpen, label: 'Active Courses', value: '124', change: '+5%', color: 'indigo' },
  { icon: CheckCircle, label: 'Completed Courses', value: '1,832', change: '+18%', color: 'green' },
  { icon: Clock, label: 'Pending Approvals', value: '8', change: '+2', color: 'orange' },
];

const enrollmentData = [
  { month: 'Jan', students: 400 },
  { month: 'Feb', students: 450 },
  { month: 'Mar', students: 520 },
  { month: 'Apr', students: 580 },
  { month: 'May', students: 650 },
  { month: 'Jun', students: 720 },
];

const courseData = [
  { category: 'Programming', count: 45 },
  { category: 'Design', count: 32 },
  { category: 'Business', count: 28 },
  { category: 'Marketing', count: 19 },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Administrator Dashboard</h1>
        <p className="text-gray-600">Monitor and manage your learning platform</p>
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
                    <p className={`text-sm mt-1 text-${stat.color}-600`}>{stat.change}</p>
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trend</CardTitle>
            <CardDescription>Monthly student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  dot={{ fill: '#4f46e5', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Courses by Category</CardTitle>
            <CardDescription>Distribution of active courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
          <CardDescription>Latest actions across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action: 'New course submitted for approval',
                user: 'Michael Chen',
                time: '2 hours ago',
                type: 'course',
              },
              {
                action: 'User account created',
                user: 'New Student',
                time: '3 hours ago',
                type: 'user',
              },
              {
                action: 'Course published',
                user: 'Haneef',
                time: '5 hours ago',
                type: 'course',
              },
              {
                action: 'Role permissions updated',
                user: 'Yasasri',
                time: '1 day ago',
                type: 'system',
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
