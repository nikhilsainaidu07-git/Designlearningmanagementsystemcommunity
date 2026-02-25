import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockAssignments, Assignment } from '../../data/mockData';
import { Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export function StudentAssignments() {
  const [submissionText, setSubmissionText] = useState('');

  const pendingAssignments = mockAssignments.filter((a) => a.status === 'pending');
  const submittedAssignments = mockAssignments.filter((a) => a.status === 'submitted');
  const gradedAssignments = mockAssignments.filter((a) => a.status === 'graded');

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const renderAssignmentCard = (assignment: Assignment, showSubmit: boolean = false) => {
    const daysLeft = getDaysUntilDue(assignment.dueDate);

    return (
      <Card key={assignment.id}>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="mb-1">{assignment.title}</h3>
                  <p className="text-sm text-gray-600">{assignment.courseName}</p>
                </div>
                {assignment.status === 'graded' && assignment.grade !== undefined && (
                  <Badge className="bg-green-100 text-green-700">
                    {assignment.grade}/{assignment.points}
                  </Badge>
                )}
                {assignment.status === 'submitted' && (
                  <Badge className="bg-blue-100 text-blue-700">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Submitted
                  </Badge>
                )}
                {assignment.status === 'pending' && daysLeft <= 3 && (
                  <Badge className="bg-red-100 text-red-700">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Due Soon
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{assignment.description}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Due Date</p>
                <p className="font-medium text-gray-900">{assignment.dueDate}</p>
              </div>
              <div>
                <p className="text-gray-500">Points</p>
                <p className="font-medium text-gray-900">{assignment.points}</p>
              </div>
              {assignment.status === 'pending' && (
                <div>
                  <p className="text-gray-500">Time Left</p>
                  <p
                    className={`font-medium ${
                      daysLeft <= 3 ? 'text-red-600' : 'text-gray-900'
                    }`}
                  >
                    {daysLeft} days
                  </p>
                </div>
              )}
            </div>
            {showSubmit && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Submit Assignment</DialogTitle>
                    <DialogDescription>{assignment.title}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="submission">Your Work</Label>
                      <Textarea
                        id="submission"
                        placeholder="Paste your work or provide a link to your submission..."
                        value={submissionText}
                        onChange={(e) => setSubmissionText(e.target.value)}
                        rows={8}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Upload Files (Optional)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PDF, DOC, ZIP up to 10MB
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-green-600 hover:bg-green-700">
                        Submit
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Assignments</h1>
        <p className="text-gray-600">Manage your assignments and submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <h2>{pendingAssignments.length}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <h2>{submittedAssignments.length}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Graded</p>
                <h2>{gradedAssignments.length}</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({gradedAssignments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingAssignments.map((assignment) => renderAssignmentCard(assignment, true))}
          {pendingAssignments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-gray-600">No pending assignments. Great job!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="submitted" className="space-y-4">
          {submittedAssignments.map((assignment) => renderAssignmentCard(assignment))}
          {submittedAssignments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No submitted assignments.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="graded" className="space-y-4">
          {gradedAssignments.map((assignment) => renderAssignmentCard(assignment))}
          {gradedAssignments.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-gray-600">No graded assignments yet.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
