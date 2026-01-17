#!/bin/bash

# Terminal Setup Script for macOS
# This script installs and configures a modern terminal experience

set -e  # Exit on error

echo "🚀 Starting terminal setup..."

# Check if Homebrew is installed
if ! command -v brew &> /dev/null; then
    echo "📦 Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
    echo "✅ Homebrew already installed"
fi

# Install terminal tools
echo "📦 Installing terminal tools..."
brew install starship fzf bat eza zsh-autosuggestions

# Configure Git
echo "🔧 Configuring Git..."
git config --global user.name "oscarrodar"
git config --global user.email "oscar.rodar@gmail.com"

# Setup fzf
echo "🔧 Setting up fzf..."
$(brew --prefix)/opt/fzf/install --all --no-bash --no-fish

# Configure Zsh
echo "🔧 Configuring Zsh..."

# Backup existing .zshrc if it exists
if [ -f ~/.zshrc ]; then
    cp ~/.zshrc ~/.zshrc.backup.$(date +%Y%m%d%H%M%S)
    echo "📋 Backed up existing .zshrc"
fi

# Add Starship initialization
if ! grep -q "starship init zsh" ~/.zshrc 2>/dev/null; then
    echo 'eval "$(starship init zsh)"' >> ~/.zshrc
    echo "✅ Added Starship to .zshrc"
fi

# Add zsh-autosuggestions
if ! grep -q "zsh-autosuggestions" ~/.zshrc 2>/dev/null; then
    echo 'source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh' >> ~/.zshrc
    echo "✅ Added zsh-autosuggestions to .zshrc"
fi

# Add useful aliases
cat >> ~/.zshrc << 'EOF'

# Useful aliases
alias ls='eza --icons'
alias ll='eza -l --icons'
alias la='eza -la --icons'
alias cat='bat'

EOF

echo "✅ Added useful aliases to .zshrc"

# Configure Starship
echo "🔧 Configuring Starship..."
mkdir -p ~/.config

cat > ~/.config/starship.toml << 'EOF'
# Starship Configuration

[custom.git_user]
command = "git config user.name"
when = "git rev-parse --git-dir 2> /dev/null"
format = "as [$output]($style) "
style = "bright-yellow bold"

[git_branch]
format = "on [$symbol$branch]($style) "
symbol = " "

[git_status]
disabled = false

[directory]
truncation_length = 3
truncate_to_repo = true

[character]
success_symbol = "[➜](bold green)"
error_symbol = "[➜](bold red)"

[nodejs]
format = "via [$symbol($version )]($style)"

[python]
format = "via [$symbol$pyenv_prefix($version )]($style)"

EOF

echo "✅ Created Starship configuration"

echo ""
echo "🎉 Terminal setup complete!"
echo ""
echo "Next steps:"
echo "1. Close this terminal and open a new one, OR"
echo "2. Run: source ~/.zshrc"
echo ""
echo "Installed tools:"
echo "  • Starship - Beautiful prompt"
echo "  • fzf - Fuzzy finder (Ctrl+R for command history)"
echo "  • bat - Better cat with syntax highlighting"
echo "  • eza - Better ls with icons"
echo "  • zsh-autosuggestions - Command suggestions as you type"
echo ""
echo "Git configured as:"
echo "  Name: oscarrodar"
echo "  Email: oscar.rodar@gmail.com"
echo ""
echo "Your old .zshrc was backed up to ~/.zshrc.backup.*"
