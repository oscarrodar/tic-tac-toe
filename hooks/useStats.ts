import { useState, useEffect, useCallback } from 'react';
import {
  GameStats,
  GameRecord,
  GameMode,
  AIDifficulty,
  Player,
} from '../types';
import {
  loadStats,
  saveStats,
  loadGameHistory,
  saveGameRecord,
  defaultStats,
} from '../utils/storage';

interface UseStatsReturn {
  stats: GameStats;
  history: GameRecord[];
  isLoading: boolean;
  recordGame: (
    mode: GameMode,
    winner: Player | 'draw',
    playerXName: string,
    playerOName: string,
    difficulty?: AIDifficulty
  ) => Promise<void>;
  getWinRate: (mode: 'ai' | 'pvp', difficulty?: AIDifficulty) => number;
  resetStats: () => Promise<void>;
}

export function useStats(): UseStatsReturn {
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [history, setHistory] = useState<GameRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [loadedStats, loadedHistory] = await Promise.all([
        loadStats(),
        loadGameHistory(),
      ]);
      setStats(loadedStats);
      setHistory(loadedHistory);
      setIsLoading(false);
    }
    load();
  }, []);

  const recordGame = useCallback(
    async (
      mode: GameMode,
      winner: Player | 'draw',
      playerXName: string,
      playerOName: string,
      difficulty?: AIDifficulty
    ) => {
      const record: GameRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        timestamp: Date.now(),
        mode,
        difficulty,
        winner,
        playerXName,
        playerOName,
      };

      const newStats = { ...stats };
      newStats.totalGames += 1;

      // Update streak (player X wins count as streak wins)
      const playerWon = winner === 'X';
      if (playerWon) {
        newStats.streaks.current += 1;
        if (newStats.streaks.current > newStats.streaks.best) {
          newStats.streaks.best = newStats.streaks.current;
        }
      } else if (winner !== 'draw') {
        newStats.streaks.current = 0;
      }

      if (mode === 'pvp') {
        if (winner === 'X') {
          newStats.pvp.playerX.wins += 1;
          newStats.pvp.playerO.losses += 1;
        } else if (winner === 'O') {
          newStats.pvp.playerO.wins += 1;
          newStats.pvp.playerX.losses += 1;
        } else {
          newStats.pvp.playerX.draws += 1;
          newStats.pvp.playerO.draws += 1;
        }
      } else if (mode === 'ai' && difficulty) {
        const aiStats = newStats.ai[difficulty];
        if (winner === 'X') {
          aiStats.wins += 1;
        } else if (winner === 'O') {
          aiStats.losses += 1;
        } else {
          aiStats.draws += 1;
        }
      }

      setStats(newStats);
      setHistory((prev) => [record, ...prev].slice(0, 50));

      await Promise.all([saveStats(newStats), saveGameRecord(record)]);
    },
    [stats]
  );

  const getWinRate = useCallback(
    (mode: 'ai' | 'pvp', difficulty?: AIDifficulty): number => {
      if (mode === 'pvp') {
        const total =
          stats.pvp.playerX.wins +
          stats.pvp.playerX.losses +
          stats.pvp.playerX.draws;
        if (total === 0) return 0;
        return Math.round((stats.pvp.playerX.wins / total) * 100);
      }

      if (difficulty) {
        const aiStats = stats.ai[difficulty];
        const total = aiStats.wins + aiStats.losses + aiStats.draws;
        if (total === 0) return 0;
        return Math.round((aiStats.wins / total) * 100);
      }

      // Overall AI win rate
      const totalWins =
        stats.ai.easy.wins + stats.ai.medium.wins + stats.ai.hard.wins;
      const totalGames =
        stats.ai.easy.wins +
        stats.ai.easy.losses +
        stats.ai.easy.draws +
        stats.ai.medium.wins +
        stats.ai.medium.losses +
        stats.ai.medium.draws +
        stats.ai.hard.wins +
        stats.ai.hard.losses +
        stats.ai.hard.draws;

      if (totalGames === 0) return 0;
      return Math.round((totalWins / totalGames) * 100);
    },
    [stats]
  );

  const resetStats = useCallback(async () => {
    setStats(defaultStats);
    setHistory([]);
    await saveStats(defaultStats);
  }, []);

  return {
    stats,
    history,
    isLoading,
    recordGame,
    getWinRate,
    resetStats,
  };
}
