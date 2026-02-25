export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  status?: 'draft' | 'published' | 'pending' | 'approved';
  thumbnail: string;
  enrolled?: boolean;
  modules?: CourseModule[];
  fullDescription?: string;
}

export interface CourseModule {
  title: string;
  description: string;
  topics: string[];
  content: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  submitted?: boolean;
  grade?: number;
  status: 'pending' | 'submitted' | 'graded';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student' | 'content-creator';
  status: 'active' | 'inactive';
  joinDate: string;
  coursesCount?: number;
}

export interface Discussion {
  id: string;
  courseId: string;
  courseName: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  replies: number;
  likes: number;
}

export interface Content {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'presentation';
  course: string;
  createdDate: string;
  status: 'draft' | 'published';
  views: number;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, props, state, and hooks.',
    instructor: 'raihan',
    category: 'Programming',
    level: 'Beginner',
    duration: '8 weeks',
    students: 156,
    rating: 4.8,
    progress: 65,
    status: 'published',
    thumbnail: 'react',
    enrolled: true,
    fullDescription: 'A comprehensive introduction to React, the popular JavaScript library for building user interfaces. This course covers everything from basic concepts to advanced patterns used in modern React development.',
    modules: [
      {
        title: 'Getting Started with React',
        description: 'Introduction to React fundamentals and setting up your development environment',
        topics: [
          'What is React and why use it?',
          'Setting up your development environment',
          'Creating your first React app',
          'Understanding JSX syntax',
          'Components and Props basics',
        ],
        content: 'React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components". React makes it painless to create interactive UIs by designing simple views for each state in your application. When your data changes, React efficiently updates and renders just the right components. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation.',
      },
      {
        title: 'Working with State and Events',
        description: 'Learn how to manage state and handle user interactions in React',
        topics: [
          'Understanding React State',
          'useState Hook',
          'Event handling in React',
          'Controlled vs Uncontrolled components',
          'Form handling',
        ],
        content: 'State is a fundamental concept in React that allows components to create and manage their own data. Unlike props, which are passed to the component, state is managed within the component. The useState Hook lets you add state to functional components. When state changes, React re-renders the component to reflect the new state. Event handling in React is similar to handling events on DOM elements, but with some syntactic differences.',
      },
      {
        title: 'Advanced Hooks and Side Effects',
        description: 'Explore useEffect and other advanced React hooks',
        topics: [
          'useEffect Hook for side effects',
          'Cleanup functions',
          'useContext for global state',
          'Custom Hooks',
          'Performance optimization with useMemo and useCallback',
        ],
        content: 'The useEffect Hook lets you perform side effects in function components. Data fetching, setting up subscriptions, and manually changing the DOM are all examples of side effects. You can think of useEffect as componentDidMount, componentDidUpdate, and componentWillUnmount combined. Custom Hooks let you extract component logic into reusable functions, following the same rules as React built-in Hooks.',
      },
    ],
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into JavaScript concepts including closures, promises, and async/await.',
    instructor: 'raihan',
    category: 'Programming',
    level: 'Advanced',
    duration: '10 weeks',
    students: 89,
    rating: 4.9,
    progress: 30,
    status: 'published',
    thumbnail: 'javascript',
    enrolled: true,
    fullDescription: 'Master advanced JavaScript concepts and patterns used in professional development. This course goes beyond the basics to explore the intricacies of the JavaScript language.',
    modules: [
      {
        title: 'Closures and Scope',
        description: 'Understanding JavaScript scope chain and closures',
        topics: [
          'Lexical scope and scope chain',
          'Understanding closures',
          'Practical applications of closures',
          'Common closure pitfalls',
          'Memory considerations',
        ],
        content: 'A closure is the combination of a function bundled together with references to its surrounding state. Closures are created every time a function is created. Understanding closures is essential for mastering JavaScript, as they enable powerful programming patterns like data privacy, partial application, and currying.',
      },
      {
        title: 'Asynchronous JavaScript',
        description: 'Master callbacks, promises, and async/await',
        topics: [
          'The event loop',
          'Callbacks and callback hell',
          'Promises and promise chaining',
          'Async/await syntax',
          'Error handling in async code',
        ],
        content: 'JavaScript is single-threaded, meaning it can only execute one piece of code at a time. Asynchronous programming allows JavaScript to perform long-running operations without blocking the main thread. Promises represent the eventual completion or failure of an asynchronous operation. Async/await is syntactic sugar built on top of promises, making asynchronous code look and behave more like synchronous code.',
      },
    ],
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Master the art of creating user-centered designs with modern design tools.',
    instructor: 'Sarah Johnson',
    category: 'Design',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 234,
    rating: 4.7,
    status: 'published',
    thumbnail: 'design',
    enrolled: false,
    fullDescription: 'Learn to create beautiful, functional, and user-friendly interfaces. This course covers the essential principles of UI/UX design and teaches you how to apply them in real-world projects.',
    modules: [
      {
        title: 'Design Thinking Fundamentals',
        description: 'Introduction to user-centered design methodology',
        topics: [
          'Understanding user needs',
          'The design thinking process',
          'Empathy mapping',
          'User personas and journeys',
          'Problem definition',
        ],
        content: 'Design thinking is a human-centered approach to innovation that draws from the designer\'s toolkit to integrate the needs of people, the possibilities of technology, and the requirements for business success. It begins with developing an understanding of customers\' or users\' unmet or unarticulated needs.',
      },
      {
        title: 'Visual Design Principles',
        description: 'Learn the fundamental principles of visual design',
        topics: [
          'Color theory and psychology',
          'Typography fundamentals',
          'Layout and composition',
          'Visual hierarchy',
          'Design systems and style guides',
        ],
        content: 'Visual design focuses on the aesthetics of a site and its related materials by strategically implementing images, colors, fonts, and other elements. Successful visual design doesn\'t take away from the content on the page or function; instead, it enhances it by engaging users and helping to build trust and interest in the brand.',
      },
    ],
  },
  {
    id: '4',
    title: 'Data Science Fundamentals',
    description: 'Introduction to data analysis, visualization, and machine learning basics.',
    instructor: 'raihan',
    category: 'Data Science',
    level: 'Beginner',
    duration: '12 weeks',
    students: 178,
    rating: 4.6,
    progress: 10,
    status: 'pending',
    thumbnail: 'data-science',
    enrolled: false,
  },
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Build cross-platform mobile applications using React Native.',
    instructor: 'Michael Chen',
    category: 'Mobile Development',
    level: 'Intermediate',
    duration: '10 weeks',
    students: 145,
    rating: 4.8,
    status: 'published',
    thumbnail: 'mobile',
    enrolled: false,
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    description: 'Learn effective digital marketing techniques and analytics.',
    instructor: 'Emma Wilson',
    category: 'Marketing',
    level: 'Beginner',
    duration: '6 weeks',
    students: 267,
    rating: 4.5,
    status: 'published',
    thumbnail: 'marketing',
    enrolled: true,
  },
];

