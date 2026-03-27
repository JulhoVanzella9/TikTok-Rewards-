"use client";
import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  category: string;
  maxProgress?: number;
}

export interface UserAchievement {
  achievement_id: string;
  progress: number;
  unlocked: boolean;
  unlocked_at: string | null;
}

// Lista de conquistas disponíveis
export const achievements: Achievement[] = [
  { id: "first-lesson", title: "Primeiro Passo", description: "Complete sua primeira lição", icon: "🎯", xp: 50, rarity: "common", category: "Aprendizado" },
  { id: "first-course", title: "Estudante Dedicado", description: "Complete seu primeiro curso", icon: "📚", xp: 200, rarity: "common", category: "Aprendizado" },
  { id: "five-courses", title: "Mestre dos Cursos", description: "Complete 5 cursos", icon: "🏆", xp: 500, rarity: "rare", category: "Aprendizado", maxProgress: 5 },
  { id: "ten-courses", title: "Expert TikCash", description: "Complete 10 cursos", icon: "👑", xp: 1000, rarity: "epic", category: "Aprendizado", maxProgress: 10 },
  { id: "streak-3", title: "Consistência", description: "Mantenha uma sequência de 3 dias", icon: "🔥", xp: 100, rarity: "common", category: "Dedicação", maxProgress: 3 },
  { id: "streak-7", title: "Semana Perfeita", description: "Mantenha uma sequência de 7 dias", icon: "⚡", xp: 300, rarity: "rare", category: "Dedicação", maxProgress: 7 },
  { id: "streak-30", title: "Mês de Fogo", description: "Mantenha uma sequência de 30 dias", icon: "💎", xp: 1000, rarity: "epic", category: "Dedicação", maxProgress: 30 },
  { id: "watch-1h", title: "Espectador", description: "Assista 1 hora de conteúdo", icon: "👀", xp: 50, rarity: "common", category: "Tempo" },
  { id: "watch-10h", title: "Maratonista", description: "Assista 10 horas de conteúdo", icon: "🎬", xp: 300, rarity: "rare", category: "Tempo" },
  { id: "watch-50h", title: "Viciado em Aprender", description: "Assista 50 horas de conteúdo", icon: "🌟", xp: 800, rarity: "epic", category: "Tempo" },
  { id: "xp-1000", title: "Coletor de XP", description: "Acumule 1000 XP", icon: "✨", xp: 100, rarity: "common", category: "Progresso", maxProgress: 1000 },
  { id: "xp-5000", title: "XP Master", description: "Acumule 5000 XP", icon: "💫", xp: 500, rarity: "rare", category: "Progresso", maxProgress: 5000 },
  { id: "all-categories", title: "Explorador", description: "Complete um curso de cada categoria", icon: "🗺️", xp: 750, rarity: "epic", category: "Exploração" },
  { id: "perfect-quiz", title: "Gênio", description: "Acerte 100% em um quiz", icon: "🧠", xp: 200, rarity: "rare", category: "Quiz" },
  { id: "early-bird", title: "Madrugador", description: "Estude antes das 7h da manhã", icon: "🌅", xp: 100, rarity: "common", category: "Especial" },
  { id: "night-owl", title: "Coruja Noturna", description: "Estude depois das 23h", icon: "🦉", xp: 100, rarity: "common", category: "Especial" },
];

