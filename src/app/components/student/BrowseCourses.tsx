import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { mockCourses } from '../../data/mockData';
import { Search, Users, Clock, Star, BookmarkPlus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { CourseDetail } from '../course/CourseDetail';

interface BrowseCoursesProps {
  userRole?: string;
}

export function BrowseCourses({ userRole = 'student' }: BrowseCoursesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const categories = ['all', 'Programming', 'Design', 'Data Science', 'Marketing', 'Mobile Development'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = mockCourses
    .filter((course) => course.status === 'published')
    .filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });

  const handleEnrollCourse = (course: any) => {
    // Save enrollment to localStorage
    const enrollments = JSON.parse(localStorage.getItem('lms_enrollments') || '[]');
    const alreadyEnrolled = enrollments.some((e: any) => e.courseId === course.id);
    
    if (!alreadyEnrolled) {
      enrollments.push({
        courseId: course.id,
        enrolledAt: new Date().toISOString(),
        progress: 0,
      });
      localStorage.setItem('lms_enrollments', JSON.stringify(enrollments));
      alert('Successfully enrolled in ' + course.title);
    } else {
      alert('You are already enrolled in this course');
    }
  };

  // If a course is selected, show the course detail view
  if (selectedCourse) {
    return (
      <CourseDetail
        course={selectedCourse}
        onBack={() => setSelectedCourse(null)}
        userRole={userRole}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Browse Courses</h1>
        <p className="text-gray-600">Discover courses to enhance your skills</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Level" />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level === 'all' ? 'All Levels' : level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-t-lg flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-blue-100 text-blue-700">{course.category}</Badge>
                    <Badge className="bg-purple-100 text-purple-700">{course.level}</Badge>
                  </div>
                  <h3 className="mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>By {course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
                  >
                    View Course
                  </Button>
                  {userRole === 'student' && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEnrollCourse(course)}
                    >
                      <BookmarkPlus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-600">No courses found. Try adjusting your filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
