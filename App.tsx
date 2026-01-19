import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { Screen, GameModeOption, GameMode } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedMode, setSelectedMode] = useState<GameModeOption>('ai');

  const handleStartGame = () => {
    if (selectedMode !== 'online') {
      setCurrentScreen('game');
    }
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Convert extended mode to game mode for GameScreen
  const gameMode: GameMode = selectedMode === 'online' ? 'pvp' : selectedMode;

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        selectedMode={selectedMode}
        onModeSelect={setSelectedMode}
        onStartGame={handleStartGame}
      />
    );
  }

  return (
    <GameScreen initialGameMode={gameMode} onBackToHome={handleBackToHome} />
  );
}
