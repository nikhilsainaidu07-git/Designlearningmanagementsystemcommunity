import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockCourses, Course } from '../../data/mockData';
import { CheckCircle, XCircle, Eye, Clock } from 'lucide-react';

export function CourseApprovals() {
  const [courses, setCourses] = useState<Course[]>(
    mockCourses.filter((c) => c.status === 'pending' || c.status === 'draft')
  );

  const handleApprove = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  const handleReject = (courseId: string) => {
    setCourses(courses.filter((c) => c.id !== courseId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Course Approvals</h1>
        <p className="text-gray-600">Review and approve pending course submissions</p>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3>All Caught Up!</h3>
            <p className="text-gray-600 mt-2">No pending course approvals at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-48 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">📚</span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3>{course.title}</h3>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Clock className="w-3 h-3 mr-1" />
                          {course.status}
                        </Badge>
                      </div>
                      <p className="text-gray-600">{course.description}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Instructor</p>
                        <p className="font-medium text-gray-900">{course.instructor}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Category</p>
                        <p className="font-medium text-gray-900">{course.category}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Level</p>
                        <p className="font-medium text-gray-900">{course.level}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Course
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(course.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(course.id)}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