export function useAchievements() {
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user achievements
  const fetchAchievements = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setLoading(false);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from("user_achievements")
      .select("achievement_id, progress, unlocked, unlocked_at")
      .eq("user_id", user.id);

    if (data) {
      setUserAchievements(data);
    }
    setLoading(false);
  }, []);

  // Get achievement progress
  const getAchievementProgress = useCallback((achievementId: string): UserAchievement | undefined => {
    return userAchievements.find((a) => a.achievement_id === achievementId);
  }, [userAchievements]);

  // Update achievement progress
  const updateProgress = useCallback(async (achievementId: string, progress: number) => {
    if (!userId) return false;

    const supabase = createClient();
    const achievement = achievements.find((a) => a.id === achievementId);
    if (!achievement) return false;

    const maxProgress = achievement.maxProgress || 1;
    const newProgress = Math.min(progress, maxProgress);
    const shouldUnlock = newProgress >= maxProgress;

    const { error } = await supabase
      .from("user_achievements")
      .upsert({
        user_id: userId,
        achievement_id: achievementId,
        progress: newProgress,
        unlocked: shouldUnlock,
        unlocked_at: shouldUnlock ? new Date().toISOString() : null,
      }, { onConflict: "user_id,achievement_id" });

    if (!error) {
      setUserAchievements((prev) => {
        const existing = prev.find((a) => a.achievement_id === achievementId);
        if (existing) {
          return prev.map((a) =>
            a.achievement_id === achievementId
              ? { ...a, progress: newProgress, unlocked: shouldUnlock, unlocked_at: shouldUnlock ? new Date().toISOString() : null }
              : a
          );
        }
        return [...prev, { achievement_id: achievementId, progress: newProgress, unlocked: shouldUnlock, unlocked_at: shouldUnlock ? new Date().toISOString() : null }];
      });

      // Update profile achievements count if unlocked
      if (shouldUnlock) {
        await supabase.rpc("increment_achievements_count", { user_id_param: userId });
      }
    }
    return !error;
  }, [userId]);

  // Unlock achievement immediately
  const unlockAchievement = useCallback(async (achievementId: string) => {
    if (!userId) return false;

    const supabase = createClient();
    const achievement = achievements.find((a) => a.id === achievementId);
    if (!achievement) return false;

    const { error } = await supabase
      .from("user_achievements")
      .upsert({
        user_id: userId,
        achievement_id: achievementId,
        progress: achievement.maxProgress || 1,
        unlocked: true,
        unlocked_at: new Date().toISOString(),
      }, { onConflict: "user_id,achievement_id" });

    if (!error) {
      setUserAchievements((prev) => {
        const existing = prev.find((a) => a.achievement_id === achievementId);
        if (existing) {
          return prev.map((a) =>
            a.achievement_id === achievementId
              ? { ...a, progress: achievement.maxProgress || 1, unlocked: true, unlocked_at: new Date().toISOString() }
              : a
          );
        }
        return [...prev, { achievement_id: achievementId, progress: achievement.maxProgress || 1, unlocked: true, unlocked_at: new Date().toISOString() }];
      });

      // Add XP to profile
      await supabase.rpc("add_xp", { user_id_param: userId, xp_amount: achievement.xp });
    }
    return !error;
  }, [userId]);

  // Check if achievement is unlocked
  const isUnlocked = useCallback((achievementId: string): boolean => {
    const userAchievement = userAchievements.find((a) => a.achievement_id === achievementId);
    return userAchievement?.unlocked || false;
  }, [userAchievements]);

  // Get all achievements with user progress
  const getAchievementsWithProgress = useCallback(() => {
    return achievements.map((achievement) => {
      const userProgress = userAchievements.find((a) => a.achievement_id === achievement.id);
      return {
        ...achievement,
        progress: userProgress?.progress || 0,
        unlocked: userProgress?.unlocked || false,
        unlocked_at: userProgress?.unlocked_at || null,
      };
    });
  }, [userAchievements]);

  // Get stats
  const getStats = useCallback(() => {
    const total = achievements.length;
    const unlocked = userAchievements.filter((a) => a.unlocked).length;
    const totalXp = userAchievements
      .filter((a) => a.unlocked)
      .reduce((sum, ua) => {
        const achievement = achievements.find((a) => a.id === ua.achievement_id);
        return sum + (achievement?.xp || 0);
      }, 0);

    return { total, unlocked, totalXp };
  }, [userAchievements]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  return {
    achievements: getAchievementsWithProgress(),
    loading,
    getAchievementProgress,
    updateProgress,
    unlockAchievement,
    isUnlocked,
    getStats,
    refetch: fetchAchievements,
  };
}
