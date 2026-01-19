import React, { useState, useCallback } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { SettingsProvider, useSettingsContext } from './contexts/SettingsContext';
import { useStats } from './hooks/useStats';
import { Screen, GameModeOption, GameMode, Player, AIDifficulty } from './types';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<GameModeOption>('ai');
  const { stats, history, recordGame, getWinRate, resetStats } = useStats();
  const { settings } = useSettingsContext();

  // Convert extended mode to game mode for GameScreen
  const gameMode: GameMode = selectedMode === 'online' ? 'pvp' : selectedMode;

  const handleStartGame = () => {
    if (selectedMode !== 'online') {
      setCurrentScreen('game');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToStats = () => {
    setCurrentScreen('statistics');
  };

  const handleNavigateToSettings = () => {
    setCurrentScreen('settings');
  };

  const handleGameEnd = useCallback(
    (winner: Player | 'draw', difficulty?: AIDifficulty) => {
      recordGame(gameMode, winner, 'Player 1', gameMode === 'ai' ? 'AI' : 'Player 2', difficulty);
    },
    [recordGame, gameMode]
  );

  // Calculate stats for display based on game mode
  const getPlayerStats = () => {
    if (gameMode === 'ai') {
      // For AI mode, get stats based on current difficulty (default to medium for display)
      const aiStats = stats.ai.medium;
      return {
        playerX: { wins: aiStats.wins, losses: aiStats.losses, draws: aiStats.draws },
        playerO: { wins: aiStats.losses, losses: aiStats.wins, draws: aiStats.draws },
      };
    }
    return {
      playerX: stats.pvp.playerX,
      playerO: stats.pvp.playerO,
    };
  };

  const playerStats = getPlayerStats();

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        selectedMode={selectedMode}
        onModeSelect={setSelectedMode}
        onStartGame={handleStartGame}
        onNavigateToStats={handleNavigateToStats}
        onNavigateToSettings={handleNavigateToSettings}
      />
    );
  }

  if (currentScreen === 'statistics') {
    return (
      <StatisticsScreen
        stats={stats}
        history={history}
        getWinRate={getWinRate}
        onBack={handleBackToHome}
        onResetStats={resetStats}
      />
    );
  }

  if (currentScreen === 'settings') {
    return <SettingsScreen onBack={handleBackToHome} />;
  }

  return (
    <GameScreen
      initialGameMode={gameMode}
      onBackToHome={handleBackToHome}
      playerXStats={playerStats.playerX}
      playerOStats={playerStats.playerO}
      onGameEnd={handleGameEnd}
      settings={settings}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
