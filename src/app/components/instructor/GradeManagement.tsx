import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { mockAssignments } from '../../data/mockData';
import { CheckCircle, Clock, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';

export function GradeManagement() {
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');

  const submittedAssignments = mockAssignments.filter((a) => a.status === 'submitted');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Grade Submissions</h1>
        <p className="text-gray-600">Review and grade student submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Pending Review</p>
            <h2 className="mt-2">{submittedAssignments.length}</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Graded This Week</p>
            <h2 className="mt-2">24</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Average Grade</p>
            <h2 className="mt-2">87%</h2>
          </CardContent>
        </Card>
      </div>

      {submittedAssignments.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3>All Caught Up!</h3>
            <p className="text-gray-600 mt-2">No pending submissions to grade at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {submittedAssignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3>{assignment.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{assignment.courseName}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Review
                        </Badge>
                      </div>
                      <p className="text-gray-600">{assignment.description}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Student</p>
                        <p className="font-medium text-gray-900">Suhail</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Submitted</p>
                        <p className="font-medium text-gray-900">2 days ago</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Max Points</p>
                        <p className="font-medium text-gray-900">{assignment.points}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Submission
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Grade Assignment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Grade Assignment</DialogTitle>
                            <DialogDescription>{assignment.title}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="grade">
                                Grade (out of {assignment.points} points)
                              </Label>
                              <Input
                                id="grade"
                                type="number"
                                placeholder="Enter grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                max={assignment.points}
                                min={0}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="feedback">Feedback</Label>
                              <Textarea
                                id="feedback"
                                placeholder="Provide feedback to the student..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={6}
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline">Cancel</Button>
                              <Button className="bg-green-600 hover:bg-green-700">
                                Submit Grade
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
