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
  image?: string;
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
                videoUrl: "https://www.youtube.com/embed/0LrwOQZVSDw",
                description: "Welcome to the TikTok Rewards Program!",
                contentType: "video",
              },
              {
                id: "m1-1-les-2",
                title: "How to access this content easily",
                duration: "3:00",
                videoUrl: "https://www.youtube.com/embed/0LrwOQZVSDw",
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
                textContent: `<p style="margin-bottom: 16px;">Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...</p>
<p style="margin-bottom: 16px;">If this is your case, please fill out the following form so that our team can solve it for you.</p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSedMydNiJp1Ss5ZhhHtuzTxphQFTwgpKEsdqhIn5Ugka5uFtQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="color: #25f4ee; font-weight: 600; text-decoration: underline;">CLICK HERE TO FILL OUT THE FORM</a></p>`,
              },
              {
                id: "m1-1-les-4",
                title: "Request your refund",
                duration: "2:00",
                videoUrl: "",
                description: "Need a refund? Here's how.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Request Your Refund</p>
<p style="margin-bottom: 16px;">If you want to apply for the 15-day guarantee, you just need to fill out this small form by clicking on the following link:</p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSedMydNiJp1Ss5ZhhHtuzTxphQFTwgpKEsdqhIn5Ugka5uFtQ/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #fe2c55 0%, #ff4070 100%); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">CLICK HERE</a></p>
<p style="color: rgba(255,255,255,0.7);">You just need to fill it out and the refund will be successfully processed, the money will be credited to your account on the next billing date of your credit card.</p>`,
              },
              {
                id: "m1-1-les-5",
                title: "Support Center",
                duration: "2:00",
                videoUrl: "",
                description: "Get help from our support team.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Dear Profitok Users,</p>
<p style="margin-bottom: 16px;">Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless. Whether you have questions, encounter technical issues, or seek guidance on maximizing features, our team is here to assist you.</p>
<p style="margin-bottom: 16px;"><strong style="color: #25f4ee;">How to Reach Us:</strong> For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com" style="color: #fe2c55; font-weight: 600;">ytrewards.ing@gmail.com</a></p>
<p style="margin-bottom: 16px;">Our support team operates <strong>Monday to Friday, from 9:00 AM to 6:00 PM</strong>, and we aim to respond promptly to all inquiries during these hours.</p>
<p style="margin-bottom: 16px;"><strong style="color: #25f4ee;">Feedback:</strong> Your input is invaluable to us as we strive to enhance Profitok continuously. Whether it's suggestions for new features or improvements to existing ones, we'd love to hear from you.</p>
<p style="margin-top: 24px; color: rgba(255,255,255,0.7);">Best Regards,<br/><strong style="color: #fff;">Profitok Support Team</strong></p>`,
              },
              {
                id: "m1-1-les-6",
                title: "Fill out the form and earn your first $35!",
                duration: "3:00",
                videoUrl: "",
                description: "Get your first earnings!",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Welcome to module 1.1!</p>
<p style="margin-bottom: 16px;">We invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.</p>
<p style="margin-bottom: 16px; background: linear-gradient(135deg, rgba(37,244,238,0.1) 0%, rgba(254,44,85,0.1) 100%); padding: 20px; border-radius: 12px; border: 1px solid rgba(37,244,238,0.2);">After filling out the form we will personally send you <strong style="color: #25f4ee; font-size: 20px;">$20 dollars</strong> to your PayPal account...<br/><br/><span style="color: rgba(255,255,255,0.7);">but be patient, as the money will arrive in the next 4-6 days.</span></p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #25f4ee 0%, #00c4b8 100%); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">FILL UP THE FORM HERE</a></p>`,
              },
            ],
          },
          {
            id: "sm-1-2",
            title: "Transforming your mindset",
            lessons: [
              { id: "m1-2-les-1", title: "Start Here", duration: "5:00", videoUrl: "https://www.youtube.com/embed/1Xk9TBsrfxQ", description: "Begin your mindset transformation.", contentType: "video" },
              { id: "m1-2-les-2", title: "Set Your Objectives", duration: "4:00", videoUrl: "https://www.youtube.com/embed/UyQvB6pxrKk", description: "Learn to set clear goals.", contentType: "video" },
              { id: "m1-2-les-3", title: "Start Immediately", duration: "3:00", videoUrl: "https://www.youtube.com/embed/7Fdhpmvlrjw", description: "Take action now.", contentType: "video" },
              { id: "m1-2-les-4", title: "Be Optimistic", duration: "4:00", videoUrl: "https://www.youtube.com/embed/FVo9mLFYD2Q", description: "Cultivate a positive mindset.", contentType: "video" },
              { id: "m1-2-les-5", title: "Be Resolute", duration: "4:00", videoUrl: "https://www.youtube.com/embed/V9hQTI-Qvmk", description: "Stay determined.", contentType: "video" },
              { id: "m1-2-les-6", title: "Attract it", duration: "5:00", videoUrl: "https://www.youtube.com/embed/J0u1Hxx_nX0", description: "Law of attraction principles.", contentType: "video" },
            ],
          },
          {
            id: "sm-1-3",
            title: "TikTok Profits",
            lessons: [
              { id: "m1-3-les-1", title: "Watch this First", duration: "4:00", videoUrl: "https://www.youtube.com/embed/0LrwOQZVSDw", description: "Important intro.", contentType: "video" },
              { id: "m1-3-les-2", title: "Step 1", duration: "5:00", videoUrl: "https://www.youtube.com/embed/KqJy4pUwsxE", description: "First step.", contentType: "video" },
              { id: "m1-3-les-3", title: "Step 2", duration: "5:00", videoUrl: "https://www.youtube.com/embed/j0YAyaOPvBo", description: "Second step.", contentType: "video" },
              { id: "m1-3-les-4", title: "Step 3", duration: "5:00", videoUrl: "https://www.youtube.com/embed/vdhquT6SQdY", description: "Third step.", contentType: "video" },
              { id: "m1-3-les-5", title: "Step 4", duration: "5:00", videoUrl: "https://www.youtube.com/embed/Zp1dXAiAiQQ", description: "Fourth step.", contentType: "video" },
              { id: "m1-3-les-6", title: "Tutorial # 1", duration: "6:00", videoUrl: "https://www.youtube.com/embed/DlNIV4gKNIo", description: "First tutorial.", contentType: "video" },
              { id: "m1-3-les-7", title: "Tutorial # 2", duration: "6:00", videoUrl: "https://www.youtube.com/embed/HqVlFm8K1-I", description: "Second tutorial.", contentType: "video" },
              { id: "m1-3-les-8", title: "Tutorial # 3", duration: "6:00", videoUrl: "https://www.youtube.com/embed/iojJnZ4GNiE", description: "Third tutorial.", contentType: "video" },
              { id: "m1-3-les-9", title: "Tutorial # 4", duration: "6:00", videoUrl: "https://www.youtube.com/embed/SSmIyBSbetY", description: "Fourth tutorial.", contentType: "video" },
              { id: "m1-3-les-10", title: "Tutorial # 5", duration: "6:00", videoUrl: "https://www.youtube.com/embed/X9nAFi_ZfHU", description: "Fifth tutorial.", contentType: "video" },
              {
                id: "m1-3-les-11",
                title: "Paid Surveys - Part 1",
                duration: "5:00",
                videoUrl: "",
                description: "Learn about paid surveys.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Paid Surveys - Part 1</p>
<p style="margin-bottom: 16px;">In the following link you can access one of our recommended platforms to earn money by completing surveys and simple tasks.</p>
<p style="margin-bottom: 24px;"><a href="https://freecash.com/r/67d7aa783c5ab49c5a3e5277" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #25f4ee 0%, #00c4b8 100%); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">ACCESS PLATFORM HERE</a></p>`,
              },
              {
                id: "m1-3-les-12",
                title: "Paid Surveys - Part 2",
                duration: "5:00",
                videoUrl: "",
                description: "More paid survey platforms.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Paid Surveys - Part 2</p>
<p style="margin-bottom: 16px;">Here is another platform where you can earn money completing surveys and tasks.</p>
<p style="margin-bottom: 24px;"><a href="https://www.swagbucks.com/?cmp=695&cxid=swagbuttonref&rb=124693138&extRefCmp=1&extReferrer=https%253A%252F%252Fwww.google.com%252F" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #fe2c55 0%, #ff4070 100%); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">ACCESS PLATFORM HERE</a></p>`,
              },
              { id: "m1-3-les-13", title: "Tutorial # 6", duration: "6:00", videoUrl: "https://www.youtube.com/embed/c3c-Hzzl5zU", description: "Sixth tutorial.", contentType: "video" },
              { id: "m1-3-les-14", title: "Tutorial # 7", duration: "6:00", videoUrl: "https://www.youtube.com/embed/0nMZrJmNz5U", description: "Seventh tutorial.", contentType: "video" },
              { id: "m1-3-les-15", title: "Tutorial # 8", duration: "6:00", videoUrl: "https://www.youtube.com/embed/FCEiG3thJF0", description: "Eighth tutorial.", contentType: "video" },
              { id: "m1-3-les-16", title: "Tutorial # 9", duration: "6:00", videoUrl: "https://www.youtube.com/embed/mAXm9sMlMic", description: "Ninth tutorial.", contentType: "video" },
              { id: "m1-3-les-17", title: "Tutorial # 10", duration: "6:00", videoUrl: "https://www.youtube.com/embed/j4-1Kw_kuWk", description: "Tenth tutorial.", contentType: "video" },
              { id: "m1-3-les-18", title: "Class #11", duration: "7:00", videoUrl: "https://www.youtube.com/embed/vdhquT6SQdY", description: "Class 11.", contentType: "video" },
              { id: "m1-3-les-19", title: "Class #12", duration: "7:00", videoUrl: "https://www.youtube.com/embed/7Fdhpmvlrjw", description: "Class 12.", contentType: "video" },
              { id: "m1-3-les-20", title: "Class #13", duration: "7:00", videoUrl: "https://www.youtube.com/embed/UyQvB6pxrKk", description: "Class 13.", contentType: "video" },
              { id: "m1-3-les-21", title: "Class #14", duration: "7:00", videoUrl: "https://www.youtube.com/embed/1Xk9TBsrfxQ", description: "Class 14.", contentType: "video" },
              { id: "m1-3-les-22", title: "Class #15", duration: "7:00", videoUrl: "https://www.youtube.com/embed/FVo9mLFYD2Q", description: "Class 15.", contentType: "video" },
              { id: "m1-3-les-23", title: "Class #16", duration: "7:00", videoUrl: "https://www.youtube.com/embed/V9hQTI-Qvmk", description: "Class 16.", contentType: "video" },
              { id: "m1-3-les-24", title: "Class #17", duration: "7:00", videoUrl: "https://www.youtube.com/embed/J0u1Hxx_nX0", description: "Class 17.", contentType: "video" },
              { id: "m1-3-les-25", title: "Class #18", duration: "7:00", videoUrl: "https://www.youtube.com/embed/KqJy4pUwsxE", description: "Class 18.", contentType: "video" },
              { id: "m1-3-les-26", title: "Class #19", duration: "7:00", videoUrl: "https://www.youtube.com/embed/j0YAyaOPvBo", description: "Class 19.", contentType: "video" },
              { id: "m1-3-les-27", title: "Class #20", duration: "7:00", videoUrl: "https://www.youtube.com/embed/Zp1dXAiAiQQ", description: "Class 20.", contentType: "video" },
              { id: "m1-3-les-28", title: "Class #21", duration: "7:00", videoUrl: "https://www.youtube.com/embed/DlNIV4gKNIo", description: "Class 21.", contentType: "video" },
              { id: "m1-3-les-29", title: "Class #22", duration: "7:00", videoUrl: "https://www.youtube.com/embed/HqVlFm8K1-I", description: "Class 22.", contentType: "video" },
              { id: "m1-3-les-30", title: "Class #23", duration: "7:00", videoUrl: "https://www.youtube.com/embed/iojJnZ4GNiE", description: "Class 23.", contentType: "video" },
              { id: "m1-3-les-31", title: "Bonus - Daily Earnings Strategy", duration: "10:00", videoUrl: "https://www.youtube.com/embed/SSmIyBSbetY", description: "Bonus strategy for daily earnings.", contentType: "video" },
              { id: "m1-3-les-32", title: "Final Class - Next Steps", duration: "8:00", videoUrl: "https://www.youtube.com/embed/X9nAFi_ZfHU", description: "Your path forward.", contentType: "video" },
            ],
          },
        ],
      },
      // MODULE 02 | ProfiTok: Bonus Program (33 lessons total)
      {
        id: "mod-2",
        title: "Module 02 | ProfiTok: Bonus Program",
        subtitle: "33 lessons",
        subModules: [
          {
            id: "sm-2-1",
            title: "First Steps",
            lessons: [
              { id: "m2-1-les-1", title: "Welcome - Start Here", duration: "5:00", videoUrl: "https://www.youtube.com/embed/y4rZWUg2BBc", description: "Welcome to ProfiTok!", contentType: "video" },
              { id: "m2-1-les-2", title: "How to access this content easily", duration: "4:00", videoUrl: "https://www.youtube.com/embed/0LrwOQZVSDw", description: "Easy content access.", contentType: "video" },
              { id: "m2-1-les-3", title: "How to use this program - MANDATORY", duration: "6:00", videoUrl: "https://www.youtube.com/embed/uOl2WdZmXfY", description: "Essential program guide.", contentType: "video" },
              {
                id: "m2-1-les-4",
                title: "Problems with duplicate purchases or card rejections",
                duration: "2:00",
                videoUrl: "",
                description: "Payment issues help.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px;">Very few people might have problems with a duplicate purchase, or sometimes they have wanted to buy one of our additional products but received an error at checkout...</p>
<p style="margin-bottom: 16px;">If this is your case, please fill out the following form so that our team can solve it for you.</p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSev-ZphXOmw-tf23GHKB6-R43j8p36wo70mdXW0nFteqAA26g/viewform" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #fe2c55 0%, #ff4070 100%); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">FILL OUT THE FORM</a></p>`,
              },
              {
                id: "m2-1-les-5",
                title: "Fill out this form and earn $35",
                duration: "3:00",
                videoUrl: "",
                description: "Earn $35 bonus.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Welcome to module 1.1!</p>
<p style="margin-bottom: 16px;">We invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.</p>
<p style="margin-bottom: 16px; background: linear-gradient(135deg, rgba(37,244,238,0.1) 0%, rgba(254,44,85,0.1) 100%); padding: 20px; border-radius: 12px; border: 1px solid rgba(37,244,238,0.2);">After filling out the form we will personally send you <strong style="color: #25f4ee; font-size: 20px;">$20 dollars</strong> to your PayPal account...<br/><br/><span style="color: rgba(255,255,255,0.7);">but be patient, as the money will arrive in the next 4-6 days.</span></p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #25f4ee 0%, #00c4b8 100%); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">FILL UP THE FORM HERE</a></p>`,
              },
            ],
          },
          {
            id: "sm-2-2",
            title: "Earn $35 right now",
            lessons: [
              {
                id: "m2-2-les-1",
                title: "Fill out this form and earn $35",
                duration: "3:00",
                videoUrl: "",
                description: "Get your $35 bonus now.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Welcome to module 1.1!</p>
<p style="margin-bottom: 16px;">We invite you to fill out this short form. We recommend you fill out this form when you finish consuming the program, so you can give us your opinion of its content.</p>
<p style="margin-bottom: 16px; background: linear-gradient(135deg, rgba(37,244,238,0.1) 0%, rgba(254,44,85,0.1) 100%); padding: 20px; border-radius: 12px; border: 1px solid rgba(37,244,238,0.2);">After filling out the form we will personally send you <strong style="color: #25f4ee; font-size: 20px;">$20 dollars</strong> to your PayPal account...<br/><br/><span style="color: rgba(255,255,255,0.7);">but be patient, as the money will arrive in the next 4-6 days.</span></p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfkx5C-MJOG1ONNzw8PrxKjmrH5Z5UzL5qG0VFt8N-Zkkky7A/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #25f4ee 0%, #00c4b8 100%); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">FILL UP THE FORM HERE</a></p>`,
              },
            ],
          },
          {
            id: "sm-2-3",
            title: "Download The Profitok App",
            lessons: [
              {
                id: "m2-3-les-1",
                title: "Instructions",
                duration: "3:00",
                videoUrl: "",
                description: "Important instructions.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px; color: #fe2c55;">IMPORTANT</p>
<p style="margin-bottom: 16px;">These two classes were introductory to some ways you too can profit. In the next module you will have access and be able to download the ''secret tool'' application, but it will be released after 7 days due to the updates and configurations that we will make to register all your data in the tool.</p>
<p style="margin-bottom: 16px;">After releasing the tool, just download it to your cell phone, put it into practice and conquer the dreamed financial freedom.</p>
<p style="margin-top: 20px; padding: 16px; background: rgba(254,44,85,0.1); border-radius: 12px; border: 1px solid rgba(254,44,85,0.2);"><strong style="color: #25f4ee;">Note:</strong> After releasing the tool, be sure to send us a testimonial about your experience with our application and your earnings.</p>`,
              },
              { id: "m2-3-les-2", title: "Profitok App", duration: "8:00", videoUrl: "https://www.youtube.com/embed/65XtsHL9KCM", description: "Download the Profitok app.", contentType: "video" },
            ],
          },
          {
            id: "sm-2-4",
            title: "Earn $200-$300 Daily Watching TikTok Videos",
            lessons: [
              { id: "m2-4-les-1", title: "Method 1 - Watch TikTok Videos and Earn $600", duration: "10:00", videoUrl: "https://www.youtube.com/embed/j4-1Kw_kuWk", description: "Earn $600 watching videos.", contentType: "video" },
              { id: "m2-4-les-2", title: "Method 2 - Earn $500 Per Day With TikTok", duration: "12:00", videoUrl: "https://www.youtube.com/embed/sNkzTkH6JKc", description: "Make $500 daily.", contentType: "video" },
              { id: "m2-4-les-3", title: "Method 3 - $250 Every Day Thanks To TikTok", duration: "10:00", videoUrl: "https://www.youtube.com/embed/QhxaSXzZSCk", description: "Earn $250 daily.", contentType: "video" },
              { id: "m2-4-les-4", title: "The 4 best ways to earn +$200 a day with TikTok", duration: "15:00", videoUrl: "https://www.youtube.com/embed/vdhquT6SQdY", description: "Top 4 methods.", contentType: "video" },
              { id: "m2-4-les-5", title: "How He Made $1,500,000 USD With TikTok Shop Affiliate", duration: "20:00", videoUrl: "https://www.youtube.com/embed/28IjJXTfXSA", description: "Million dollar success story.", contentType: "video" },
            ],
          },
          {
            id: "sm-2-5",
            title: "Earn $3,500 Each Month Watching YouTube",
            lessons: [
              { id: "m2-5-les-1", title: "Generator Method 1", duration: "12:00", videoUrl: "https://www.youtube.com/embed/JaOL7IxZPRA", description: "First generator method.", contentType: "video" },
              { id: "m2-5-les-2", title: "Generator Method 2", duration: "12:00", videoUrl: "https://www.youtube.com/embed/K1Lp_mwbTBI", description: "Second generator method.", contentType: "video" },
              { id: "m2-5-les-3", title: "Generator Method 3", duration: "12:00", videoUrl: "https://www.youtube.com/embed/3VDVXgQIG1Q", description: "Third generator method.", contentType: "video" },
              { id: "m2-5-les-4", title: "Generator Method 4", duration: "12:00", videoUrl: "https://www.youtube.com/embed/jXexJY0JS3k", description: "Fourth generator method.", contentType: "video" },
            ],
          },
          {
            id: "sm-2-6",
            title: "Multiply Your Results With These 3 Secret Methods",
            lessons: [
              { id: "m2-6-les-1", title: "Method 1", duration: "15:00", videoUrl: "https://www.youtube.com/embed/KlahnDqamxI", description: "First secret method.", contentType: "video" },
              { id: "m2-6-les-2", title: "Method 2", duration: "15:00", videoUrl: "https://www.youtube.com/embed/h0doY96U1OQ", description: "Second secret method.", contentType: "video" },
              { id: "m2-6-les-3", title: "Method 3", duration: "15:00", videoUrl: "https://www.youtube.com/embed/rkrTRUYiLWk", description: "Third secret method.", contentType: "video" },
            ],
          },
          {
            id: "sm-2-7",
            title: "Exclusive Bonus",
            lessons: [
              { id: "m2-7-les-1", title: "Classroom #8 - Earn US $100,000 In 6 Months", duration: "25:00", videoUrl: "https://www.youtube.com/embed/fFELeulDI4s", description: "Path to $100K.", contentType: "video" },
              { id: "m2-7-les-2", title: "Masterclass With the Millionaire Mentor Valued in $497", duration: "60:00", videoUrl: "https://www.youtube.com/embed/qZ9xUZKJnmQ", description: "$497 masterclass included.", contentType: "video" },
              { id: "m2-7-les-3", title: "Bonus 3 - Hidden Platform to Earn $10 for each Video Liked", duration: "12:00", videoUrl: "https://www.youtube.com/embed/5z4wOMDdTdU", description: "Earn per like.", contentType: "video" },
              { id: "m2-7-les-4", title: "Bonus 4 - How to Make $10k/Month Re-Uploading YouTube Videos", duration: "18:00", videoUrl: "https://www.youtube.com/embed/SnssN3rM4rk", description: "$10k/month method.", contentType: "video" },
            ],
          },
          {
            id: "sm-2-8",
            title: "How To Apply The Warranty",
            lessons: [
              {
                id: "m2-8-les-1",
                title: "Request your refund",
                duration: "2:00",
                videoUrl: "",
                description: "How to request refund.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Request Your Refund</p>
<p style="margin-bottom: 16px;">If you want to apply for the 15-day guarantee, you just need to fill out this small form by clicking on the following link:</p>
<p style="margin-bottom: 24px;"><a href="https://docs.google.com/forms/d/e/1FAIpQLSfPghwgDAdFY6WgIRA1mrx8pYOrYAIsE9LlmnfszYhaT4VuvA/viewform?usp=header" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #fe2c55 0%, #ff4070 100%); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">CLICK HERE</a></p>
<p style="color: rgba(255,255,255,0.7);">You just need to fill it out and the refund will be successfully processed, the money will be credited to your account on the next billing date of your credit card.</p>`,
              },
              {
                id: "m2-8-les-2",
                title: "Support Center",
                duration: "2:00",
                videoUrl: "",
                description: "Contact support.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Dear Profitok Users,</p>
<p style="margin-bottom: 16px;">Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless.</p>
<p style="margin-bottom: 16px;"><strong style="color: #25f4ee;">How to Reach Us:</strong> For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com" style="color: #fe2c55; font-weight: 600;">ytrewards.ing@gmail.com</a></p>
<p style="margin-bottom: 16px;">Our support team operates <strong>Monday to Friday, from 9:00 AM to 6:00 PM</strong>.</p>
<p style="margin-top: 24px; color: rgba(255,255,255,0.7);">Best Regards,<br/><strong style="color: #fff;">Profitok Support Team</strong></p>`,
              },
            ],
          },
        ],
      },
      // MODULE 03 | Millionaire Mindset (12 lessons total)
      {
        id: "mod-3",
        title: "Module 03 | Millionaire Mindset",
        subtitle: "12 lessons",
        subModules: [
          {
            id: "sm-3-1",
            title: "Millionaire Mindset Training",
            lessons: [
              { id: "m3-1-les-1", title: "Foundations of Financial Mindset", duration: "15:00", videoUrl: "https://www.youtube.com/embed/RyGZ8H4N0t4", description: "Build your financial foundation.", contentType: "video" },
              { id: "m3-1-les-2", title: "How to Prepare to Earn More", duration: "12:00", videoUrl: "https://www.youtube.com/embed/o0I_J1vHlAU", description: "Prepare for wealth.", contentType: "video" },
              { id: "m3-1-les-3", title: "The Mistakes That Hold Back Your Financial Growth", duration: "14:00", videoUrl: "https://www.youtube.com/embed/tFJqac-zzuw", description: "Avoid common mistakes.", contentType: "video" },
              { id: "m3-1-les-4", title: "How to Use Money to Your Advantage", duration: "13:00", videoUrl: "https://www.youtube.com/embed/NfKMzS8v-Rg", description: "Money management.", contentType: "video" },
              { id: "m3-1-les-5", title: "Money Multiplication in Practice", duration: "16:00", videoUrl: "https://www.youtube.com/embed/0WtHJIez0V0", description: "Multiply your money.", contentType: "video" },
              { id: "m3-1-les-6", title: "University, Career, and Financial Independence", duration: "18:00", videoUrl: "https://www.youtube.com/embed/cV218GPI2ak", description: "Path to independence.", contentType: "video" },
              { id: "m3-1-les-7", title: "How to Set Goals and Take Control of Your Financial Life", duration: "14:00", videoUrl: "https://www.youtube.com/embed/w0w2rZDmXAQ", description: "Goal setting.", contentType: "video" },
              { id: "m3-1-les-8", title: "Mental Reprogramming for Success", duration: "20:00", videoUrl: "https://www.youtube.com/embed/kj4efPjk7T0", description: "Reprogram your mind.", contentType: "video" },
              { id: "m3-1-les-9", title: "How to Break Cycles and Create a New Financial Reality", duration: "15:00", videoUrl: "https://www.youtube.com/embed/BIQZqQIsPY4", description: "Break negative cycles.", contentType: "video" },
              { id: "m3-1-les-10", title: "The Secret That Changes Everything - How to Attract What You Want", duration: "22:00", videoUrl: "https://www.youtube.com/embed/2cSo99Rlz_Y", description: "Law of attraction.", contentType: "video" },
              { id: "m3-1-les-11", title: "Positive Affirmations and Creative Visualization", duration: "18:00", videoUrl: "https://www.youtube.com/embed/BJKc1zF-nac", description: "Visualization techniques.", contentType: "video" },
              { id: "m3-1-les-12", title: "Overcoming Blocks and Limiting Beliefs", duration: "16:00", videoUrl: "https://www.youtube.com/embed/zKA-9Ok1fWU", description: "Remove limiting beliefs.", contentType: "video" },
            ],
          },
        ],
      },
      // MODULE 04 | Recover Your Investment (8 lessons total)
      {
        id: "mod-4",
        title: "Module 04 | Recover Your Investment",
        subtitle: "8 lessons",
        subModules: [
          {
            id: "sm-4-1",
            title: "Introduction",
            lessons: [
              {
                id: "m4-1-les-1",
                title: "Introduction",
                duration: "5:00",
                videoUrl: "",
                description: "Course introduction.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Hello and welcome!</p>
<p style="margin-bottom: 16px;">Welcome to the first module of this wonderful course where you will learn to multiply your results X3. In order for you to see the expected results please follow the instructions below:</p>
<ol style="margin-bottom: 20px; padding-left: 24px; color: rgba(255,255,255,0.9);">
<li style="margin-bottom: 8px;">Don't see the course in disorder</li>
<li style="margin-bottom: 8px;">Start with module 2 where you will set the right mindset to earn more money</li>
<li style="margin-bottom: 8px;">Go to module 3 and fill out the google forms to receive a $20 Bonus</li>
<li style="margin-bottom: 8px;">Check module 4 and follow the steps to increase your results X3</li>
</ol>`,
              },
            ],
          },
          {
            id: "sm-4-2",
            title: "Support",
            lessons: [
              {
                id: "m4-2-les-1",
                title: "Support",
                duration: "2:00",
                videoUrl: "",
                description: "Contact support.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">Dear Profitok Users,</p>
<p style="margin-bottom: 16px;">Welcome to the Profitok Support Center! We're dedicated to ensuring your experience with Profitok is seamless.</p>
<p style="margin-bottom: 16px;"><strong style="color: #25f4ee;">How to Reach Us:</strong> For inquiries, assistance, or feedback, please contact us via email at <a href="mailto:ytrewards.ing@gmail.com" style="color: #fe2c55; font-weight: 600;">ytrewards.ing@gmail.com</a></p>
<p style="margin-bottom: 16px;">Our support team operates <strong>Monday to Friday, from 9:00 AM to 6:00 PM</strong>.</p>
<p style="margin-top: 24px; color: rgba(255,255,255,0.7);">Best Regards,<br/><strong style="color: #fff;">Profitok Support Team</strong></p>`,
              },
            ],
          },
          {
            id: "sm-4-3",
            title: "The Real Secret of Millionaires",
            lessons: [
              {
                id: "m4-3-les-1",
                title: "The Real Secret of Millionaires",
                duration: "10:00",
                videoUrl: "",
                description: "PDF resource.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">The Real Secret of Millionaires</p>
<p style="margin-bottom: 16px;">Download the exclusive PDF to learn the real secrets of millionaires.</p>
<p style="margin-bottom: 24px;"><a href="#" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #25f4ee 0%, #00c4b8 100%); color: #000; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">DOWNLOAD PDF</a></p>`,
              },
              {
                id: "m4-3-les-2",
                title: "15 Best Sources Of Income",
                duration: "8:00",
                videoUrl: "",
                description: "Income sources PDF.",
                contentType: "text",
                textContent: `<p style="margin-bottom: 16px; font-weight: 600; font-size: 18px;">15 Best Sources Of Income</p>
<p style="margin-bottom: 16px;">Download this PDF to discover the 15 best sources of income.</p>
<p style="margin-bottom: 24px;"><a href="https://cdn.areademembros.com/files/instancia_5829/editor/2kUyi4hhP1t5KZlKkhJIW0hNKcnWw6TM4781UKo3.pdf" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: linear-gradient(135deg, #fe2c55 0%, #ff4070 100%); color: #fff; font-weight: 700; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px;">DOWNLOAD PDF</a></p>`,
              },
            ],
          },
          {
            id: "sm-4-4",
            title: "Methods to Recover Your Investment",
            lessons: [
              { id: "m4-4-les-1", title: "Method 1 - Make $509 easily", duration: "15:00", videoUrl: "https://www.youtube.com/embed/p8B4meVI154", description: "Make $509.", contentType: "video" },
              { id: "m4-4-les-2", title: "Method 2 - Make $1,437 per week", duration: "18:00", videoUrl: "https://www.youtube.com/embed/okIz98bcBo0", description: "Earn $1,437 weekly.", contentType: "video" },
              { id: "m4-4-les-3", title: "Method 3 - $100 Every Day With UserTesting.com", duration: "12:00", videoUrl: "https://www.youtube.com/embed/434puZCzFwM", description: "Earn $100 daily.", contentType: "video" },
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
        subModules: [{ id: "sm-5-1", title: "Coming Soon", lessons: [{ id: "m5-les-1", title: "Content Coming Soon", duration: "0:00", videoUrl: "", description: "Coming soon.", contentType: "text", textContent: "<p>This module content is coming soon. Stay tuned!</p>" }] }],
      },
      // MODULE 06 | Increase Your Profits X3
      {
        id: "mod-6",
        title: "Module 06 | Increase Your Profits X3",
        subtitle: "9 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-6-1", title: "Coming Soon", lessons: [{ id: "m6-les-1", title: "Content Coming Soon", duration: "0:00", videoUrl: "", description: "Coming soon.", contentType: "text", textContent: "<p>This module content is coming soon. Stay tuned!</p>" }] }],
      },
      // MODULE 07 | Lifetime Access
      {
        id: "mod-7",
        title: "Module 07 | Lifetime Access",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-7-1", title: "Coming Soon", lessons: [{ id: "m7-les-1", title: "Content Coming Soon", duration: "0:00", videoUrl: "", description: "Coming soon.", contentType: "text", textContent: "<p>This module content is coming soon. Stay tuned!</p>" }] }],
      },
      // MODULE 08 | VIP Community
      {
        id: "mod-8",
        title: "Module 08 | VIP Community",
        subtitle: "3 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-8-1", title: "Coming Soon", lessons: [{ id: "m8-les-1", title: "Content Coming Soon", duration: "0:00", videoUrl: "", description: "Coming soon.", contentType: "text", textContent: "<p>This module content is coming soon. Stay tuned!</p>" }] }],
      },
      // MODULE 09 | ProfiUp Bonus Program
      {
        id: "mod-9",
        title: "ProfiUp 09 | Bonus Program",
        subtitle: "11 lessons",
        comingSoon: true,
        subModules: [{ id: "sm-9-1", title: "Coming Soon", lessons: [{ id: "m9-les-1", title: "Content Coming Soon", duration: "0:00", videoUrl: "", description: "Coming soon.", contentType: "text", textContent: "<p>This module content is coming soon. Stay tuned!</p>" }] }],
      },
    ],
  },
];
