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
    totalLessons: 129,
    totalDuration: "15h+",
    progress: 0,
    tags: ["TikTok", "Earnings", "Marketing", "Profits"],
    modules: [
      // MODULE 01 | Youtube Profits (44 mini modules)
      {
        id: "mod-1",
        title: "Module 01 | Youtube Profits",
        lessons: [
          // === MINI MODULE 1: First Steps And General Information (1-6) ===
          {
            id: "m1-les-1",
            title: "1. Welcome - Start Here",
            duration: "5:00",
            videoUrl: "https://www.youtube.com/embed/JACqqG5qB2M",
            description: "Welcome to the TikTok Rewards Program! Start your journey here.",
            contentType: "video",
          },
          {
            id: "m1-les-2",
            title: "2. How to access this content easily",
            duration: "3:00",
            videoUrl: "https://www.youtube.com/embed/mh5caogRWWw",
            description: "Learn how to easily access all course content anytime, anywhere.",
            contentType: "video",
          },
          {
            id: "m1-les-3",
            title: "3. Problems with duplicate purchases or card rejections",
            duration: "2:00",
            videoUrl: "",
            description: "Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...",
            contentType: "text",
            textContent: `<p>Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...</p>
<p>If this is your case, please fill out the following form so that our team can solve it for you.</p>
<p><a href="https://docs.google.com/forms/d/e/1FAIpQLSev-ZphXOmw-tf23GHKB6-R43j8p36wo70mdXW0nFteqAA26g/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="color: #25f4ee; text-decoration: underline;">Click here to fill out the form</a></p>`,
          },
          {
            id: "m1-les-4",
            title: "4. Request your refund",
            duration: "2:00",
            videoUrl: "",
            description: "If you want to apply for the 15-day guarantee, you just need to fill out this small form.",
            contentType: "text",
            textContent: `<p>If you want to apply for the 15-day guarantee, you just need to fill out this small form by clicking on the following link:</p>
<p><a href="https://docs.google.com/forms/d/e/1FAIpQLSedMydNiJp1Ss5ZhhHtuzTxphQFTwgpKEsdqhIn5Ugka5uFtQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="color: #fe2c55; text-decoration: underline; font-weight: bold;">CLICK HERE</a></p>
<p>You just need to fill it out and the refund will be successfully processed, the money will be credited to your account on the next billing date of your credit card.</p>`,
          },
          {
            id: "m1-les-5",
            title: "5. Support Center",
            duration: "3:00",
            videoUrl: "",
            description: "Welcome to the Profitok Support Center! We're dedicated to ensuring your experience is seamless.",
            contentType: "text",
            textContent: `<p><strong>Dear Profitok Users,</strong></p>
<p>Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless. Whether you have questions, encounter technical issues, or seek guidance on maximizing features, our team is here to assist you.</p>
<p><strong>How to Reach Us:</strong></p>
<p>For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com" style="color: #25f4ee;">ytrewards.ing@gmail.com</a>. Our support team operates Monday to Friday, from 9:00 AM to 6:00 PM, and we aim to respond promptly to all inquiries during these hours.</p>
<p><strong>Feedback:</strong></p>
<p>Your input is invaluable to us as we strive to enhance Profitok continuously. Whether it's suggestions for new features or improvements to existing ones, we'd love to hear from you. Please feel free to share your thoughts and ideas with us.</p>
<p>Thank you for choosing Profitok. We value your trust and look forward to assisting you.</p>
<p><em>Best Regards,<br/>Profitok Support Team</em></p>`,
          },
          {
            id: "m1-les-6",
            title: "6. Fill out this form and earn $35",
            duration: "2:00",
            videoUrl: "",
            description: "Welcome to module 1.1, where we invite you to fill out this short form and earn $20!",
            contentType: "text",
            textContent: `<p>Welcome to module 1.1, where we invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.</p>
<p>After filling out the form we will personally send you <strong style="color: #25f4ee;">$20 dollars</strong> to your PayPal account...</p>
<p><strong style="color: #fe2c55;">But be patient, as the money will arrive in the next 4-6 days.</strong></p>
<p><a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="color: #25f4ee; text-decoration: underline; font-weight: bold;">Fill up the form here</a></p>`,
          },
          // === MINI MODULE 2: Transforming your mindset (7-12) ===
          {
            id: "m1-les-7",
            title: "7. Start Here - Mindset",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/w8jnbryJOb8",
            description: "Begin your mindset transformation journey with this essential introduction.",
            contentType: "video",
          },
          {
            id: "m1-les-8",
            title: "8. Step 1: Set Objectives",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/1fUgvpQ4FuY",
            description: "Learn how to set clear, achievable objectives for your success.",
            contentType: "video",
          },
          {
            id: "m1-les-9",
            title: "9. Step 2: Start Immediately",
            duration: "7:00",
            videoUrl: "https://www.youtube.com/embed/0pyPN61jMVU",
            description: "The importance of taking immediate action towards your goals.",
            contentType: "video",
          },
          {
            id: "m1-les-10",
            title: "10. Step 3: Be Optimistic",
            duration: "9:00",
            videoUrl: "https://www.youtube.com/embed/kgg2SxxfioI",
            description: "Cultivate an optimistic mindset for lasting success.",
            contentType: "video",
          },
          {
            id: "m1-les-11",
            title: "11. Step 4: Be Resolute",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/CnOU6O8egw0",
            description: "Develop unwavering determination to achieve your goals.",
            contentType: "video",
          },
          {
            id: "m1-les-12",
            title: "12. Step 5: Attract it",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/z6wmHvzDMJE",
            description: "Learn the power of attraction and manifestation in your journey.",
            contentType: "video",
          },
          // === MINI MODULE 3: TikTok Profits (13-44) ===
          {
            id: "m1-les-13",
            title: "13. How to use YouTube monetization tools to make money with surveys",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/Zp18FRynLk4",
            description: "Discover how to leverage YouTube monetization tools for survey earnings.",
            contentType: "video",
          },
          {
            id: "m1-les-14",
            title: "14. How to answer more surveys in less time and increase your earning",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/CHKu9FBCRpw",
            description: "Maximize your survey efficiency and boost your earnings.",
            contentType: "video",
          },
          {
            id: "m1-les-15",
            title: "15. The best time to answer surveys and earn more",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/hd2Vi3pksQs",
            description: "Learn the optimal times to complete surveys for maximum earnings.",
            contentType: "video",
          },
          {
            id: "m1-les-16",
            title: "16. How to make money on TikTok without recording any videos",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/615xOSCXtHU",
            description: "Unique strategies to earn on TikTok without creating video content.",
            contentType: "video",
          },
          {
            id: "m1-les-17",
            title: "17. How to create a routine to make money online sustainably",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/HmXc3py1lFc",
            description: "Build a sustainable daily routine for consistent online earnings.",
            contentType: "video",
          },
          {
            id: "m1-les-18",
            title: "18. $20 x 12minutes Apps to Make Money Online",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/QRpAM3z9Da8",
            description: "Discover apps that pay $20 for just 12 minutes of your time.",
            contentType: "video",
          },
          {
            id: "m1-les-19",
            title: "19. Fast $938/week – Make Money Online",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/38qoPFt8tDY",
            description: "Learn strategies to potentially earn $938 per week online.",
            contentType: "video",
          },
          {
            id: "m1-les-20",
            title: "20. $100 a Day – Writing Names",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/QpCWOePy13g",
            description: "Simple method to earn $100 daily with minimal effort.",
            contentType: "video",
          },
          {
            id: "m1-les-21",
            title: "21. Earn $200 a Day with Your Phone (I Tried It)",
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/fOcRHU9Y1_k",
            description: "Tested method to earn $200 daily using just your smartphone.",
            contentType: "video",
          },
          {
            id: "m1-les-22",
            title: "22. Earn USD 180 a Day with Google Translate",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/2ZrNLZtRaZY",
            description: "Use Google Translate to generate $180 per day income.",
            contentType: "video",
          },
          {
            id: "m1-les-23",
            title: "23. Do You Really Understand How to Make Money Online with Strategy?",
            duration: "5:00",
            videoUrl: "",
            description: "Time to Practice! Test Your Knowledge and Boost Your Progress.",
            contentType: "text",
            textContent: `<p><strong>Time to Practice! Test Your Knowledge and Boost Your Progress</strong></p>
<p>It's practice time! This is your practical test, a key moment to reinforce everything you've learned so far.</p>
<p>By taking this quiz, you will:</p>
<ul>
<li>Strengthen the content in a lighter, more effective way</li>
<li>Identify what you already master</li>
<li>Spot areas you can still improve</li>
<li>And most importantly, speed up your real-life results</li>
</ul>
<p><strong style="color: #fe2c55;">Remember: those who practice, truly learn.</strong></p>
<p>This step is just as important as the lessons — it's what separates those who just watch from those who truly grow.</p>
<p>Take a few minutes, answer carefully, and see how far you've come. You'll be surprised by how much you already know. And what you don't… you'll soon master!</p>`,
          },
          {
            id: "m1-les-24",
            title: "24. Heads up! This message is for those who are truly committed",
            duration: "3:00",
            videoUrl: "",
            description: "Important announcement about upcoming crucial lessons.",
            contentType: "text",
            textContent: `<p><strong>Heads up! This message is for those who are truly committed to their growth.</strong></p>
<p>We're approaching a key moment in the course, and you definitely don't want to miss it. Between April 16th and 19th, we'll be releasing a set of crucial lessons that will take your learning to the next level.</p>
<p>These upcoming sessions will help you connect the dots and start applying the strategies you've been learning in a practical, results-driven way.</p>
<p>This is where things really start to click. You'll begin to see how far you've come — and how much further you can go.</p>
<p>So make sure to set aside time, plan ahead, and be ready. These lessons might just be the turning point in your journey.</p>
<p><strong style="color: #25f4ee;">And remember: new content drops every single week, designed to keep pushing you forward step by step.</strong></p>
<p>Staying on top of the updates and actively participating will make all the difference in your progress.</p>
<p>You're in the right place, at the right time. Keep showing up, because the best is yet to come. Let's keep moving forward together!</p>`,
          },
          {
            id: "m1-les-25",
            title: "25. How to Use VPN to Access More Surveys Internationally",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/mQXDuQ8NOcQ",
            description: "Expand your survey opportunities using VPN technology.",
            contentType: "video",
          },
          {
            id: "m1-les-26",
            title: "26. How to Stay Updated and Not Fall Behind",
            duration: "8:00",
            videoUrl: "https://www.youtube.com/embed/UOA38jQacBI",
            description: "Stay current with the latest strategies and opportunities.",
            contentType: "video",
          },
          {
            id: "m1-les-27",
            title: "27. How This YouTube Tool Really Works (And Why It Pays So Well)",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/t-3vTOyCQlI",
            description: "Deep dive into the YouTube monetization tool and its earning potential.",
            contentType: "video",
          },
          {
            id: "m1-les-28",
            title: "28. The 5 Biggest Mistakes That Are Stopping You From Making Money",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/tvqXAEtC6E4",
            description: "Avoid these critical mistakes that prevent your earning potential.",
            contentType: "video",
          },
          {
            id: "m1-les-29",
            title: "29. From Broke to Boss: How to Make $10K in 45 Days",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/HUCiPsC-BpM",
            description: "Complete roadmap to earning $10,000 in just 45 days.",
            contentType: "video",
          },
          {
            id: "m1-les-30",
            title: "30. How to Use Your Social Media Time to Make Money Instead",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/furqLCm18Pg",
            description: "Transform your social media time into productive earning time.",
            contentType: "video",
          },
          {
            id: "m1-les-31",
            title: "31. What to do If You're Not Seeing Results (FIX THIS NOW)",
            duration: "13:00",
            videoUrl: "https://www.youtube.com/embed/Lx0mQB9ayns",
            description: "Troubleshoot and fix issues preventing your success.",
            contentType: "video",
          },
          {
            id: "m1-les-32",
            title: "32. How to Multiply Your Income Without Working More Hours",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/ny3CzsZPYTQ",
            description: "Scale your earnings without increasing your work hours.",
            contentType: "video",
          },
          {
            id: "m1-les-33",
            title: "33. How to Make the Most of Bonuses and Rewards",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/7UkI3jG7og8",
            description: "Maximize your bonus and reward earnings effectively.",
            contentType: "video",
          },
          {
            id: "m1-les-34",
            title: "34. How to Use Multiple Devices to Increase Your Earnings",
            duration: "9:00",
            videoUrl: "https://www.youtube.com/embed/jrIficRvKiA",
            description: "Leverage multiple devices to multiply your income streams.",
            contentType: "video",
          },
          {
            id: "m1-les-35",
            title: "35. How to Organize Your Earnings and Plan for the Future",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/8rjvXIzUnSo",
            description: "Financial organization tips for long-term success.",
            contentType: "video",
          },
          {
            id: "m1-les-36",
            title: "36. What No One Tells You About Making Money from Home",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/0kw9qGxWotA",
            description: "Hidden truths about working from home that affect your success.",
            contentType: "video",
          },
          {
            id: "m1-les-37",
            title: "37. Why Do Some People Earn $300 a Day… While Others Earn Nothing?",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/9ZAM0t9nvsg",
            description: "Understand what separates high earners from those who struggle.",
            contentType: "video",
          },
          {
            id: "m1-les-38",
            title: "38. 3 Keys to Make Sure the Money You Earn Online Doesn't Slip Away",
            duration: "11:00",
            videoUrl: "https://www.youtube.com/embed/CZb1n2weyaM",
            description: "Essential strategies to keep and grow your online earnings.",
            contentType: "video",
          },
          {
            id: "m1-les-39",
            title: "39. How to Spot Fake Opportunities and Only Use Safe Platforms",
            duration: "10:00",
            videoUrl: "https://www.youtube.com/embed/tRyEELnQmIQ",
            description: "Protect yourself from scams and identify legitimate opportunities.",
            contentType: "video",
          },
          {
            id: "m1-les-40",
            title: "40. The 30-Day Challenge: Turning What You've Learned into Real Profits",
            duration: "15:00",
            videoUrl: "https://www.youtube.com/embed/T4dxP55Ss2M",
            description: "A practical 30-day action plan to start earning real money.",
            contentType: "video",
          },
          {
            id: "m1-les-41",
            title: "41. Earn $540 in 48 Hours – Full Tutorial",
            duration: "18:00",
            videoUrl: "https://www.youtube.com/embed/X-2gpHTvzlQ",
            description: "Complete step-by-step guide to earning $540 in just 2 days.",
            contentType: "video",
          },
          {
            id: "m1-les-42",
            title: "42. How to earn money with TikTok Shop (Easy Method)",
            duration: "14:00",
            videoUrl: "https://www.youtube.com/embed/HCJuRWGPBec",
            description: "Simple method to monetize through TikTok Shop feature.",
            contentType: "video",
          },
          {
            id: "m1-les-43",
            title: "43. How I earned +$700 per week with social networks",
            duration: "16:00",
            videoUrl: "https://www.youtube.com/embed/YkuO8Cw_jyI",
            description: "Real case study of earning $700+ weekly through social media.",
            contentType: "video",
          },
          {
            id: "m1-les-44",
            title: "44. How to Create a Sustainable Online Income Strategy",
            duration: "12:00",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            description: "Build a long-term sustainable income strategy online.",
            contentType: "video",
          },
        ],
      },
      // MODULE 02 | ProfiTok: Bonus Program (33 mini modules)
      {
        id: "mod-2",
        title: "Module 02 | ProfiTok: Bonus Program",
        lessons: Array.from({ length: 33 }, (_, i) => ({
          id: `m2-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 03 | Millionaire Mindset (12 mini modules)
      {
        id: "mod-3",
        title: "Module 03 | Millionaire Mindset",
        lessons: Array.from({ length: 12 }, (_, i) => ({
          id: `m3-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 04 | Recover Your Investment (8 mini modules)
      {
        id: "mod-4",
        title: "Module 04 | Recover Your Investment",
        lessons: Array.from({ length: 8 }, (_, i) => ({
          id: `m4-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 05 | Millionaire System (6 mini modules)
      {
        id: "mod-5",
        title: "Module 05 | Millionaire System",
        lessons: Array.from({ length: 6 }, (_, i) => ({
          id: `m5-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 06 | Increase Your Profits X3 (9 mini modules)
      {
        id: "mod-6",
        title: "Module 06 | Increase Your Profits X3",
        lessons: Array.from({ length: 9 }, (_, i) => ({
          id: `m6-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 07 | Lifetime Access (3 mini modules)
      {
        id: "mod-7",
        title: "Module 07 | Lifetime Access",
        lessons: Array.from({ length: 3 }, (_, i) => ({
          id: `m7-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 08 | VIP Community (3 mini modules)
      {
        id: "mod-8",
        title: "Module 08 | VIP Community",
        lessons: Array.from({ length: 3 }, (_, i) => ({
          id: `m8-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
      // MODULE 09 | ProfiUp Bonus Program (11 mini modules)
      {
        id: "mod-9",
        title: "ProfiUp 09 | Bonus Program",
        lessons: Array.from({ length: 11 }, (_, i) => ({
          id: `m9-les-${i + 1}`,
          title: `${i + 1}. Coming Soon`,
          duration: "5:00",
          videoUrl: "",
          description: "This lesson content will be available soon. Stay tuned!",
          contentType: "text" as const,
          textContent: "<p style='text-align: center; padding: 40px;'><strong style='color: #fe2c55; font-size: 18px;'>Coming Soon</strong><br/><br/>This lesson content will be available soon.<br/>Stay tuned for updates!</p>",
        })),
      },
    ],
  },
];
