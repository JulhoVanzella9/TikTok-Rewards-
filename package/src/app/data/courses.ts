export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
  contentType: "video" | "text";
  textContent?: string;
  completed?: boolean;
}

export interface SubModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Module {
  id: string;
  title: string;
  subtitle: string;
  subModules: SubModule[];
  comingSoon?: boolean;
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

export function getModuleById(courseId: string, moduleId: string): Module | undefined {
  const course = getCourseById(courseId);
  if (!course) return undefined;
  return course.modules.find((m) => m.id === moduleId);
}

export function getSubModuleById(courseId: string, moduleId: string, subModuleId: string): SubModule | undefined {
  const module = getModuleById(courseId, moduleId);
  if (!module) return undefined;
  return module.subModules.find((sm) => sm.id === subModuleId);
}

export function getAllLessons(course: Course): Lesson[] {
  return course.modules.flatMap((module) => 
    module.subModules.flatMap((subModule) => subModule.lessons)
  );
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
    id: "tiktok-rewards-program",
    title: "TikTok Rewards Program",
    description: "Complete guide to maximize your earnings with TikTok Rewards.",
    thumbnail: "/images/courses/tiktok-growth.jpg",
    instructor: "Profitok Team",
    instructorAvatar: "/images/users/1.jpg",
    category: "Digital Marketing",
    totalLessons: 129,
    totalDuration: "15h+",
    progress: 0,
    tags: ["TikTok", "Earnings", "Marketing", "Profits"],
    modules: [
      // MODULE 01 | Youtube Profits (44 lessons total)
      {
        id: "mod-1",
        title: "Module 01 | Youtube Profits",
        subtitle: "44 lessons",
        subModules: [
          {
            id: "sm-1-1",
            title: "First Steps And General Information",
            lessons: [
              {
                id: "m1-1-les-1",
                title: "Welcome - Start Here",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/JACqqG5qB2M",
                description: "Welcome to the TikTok Rewards Program!",
                contentType: "video",
              },
              {
                id: "m1-1-les-2",
                title: "How to access this content easily",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/mh5caogRWWw",
                description: "Learn how to easily access all course content.",
                contentType: "video",
              },
              {
                id: "m1-1-les-3",
                title: "Problems with duplicate purchases or card rejections",
                duration: "2:00",
                videoUrl: "",
                description: "Having issues with payments?",
                contentType: "text",
                textContent: `<p>Having issues with payments? Contact support:</p><br/><a href="https://profitok.shop/support" target="_blank" style="color:#25f4ee;text-decoration:underline;">Click here to access support</a>`,
              },
              {
                id: "m1-1-les-4",
                title: "Request your refund",
                duration: "2:00",
                videoUrl: "",
                description: "Need a refund? Here's how.",
                contentType: "text",
                textContent: `<p>Request a refund through our support portal:</p><br/><a href="https://profitok.shop/refund" target="_blank" style="color:#25f4ee;text-decoration:underline;">Request Refund</a>`,
              },
              {
                id: "m1-1-les-5",
                title: "Support Center",
                duration: "2:00",
                videoUrl: "",
                description: "Get help from our support team.",
                contentType: "text",
                textContent: `<p>Visit our Support Center for assistance:</p><br/><a href="https://profitok.shop/support" target="_blank" style="color:#25f4ee;text-decoration:underline;">Support Center</a>`,
              },
              {
                id: "m1-1-les-6",
                title: "Fill out the form and earn your first $35!",
                duration: "3:00",
                videoUrl: "",
                description: "Complete the form to earn $35.",
                contentType: "text",
                textContent: `<p>Complete the registration form to receive your first $35 bonus:</p><br/><a href="https://profitok.shop/bonus-form" target="_blank" style="color:#fe2c55;text-decoration:underline;font-weight:bold;">Fill Form & Earn $35</a>`,
              },
            ],
          },
          {
            id: "sm-1-2",
            title: "Transforming your mindset",
            lessons: [
              {
                id: "m1-2-les-1",
                title: "Start Here",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/GRh7l0lHXeA",
                description: "Begin your mindset transformation.",
                contentType: "video",
              },
              {
                id: "m1-2-les-2",
                title: "Set Your Objectives",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/nPrv1lJpV4A",
                description: "Learn how to set clear objectives.",
                contentType: "video",
              },
              {
                id: "m1-2-les-3",
                title: "Start Immediately",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/L68v1b20MI4",
                description: "Don't wait - start now!",
                contentType: "video",
              },
              {
                id: "m1-2-les-4",
                title: "Be Optimistic",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/DhB-EjjUMbM",
                description: "Maintain a positive mindset.",
                contentType: "video",
              },
              {
                id: "m1-2-les-5",
                title: "Be Resolute",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/yJgxKT-aTTQ",
                description: "Stay determined and focused.",
                contentType: "video",
              },
              {
                id: "m1-2-les-6",
                title: "Attract It",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/o1d4x-GZmLU",
                description: "Learn the power of attraction.",
                contentType: "video",
              },
            ],
          },
          {
            id: "sm-1-3",
            title: "TikTok Profits",
            lessons: [
              {
                id: "m1-3-les-1",
                title: "Earn Money on TikTok",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/E2zAQfPVXlk",
                description: "Introduction to earning on TikTok.",
                contentType: "video",
              },
              {
                id: "m1-3-les-2",
                title: "Register and Win",
                duration: "3:00",
                videoUrl: "",
                description: "Register to start winning.",
                contentType: "text",
                textContent: `<p>Register on TikTok Rewards to start earning:</p><br/><a href="https://profitok.shop/register" target="_blank" style="color:#25f4ee;text-decoration:underline;">Register Now</a>`,
              },
              {
                id: "m1-3-les-3",
                title: "Quick Money Strategies",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/6hYJSPQdAFw",
                description: "Fast money-making strategies.",
                contentType: "video",
              },
              {
                id: "m1-3-les-4",
                title: "Surveys That Pay",
                duration: "3:00",
                videoUrl: "",
                description: "Complete surveys for cash.",
                contentType: "text",
                textContent: `<p>Complete paid surveys:</p><br/><a href="https://profitok.shop/surveys" target="_blank" style="color:#fe2c55;text-decoration:underline;">Start Surveys</a>`,
              },
              {
                id: "m1-3-les-5",
                title: "Daily Tasks for Profit",
                duration: "3:00",
                videoUrl: "",
                description: "Daily tasks that pay.",
                contentType: "text",
                textContent: `<p>Complete daily tasks:</p><br/><a href="https://profitok.shop/tasks" target="_blank" style="color:#25f4ee;text-decoration:underline;">View Tasks</a>`,
              },
              {
                id: "m1-3-les-6",
                title: "Maximize Your Earnings",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                description: "Tips to maximize earnings.",
                contentType: "video",
              },
              {
                id: "m1-3-les-7",
                title: "Referral Program",
                duration: "4:00",
                videoUrl: "",
                description: "Earn by referring friends.",
                contentType: "text",
                textContent: `<p>Invite friends and earn $20 per referral:</p><br/><a href="https://profitok.shop/referral" target="_blank" style="color:#fe2c55;text-decoration:underline;">Invite Friends</a>`,
              },
              {
                id: "m1-3-les-8",
                title: "Video Watching Strategy",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/L68v1b20MI4",
                description: "Earn by watching videos.",
                contentType: "video",
              },
              {
                id: "m1-3-les-9",
                title: "Bonus Multipliers",
                duration: "4:00",
                videoUrl: "",
                description: "Unlock bonus multipliers.",
                contentType: "text",
                textContent: `<p>Learn how to unlock 2x and 3x bonus multipliers on your earnings!</p>`,
              },
              {
                id: "m1-3-les-10",
                title: "Withdrawal Methods",
                duration: "3:00",
                videoUrl: "",
                description: "How to withdraw your earnings.",
                contentType: "text",
                textContent: `<p>Withdraw via PayPal, Bank Transfer, or Crypto. Minimum: $5,000</p>`,
              },
              {
                id: "m1-3-les-11",
                title: "Payment Schedule",
                duration: "2:00",
                videoUrl: "",
                description: "When you get paid.",
                contentType: "text",
                textContent: `<p>Payments are processed within 24-48 hours after reaching minimum balance.</p>`,
              },
              {
                id: "m1-3-les-12",
                title: "VIP Benefits",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/nPrv1lJpV4A",
                description: "VIP membership benefits.",
                contentType: "video",
              },
              {
                id: "m1-3-les-13",
                title: "Daily Check-in Rewards",
                duration: "2:00",
                videoUrl: "",
                description: "Earn daily by checking in.",
                contentType: "text",
                textContent: `<p>Check in daily to earn bonus points!</p>`,
              },
              {
                id: "m1-3-les-14",
                title: "Content Creation Tips",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/DhB-EjjUMbM",
                description: "Create content that earns.",
                contentType: "video",
              },
              {
                id: "m1-3-les-15",
                title: "Algorithm Secrets",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/yJgxKT-aTTQ",
                description: "Understanding the algorithm.",
                contentType: "video",
              },
              {
                id: "m1-3-les-16",
                title: "Trending Hashtags",
                duration: "3:00",
                videoUrl: "",
                description: "Use trending hashtags.",
                contentType: "text",
                textContent: `<p>Top hashtags: #fyp #viral #tiktok #money #rewards</p>`,
              },
              {
                id: "m1-3-les-17",
                title: "Best Posting Times",
                duration: "3:00",
                videoUrl: "",
                description: "When to post for max views.",
                contentType: "text",
                textContent: `<p>Best times: 7-9 AM, 12-2 PM, 7-11 PM (local time)</p>`,
              },
              {
                id: "m1-3-les-18",
                title: "Engagement Strategies",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/o1d4x-GZmLU",
                description: "Boost your engagement.",
                contentType: "video",
              },
              {
                id: "m1-3-les-19",
                title: "Duet Feature",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/E2zAQfPVXlk",
                description: "Using duets for growth.",
                contentType: "video",
              },
              {
                id: "m1-3-les-20",
                title: "Stitch Strategy",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/6hYJSPQdAFw",
                description: "Using stitch for views.",
                contentType: "video",
              },
              {
                id: "m1-3-les-21",
                title: "Live Streaming Profits",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/GRh7l0lHXeA",
                description: "Earn from live streams.",
                contentType: "video",
              },
              {
                id: "m1-3-les-22",
                title: "Gift Points Explained",
                duration: "3:00",
                videoUrl: "",
                description: "How gift points work.",
                contentType: "text",
                textContent: `<p>Receive gifts during lives and convert to cash!</p>`,
              },
              {
                id: "m1-3-les-23",
                title: "Brand Partnerships",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/nPrv1lJpV4A",
                description: "Partner with brands.",
                contentType: "video",
              },
              {
                id: "m1-3-les-24",
                title: "Affiliate Marketing",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/L68v1b20MI4",
                description: "Affiliate links on TikTok.",
                contentType: "video",
              },
              {
                id: "m1-3-les-25",
                title: "TikTok Shop",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/DhB-EjjUMbM",
                description: "Sell products on TikTok.",
                contentType: "video",
              },
              {
                id: "m1-3-les-26",
                title: "Creator Fund",
                duration: "3:00",
                videoUrl: "",
                description: "Join the Creator Fund.",
                contentType: "text",
                textContent: `<p>Requirements: 10k followers, 100k views in 30 days.</p>`,
              },
              {
                id: "m1-3-les-27",
                title: "Niche Selection",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/yJgxKT-aTTQ",
                description: "Choose your niche.",
                contentType: "video",
              },
              {
                id: "m1-3-les-28",
                title: "Content Calendar",
                duration: "3:00",
                videoUrl: "",
                description: "Plan your content.",
                contentType: "text",
                textContent: `<p>Create a weekly posting schedule for consistency.</p>`,
              },
              {
                id: "m1-3-les-29",
                title: "Analytics Deep Dive",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/o1d4x-GZmLU",
                description: "Understanding analytics.",
                contentType: "video",
              },
              {
                id: "m1-3-les-30",
                title: "A/B Testing Content",
                duration: "3:00",
                videoUrl: "",
                description: "Test different content types.",
                contentType: "text",
                textContent: `<p>Test different thumbnails, captions, and posting times.</p>`,
              },
              {
                id: "m1-3-les-31",
                title: "Cross-Platform Promotion",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/E2zAQfPVXlk",
                description: "Promote across platforms.",
                contentType: "video",
              },
              {
                id: "m1-3-les-32",
                title: "Final Tips & Conclusion",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/JACqqG5qB2M",
                description: "Final tips for success.",
                contentType: "video",
              },
            ],
          },
        ],
      },
      // MODULE 02 | ProfiTok: Bonus Program (33 lessons)
      {
        id: "mod-2",
        title: "Module 02 | ProfiTok: Bonus Program",
        subtitle: "33 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-2-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 03 | Millionaire Mindset (12 lessons)
      {
        id: "mod-3",
        title: "Module 03 | Millionaire Mindset",
        subtitle: "12 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-3-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 04 | Recover Your Investment (8 lessons)
      {
        id: "mod-4",
        title: "Module 04 | Recover Your Investment",
        subtitle: "8 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-4-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 05 | Millionaire System (6 lessons)
      {
        id: "mod-5",
        title: "Module 05 | Millionaire System",
        subtitle: "6 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-5-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 06 | Increase Your Profits X3 (9 lessons)
      {
        id: "mod-6",
        title: "Module 06 | Increase Your Profits X3",
        subtitle: "9 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-6-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 07 | Lifetime Access (3 lessons)
      {
        id: "mod-7",
        title: "Module 07 | Lifetime Access",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-7-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 08 | VIP Community (3 lessons)
      {
        id: "mod-8",
        title: "Module 08 | VIP Community",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-8-1", title: "Coming Soon", lessons: [] }],
      },
      // MODULE 09 | ProfiUp Bonus Program (11 lessons)
      {
        id: "mod-9",
        title: "ProfiUp 09 | Bonus Program",
        subtitle: "11 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-9-1", title: "Coming Soon", lessons: [] }],
      },
    ],
  },
];
