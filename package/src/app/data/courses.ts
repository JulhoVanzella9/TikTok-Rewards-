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
                description: "Having issues with purchases?",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px;">Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...</p>
<p style="margin-bottom: 16px;">If this is your case, please fill out the following form so that our team can solve it for you.</p>
<p style="margin-bottom: 16px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSev-ZphXOmw-tf23GHKB6-R43j8p36wo70mdXW0nFteqAA26g/viewform?usp=header" target="_blank" style="color:#25f4ee;text-decoration:underline;font-weight:600;">Click here to fill out the form</a></p>`,
              },
              {
                id: "m1-1-les-4",
                title: "Request your refund",
                duration: "2:00",
                videoUrl: "",
                description: "Need a refund? Here's how.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px;">If you want to apply for the 15-day guarantee, you just need to fill out this small form by clicking on the following link:</p>
<p style="margin-bottom: 16px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSedMydNiJp1Ss5ZhhHtuzTxphQFTwgpKEsdqhIn5Ugka5uFtQ/viewform?usp=header" target="_blank" style="color:#25f4ee;text-decoration:underline;font-weight:600;font-size:18px;">CLICK HERE</a></p>
<p>You just need to fill it out and the refund will be successfully processed, the money will be credited to your account on the next billing date of your credit card.</p>`,
              },
              {
                id: "m1-1-les-5",
                title: "Support Center",
                duration: "2:00",
                videoUrl: "",
                description: "Get help from our support team.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px;"><strong>Dear Profitok Users,</strong></p>
<p style="margin-bottom: 16px;">Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless. Whether you have questions, encounter technical issues, or seek guidance on maximizing features, our team is here to assist you.</p>
<p style="margin-bottom: 16px;"><strong>How to Reach Us:</strong> For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com" style="color:#25f4ee;text-decoration:underline;">ytrewards.ing@gmail.com</a>. Our support team operates Monday to Friday, from 9:00 AM to 6:00 PM, and we aim to respond promptly to all inquiries during these hours.</p>
<p style="margin-bottom: 16px;"><strong>Feedback:</strong> Your input is invaluable to us as we strive to enhance Profitok continuously. Whether it's suggestions for new features or improvements to existing ones, we'd love to hear from you. Please feel free to share your thoughts and ideas with us.</p>
<p style="margin-bottom: 16px;">Thank you for choosing Profitok. We value your trust and look forward to assisting you.</p>
<p><strong>Best Regards,<br/>Profitok Support Team</strong></p>`,
              },
              {
                id: "m1-1-les-6",
                title: "Fill out this form and earn $35",
                duration: "3:00",
                videoUrl: "",
                description: "Complete a form and get rewarded!",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px;">Welcome to module 1.1, where we invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.</p>
<p style="margin-bottom: 16px;">After filling out the form we will personally send you <strong style="color:#25f4ee;">$20 dollars</strong> to your PayPal account... but be patient, as the money will arrive in the next 4-6 days.</p>
<p style="margin-bottom: 16px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" style="color:#25f4ee;text-decoration:underline;font-weight:600;font-size:18px;">Fill up the form here</a></p>`,
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
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/w8jnbryJOb8",
                description: "Begin your mindset transformation journey.",
                contentType: "video",
              },
              {
                id: "m1-2-les-2",
                title: "Step 1: Set Objectives",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/1fUgvpQ4FuY",
                description: "Learn how to set clear objectives.",
                contentType: "video",
              },
              {
                id: "m1-2-les-3",
                title: "Step 2: Start Immediately",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/0pyPN61jMVU",
                description: "Why starting now matters.",
                contentType: "video",
              },
              {
                id: "m1-2-les-4",
                title: "Step 3: Be Optimistic",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/kgg2SxxfioI",
                description: "The power of optimism.",
                contentType: "video",
              },
              {
                id: "m1-2-les-5",
                title: "Step 5: Be Resolute",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/CnOU6O8egw0",
                description: "Stay determined on your path.",
                contentType: "video",
              },
              {
                id: "m1-2-les-6",
                title: "Step 6: Attract it",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/z6wmHvzDMJE",
                description: "Attract success into your life.",
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
                title: "How to use youtube monetization tools to make money with surveys",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/Zp18FRynLk4",
                description: "Learn monetization strategies.",
                contentType: "video",
              },
              {
                id: "m1-3-les-2",
                title: "How to answer more surveys in less time and increase your earning",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/CHKu9FBCRpw",
                description: "Maximize your survey earnings.",
                contentType: "video",
              },
              {
                id: "m1-3-les-3",
                title: "The best time to answer surveys and earn more",
                duration: "4:00",
                videoUrl: "https://www.youtube.com/embed/hd2Vi3pksQs",
                description: "Timing strategies for surveys.",
                contentType: "video",
              },
              {
                id: "m1-3-les-4",
                title: "How to make money on TikTok without recording any videos",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/615xOSCXtHU",
                description: "Earn without creating content.",
                contentType: "video",
              },
              {
                id: "m1-3-les-5",
                title: "How to create a routine to make money online sustainably",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/HmXc3py1lFc",
                description: "Build sustainable income habits.",
                contentType: "video",
              },
              {
                id: "m1-3-les-6",
                title: "$20 x 12minutes Apps to Make Money Online",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/QRpAM3z9Da8",
                description: "Quick earning apps.",
                contentType: "video",
              },
              {
                id: "m1-3-les-7",
                title: "Fast $938/week - Make Money Online",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/38qoPFt8tDY",
                description: "Fast income strategies.",
                contentType: "video",
              },
              {
                id: "m1-3-les-8",
                title: "$100 a Day - Writing Names",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/QpCWOePy13g",
                description: "Simple earning method.",
                contentType: "video",
              },
              {
                id: "m1-3-les-9",
                title: "Earn $200 a Day with Your Phone (I Tried It)",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/fOcRHU9Y1_k",
                description: "Mobile earning tested.",
                contentType: "video",
              },
              {
                id: "m1-3-les-10",
                title: "Earn USD 180 a Day with Google Translate",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/2ZrNLZtRaZY",
                description: "Translation income method.",
                contentType: "video",
              },
              {
                id: "m1-3-les-11",
                title: "Do You Really Understand How to Make Money Online with Strategy?",
                duration: "5:00",
                videoUrl: "",
                description: "Test your knowledge!",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Time to Practice! Test Your Knowledge and Boost Your Progress</p>
<p style="margin-bottom: 16px;">It's practice time! This is your practical test, a key moment to reinforce everything you've learned so far.</p>
<p style="margin-bottom: 16px;">By taking this quiz, you will:</p>
<ul style="margin-bottom: 16px; padding-left: 20px;">
<li style="margin-bottom: 8px;">Strengthen the content in a lighter, more effective way</li>
<li style="margin-bottom: 8px;">Identify what you already master</li>
<li style="margin-bottom: 8px;">Spot areas you can still improve</li>
<li style="margin-bottom: 8px;">And most importantly, speed up your real-life results</li>
</ul>
<p style="margin-bottom: 16px;"><strong>Remember:</strong> those who practice, truly learn. This step is just as important as the lessons - it's what separates those who just watch from those who truly grow.</p>
<p>Take a few minutes, answer carefully, and see how far you've come. You'll be surprised by how much you already know. And what you don't... you'll soon master!</p>`,
              },
              {
                id: "m1-3-les-12",
                title: "Heads up! This message is for those who are truly committed",
                duration: "3:00",
                videoUrl: "",
                description: "Important announcement.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-size: 18px; font-weight: 600;">Heads up! This message is for those who are truly committed to their growth.</p>
<p style="margin-bottom: 16px;">We're approaching a key moment in the course, and you definitely don't want to miss it. Between April 16th and 19th, we'll be releasing a set of crucial lessons that will take your learning to the next level.</p>
<p style="margin-bottom: 16px;">These upcoming sessions will help you connect the dots and start applying the strategies you've been learning in a practical, results-driven way.</p>
<p style="margin-bottom: 16px;">This is where things really start to click. You'll begin to see how far you've come - and how much further you can go. So make sure to set aside time, plan ahead, and be ready. These lessons might just be the turning point in your journey.</p>
<p style="margin-bottom: 16px;"><strong>And remember:</strong> new content drops every single week, designed to keep pushing you forward step by step. Staying on top of the updates and actively participating will make all the difference in your progress.</p>
<p style="color: #25f4ee; font-weight: 600;">You're in the right place, at the right time. Keep showing up, because the best is yet to come. Let's keep moving forward together!</p>`,
              },
              {
                id: "m1-3-les-13",
                title: "How to Use VPN to Access More Surveys Internationally",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/mQXDuQ8NOcQ",
                description: "Expand your survey opportunities.",
                contentType: "video",
              },
              {
                id: "m1-3-les-14",
                title: "How to Stay Updated and Not Fall Behind",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/UOA38jQacBI",
                description: "Stay current with updates.",
                contentType: "video",
              },
              {
                id: "m1-3-les-15",
                title: "How This YouTube Tool Really Works (And Why It Pays So Well)",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/t-3vTOyCQlI",
                description: "Understanding the tool.",
                contentType: "video",
              },
              {
                id: "m1-3-les-16",
                title: "The 5 Biggest Mistakes That Are Stopping You From Making Money",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/tvqXAEtC6E4",
                description: "Avoid common mistakes.",
                contentType: "video",
              },
              {
                id: "m1-3-les-17",
                title: "From Broke to Boss: How to Make $10K in 45 Days",
                duration: "10:00",
                videoUrl: "https://www.youtube.com/embed/HUCiPsC-BpM",
                description: "Accelerate your income.",
                contentType: "video",
              },
              {
                id: "m1-3-les-18",
                title: "How to Use Your Social Media Time to Make Money Instead",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/furqLCm18Pg",
                description: "Monetize social media time.",
                contentType: "video",
              },
              {
                id: "m1-3-les-19",
                title: "What to do If You're Not Seeing Results (FIX THIS NOW)",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/Lx0mQB9ayns",
                description: "Troubleshoot your progress.",
                contentType: "video",
              },
              {
                id: "m1-3-les-20",
                title: "How to Multiply Your Income Without Working More Hours",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/ny3CzsZPYTQ",
                description: "Work smarter, not harder.",
                contentType: "video",
              },
              {
                id: "m1-3-les-21",
                title: "How to Make the Most of Bonuses and Rewards",
                duration: "5:00",
                videoUrl: "https://www.youtube.com/embed/7UkI3jG7og8",
                description: "Maximize your bonuses.",
                contentType: "video",
              },
              {
                id: "m1-3-les-22",
                title: "How to Use Multiple Devices to Increase Your Earnings",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/jrIficRvKiA",
                description: "Multi-device strategy.",
                contentType: "video",
              },
              {
                id: "m1-3-les-23",
                title: "How to Organize Your Earnings and Plan for the Future",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/8rjvXIzUnSo",
                description: "Financial planning tips.",
                contentType: "video",
              },
              {
                id: "m1-3-les-24",
                title: "What No One Tells You About Making Money from Home",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/0kw9qGxWotA",
                description: "Hidden truths revealed.",
                contentType: "video",
              },
              {
                id: "m1-3-les-25",
                title: "Why Do Some People Earn $300 a Day While Others Earn Nothing?",
                duration: "9:00",
                videoUrl: "https://www.youtube.com/embed/9ZAM0t9nvsg",
                description: "The difference maker.",
                contentType: "video",
              },
              {
                id: "m1-3-les-26",
                title: "3 Keys to Make Sure the Money You Earn Online Doesn't Slip Away",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/CZb1n2weyaM",
                description: "Keep your earnings.",
                contentType: "video",
              },
              {
                id: "m1-3-les-27",
                title: "What to Do With Your First $100 Earned Online",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/AAlr7GXJL_Y",
                description: "Smart first steps.",
                contentType: "video",
              },
              {
                id: "m1-3-les-28",
                title: "YouTube Research Studies - How to Make Money Testing New Features",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/vJYA_ZfR5DE",
                description: "Get paid to test.",
                contentType: "video",
              },
              {
                id: "m1-3-les-29",
                title: "Hidden YouTube Monetization: Get Paid for Your Online Habits",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/8YXT2t0dUN0",
                description: "Passive income secrets.",
                contentType: "video",
              },
              {
                id: "m1-3-les-30",
                title: "AttaPoll - Get Paid to Answer Surveys Right from Your Phone",
                duration: "6:00",
                videoUrl: "https://www.youtube.com/embed/LaaF_wq2y44",
                description: "Mobile survey app.",
                contentType: "video",
              },
              {
                id: "m1-3-les-31",
                title: "Search Relevance Evaluation - Get Paid to Judge Google Results",
                duration: "8:00",
                videoUrl: "https://www.youtube.com/embed/fw67HhtiL2s",
                description: "Evaluate search results.",
                contentType: "video",
              },
              {
                id: "m1-3-les-32",
                title: "Google Local Guides - Earn Perks by Reviewing Places",
                duration: "7:00",
                videoUrl: "https://www.youtube.com/embed/XGH5-UdfoL0",
                description: "Review and earn.",
                contentType: "video",
              },
            ],
          },
        ],
      },
      // MODULE 02 | ProfiTok: Bonus Program
      {
        id: "mod-2",
        title: "Module 02 | ProfiTok: Bonus Program",
        subtitle: "33 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-2-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m2-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 03 | Millionaire Mindset
      {
        id: "mod-3",
        title: "Module 03 | Millionaire Mindset",
        subtitle: "12 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-3-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m3-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 04 | Recover Your Investment
      {
        id: "mod-4",
        title: "Module 04 | Recover Your Investment",
        subtitle: "8 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-4-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m4-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 05 | Millionaire System
      {
        id: "mod-5",
        title: "Module 05 | Millionaire System",
        subtitle: "6 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-5-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m5-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 06 | Increase Your Profits X3
      {
        id: "mod-6",
        title: "Module 06 | Increase Your Profits X3",
        subtitle: "9 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-6-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m6-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 07 | Lifetime Access
      {
        id: "mod-7",
        title: "Module 07 | Lifetime Access",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-7-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m7-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 08 | VIP Community
      {
        id: "mod-8",
        title: "Module 08 | VIP Community",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-8-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m8-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
      // MODULE 09 | ProfiUp Bonus Program
      {
        id: "mod-9",
        title: "ProfiUp 09 | Bonus Program",
        subtitle: "11 lessons",
        comingSoon: true,
        subModules: [
          {
            id: "sm-9-1",
            title: "Coming Soon",
            lessons: [
              {
                id: "m9-les-1",
                title: "Content Coming Soon",
                duration: "0:00",
                videoUrl: "",
                description: "This module is coming soon.",
                contentType: "text",
                textContent: "<p>This module content is coming soon. Stay tuned!</p>",
              },
            ],
          },
        ],
      },
    ],
  },
];
