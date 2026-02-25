import { useState } from 'react';
import { Login } from './components/Login';
import { Registration } from './components/Registration';
import { DashboardLayout } from './components/DashboardLayout';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserManagement } from './components/admin/UserManagement';
import { CourseApprovals } from './components/admin/CourseApprovals';

// Instructor Components
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { CourseManagement } from './components/instructor/CourseManagement';
import { GradeManagement } from './components/instructor/GradeManagement';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { BrowseCourses } from './components/student/BrowseCourses';
import { StudentAssignments } from './components/student/StudentAssignments';
import { ProgressTracking } from './components/student/ProgressTracking';
import { MyCourses } from './components/student/MyCourses';

// Content Creator Components
import { ContentCreatorDashboard } from './components/content-creator/ContentCreatorDashboard';
import { ContentLibrary } from './components/content-creator/ContentLibrary';

// Shared Components
import { Discussions } from './components/shared/Discussions';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: '',
    role: '',
    fullName: '',
    email: '',
  });
  const [activeView, setActiveView] = useState('dashboard');

  const handleLogin = (username: string, role: string, fullName: string, email: string) => {
    setCurrentUser({ username, role, fullName, email });
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  const handleRegister = (userData: {
    username: string;
    email: string;
    role: string;
    fullName: string;
  }) => {
    // Auto-login after registration
    handleLogin(userData.username, userData.role, userData.fullName, userData.email);
    setShowRegistration(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser({ username: '', role: '', fullName: '', email: '' });
    setActiveView('dashboard');
    setShowRegistration(false);
  };

  const renderView = () => {
    switch (currentUser.role) {
      case 'admin':
        return renderAdminView();
      case 'instructor':
        return renderInstructorView();
      case 'student':
        return renderStudentView();
      case 'content-creator':
        return renderContentCreatorView();
      default:
        return <div>Invalid role</div>;
    }
  };

  const renderAdminView = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'approvals':
        return <CourseApprovals />;
      case 'roles':
        return <PlaceholderView title="Role Management" description="Manage user roles and permissions" />;
      case 'settings':
        return <PlaceholderView title="Platform Settings" description="Configure platform settings and preferences" />;
      case 'analytics':
        return <PlaceholderView title="Analytics" description="View detailed platform analytics and reports" />;
      default:
        return <AdminDashboard />;
    }
  };

  const renderInstructorView = () => {
    switch (activeView) {
      case 'dashboard':
        return <InstructorDashboard />;
      case 'courses':
        return <CourseManagement />;
      case 'create-course':
        return <PlaceholderView title="Create Course" description="Create a new course with lessons and materials" />;
      case 'materials':
        return <PlaceholderView title="Course Materials" description="Manage course materials and resources" />;
      case 'assignments':
        return <PlaceholderView title="Assignments" description="Create and manage course assignments" />;
      case 'grading':
        return <GradeManagement />;
      case 'discussions':
        return <Discussions />;
      case 'students':
        return <PlaceholderView title="Students" description="View and manage enrolled students" />;
      case 'browse':
        return <BrowseCourses userRole={currentUser.role} />;
      default:
        return <InstructorDashboard />;
    }
  };

  const renderStudentView = () => {
    switch (activeView) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'courses':
        return <MyCourses />;
      case 'browse':
        return <BrowseCourses userRole={currentUser.role} />;
      case 'assignments':
        return <StudentAssignments />;
      case 'grades':
        return <PlaceholderView title="Grades" description="View all your grades and feedback" />;
      case 'progress':
        return <ProgressTracking />;
      case 'discussions':
        return <Discussions />;
      default:
        return <StudentDashboard />;
    }
  };

  const renderContentCreatorView = () => {
    switch (activeView) {
      case 'dashboard':
        return <ContentCreatorDashboard />;
      case 'library':
        return <ContentLibrary />;
      case 'create':
        return <PlaceholderView title="Create Content" description="Create new educational content and materials" />;
      case 'content':
        return <PlaceholderView title="My Content" description="Manage all your created content" />;
      case 'courses':
        return <BrowseCourses userRole={currentUser.role} />;
      case 'resources':
        return <PlaceholderView title="Resources" description="Manage educational resources and assets" />;
      default:
        return <ContentCreatorDashboard />;
    }
  };

  if (!isLoggedIn) {
    if (showRegistration) {
      return (
        <Registration
          onRegister={handleRegister}
          onSwitchToLogin={() => setShowRegistration(false)}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegistration(true)}
      />
    );
  }

  return (
    <DashboardLayout
      role={currentUser.role}
      username={currentUser.username}
      onLogout={handleLogout}
      activeView={activeView}
      onViewChange={setActiveView}
    >
      {renderView()}
    </DashboardLayout>
  );
}

// Placeholder component for views that aren't fully implemented
function PlaceholderView({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12 text-center border-2 border-dashed border-blue-200">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🚀</span>
        </div>
        <h3 className="mb-2">{title}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{description}</p>
      </div>
    </div>
  );
}