export const mockAssignments: Assignment[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to React',
    title: 'Build a Todo App',
    description: 'Create a functional todo application using React hooks and component composition.',
    dueDate: '2026-03-05',
    points: 100,
    submitted: false,
    status: 'pending',
  },
  {
    id: '2',
    courseId: '1',
    courseName: 'Introduction to React',
    title: 'Component Lifecycle Quiz',
    description: 'Complete the quiz on React component lifecycle and hooks.',
    dueDate: '2026-02-28',
    points: 50,
    submitted: true,
    grade: 45,
    status: 'graded',
  },
  {
    id: '3',
    courseId: '2',
    courseName: 'Advanced JavaScript',
    title: 'Async Programming Challenge',
    description: 'Implement a series of async functions using promises and async/await.',
    dueDate: '2026-03-10',
    points: 150,
    submitted: true,
    status: 'submitted',
  },
  {
    id: '4',
    courseId: '6',
    courseName: 'Digital Marketing Strategy',
    title: 'Marketing Campaign Analysis',
    description: 'Analyze a real-world marketing campaign and provide recommendations.',
    dueDate: '2026-03-15',
    points: 100,
    submitted: false,
    status: 'pending',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'thanmesh',
    email: 'thanmesh@gmail.com',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
  },
  {
    id: '2',
    name: 'raihan',
    email: 'raihan@gmail.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-03-10',
    coursesCount: 3,
  },
  {
    id: '3',
    name: 'nikhil',
    email: 'nikhil@gmail.com',
    role: 'student',
    status: 'active',
    joinDate: '2024-06-20',
    coursesCount: 3,
  },
  {
    id: '4',
    name: 'Sai',
    email: 'sai@edulearn.com',
    role: 'content-creator',
    status: 'active',
    joinDate: '2024-04-05',
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    email: 'sarah@edulearn.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-02-28',
    coursesCount: 1,
  },
  {
    id: '6',
    name: 'Michael Chen',
    email: 'michael@edulearn.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-05-12',
    coursesCount: 1,
  },
  {
    id: '7',
    name: 'Emma Wilson',
    email: 'emma@edulearn.com',
    role: 'instructor',
    status: 'active',
    joinDate: '2024-07-01',
    coursesCount: 1,
  },
];

export const mockDiscussions: Discussion[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to React',
    author: 'nikhil',
    title: 'Best practices for state management?',
    content: 'What are the recommended approaches for managing complex state in React applications?',
    timestamp: '2026-02-23 14:30',
    replies: 5,
    likes: 12,
  },
  {
    id: '2',
    courseId: '1',
    courseName: 'Introduction to React',
    author: 'Jane Smith',
    title: 'Understanding useEffect dependencies',
    content: 'Can someone explain when to include variables in the useEffect dependency array?',
    timestamp: '2026-02-23 10:15',
    replies: 8,
    likes: 15,
  },
  {
    id: '3',
    courseId: '2',
    courseName: 'Advanced JavaScript',
    author: 'Suhail',
    title: 'Closure confusion',
    content: 'I\'m having trouble understanding how closures work with async functions.',
    timestamp: '2026-02-22 16:45',
    replies: 3,
    likes: 7,
  },
];

export const mockContent: Content[] = [
  {
    id: '1',
    title: 'React Hooks Introduction',
    type: 'video',
    course: 'Introduction to React',
    createdDate: '2026-02-10',
    status: 'published',
    views: 342,
  },
  {
    id: '2',
    title: 'JavaScript Best Practices Guide',
    type: 'document',
    course: 'Advanced JavaScript',
    createdDate: '2026-02-15',
    status: 'published',
    views: 256,
  },
  {
    id: '3',
    title: 'Design Thinking Workshop',
    type: 'presentation',
    course: 'UI/UX Design Principles',
    createdDate: '2026-02-18',
    status: 'draft',
    views: 0,
  },
  {
    id: '4',
    title: 'Final Assessment Quiz',
    type: 'quiz',
    course: 'Introduction to React',
    createdDate: '2026-02-20',
    status: 'published',
    views: 189,
  },
];
