import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

interface LessonProgress {
  course_id: string;
  lesson_id: string;
  completed_at: string;
}

interface CourseProgress {
  course_id: string;
  started_at: string;
  completed_at: string | null;
  progress: number;
}

export function useProgress() {
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>([]);
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    const [lessonsRes, coursesRes] = await Promise.all([
      supabase.from("user_progress").select("course_id, lesson_id, completed_at").eq("user_id", user.id),
      supabase.from("user_courses").select("course_id, started_at, completed_at, progress").eq("user_id", user.id)
    ]);

    if (lessonsRes.data) setLessonProgress(lessonsRes.data);
    if (coursesRes.data) setCourseProgress(coursesRes.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const markLessonComplete = async (courseId: string, lessonId: string, totalLessons: number) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return false;

    // Insert lesson progress
    const { error: lessonError } = await supabase
      .from("user_progress")
      .upsert({
        user_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
        completed_at: new Date().toISOString()
      }, { onConflict: "user_id,course_id,lesson_id" });

    if (lessonError) {
      console.error("Error saving lesson progress:", lessonError);
      return false;
    }

    // Get completed lessons count for this course
    const { data: completedLessons } = await supabase
      .from("user_progress")
      .select("lesson_id")
      .eq("user_id", user.id)
      .eq("course_id", courseId);

    const completedCount = completedLessons?.length || 0;
    const progressPercent = Math.round((completedCount / totalLessons) * 100);

    // Update or insert course progress
    const { error: courseError } = await supabase
      .from("user_courses")
      .upsert({
        user_id: user.id,
        course_id: courseId,
        started_at: new Date().toISOString(),
        progress: progressPercent,
        completed_at: progressPercent >= 100 ? new Date().toISOString() : null
      }, { onConflict: "user_id,course_id" });

    if (courseError) {
      console.error("Error saving course progress:", courseError);
      return false;
    }

    // Refresh progress
    await fetchProgress();
    return true;
  };

  const isLessonCompleted = (courseId: string, lessonId: string) => {
    return lessonProgress.some(p => p.course_id === courseId && p.lesson_id === lessonId);
  };

  const getCourseProgress = (courseId: string) => {
    return courseProgress.find(p => p.course_id === courseId);
  };

  const isCourseStarted = (courseId: string) => {
    return courseProgress.some(p => p.course_id === courseId);
  };

  const isCourseCompleted = (courseId: string) => {
    const course = courseProgress.find(p => p.course_id === courseId);
    return course?.completed_at !== null && course?.completed_at !== undefined;
  };

  return {
    lessonProgress,
    courseProgress,
    loading,
    markLessonComplete,
    isLessonCompleted,
    getCourseProgress,
    isCourseStarted,
    isCourseCompleted,
    refreshProgress: fetchProgress
  };
}
