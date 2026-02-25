import { useState, ReactNode } from 'react';
import {
  Home,
  BookOpen,
  Users,
  Settings,
  FileText,
  BarChart,
  MessageSquare,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  GraduationCap,
  FolderOpen,
  CheckSquare,
  Award,
  PlusCircle,
  UserCog,
  Shield,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  username: string;
  onLogout: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

export function DashboardLayout({
  children,
  role,
  username,
  onLogout,
  activeView,
  onViewChange,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getNavigationItems = () => {
    switch (role) {
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', view: 'dashboard' },
          { icon: Users, label: 'User Management', view: 'users' },
          { icon: Shield, label: 'Role Management', view: 'roles' },
          { icon: BookOpen, label: 'Course Approvals', view: 'approvals' },
          { icon: Settings, label: 'Platform Settings', view: 'settings' },
          { icon: BarChart, label: 'Analytics', view: 'analytics' },
        ];
      case 'instructor':
        return [
          { icon: Home, label: 'Dashboard', view: 'dashboard' },
          { icon: BookOpen, label: 'My Courses', view: 'courses' },
          { icon: PlusCircle, label: 'Create Course', view: 'create-course' },
          { icon: FileText, label: 'Materials', view: 'materials' },
          { icon: CheckSquare, label: 'Assignments', view: 'assignments' },
          { icon: Award, label: 'Grading', view: 'grading' },
          { icon: MessageSquare, label: 'Discussions', view: 'discussions' },
          { icon: Users, label: 'Students', view: 'students' },
        ];
      case 'student':
        return [
          { icon: Home, label: 'Dashboard', view: 'dashboard' },
          { icon: BookOpen, label: 'My Courses', view: 'courses' },
          { icon: Search, label: 'Browse Courses', view: 'browse' },
          { icon: FileText, label: 'Assignments', view: 'assignments' },
          { icon: Award, label: 'Grades', view: 'grades' },
          { icon: BarChart, label: 'Progress', view: 'progress' },
          { icon: MessageSquare, label: 'Discussions', view: 'discussions' },
        ];
      case 'content-creator':
        return [
          { icon: Home, label: 'Dashboard', view: 'dashboard' },
          { icon: FolderOpen, label: 'Content Library', view: 'library' },
          { icon: PlusCircle, label: 'Create Content', view: 'create' },
          { icon: FileText, label: 'My Content', view: 'content' },
          { icon: BookOpen, label: 'Courses', view: 'courses' },
          { icon: Settings, label: 'Resources', view: 'resources' },
        ];
      default:
        return [];
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Student';
      case 'content-creator':
        return 'Content Creator';
      default:
        return '';
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-semibold text-gray-900">EduLearn LMS</h1>
                <p className="text-xs text-gray-500">{getRoleLabel()}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search courses, materials, users..."
                className="pl-10 bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <div className="hidden sm:flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-gray-900">{username}</p>
                <p className="text-xs text-gray-500">{getRoleLabel()}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out pt-16 lg:pt-0`}
        >
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.view}
                  onClick={() => {
                    onViewChange(item.view);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-20 pt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
