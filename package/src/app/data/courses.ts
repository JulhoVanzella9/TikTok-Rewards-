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
    id: "tiktok-rewards-program",
    title: "TikTok Rewards Program",
    description:
      "Complete guide to maximize your earnings with TikTok Rewards. Learn strategies, mindset transformation, and profitable techniques.",
    thumbnail: "/images/courses/tiktok-growth.jpg",
    instructor: "Profitok Team",
    instructorAvatar: "/images/users/1.jpg",
    category: "Digital Marketing",
    totalLessons: 44,
    totalDuration: "8h+",
    progress: 0,
    tags: ["TikTok", "Earnings", "Marketing", "Profits"],
    modules: [
      // MODULE 1 - First Steps And General Information
      {
        id: "mod-1",
        title: "First Steps And General Information",
        lessons: [
          {
            id: "m1-les-1",
            title: "Welcome - Start Here",
            duration: "5:00",
            videoUrl: "https://www.youtube.com/embed/JACqqG5qB2M",
            description: "Welcome to the TikTok Rewards Program! Start your journey here.",
            contentType: "video",
          },
          {
            id: "m1-les-2",
            title: "How to access this content easily",
            duration: "3:00",
            videoUrl: "https://www.youtube.com/embed/mh5caogRWWw",
            description: "Learn how to easily access all course content anytime, anywhere.",
            contentType: "video",
          },
          {
            id: "m1-les-3",
            title: "Problems with duplicate purchases or card rejections",
            duration: "2:00",
            videoUrl: "",
            description: "Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...",
            contentType: "text",
            textContent: `Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...

If this is your case, please fill out the following form so that our team can solve it for you.

<a href="https://docs.google.com/forms/d/e/1FAIpQLSev-ZphXOmw-tf23GHKB6-R43j8p36wo70mdXW0nFteqAA26g/viewform?usp=header" target="_blank" rel="noopener noreferrer">Click here to fill out the form</a>`,
          },
          {
            id: "m1-les-4",
            title: "Request your refund",
            duration: "2:00",
            videoUrl: "",
            description: "If you want to apply for the 15-day guarantee, you just need to fill out this small form.",
            contentType: "text",
            textContent: `If you want to apply for the 15-day guarantee, you just need to fill out this small form by clicking on the following link:

<a href="https://docs.google.com/forms/d/e/1FAIpQLSedMydNiJp1Ss5ZhhHtuzTxphQFTwgpKEsdqhIn5Ugka5uFtQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">CLICK HERE</a>

You just need to fill it out and the refund will be successfully processed, the money will be credited to your account on the next billing date of your credit card.`,
          },
          {
            id: "m1-les-5",
            title: "Support Center",
            duration: "3:00",
            videoUrl: "",
            description: "Welcome to the Profitok Support Center! We're dedicated to ensuring your experience is seamless.",
            contentType: "text",
            textContent: `Dear Profitok Users,

Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless. Whether you have questions, encounter technical issues, or seek guidance on maximizing features, our team is here to assist you.

<strong>How to Reach Us:</strong>
For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com">ytrewards.ing@gmail.com</a>. Our support team operates Monday to Friday, from 9:00 AM to 6:00 PM, and we aim to respond promptly to all inquiries during these hours.

<strong>Feedback:</strong>
Your input is invaluable to us as we strive to enhance Profitok continuously. Whether it's suggestions for new features or improvements to existing ones, we'd love to hear from you. Please feel free to share your thoughts and ideas with us.

Thank you for choosing Profitok. We value your trust and look forward to assisting you.

Best Regards,
Profitok Support Team`,
          },
          {
            id: "m1-les-6",
            title: "Fill out this form and earn $35",
            duration: "2:00",
            videoUrl: "",
            description: "Welcome to module 1.1, where we invite you to fill out this short form and earn $20!",
            contentType: "text",
            textContent: `Welcome to module 1.1, where we invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.

After filling out the form we will personally send you $20 dollars to your PayPal account...

<strong>But be patient, as the money will arrive in the next 4-6 days.</strong>

<a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" rel="noopener noreferrer">Fill up the form here</a>`,
          },
        ],
      },
      // MODULE 2 - Transforming your mindset
      {
        id: "mod-2",
        title: "Transforming your mindset",
        lessons: [
          {
            id: "m2-les-1",
            title: "Start Here",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/w8jnbryJOb8",
            description: "Begin your mindset transformation journey with this essential introduction.",
            contentType: "video",
          },
          {
            id: "m2-les-2",
            title: "Step 1: Set Objectives",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/1fUgvpQ4FuY",
            description: "Learn how to set clear, achievable objectives for your success.",
            contentType: "video",
          },
          {
            id: "m2-les-3",
            title: "Step 2: Start Immediately",
            duration: "7:00",
            videoUrl: "https://www.youtube.com/embed/0pyPN61jMVU",
            description: "The importance of taking immediate action towards your goals.",
            contentType: "video",
          },
          {
            id: "m2-les-4",
            title: "Step 3: Be Optimistic",
            duration: "9:00",
            videoUrl: "https://www.youtube.com/embed/kgg2SxxfioI",
            description: "Cultivate an optimistic mindset for lasting success.",
            contentType: "video",
          },
          {
            id: "m2-les-5",
            title: "Step 5: Be Resolute",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/CnOU6O8egw0",
            description: "Develop unwavering determination to achieve your goals.",
            contentType: "video",
          },
          {
            id: "m2-les-6",
            title: "Step 6: Attract it",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/z6wmHvzDMJE",
            description: "Learn the power of attraction and manifestation in your journey.",
            contentType: "video",
          },
        ],
      },
      // MODULE 3 - TikTok Profits
      {
        id: "mod-3",
        title: "TikTok Profits",
        lessons: [
          {
            id: "m3-les-1",
            title: "How to use YouTube monetization tools to make money with surveys",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/Zp18FRynLk4",
            description: "Discover how to leverage YouTube monetization tools for survey earnings.",
            contentType: "video",
          },
          {
            id: "m3-les-2",
            title: "How to answer more surveys in less time and increase your earning",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/CHKu9FBCRpw",
            description: "Maximize your survey efficiency and boost your earnings.",
            contentType: "video",
          },
          {
            id: "m3-les-3",
            title: "The best time to answer surveys and earn more",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/hd2Vi3pksQs",
            description: "Learn the optimal times to complete surveys for maximum earnings.",
            contentType: "video",
          },
          {
            id: "m3-les-4",
            title: "How to make money on TikTok without recording any videos",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/615xOSCXtHU",
            description: "Unique strategies to earn on TikTok without creating video content.",
            contentType: "video",
          },
          {
            id: "m3-les-5",
            title: "How to create a routine to make money online sustainably",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/HmXc3py1lFc",
            description: "Build a sustainable daily routine for consistent online earnings.",
            contentType: "video",
          },
          {
            id: "m3-les-6",
            title: "$20 x 12minutes Apps to Make Money Online",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/QRpAM3z9Da8",
            description: "Discover apps that pay $20 for just 12 minutes of your time.",
            contentType: "video",
          },
          {
            id: "m3-les-7",
            title: "Fast $938/week – Make Money Online",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/38qoPFt8tDY",
            description: "Learn strategies to potentially earn $938 per week online.",
            contentType: "video",
          },
          {
            id: "m3-les-8",
            title: "$100 a Day – Writing Names",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/QpCWOePy13g",
            description: "Simple method to earn $100 daily with minimal effort.",
            contentType: "video",
          },
          {
            id: "m3-les-9",
            title: "Earn $200 a Day with Your Phone (I Tried It)",
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/fOcRHU9Y1_k",
            description: "Tested method to earn $200 daily using just your smartphone.",
            contentType: "video",
          },
          {
            id: "m3-les-10",
            title: "Earn USD 180 a Day with Google Translate",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/2ZrNLZtRaZY",
            description: "Use Google Translate to generate $180 per day income.",
            contentType: "video",
          },
          {
            id: "m3-les-11",
            title: "Do You Really Understand How to Make Money Online with Strategy?",
            duration: "5:00",
            videoUrl: "",
            description: "Time to Practice! Test Your Knowledge and Boost Your Progress.",
            contentType: "text",
            textContent: `<strong>Time to Practice! Test Your Knowledge and Boost Your Progress</strong>

It's practice time! This is your practical test, a key moment to reinforce everything you've learned so far.

By taking this quiz, you will:
• Strengthen the content in a lighter, more effective way
• Identify what you already master
• Spot areas you can still improve
• And most importantly, speed up your real-life results

<strong>Remember: those who practice, truly learn.</strong>

This step is just as important as the lessons — it's what separates those who just watch from those who truly grow.

Take a few minutes, answer carefully, and see how far you've come. You'll be surprised by how much you already know. And what you don't… you'll soon master!`,
          },
          {
            id: "m3-les-12",
            title: "Heads up! This message is for those who are truly committed",
            duration: "3:00",
            videoUrl: "",
            description: "Important announcement about upcoming crucial lessons.",
            contentType: "text",
            textContent: `<strong>Heads up! This message is for those who are truly committed to their growth.</strong>

We're approaching a key moment in the course, and you definitely don't want to miss it. Between April 16th and 19th, we'll be releasing a set of crucial lessons that will take your learning to the next level.

These upcoming sessions will help you connect the dots and start applying the strategies you've been learning in a practical, results-driven way.

This is where things really start to click. You'll begin to see how far you've come — and how much further you can go.

So make sure to set aside time, plan ahead, and be ready. These lessons might just be the turning point in your journey.

<strong>And remember: new content drops every single week, designed to keep pushing you forward step by step.</strong>

Staying on top of the updates and actively participating will make all the difference in your progress.

You're in the right place, at the right time. Keep showing up, because the best is yet to come. Let's keep moving forward together!`,
          },
          {
            id: "m3-les-13",
            title: "How to Use VPN to Access More Surveys Internationally",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/mQXDuQ8NOcQ",
            description: "Expand your survey opportunities using VPN technology.",
            contentType: "video",
          },
          {
            id: "m3-les-14",
            title: "How to Stay Updated and Not Fall Behind",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/UOA38jQacBI",
            description: "Stay current with the latest strategies and opportunities.",
            contentType: "video",
          },
          {
            id: "m3-les-15",
            title: "How This YouTube Tool Really Works (And Why It Pays So Well)",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/t-3vTOyCQlI",
            description: "Deep dive into the YouTube monetization tool and its earning potential.",
            contentType: "video",
          },
          {
            id: "m3-les-16",
            title: "The 5 Biggest Mistakes That Are Stopping You From Making Money",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/tvqXAEtC6E4",
            description: "Avoid these critical mistakes that prevent your earning potential.",
            contentType: "video",
          },
          {
            id: "m3-les-17",
            title: "From Broke to Boss: How to Make $10K in 45 Days",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/HUCiPsC-BpM",
            description: "Complete roadmap to earning $10,000 in just 45 days.",
            contentType: "video",
          },
          {
            id: "m3-les-18",
            title: "How to Use Your Social Media Time to Make Money Instead",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/furqLCm18Pg",
            description: "Transform your social media time into productive earning time.",
            contentType: "video",
          },
          {
            id: "m3-les-19",
            title: "What to do If You're Not Seeing Results (FIX THIS NOW)",
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/Lx0mQB9ayns",
            description: "Troubleshoot and fix issues preventing your success.",
            contentType: "video",
          },
          {
            id: "m3-les-20",
            title: "How to Multiply Your Income Without Working More Hours",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/ny3CzsZPYTQ",
            description: "Scale your earnings without increasing your work hours.",
            contentType: "video",
          },
          {
            id: "m3-les-21",
            title: "How to Make the Most of Bonuses and Rewards",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/7UkI3jG7og8",
            description: "Maximize your bonus and reward earnings effectively.",
            contentType: "video",
          },
          {
            id: "m3-les-22",
            title: "How to Use Multiple Devices to Increase Your Earnings",
            duration: "9:00",
            videoUrl: "https://www.youtube.com/embed/jrIficRvKiA",
            description: "Leverage multiple devices to multiply your income streams.",
            contentType: "video",
          },
          {
            id: "m3-les-23",
            title: "How to Organize Your Earnings and Plan for the Future",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/8rjvXIzUnSo",
            description: "Financial organization tips for long-term success.",
            contentType: "video",
          },
          {
            id: "m3-les-24",
            title: "What No One Tells You About Making Money from Home (And Why It Matters)",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/0kw9qGxWotA",
            description: "Hidden truths about working from home that affect your success.",
            contentType: "video",
          },
          {
            id: "m3-les-25",
            title: "Why Do Some People Earn $300 a Day… While Others Earn Nothing?",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/9ZAM0t9nvsg",
            description: "Understand what separates high earners from those who struggle.",
            contentType: "video",
          },
          {
            id: "m3-les-26",
            title: "3 Keys to Make Sure the Money You Earn Online Doesn't Slip Away",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/CZb1n2weyaM",
            description: "Protect and grow your online earnings with these key strategies.",
            contentType: "video",
          },
          {
            id: "m3-les-27",
            title: "What to Do With Your First $100 Earned Online (And How to Multiply It)",
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/AAlr7GXJL_Y",
            description: "Smart strategies for reinvesting your first online earnings.",
            contentType: "video",
          },
          {
            id: "m3-les-28",
            title: "YouTube Research Studies – How to Make Money Testing New Features",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/vJYA_ZfR5DE",
            description: "Get paid to test new YouTube features through research studies.",
            contentType: "video",
          },
          {
            id: "m3-les-29",
            title: "Hidden YouTube Monetization: Get Paid for Your Online Habits",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/8YXT2t0dUN0",
            description: "Discover hidden ways to monetize your regular online activities.",
            contentType: "video",
          },
          {
            id: "m3-les-30",
            title: "AttaPoll – Get Paid to Answer Surveys from Your Phone",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/LaaF_wq2y44",
            description: "Complete guide to earning with the AttaPoll survey app.",
            contentType: "video",
          },
          {
            id: "m3-les-31",
            title: "Search Relevance Evaluation – Get Paid to Judge Google/YouTube Results",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/fw67HhtiL2s",
            description: "Earn money by evaluating search results for major platforms.",
            contentType: "video",
          },
          {
            id: "m3-les-32",
            title: "Google Local Guides – Earn Perks by Reviewing Places",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/XGH5-UdfoL0",
            description: "How to earn perks and indirect income through Google Local Guides.",
            contentType: "video",
          },
        ],
      },
      // MODULE 4-9 - Placeholders for future content
      {
        id: "mod-4",
        title: "Module 4 - Coming Soon",
        lessons: [
          {
            id: "m4-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
      {
        id: "mod-5",
        title: "Module 5 - Coming Soon",
        lessons: [
          {
            id: "m5-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
      {
        id: "mod-6",
        title: "Module 6 - Coming Soon",
        lessons: [
          {
            id: "m6-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
      {
        id: "mod-7",
        title: "Module 7 - Coming Soon",
        lessons: [
          {
            id: "m7-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
      {
        id: "mod-8",
        title: "Module 8 - Coming Soon",
        lessons: [
          {
            id: "m8-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
      {
        id: "mod-9",
        title: "Module 9 - Coming Soon",
        lessons: [
          {
            id: "m9-les-1",
            title: "Content Coming Soon",
            duration: "0:00",
            videoUrl: "",
            description: "New lessons will be added soon. Stay tuned!",
            contentType: "text",
            textContent: "New content is being prepared for this module. Check back soon for updates!",
          },
        ],
      },
    ],
  },
];
