export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  completed?: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar: string;
  category: string;
  totalLessons: number;
  totalDuration: string;
  progress: number;
  modules: Module[];
  tags: string[];
}

// Helper functions
export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}

export function getAllLessons(course: Course): Lesson[] {
  return course.modules.flatMap((module) => module.lessons);
}

export function getLessonById(courseId: string, lessonId: string): { course: Course; lesson: Lesson } | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  const lesson = getAllLessons(course).find((l) => l.id === lessonId);
  if (!lesson) return undefined;
  return { course, lesson };
}

export function getNextLesson(course: Course, currentLessonId: string): Lesson | undefined {
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex < 0 || currentIndex >= allLessons.length - 1) return undefined;
  return allLessons[currentIndex + 1];
}

export function getPrevLesson(course: Course, currentLessonId: string): Lesson | undefined {
  const allLessons = getAllLessons(course);
  const currentIndex = allLessons.findIndex((l) => l.id === currentLessonId);
  if (currentIndex <= 0) return undefined;
  return allLessons[currentIndex - 1];
}

export const courses: Course[] = [
  {
    id: "tiktok-growth",
    title: "TikTok Rewards",
    description:
      "Learn how to maximize your earnings with TikTok Rewards. Complete guide to monetize your content effectively.",
    thumbnail: "/images/courses/tiktok-growth.jpg",
    instructor: "Michael Brooks",
    instructorAvatar: "/images/users/1.jpg",
    category: "Digital Marketing",
    totalLessons: 12,
    totalDuration: "4h 30min",
    progress: 0,
    tags: ["TikTok", "Growth", "Marketing"],
    modules: [
      {
        id: "mod-1",
        title: "TikTok Fundamentals",
        lessons: [
          {
            id: "les-1",
            title: "How the TikTok Algorithm Works",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Fully understand how the TikTok algorithm decides which videos to show and how to use it to your advantage.",
          },
          {
            id: "les-2",
            title: "Setting Up Your Profile to Convert",
            duration: "12:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Learn to create a profile that converts visitors into loyal followers.",
          },
          {
            id: "les-3",
            title: "Most Profitable Niches in 2025",
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Discover which niches are generating the best results and how to position yourself.",
          },
        ],
      },
      {
        id: "mod-2",
        title: "Creating Viral Content",
        lessons: [
          {
            id: "les-4",
            title: "Video Structure That Goes Viral",
            duration: "22:10",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "The exact formula to create videos that capture attention and go viral.",
          },
          {
            id: "les-5",
            title: "Hooks That Make Viewers Stop Scrolling",
            duration: "16:55",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "The best tested hooks that guarantee retention in the first 3 seconds.",
          },
          {
            id: "les-6",
            title: "Professional Editing on Your Phone",
            duration: "25:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Master editing tools to create professional content directly from your phone.",
          },
        ],
      },
      {
        id: "mod-3",
        title: "Advanced Monetization",
        lessons: [
          {
            id: "les-7",
            title: "TikTok Creator Fund and Rewards",
            duration: "20:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "How to maximize your earnings with TikTok's rewards program.",
          },
          {
            id: "les-8",
            title: "Lives and Gifts: Complete Strategy",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Transform your lives into a revenue machine with gifts and engagement.",
          },
          {
            id: "les-9",
            title: "Brand Partnerships",
            duration: "15:20",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "How to close profitable partnerships with brands even with few followers.",
          },
        ],
      },
      {
        id: "mod-4",
        title: "Scaling Your Results",
        lessons: [
          {
            id: "les-10",
            title: "TikTok Ads for Creators",
            duration: "22:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Use paid ads to scale your reach and increase qualified followers.",
          },
          {
            id: "les-11",
            title: "Automation and Tools",
            duration: "14:30",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Essential tools to automate your routine and produce more in less time.",
          },
          {
            id: "les-12",
            title: "30-Day Action Plan",
            duration: "28:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description:
              "Your complete plan for the next 30 days. Step by step to implement everything.",
          },
        ],
      },
    ],
  },
];
