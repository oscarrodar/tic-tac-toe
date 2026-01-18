# Tic Tac Toe - React Native Mobile Game

A complete Tic Tac Toe game built with Expo and React Native, featuring smooth animations, an unbeatable AI opponent using the minimax algorithm, and both single-player and two-player modes.

## Features

- **3x3 Grid Game Board** - Classic Tic Tac Toe gameplay
- **Two Game Modes**:
  - Player vs Player (local multiplayer)
  - Player vs AI (with optimal minimax algorithm)
- **Smooth Animations**:
  - Animated X and O appearances using React Native Reanimated
  - Winning squares highlight with pulse animation
  - Smooth board reset transitions
- **Win/Draw Detection** - Automatic detection of all winning combinations and draw conditions
- **Clean UI** - Modern design with intuitive controls
- **TypeScript** - Fully typed for better development experience
- **Unbeatable AI** - The AI uses minimax algorithm for optimal play

## Prerequisites

Before you begin, ensure you have the following installed on your development machine:

### Required Software

1. **Node.js** (v18 or later)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`
   - npm comes bundled with Node.js

2. **Expo CLI** (optional - can use npx instead)
   ```bash
   npm install -g expo-cli
   ```

3. **Mobile Testing Environment** (choose one or more):

   **Option A: Expo Go App (Easiest & Recommended)**
   - Install "Expo Go" on your smartphone:
     - iOS: Download from App Store
     - Android: Download from Google Play Store
   - No simulator/emulator needed
   - Scan QR code to run the app instantly

   **Option B: iOS Simulator (macOS only)**
   - Install Xcode from the Mac App Store
   - Open Xcode, go to Preferences > Locations
   - Select Command Line Tools
   - Or run: `xcode-select --install`

   **Option C: Android Emulator**
   - Install Android Studio
   - Open Android Studio > Tools > AVD Manager
   - Create a new Android Virtual Device (AVD)
   - Start the emulator before running `npm run android`

## Installation

1. **Clone the repository** (or download the project):
   ```bash
   git clone <repository-url>
   cd tic-tac-toe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install:
   - Expo (~52.0.0)
   - React (18.3.1)
   - React Native (0.76.5)
   - React Native Reanimated (~3.16.1)
   - TypeScript (^5.3.3)
   - Type definitions for React

## Running the App

### Start the Development Server

```bash
npm start
```

Or use Expo CLI directly:
```bash
npx expo start
```

This will start the Metro bundler and display a QR code in your terminal.

### Run on Different Platforms

**On iOS Simulator (macOS only):**
```bash
npm run ios
```

**On Android Emulator:**
```bash
npm run android
```

**On Your Phone (Recommended for beginners):**
1. Open the Expo Go app on your phone
2. Scan the QR code shown in the terminal
3. The app will load on your device

**On Web Browser:**
```bash
npm run web
```

## How to Play

1. **Select Game Mode**:
   - Tap "Player vs Player" for local two-player mode
   - Tap "Player vs AI" to challenge the computer

2. **Make Your Move**:
   - In PvP mode: Players alternate tapping squares (X goes first)
   - In AI mode: You play as X, the AI plays as O

3. **Win the Game**:
   - Get three of your marks (X or O) in a row horizontally, vertically, or diagonally
   - The winning squares will highlight with a green pulsing animation
   - The game announces the winner

4. **Reset**:
   - Tap the "Reset Game" button to start a new game
   - Changing game modes automatically resets the board

## Technology Stack

- **Expo** - React Native framework for easy development and deployment
- **React Native** - Mobile app framework
- **TypeScript** - Static type checking
- **React Native Reanimated** - High-performance animations
- **React Hooks** - useState, useEffect for state management

## Project Structure

```
tic-tac-toe/
├── App.tsx                    # Main app component with game logic
├── components/
│   ├── Board.tsx             # 3x3 grid container component
│   └── Square.tsx            # Individual square with animations
├── utils/
│   ├── checkWinner.ts        # Win/draw detection logic
│   ├── minimax.ts            # Minimax algorithm implementation
│   └── getBestMove.ts        # AI move selection
├── types.ts                   # TypeScript type definitions
├── package.json              # Dependencies and scripts
├── app.json                  # Expo configuration
├── tsconfig.json             # TypeScript configuration
├── babel.config.js           # Babel config with Reanimated plugin
└── README.md                 # This file
```

