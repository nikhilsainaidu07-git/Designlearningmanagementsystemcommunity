import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FileText, Video, FileCheck, Eye, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockContent } from '../../data/mockData';

const statsData = [
  { icon: FileText, label: 'Total Content', value: '24', color: 'blue' },
  { icon: FileCheck, label: 'Published', value: '18', color: 'green' },
  { icon: Clock, label: 'Drafts', value: '6', color: 'orange' },
  { icon: Eye, label: 'Total Views', value: '1,247', color: 'indigo' },
];

export function ContentCreatorDashboard() {
  const recentContent = mockContent.slice(0, 3);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '🎥';
      case 'document':
        return '📄';
      case 'quiz':
        return '❓';
      case 'presentation':
        return '📊';
      default:
        return '📁';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Content Creator Dashboard</h1>
        <p className="text-gray-600">Create and manage educational content</p>
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-24 flex-col gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
              <Video className="w-8 h-8" />
              <span>Create Video Content</span>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline">
              <FileText className="w-8 h-8" />
              <span>Create Document</span>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline">
              <FileCheck className="w-8 h-8" />
              <span>Create Quiz</span>
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline">
              <TrendingUp className="w-8 h-8" />
              <span>Create Presentation</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Content */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentContent.map((content) => (
              <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{getContentIcon(content.type)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{content.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        {content.type}
                      </Badge>
                      <span className="text-sm text-gray-600">{content.course}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      content.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }
                  >
                    {content.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">{content.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: 'React Hooks Introduction', views: 342, type: 'video' },
                { title: 'JavaScript Best Practices', views: 256, type: 'document' },
                { title: 'Final Assessment Quiz', views: 189, type: 'quiz' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.type}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">{item.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'Videos', count: 8, color: 'blue' },
                { type: 'Documents', count: 10, color: 'indigo' },
                { type: 'Quizzes', count: 4, color: 'purple' },
                { type: 'Presentations', count: 2, color: 'pink' },
              ].map((item) => (
                <div key={item.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{item.type}</span>
                    <span className="font-medium text-gray-900">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${item.color}-600`}
                      style={{ width: `${(item.count / 24) * 100}%` }}
                    ></div>
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
