        document.addEventListener('DOMContentLoaded', () => {
            // Game elements
            const choiceButtons = document.querySelectorAll('.choice-btn');
            const computerChoiceDisplay = document.getElementById('computer-choice');
            const resultText = document.getElementById('result-text');
            const playerScoreDisplay = document.getElementById('player-score');
            const computerScoreDisplay = document.getElementById('computer-score');
            // Game state
            let playerScore = 0;
            let computerScore = 0;
            let gameOver = false;
            
            // Emoji mappings
            const emojiMap = {
                stone: '✊',
                paper: '✋',
                scissors: '✌️'
            };
            
            // Color mappings
            const colorMap = {
                stone: 'from-blue-500 to-blue-700',
                paper: 'from-green-500 to-green-700',
                scissors: 'from-red-500 to-red-700'
            };
            
            // Computer makes a random choice
            function computerPlay() {
                const choices = ['stone', 'paper', 'scissors'];
                const randomIndex = Math.floor(Math.random() * choices.length);
                return choices[randomIndex];
            }
            
            // Determine the winner of a round
            function playRound(playerSelection, computerSelection) {
                if (playerSelection === computerSelection) {
                    return 'draw';
                }
                
                if (
                    (playerSelection === 'stone' && computerSelection === 'scissors') ||
                    (playerSelection === 'paper' && computerSelection === 'stone') ||
                    (playerSelection === 'scissors' && computerSelection === 'paper')
                ) {
                    return 'player';
                } else {
                    return 'computer';
                }
            }
            
            // Update the UI with the computer's choice
            function showComputerChoice(choice) {
                computerChoiceDisplay.innerHTML = `<span class="text-4xl">${emojiMap[choice]}</span>`;
                computerChoiceDisplay.className = `w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-xl bg-gradient-to-br ${colorMap[choice]} border-4 border-white`;
            }
            
            // Update scores and check for game over
            function updateScores(winner) {
                if (winner === 'player') {
                    playerScore++;
                    playerScoreDisplay.textContent = playerScore;
                    resultText.textContent = 'You win this round!';
                    resultText.className = 'text-2xl font-bold text-green-400';
                } else if (winner === 'computer') {
                    computerScore++;
                    computerScoreDisplay.textContent = computerScore;
                    resultText.textContent = 'Computer wins this round!';
                    resultText.className = 'text-2xl font-bold text-red-400';
                } else {
                    resultText.textContent = "It's a draw!";
                    resultText.className = 'text-2xl font-bold text-yellow-400';
                }
                
                // Check for game over
                if (playerScore >= 3 || computerScore >= 3) {
                    gameOver = true;
                    if (playerScore > computerScore) {
                        resultText.textContent = '🎉 You win the game!  🎉';
                        resultText.className = 'text-3xl font-bold text-green-400 animate-pulse';
                    } else {
                        resultText.textContent = '😢 Computer wins the game! 😢';
                        resultText.className = 'text-3xl font-bold text-red-400 animate-pulse';
                    }
                    
                    // Disable choice buttons
                    choiceButtons.forEach(button => {
                        button.disabled = true;
                        button.classList.remove('hover:scale-110');
                        button.classList.add('opacity-50');
                    });
                }
            }
            
            // Reset the game state
            function resetGame() {
                playerScore = 0;
                computerScore = 0;
                gameOver = false;
                
                playerScoreDisplay.textContent = '0';
                computerScoreDisplay.textContent = '0';
                
                computerChoiceDisplay.innerHTML = '<span class="text-4xl">?</span>';
                computerChoiceDisplay.className = 'w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-700';
                
                resultText.textContent = '';
                resultText.className = 'text-2xl font-bold';
                
                // Enable choice buttons
                choiceButtons.forEach(button => {
                    button.disabled = false;
                    button.classList.add('hover:scale-110');
                    button.classList.remove('opacity-50');
                });
            }
            
            // Handle player choice
            choiceButtons.forEach(button => {
                button.addEventListener('click', () => {
                    if (gameOver) return;
                    
                    const playerChoice = button.dataset.choice;
                    
                    // Highlight selected choice
                    choiceButtons.forEach(btn => btn.classList.remove('choice-selected', 'pulse'));
                    button.classList.add('choice-selected', 'pulse');
                    
                    // Computer makes choice after a slight delay
                    setTimeout(() => {
                        const computerChoice = computerPlay();
                        showComputerChoice(computerChoice);
                        
                        const winner = playRound(playerChoice, computerChoice);
                        updateScores(winner);
                        
                        // Remove highlight after round is complete
                        setTimeout(() => {
                            button.classList.remove('choice-selected', 'pulse');
                        }, 1000);
                    }, 500);
                });
            });
            
            // Game control buttons
            const playAgainButton = document.getElementById('play-again-btn');
            const newGameButton = document.getElementById('new-game-btn');
            
            // Play again - just reset the choices and continue with current scores
            playAgainButton.addEventListener('click', () => {
                computerChoiceDisplay.innerHTML = '<span class="text-4xl">?</span>';
                computerChoiceDisplay.className = 'w-32 h-32 md:w-40 md:h-40 bg-gray-800 rounded-full flex items-center justify-center shadow-xl border-4 border-gray-700';
                resultText.textContent = '';
                resultText.className = 'text-2xl font-bold';
                
                // Enable choice buttons if game was over
                if (gameOver) {
                    gameOver = false;
                    choiceButtons.forEach(button => {
                        button.disabled = false;
                        button.classList.add('hover:scale-110');
                        button.classList.remove('opacity-50');
                    });
                }
            });
            
            // New game - reset everything including scores
            newGameButton.addEventListener('click', resetGame);
            
        });