## Key Files

- **[App.tsx](App.tsx)** - Main application logic, game state management, and UI layout
- **[components/Square.tsx](components/Square.tsx)** - Individual square component with entry and winning animations
- **[components/Board.tsx](components/Board.tsx)** - 3x3 grid layout managing all squares
- **[utils/checkWinner.ts](utils/checkWinner.ts)** - Checks all 8 winning combinations and draw conditions
- **[utils/minimax.ts](utils/minimax.ts)** - Recursive minimax algorithm for optimal AI moves
- **[utils/getBestMove.ts](utils/getBestMove.ts)** - Finds the best move for AI using minimax
- **[types.ts](types.ts)** - TypeScript interfaces and types

## AI Algorithm

The AI uses the **minimax algorithm**, a recursive decision-making algorithm that:
- Evaluates all possible game states
- Assumes both players play optimally
- Maximizes the AI's score while minimizing the opponent's score
- Prefers faster wins and slower losses using depth penalties

**Result**: The AI is unbeatable. The best you can achieve is a draw!

## Building an APK (Android)

To build an APK for Android distribution:

1. **Install EAS CLI globally:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to your Expo account:**
   ```bash
   eas login
   ```

3. **Configure EAS for your project:**
   ```bash
   eas build:configure
   ```

4. **Build the APK:**
   ```bash
   eas build -p android --profile preview
   ```

Or use the npm scripts:
```bash
npm run build:configure    # Configure EAS
npm run build:android      # Build Android APK
```

## Development Tips

- **Hot Reload**: Changes to the code automatically reload in the Expo Go app
- **Debug Menu**: Shake your device or press Ctrl+M (Android) / Cmd+D (iOS) to open the debug menu
- **TypeScript Errors**: Run `npx tsc --noEmit` to check for TypeScript errors
- **Clear Cache**: If you encounter issues, try `npx expo start --clear`

## Troubleshooting

**App won't load on phone:**
- Ensure your phone and computer are on the same Wi-Fi network
- Check that your firewall isn't blocking connections
- Try restarting the development server

**TypeScript errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that tsconfig.json exists

**Animation not working:**
- Ensure react-native-reanimated is properly installed
- Check that babel.config.js includes the reanimated plugin
- Try clearing cache: `npx expo start --clear`

**Build errors:**
- Delete node_modules and package-lock.json
- Run `npm install` again
- Restart the development server

## Terminal Setup (macOS)

For an improved development experience with autosuggestions, syntax highlighting, and git user display:

```bash
chmod +x setup-terminal.sh
./setup-terminal.sh
```

This will install and configure:
- **Starship** - Beautiful prompt with git branch and user display
- **fzf** - Fuzzy finder for command history (Ctrl+R)
- **bat** - Syntax-highlighted file viewer
- **eza** - Modern ls replacement with icons
- **zsh-autosuggestions** - Command suggestions as you type

After running, restart your terminal or run:
```bash
source ~/.zshrc
```

### Fix Terminal Icons (Nerd Font Installation)

If you see `` placeholder symbols instead of icons in your terminal prompt, you need to install and configure a Nerd Font:

**1. Install a Nerd Font:**

```bash
brew tap homebrew/cask-fonts
brew install font-fira-code-nerd-font
```

Other popular options:
- `brew install font-meslo-lg-nerd-font` (Meslo - widely recommended)
- `brew install font-hack-nerd-font` (Hack)
- `brew install font-jetbrains-mono-nerd-font` (JetBrains Mono)

**2. Configure Your Terminal Application:**

**macOS Terminal:**
1. Open Terminal → Settings (Cmd+,)
2. Go to Profiles → Text
3. Click "Change" under Font
4. Select the Nerd Font you installed (e.g., "FiraCode Nerd Font")
5. Set size to 12-14pt

**iTerm2:**
1. Open Preferences (Cmd+,)
2. Go to Profiles → Text
3. Change both Regular and Non-ASCII fonts to your Nerd Font

**VSCode Integrated Terminal:**
1. Open Settings (Cmd+,)
2. Search for "terminal font"
3. Set `Terminal > Integrated: Font Family` to `"FiraCode Nerd Font"` (or your chosen font)

After changing the font, restart your terminal. You should now see proper icons for:
- `` Git branch indicator
- `` Node.js version indicator
- Other language and status icons
