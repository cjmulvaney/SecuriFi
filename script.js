tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#5D5CDE',
                secondary: '#3A3A8C',
                accent: '#FF6B6B',
                success: '#4CAF50',
                warning: '#FFC107',
                danger: '#FF5252',
                gold: '#FFD700',
                light: {
                    bg: '#FFFFFF',
                    text: '#333333',
                    card: '#F8F9FA'
                },
                dark: {
                    bg: '#181818',
                    text: '#E0E0E0',
                    card: '#2A2A2A'
                }
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'bounce-slow': 'bounce 2s infinite',
                'coin-bounce': 'coinBounce 0.5s ease-out',
            },
            keyframes: {
                coinBounce: {
                  '0%': { transform: 'translateY(0) rotate(0deg)' },
                  '50%': { transform: 'translateY(-20px) rotate(180deg)' },
                  '100%': { transform: 'translateY(0) rotate(360deg)' }
                }
            }
        }
    },
}

// Start in light mode by default - dark mode becomes a purchasable upgrade
document.documentElement.classList.remove('dark');

// Theme mode variables
let hasDarkMode = false;
let hasSomewhatDarkMode = false;

// We'll keep the media query listener to restore preferred mode if dark mode was purchased
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches && hasDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('somewhat-dark');
    } else if (!event.matches && hasDarkMode) {
        document.documentElement.classList.remove('dark');
    }
});

// Handle dark mode purchases in shop
document.addEventListener('click', function(e) {
    if (e.target.dataset.upgrade === 'dark-mode') {
        if (canAffordUpgrade(200)) {
            purchaseUpgrade('dark-mode', 200);
            hasDarkMode = true;
            setThemeMode('dark');
            alert("Dark mode activated! Your eyes thank you.");
        }
    } else if (e.target.dataset.upgrade === 'somewhat-dark') {
        if (canAffordUpgrade(50)) {
            purchaseUpgrade('somewhat-dark', 50);
            hasSomewhatDarkMode = true;
            setThemeMode('somewhat-dark');
            alert("Somewhat Dark Mode activated. It's... something.");
        }
    }
});

// Function to set theme mode
function setThemeMode(mode) {
    // Reset all modes first
    document.documentElement.classList.remove('dark', 'somewhat-dark');

    if (mode === 'dark') {
        document.documentElement.classList.add('dark');
    } else if (mode === 'somewhat-dark') {
        document.documentElement.classList.add('somewhat-dark');
    }
}

// Game variables
let startTime;
let timerInterval;
let coins = 0;
let hasBetterPen = false;
let hasSkipStep = false;
let usedSkipStep = false;
let currentThemeColor = '#5D5CDE';
let currentStep = 1;

// Color sequence game variables
let colorSequence = [];
let userSequence = [];
let colorAttempts = 0;
const maxColorAttempts = 4;
let isEasyMode = false;

// Dance verification variables
let danceSuccess = 0.25; // 25% success rate

// Rhythm game variables
let rhythmAttempts = 0;
const maxRhythmAttempts = 5;
let rhythmBeats = [];
let userBeats = [];
let beatStartTime = 0;

// Connect dots variables
let dotsState = [];
let dotsConnected = [];

// Refrigerator contents variables
let fridgeAttempts = 0;
const maxFridgeAttempts = 3;

// Quantum entanglement variables
let quantumAttempts = 0;
const maxQuantumAttempts = 4;
let quantumSuccess = 0.15; // 15% success rate

// Loan application variables
let inLoanApplication = false;
let currentLoanStep = 1;
let mainStepBeforeLoan = 1;
let mathProblemTimer;
let mathProblemTimeLeft = 60;

// Drawing variables
let isDrawing = false;
let circleAttempt = 1;
const maxCircleAttempts = 9;

// Signature variables
let signatureAttempt = 1;

// Pet name attempt counter
let petAttempt = 0;

// Show a specific step
function showStep(step) {
    document.querySelectorAll('.step-screen').forEach(screen => screen.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
    currentStep = step;
    updateProgress(step);
}

// Update progress bar
function updateProgress(step) {
    const progressPercent = (step / 20) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    document.getElementById('step-counter').textContent = `Step ${step} of 20`;

    // Update step indicators
    document.querySelectorAll('.progress-step').forEach((el, index) => {
        if (index + 1 <= step) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
}

// Start timer
function startTimer() {
    startTime = new Date();
    updateTimer();

    timerInterval = setInterval(updateTimer, 10);
}

// Update timer display
function updateTimer() {
    const now = new Date();
    const elapsed = now - startTime;

    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = Math.floor((elapsed % 1000) / 10);

    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    document.getElementById('timer').textContent = display;
}

// Stop timer
function stopTimer() {
    clearInterval(timerInterval);

    // Save final time
    const finalTime = document.getElementById('timer').textContent;
    document.getElementById('final-time').textContent = finalTime;
}

// Award coins
function awardCoins(amount) {
    coins += amount;
    document.getElementById('coins-count').textContent = coins;
    document.getElementById('final-coins').textContent = coins;

    // Animate coin adding
    showCoinAnimation(amount);
}

// Show coin animation
function showCoinAnimation(amount) {
    const coinContainer = document.getElementById('coin-container');

    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            const coin = document.createElement('div');
            coin.className = 'absolute text-gold animate-coin-bounce';
            coin.style.left = `${20 + Math.random() * 40}px`;
            coin.style.top = '60px';
            coin.innerHTML = `
                <svg class="w-6 h-6 coin" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <circle cx="12" cy="12" r="5"/>
                </svg>
                <span class="text-xs font-bold">+1</span>
            `;

            coinContainer.appendChild(coin);

            // Play coin sound
            sounds.coin.play();

            // Remove coin after animation
            setTimeout(() => {
                coin.remove();
            }, 1000);
        }, i * 100);
    }
}

// Sound effects
const sounds = {
    success: new Howl({
        src: ['https://cdn.jsdelivr.net/gh/mariusbanea/web-app-samples/success.mp3'],
        volume: 0.6
    }),
    error: new Howl({
        src: ['https://cdn.jsdelivr.net/gh/mariusbanea/web-app-samples/error.mp3'],
        volume: 0.6
    }),
    click: new Howl({
        src: ['https://cdn.jsdelivr.net/gh/mariusbanea/web-app-samples/click.mp3'],
        volume: 0.3
    }),
    complete: new Howl({
        src: ['https://cdn.jsdelivr.net/gh/mariusbanea/web-app-samples/complete.mp3'],
        volume: 0.6
    }),
    coin: new Howl({
        src: ['data:audio/wav;base64,UklGRigBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQBAABVVVVVVVVVVVVVVVVbXF1cXFtaWlpaWVhYV1dXV1dXWFhYWVlZWVlZWVlZWVlYWFdXV1ZWVlZWVlZWVlZWVVVUVFRTU1NTVFRVVVVVVFNSU1NTU1NTU1RUVVVVVVRUVFNTU1JSUlJSU1RUVVVVVVVUVFRTUlJSUlJTVFRUVVVWV1hZWVpaWltbW1tbWlpZWVhXV1ZWVVVUVFNTUlJRUVFRUVFRUlJTU1RUVVVWV1dYWFhYWFhYWFdXVlZVVVRUU1NSUlFRUFBQUFBRUVFSUlNTVFVVVlZXV1hYWFhYWFhYV1dWVlVVVFRTU1JSAAAAAAEBAQICAgMDBAQFBQYGBwcICAgJCAgICAcHBgYFBQQEAwMCAQEBAAAAAAECAgMEBAUGBggICQoLCwwMDQ0ODg0NDAsMCgkIBwYFAwEA'],
        volume: 0.5
    }),
    tap: new Howl({
        src: ['data:audio/wav;base64,UklGRpYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIBAACA/4D/gP+A/4z/lf+h/67/vf/J/9v/3v/n/+f/6//l/+r/4//n/93/4f/Y/9f/0f/J/8v/v/+//7n/uf+v/7H/ov+l/5v/mP+Y/4v/lP+F/4//fP+E/3n/ev93/3X/eP9z/3z/c/96/3X/eP92/3v/eP9//3z/f/+D/4X/i/+G/5D/iv+U/5T/lv+e/5j/n/+f/6H/pP+n/6n/q/+s/7H/r/+1/7L/t/+4/7b/vP+8/7//wf/E/8b/y//K/9D/0f/T/9v/1//h/+D/5//n/+z/7//w//X/9v/7//z/AAADAAcACgANAA8AEwAVABkAGQAZAB0AGQAeAB4AGQAaABkAFQATABEADwALAAcAAAAA//z/9f/v/+f/5f/b/9b/zP/G/8D/uf+v/6r/ov+c/5X/jv+I/4H/e/90/3D/av9k/17/WP9T/0//Sv9E/0H/O/89/zf/OP82/zb/Nv82/zf/OP86/zr/P/9A/0T/R/9L/1D/Vf9Y/17/Y/9q/23/c/95/4D/hv+M/5H/mP+e/6b/q/+y/7j/vv/E/8v/0f/X/+D/5P/s//L/+P8AAAYADQAUABoAIAAnAC0ANAA6AEAARgBMAFEAVgBcAGEAZgBrAHEAdgB7AH8AhACIAI0AkQCVAJoAngCgAKQAqACqAK0AAAAALQEgAA=='],
        volume: 0.5
    }),
    beat: new Howl({
        src: ['data:audio/wav;base64,UklGRpYBAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXIBAAB+f3x+gnh6gH57fnR5gX1+eHx8d4B6g31zgYJ6eX+AfXyAfoF+foKDgH2CgIB+gIGAfH+AgHp/gHx5foB+eX6CgH6Bg4CAfICAgXx7gYN5fYCDfX9/hH99gICAfXp/gHx3fYF+eX+EgIB+g4CAe4CCfHmAf318fH+AfHyAgn99g4B/fX2AgHt6f4F+d4ODfoCGg4F/gH+BeXiAf31+goB/foB+gHR3gIJ6goeKjImNioyGhYOEfXp8gHx9hISJho6KjYaFgIF5eXh7gYSGjZKRkY2JhYF8dnl5foSLkJORkIuEgXl0cXR1eIGHj5aYmZWQioJ7dG9tb3F4gYuVm6Ccl5CLgXhxaWZpanR+iZOdpaSdl46EeW9mYF9iZ3B7iJKcpqijm5CGeG5kW1ldX2lycn6Jk52ip6Obl4+FeHFqZGNlZm1yeHyDiI2QkZCNiYWBfXl2dHNydHZ4e36BhIaIiIiHhYOBf316eXh3d3h5e3x9f4CAgYGBgH9/fn18e3p6eXl5eXp6e3x9fX5+f39+fn19fHx7e3p6enp6e3t7fHx9fX5+fn5+fn19fHx8e3t7e3t7e3t8fHx9fX19fn5+fn5+fX19fHx8e3t7e3t7e3x8fH19fX1+fn5+fn59fX18fHx7e3t7e3t7fHx8fX19fX5+fn5+fn19fX18fAAAADUBKgA='],
        volume: 0.5
    })
};

// Generate random static/beeping noise
function generateRandomNoise(duration = 3) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    gainNode.connect(audioContext.destination);

    const oscillator1 = audioContext.createOscillator();
    oscillator1.type = 'sawtooth';
    oscillator1.frequency.setValueAtTime(Math.random() * 400 + 200, audioContext.currentTime);

    const oscillator2 = audioContext.createOscillator();
    oscillator2.type = 'square';
    oscillator2.frequency.setValueAtTime(Math.random() * 100 + 100, audioContext.currentTime);

    // Create modulation
    setInterval(() => {
        if (Math.random() > 0.5) {
            oscillator1.frequency.setValueAtTime(Math.random() * 400 + 200, audioContext.currentTime);
        }
        if (Math.random() > 0.7) {
            oscillator2.frequency.setValueAtTime(Math.random() * 100 + 100, audioContext.currentTime);
        }
    }, 200);

    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);

    oscillator1.start();
    oscillator2.start();

    setTimeout(() => {
        oscillator1.stop();
        oscillator2.stop();
        audioContext.close();
    }, duration * 1000);
}

// Create Binary Beats music
function generateBinaryBeatsMusic(duration = 40) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3;
    gainNode.connect(audioContext.destination);

    // Create a "beat" effect
    const beatOscillator = audioContext.createOscillator();
    beatOscillator.type = 'sine';
    beatOscillator.frequency.value = 2;

    const beatGain = audioContext.createGain();
    beatGain.gain.value = 0.5;
    beatOscillator.connect(beatGain);

    const oscillators = [];

    // Create some synthesizers
    for (let i = 0; i < 3; i++) {
        const osc = audioContext.createOscillator();
        osc.type = ['sine', 'square', 'sawtooth'][i % 3];

        // Different base frequencies for variety
        const baseFreq = [220, 440, 110][i % 3];
        osc.frequency.value = baseFreq;

        // Modulate frequencies with the beat
        beatGain.connect(osc.frequency);

        // Apply some effects
        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 1000;

        // Create random notes over time
        const noteInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const note = Math.floor(Math.random() * 12);
                const freq = baseFreq * Math.pow(2, note / 12);
                osc.frequency.setValueAtTime(freq, audioContext.currentTime);

                // Also randomize the filter
                filter.frequency.setValueAtTime(500 + Math.random() * 2000, audioContext.currentTime);
            }
        }, 200);

        // Connect everything
        osc.connect(filter);
        filter.connect(gainNode);

        // Start oscillator
        osc.start();
        oscillators.push(osc);

        // Store the interval to clear it later
        oscillators.push({ noteInterval });
    }

    // Start the beat
    beatOscillator.start();
    oscillators.push(beatOscillator);

    // Return a function to stop all sounds
    return {
        stop: () => {
            oscillators.forEach(osc => {
                if (osc.noteInterval) {
                    clearInterval(osc.noteInterval);
                } else {
                    try {
                        osc.stop();
                        osc.disconnect();
                    } catch (e) {
                        // Ignore any errors from already stopped oscillators
                    }
                }
            });

            if (audioContext) {
                audioContext.close();
            }
        }
    };
}

// Absurd security tips
const securityTips = [
    "For maximum security, consider changing your password every 7 minutes.",
    "The most secure passwords contain at least one emoji, one prime number, and one food item.",
    "Experts recommend writing your passwords on sticky notes and hiding them under your keyboard.",
    "True security professionals memorize their 64-character passwords by converting them into interpretive dance routines.",
    "To prevent hackers, try speaking your passwords backwards three times before entering them.",
    "For enhanced security, our system automatically logs you out if you blink more than 37 times per minute.",
    "Did you know? The letter 'Q' is statistically the most secure character to use in passwords.",
    "To confuse hackers, try setting your password to 'incorrect' so when you forget it, the system tells you 'Your password is incorrect'.",
    "Security studies show that passwords created while standing on one foot are 27% more secure.",
    "Rotating your device counter-clockwise while entering passwords has been shown to improve encryption by up to 42%.",
    "Biometric security tip: Your elbow print is as unique as your fingerprint, but much harder for criminals to replicate.",
    "Never use the same password twice, even when logging into the same account.",
    "For advanced security, we recommend using a different keyboard for each character in your password.",
    "Our AI analysis shows that passwords containing the names of extinct dinosaurs are 89% more secure.",
    "Top security researchers suggest wearing a tinfoil hat while logging in to prevent mind-reading hackers.",
    "The most secure time to log in is during a full moon, when satellite signals are strongest."
];

// Get random security tip
function getRandomTip() {
    return securityTips[Math.floor(Math.random() * securityTips.length)];
}

// Show error with shake animation
function showError(elementId, message = null) {
    const element = document.getElementById(elementId);
    if (message) element.textContent = message;
    element.classList.remove('hidden');
    element.classList.add('shake');

    sounds.error.play();

    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

// Show loading screen with random tip
function showLoading(message = "Processing your verification data...") {
    document.querySelectorAll('.step-screen').forEach(screen => screen.classList.add('hidden'));
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('hidden');
    document.getElementById('loading-message').textContent = message;
    document.getElementById('security-tip').textContent = getRandomTip();

    return new Promise(resolve => {
        // Random loading time between 2-4 seconds
        const loadingTime = 2000 + Math.random() * 2000;
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            resolve();
        }, loadingTime);
    });
}

// Initialize countdown timer
function startCountdown(seconds, elementId, callback) {
    const element = document.getElementById(elementId);
    let remaining = seconds;

    element.textContent = remaining;

    const countdownInterval = setInterval(() => {
        remaining--;
        element.textContent = remaining;

        if (remaining <= 0) {
            clearInterval(countdownInterval);
            if (callback) callback();
        }
    }, 1000);

    return countdownInterval;
}

// Change theme color
function changeThemeColor(color) {
    currentThemeColor = color;
    document.documentElement.style.setProperty('--tw-color-primary', color);

    // Update active color
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.remove('selected');
        if (swatch.dataset.color === color) {
            swatch.classList.add('selected');
        }
    });

    // Update all primary-colored elements
    document.querySelectorAll('.bg-primary').forEach(el => {
        el.style.backgroundColor = color;
    });

    document.querySelectorAll('.text-primary').forEach(el => {
        el.style.color = color;
    });

    document.querySelectorAll('.border-primary').forEach(el => {
        el.style.borderColor = color;
    });

    // Play sound
    sounds.coin.play();
}

// Add skip button to current step
function addSkipButton() {
    if (!hasSkipStep || usedSkipStep) return;

    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (!currentStepElement) return;

    // Check if skip button already exists
    if (document.getElementById('skip-step-button')) return;

    // Find the submit button for the current step
    const submitButton = currentStepElement.querySelector('button[id*="submit"], button[id*="begin"], button[id*="accept"], button[id*="survey-proceed"], button[id*="start"]');
    if (!submitButton) return;

    // Create skip button
    const skipButton = document.createElement('button');
    skipButton.id = 'skip-step-button';
    skipButton.className = 'w-full mt-3 bg-warning text-white font-bold py-2 px-4 rounded-lg transition-colors';
    skipButton.textContent = 'Skip This Step';

    // Insert skip button after submit button
    submitButton.parentNode.insertBefore(skipButton, submitButton.nextSibling);

    // Add event listener
    skipButton.addEventListener('click', async () => {
        sounds.click.play();

        usedSkipStep = true;
        document.getElementById('skip-step-button').remove();

        // Show loading animation
        await showLoading("Skipping verification step...");

        // Move to next step
        showStep(currentStep + 1);
    });
}

// Check if the user has enough coins for an upgrade
function canAffordUpgrade(cost) {
    return coins >= cost;
}

// Purchase an upgrade
function purchaseUpgrade(type, cost) {
    if (!canAffordUpgrade(cost)) {
        alert("Not enough coins!");
        return false;
    }

    // Deduct coins
    coins -= cost;
    document.getElementById('coins-count').textContent = coins;
    document.getElementById('final-coins').textContent = coins;

    // Apply upgrade effect
    switch (type) {
        case 'skip-step':
            hasSkipStep = true;
            alert("You can now skip one verification step! A 'Skip' button will appear on the next steps.");
            addSkipButton();
            break;
        case 'better-pen':
            hasBetterPen = true;
            alert("Your signature pen has been upgraded! It's still terrible, just 10% less terrible.");
            break;
        case 'verification-hint':
            showVerificationHint();
            break;
        case 'color-change':
            // This is handled elsewhere
            break;
    }

    sounds.coin.play();
    return true;
}

// Show verification hint
function showVerificationHint() {
    let hintMessage = "";

    switch (currentStep) {
        case 1:
            hintMessage = "Enter your phone number in the format: (XXX) - XX-XX-XXX";
            break;
        case 3:
            hintMessage = "It's a hot dog, not a dog.";
            break;
        case 4:
            hintMessage = "The answer is 1010 in binary.";
            break;
        case 6:
            hintMessage = "Type: zyxwvutsrqponmlkjihgfedcba";
            break;
        case 9:
            hintMessage = "Type: My password is PASSWORD123";
            break;
        case 10:
            hintMessage = "Just wait until attempt #9.";
            break;
        case 16:
            hintMessage = "The color sequence is random, but try clicking the 'Easy Mode' button after a few tries.";
            break;
        case 17:
            hintMessage = "There's a 25% random chance of success, just keep trying.";
            break;
        case 18:
            hintMessage = "Click exactly as the circles align, or try the 'Skip' option after multiple attempts.";
            break;
        case 19:
            hintMessage = "Connect the dots in prime number order: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29";
            break;
        case 20:
            hintMessage = "After 3 tries, use the exact phrase shown in the hint that appears.";
            break;
        default:
            hintMessage = "No hint available for this step.";
            break;
    }

    alert("HINT: " + hintMessage);
}

// Open shop panel
function openShopPanel() {
    // Update shop coin display before opening
    document.getElementById('shop-coins-count').textContent = coins;
    document.getElementById('upgrades-panel').style.right = '0';
}

// Close shop panel
function closeShopPanel() {
    document.getElementById('upgrades-panel').style.right = '-300px';
}

// Show loan application
function showLoanApplication() {
    // Store the current step to return to later
    mainStepBeforeLoan = currentStep;
    inLoanApplication = true;

    // Reset loan steps
    currentLoanStep = 1;
    updateLoanProgress();

    // Show the loan container
    document.getElementById('loan-container').classList.remove('hidden');

    // Setup first step of loan application - the advanced CAPTCHA
    setupCaptcha();
}

// Update loan progress bar
function updateLoanProgress() {
    const progressPercent = (currentLoanStep / 3) * 100;
    document.getElementById('loan-progress-bar').style.width = `${progressPercent}%`;

    // Hide all steps
    document.querySelectorAll('.loan-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    if (currentLoanStep <= 3) {
        document.getElementById(`loan-step-${currentLoanStep}`).classList.add('active');
    } else {
        document.getElementById('loan-success').classList.add('active');
    }
}

// End loan application
function endLoanApplication(success = false) {
    if (success) {
        // Award 1000 coins
        awardCoins(1000);
        sounds.complete.play();
    }

    // Reset variables
    inLoanApplication = false;
    currentLoanStep = 1;

    // Hide loan container
    document.getElementById('loan-container').classList.add('hidden');
}

// Generate advanced CAPTCHA
function setupCaptcha() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]|;:<>,.?/~`';
    let captchaText = '';

    // Generate a captcha with 20 random characters
    for (let i = 0; i < 20; i++) {
        captchaText += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Store the captcha text for verification
    window.captchaAnswer = captchaText;

    // Display the captcha with fading animation
    const captchaElement = document.getElementById('captcha-text');
    captchaElement.innerHTML = '';

    for (let i = 0; i < captchaText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.className = 'captcha-char';
        charSpan.style.setProperty('--char-index', i);
        charSpan.textContent = captchaText[i];
        captchaElement.appendChild(charSpan);
    }

    // Clear any previous input
    document.getElementById('captcha-answer').value = '';
    document.getElementById('captcha-error').classList.add('hidden');
}

// Setup 8-puzzle sliding game
function setupSlidingPuzzle() {
    const puzzleGrid = document.getElementById('puzzle-grid');
    puzzleGrid.innerHTML = '';

    // Create a solved puzzle for reference
    const solvedPuzzle = [1, 2, 3, 4, 5, 6, 7, 8, 0]; // 0 represents the empty space
    // Create a shuffled puzzle (ensure it's solvable)
    const shuffledPuzzle = [...solvedPuzzle];

    // Custom shuffle to ensure the puzzle is solvable
    // Just swap a few times to make it challenging but solvable
    for (let i = 0; i < 30; i++) {
        const emptyIndex = shuffledPuzzle.indexOf(0);
        const emptyRow = Math.floor(emptyIndex / 3);
        const emptyCol = emptyIndex % 3;

        // Find valid moves (adjacent tiles)
        const validMoves = [];
        if (emptyRow > 0) validMoves.push(emptyIndex - 3); // Up
        if (emptyRow < 2) validMoves.push(emptyIndex + 3); // Down
        if (emptyCol > 0) validMoves.push(emptyIndex - 1); // Left
        if (emptyCol < 2) validMoves.push(emptyIndex + 1); // Right

        // Choose a random valid move
        const moveIndex = validMoves[Math.floor(Math.random() * validMoves.length)];

        // Swap with the empty space
        [shuffledPuzzle[emptyIndex], shuffledPuzzle[moveIndex]] = [shuffledPuzzle[moveIndex], shuffledPuzzle[emptyIndex]];
    }

    // Create the puzzle tiles
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.className = shuffledPuzzle[i] === 0 ? 'puzzle-tile empty' : 'puzzle-tile';
        tile.dataset.value = shuffledPuzzle[i];

        if (shuffledPuzzle[i] !== 0) {
            tile.textContent = shuffledPuzzle[i];

            // Add click event to move tiles
            tile.addEventListener('click', () => {
                moveTile(i);
            });
        }

        puzzleGrid.appendChild(tile);
    }

    // Reset move counter
    document.getElementById('move-counter').textContent = '0';
    window.puzzleMoves = 0;

    // Store the puzzle state
    window.puzzleState = shuffledPuzzle;

    // Hide error
    document.getElementById('puzzle-error').classList.add('hidden');
}

// Move a tile in the sliding puzzle
function moveTile(index) {
    const emptyIndex = window.puzzleState.indexOf(0);

    // Check if the tile is adjacent to the empty space
    const tileRow = Math.floor(index / 3);
    const tileCol = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    // If the tile is adjacent to the empty space
    if ((tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1) ||
        (tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1)) {

        // Swap the tile with the empty space
        const tileValue = window.puzzleState[index];
        window.puzzleState[index] = 0;
        window.puzzleState[emptyIndex] = tileValue;

        // Update the UI
        const puzzleGrid = document.getElementById('puzzle-grid');
        puzzleGrid.innerHTML = '';

        for (let i = 0; i < 9; i++) {
            const tile = document.createElement('div');
            tile.className = window.puzzleState[i] === 0 ? 'puzzle-tile empty' : 'puzzle-tile';
            tile.dataset.value = window.puzzleState[i];

            if (window.puzzleState[i] !== 0) {
                tile.textContent = window.puzzleState[i];

                // Add click event to move tiles
                tile.addEventListener('click', () => {
                    moveTile(i);
                });
            }

            puzzleGrid.appendChild(tile);
        }

        // Increment move counter
        window.puzzleMoves++;
        document.getElementById('move-counter').textContent = window.puzzleMoves;

        sounds.click.play();
    }
}

// Check if the puzzle is solved
function isPuzzleSolved() {
    const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    return window.puzzleState.every((value, index) => value === solvedState[index]);
}

// Setup complex math problem
function setupMathProblem() {
    // Generate a complex math problem
    // This will be a calculation with multiple operations and large numbers

    // Generate 3 large random numbers
    const num1 = Math.floor(Math.random() * 100) + 50;
    const num2 = Math.floor(Math.random() * 50) + 25;
    const num3 = Math.floor(Math.random() * 30) + 10;

    // Construct the problem with multiple operations
    const problemStr = `(${num1} × ${num2}) ÷ ${num3} + ${num1} - ${num2}`;

    // Calculate the answer
    const answer = Math.round(((num1 * num2) / num3 + num1 - num2) * 100) / 100;

    // Store the answer for verification
    window.mathAnswer = answer;

    // Display the problem
    document.getElementById('math-problem').innerHTML = `
        <span class="math-expression">${problemStr} = ?</span>
    `;

    // Clear any previous input
    document.getElementById('math-answer-loan').value = '';
    document.getElementById('math-error-loan').classList.add('hidden');

    // Start the timer
    mathProblemTimeLeft = 60;
    document.getElementById('math-timer').textContent = mathProblemTimeLeft;

    clearInterval(mathProblemTimer);
    mathProblemTimer = setInterval(() => {
        mathProblemTimeLeft--;
        document.getElementById('math-timer').textContent = mathProblemTimeLeft;

        if (mathProblemTimeLeft <= 0) {
            clearInterval(mathProblemTimer);
            showError('math-error-loan', 'Time expired! Try again with a new problem.');
            setupMathProblem(); // Generate a new problem
        }
    }, 1000);
}

// Initialize canvas for circle drawing
function initCircleCanvas() {
    const canvas = document.getElementById('circle-canvas');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentThemeColor;

    // Clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Start drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    // Draw
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });

    function draw(e) {
        if (!isDrawing) return;

        let x, y;

        if (e.type.includes('mouse')) {
            x = e.offsetX;
            y = e.offsetY;
        } else {
            const rect = canvas.getBoundingClientRect();
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Stop drawing
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    // Clear button
    document.getElementById('clear-canvas').addEventListener('click', () => {
        sounds.click.play();
        clearCanvas();
    });

    return { clearCanvas };
}

// Initialize signature pad with deliberately frustrating behavior
function initSignaturePad() {
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentThemeColor;

    let isDrawing = false;
    let lastPoint = { x: 0, y: 0 };
    let lagTimer = null;

    // Clear canvas
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Start drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    // Draw with deliberately annoying behavior
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });

    function draw(e) {
        if (!isDrawing) return;

        let x, y;

        if (e.type.includes('mouse')) {
            x = e.offsetX;
            y = e.offsetY;
        } else {
            const rect = canvas.getBoundingClientRect();
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        }

        // Add random offset to make the signature look jittery (reduced by 10% if better pen upgrade is purchased)
        const jitterFactor = hasBetterPen ? 0.9 : 1;
        const offsetX = (Math.random() - 0.5) * 10 * jitterFactor;
        const offsetY = (Math.random() - 0.5) * 10 * jitterFactor;

        // Apply the offset
        x += offsetX;
        y += offsetY;

        // Randomly change line width for inconsistent look
        if (Math.random() < 0.1 * jitterFactor) {
            ctx.lineWidth = 1 + Math.random() * 4;
        }

        // Randomly change stroke color slightly
        if (Math.random() < 0.05 * jitterFactor) {
            const r = Math.floor(Math.random() * 100) + 50;
            const g = Math.floor(Math.random() * 100) + 50;
            const b = Math.floor(Math.random() * 100) + 100;
            ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
        }

        // Occasionally jump to a completely different position
        if (Math.random() < 0.03 * jitterFactor) {
            const jumpX = x + (Math.random() - 0.5) * 30;
            const jumpY = y + (Math.random() - 0.5) * 30;
            ctx.beginPath();
            ctx.moveTo(jumpX, jumpY);
        }
        // Occasionally add a slight delay to simulate lag
        else if (Math.random() < 0.1 * jitterFactor) {
            clearTimeout(lagTimer);
            lagTimer = setTimeout(() => {
                ctx.lineTo(x, y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
                lastPoint = { x, y };
            }, 100);
        }
        // Normal drawing (but with the offset)
        else {
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
            lastPoint = { x, y };
        }
    }

    // Stop drawing
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
        clearTimeout(lagTimer);
    }

    // Check if signature pad has content
    function hasSignature() {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        return imageData.some(channel => channel !== 0);
    }

    // Flip or transform the signature
    function transformSignature() {
        // Get the current signature data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Randomly choose a transformation
        const transformType = Math.floor(Math.random() * 4);

        // Save current context
        ctx.save();

        switch (transformType) {
            case 0: // Flip horizontally
                ctx.translate(canvas.width, 0);
                ctx.scale(-1, 1);
                break;
            case 1: // Flip vertically
                ctx.translate(0, canvas.height);
                ctx.scale(1, -1);
                break;
            case 2: // Rotate 180 degrees
                ctx.translate(canvas.width/2, canvas.height/2);
                ctx.rotate(Math.PI);
                ctx.translate(-canvas.width/2, -canvas.height/2);
                break;
            case 3: // Skew
                ctx.transform(1, 0.2, 0.2, 1, 0, 0);
                break;
        }

        // Draw the transformed image
        ctx.putImageData(imageData, 0, 0);

        // Restore context
        ctx.restore();

        return "Signature improved!";
    }

    // Clear button
    document.getElementById('clear-signature').addEventListener('click', () => {
        sounds.click.play();
        clearCanvas();
    });

    return { clearCanvas, hasSignature, transformSignature };
}

// Initialize color sequence memory game
function initColorSequenceGame() {
    const colors = {
        red: '#FF0000',
        green: '#00FF00',
        blue: '#0000FF',
        yellow: '#FFFF00',
        magenta: '#FF00FF'
    };

    const colorDisplay = document.getElementById('color-display');
    const startButton = document.getElementById('start-color-sequence');
    const colorButtons = document.getElementById('color-buttons');
    const feedbackElement = document.getElementById('color-feedback');
    const messageElement = document.getElementById('color-message');
    const attemptElement = document.getElementById('color-sequence-attempt');
    const easyModeContainer = document.getElementById('easy-mode-container');
    const easyModeButton = document.getElementById('color-easy-mode');

    // Generate a random color sequence
    function generateSequence(length) {
        const sequence = [];
        const colorKeys = Object.keys(colors);

        for (let i = 0; i < length; i++) {
            const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];

            // Slightly vary the shade to make it harder
            let colorCode = colors[colorKey];
            if (!isEasyMode) {
                // Convert hex to RGB, adjust slightly, convert back to hex
                let r = parseInt(colorCode.slice(1, 3), 16);
                let g = parseInt(colorCode.slice(3, 5), 16);
                let b = parseInt(colorCode.slice(5, 7), 16);

                // Adjust by up to 10% in either direction
                r = Math.max(0, Math.min(255, r + Math.floor(r * (Math.random() * 0.2 - 0.1))));
                g = Math.max(0, Math.min(255, g + Math.floor(g * (Math.random() * 0.2 - 0.1))));
                b = Math.max(0, Math.min(255, b + Math.floor(b * (Math.random() * 0.2 - 0.1))));

                // Convert back to hex
                colorCode = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            }

            sequence.push({
                color: colorKey,
                code: colorCode
            });
        }

        return sequence;
    }

    // Display the sequence
    function displaySequence() {
        colorDisplay.style.backgroundColor = 'transparent';
        startButton.disabled = true;
        colorButtons.classList.add('hidden');
        messageElement.textContent = 'Memorize the sequence...';
        feedbackElement.classList.add('hidden');

        let currentIndex = 0;

        const showNextColor = () => {
            if (currentIndex < colorSequence.length) {
                colorDisplay.style.backgroundColor = colorSequence[currentIndex].code;

                setTimeout(() => {
                    colorDisplay.style.backgroundColor = 'transparent';

                    setTimeout(() => {
                        currentIndex++;
                        showNextColor();
                    }, isEasyMode ? 500 : 300);
                }, isEasyMode ? 1000 : 800);
            } else {
                // Sequence finished
                userSequence = [];
                colorButtons.classList.remove('hidden');
                startButton.disabled = false;
                messageElement.textContent = 'Now reproduce the sequence by clicking the colored buttons in order.';
            }
        };

        showNextColor();
    }

    // Check user's sequence
    function checkSequence() {
        let correct = true;

        if (userSequence.length !== colorSequence.length) {
            correct = false;
        } else {
            for (let i = 0; i < userSequence.length; i++) {
                if (userSequence[i] !== colorSequence[i].color) {
                    correct = false;
                    break;
                }
            }
        }

        // Clear user selections
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Display feedback
        feedbackElement.classList.remove('hidden', 'text-success', 'text-danger');

        if (correct) {
            feedbackElement.textContent = 'Correct sequence!';
            feedbackElement.classList.add('text-success');
            sounds.success.play();

            // Proceed to next step after a delay
            setTimeout(async () => {
                awardCoins(80);
                await showLoading("Validating visual memory...");
                showStep(17);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);
        } else {
            colorAttempts++;
            feedbackElement.textContent = `Incorrect sequence. Attempt ${colorAttempts} of ${maxColorAttempts}.`;
            feedbackElement.classList.add('text-danger');
            sounds.error.play();

            // Reset buttons for next attempt
            colorButtons.classList.add('hidden');
            startButton.textContent = 'Try Again';

            // Show easy mode option after max attempts
            if (colorAttempts >= maxColorAttempts && !isEasyMode) {
                easyModeContainer.classList.remove('hidden');
            }

            // Update attempt counter
            attemptElement.textContent = `Attempt ${colorAttempts} of ${maxColorAttempts}`;
        }
    }

    // Enable easy mode (just one color)
    easyModeButton.addEventListener('click', () => {
        sounds.click.play();
        isEasyMode = true;
        easyModeContainer.classList.add('hidden');
        colorAttempts = 0;
        attemptElement.textContent = `Easy Mode`;
        colorSequence = generateSequence(1); // Just one color in easy mode
        startButton.textContent = 'Start Sequence';
        feedbackElement.classList.add('hidden');
        messageElement.textContent = 'Easy mode activated. Just one color to remember!';
    });

    // Setup color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            sounds.click.play();

            // Add this color to user sequence
            userSequence.push(btn.dataset.color);

            // Highlight the button
            btn.classList.add('active');

            // If user has entered the full sequence, check it
            if (userSequence.length === colorSequence.length) {
                setTimeout(() => {
                    checkSequence();
                }, 500);
            }
        });
    });

    // Start button
    startButton.addEventListener('click', () => {
        sounds.click.play();

        // Generate sequence if not in easy mode
        if (!isEasyMode) {
            // Increase sequence length with each attempt
            const length = Math.min(5, 2 + Math.floor(colorAttempts / 2));
            colorSequence = generateSequence(length);
        }

        displaySequence();
    });

    // Initialize with a 2-color sequence
    colorSequence = generateSequence(2);
}

// Initialize rhythm game
function initRhythmGame() {
    const beatTarget = document.querySelector('.beat-target');
    const beatIndicator = document.querySelector('.beat-indicator');
    const beatTimer = document.querySelector('.beat-timer');
    const startButton = document.getElementById('start-rhythm');
    const rhythmAccuracy = document.getElementById('rhythm-accuracy');
    const rhythmScore = document.getElementById('rhythm-score');
    const rhythmProgress = document.getElementById('rhythm-progress');
    const rhythmMessage = document.getElementById('rhythm-message');
    const rhythmFeedback = document.getElementById('rhythm-feedback');
    const rhythmAttemptElement = document.getElementById('rhythm-attempt');
    const skipContainer = document.getElementById('rhythm-skip-container');
    const skipButton = document.getElementById('rhythm-skip');

    let isPlaying = false;
    let binaryBeatsPlayer = null;

    // Generate random beat timings
    function generateBeats() {
        rhythmBeats = [];
        userBeats = [];

        // Number of beats increases with attempts
        const numBeats = Math.min(10, 5 + rhythmAttempts);

        // Total duration in milliseconds (8 seconds)
        const totalDuration = 8000;

        // Generate beats with varying intervals
        for (let i = 0; i < numBeats; i++) {
            // Spacing gets more irregular with higher attempts
            let timeOffset = 1000 + (i * (totalDuration - 2000) / numBeats);

            // Add some randomness for more difficult timings
            if (rhythmAttempts > 1) {
                timeOffset += (Math.random() - 0.5) * 500 * Math.min(rhythmAttempts, 3);
            }

            // Ensure beat is within bounds
            timeOffset = Math.max(1000, Math.min(totalDuration - 1000, timeOffset));

            rhythmBeats.push(timeOffset);
        }

        // Sort beats in ascending order
        rhythmBeats.sort((a, b) => a - b);
    }

    // Start the rhythm game
    function startRhythmGame() {
        // Reset game state
        generateBeats();
        isPlaying = true;
        beatStartTime = Date.now();

        // Update UI
        startButton.disabled = true;
        rhythmMessage.textContent = 'Get ready...';
        rhythmAccuracy.classList.remove('hidden');
        rhythmScore.textContent = '0%';
        rhythmProgress.style.width = '0%';
        rhythmFeedback.classList.add('hidden');

        // Start animation loop
        requestAnimationFrame(updateRhythmGame);

        // Start audio context for better timing
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Play each beat at the scheduled time
        rhythmBeats.forEach((beatTime, index) => {
            setTimeout(() => {
                // Visual indication of beat
                animateBeat();

                // Play a click sound
                sounds.beat.play();

            }, beatTime);
        });

        // End game after all beats plus grace period
        const gameDuration = rhythmBeats[rhythmBeats.length - 1] + 1000;
        setTimeout(() => {
            endRhythmGame();
        }, gameDuration);
    }

    // Update rhythm game state
    function updateRhythmGame() {
        if (!isPlaying) return;

        const elapsed = Date.now() - beatStartTime;

        // Find the closest beat to current time
        let closestBeatIndex = -1;
        let closestBeatDistance = Number.MAX_VALUE;

        for (let i = 0; i < rhythmBeats.length; i++) {
            const distance = Math.abs(elapsed - rhythmBeats[i]);
            if (distance < closestBeatDistance) {
                closestBeatDistance = distance;
                closestBeatIndex = i;
            }
        }

        // Update progress bar
        if (rhythmBeats.length > 0) {
            const totalTime = rhythmBeats[rhythmBeats.length - 1];
            const progressPercent = Math.min(100, (elapsed / totalTime) * 100);
            rhythmProgress.style.width = `${progressPercent}%`;
        }

        requestAnimationFrame(updateRhythmGame);
    }

    // Animate beat expansion/contraction
    function animateBeat() {
        // Start at small scale
        beatTimer.style.transform = 'scale(0)';

        // Expand
        setTimeout(() => {
            beatTimer.style.transform = 'scale(1)';

            // Contract after reaching full size
            setTimeout(() => {
                beatTimer.style.transform = 'scale(0)';
            }, 150);
        }, 10);
    }

    // Process user tap
    function processTap() {
        if (!isPlaying) return;

        sounds.tap.play();

        // Flash the indicator
        beatIndicator.style.transform = 'scale(1)';
        setTimeout(() => {
            beatIndicator.style.transform = 'scale(0)';
        }, 100);

        // Record timestamp of user tap
        const elapsed = Date.now() - beatStartTime;
        userBeats.push(elapsed);

        // Find closest beat to this tap
        let closestBeatIndex = -1;
        let closestBeatDistance = Number.MAX_VALUE;

        for (let i = 0; i < rhythmBeats.length; i++) {
            const distance = Math.abs(elapsed - rhythmBeats[i]);
            if (distance < closestBeatDistance) {
                closestBeatDistance = distance;
                closestBeatIndex = i;
            }
        }

        // Update accuracy display based on timing
        const accuracy = calculateAccuracy();
        rhythmScore.textContent = `${accuracy}%`;
    }

    // Calculate accuracy of user's taps
    function calculateAccuracy() {
        if (userBeats.length === 0 || rhythmBeats.length === 0) {
            return 0;
        }

        // For each user beat, find the closest rhythm beat
        let totalError = 0;
        let matchedBeats = 0;

        userBeats.forEach(userBeat => {
            let minError = Number.MAX_VALUE;

            rhythmBeats.forEach(rhythmBeat => {
                const error = Math.abs(userBeat - rhythmBeat);
                minError = Math.min(minError, error);
            });

            // Count as a match if within 150ms
            if (minError <= 150) {
                matchedBeats++;
                totalError += minError;
            }
        });

        // Calculate percentage accuracy
        const beatAccuracy = matchedBeats / rhythmBeats.length;
        const timingAccuracy = matchedBeats > 0 ? 1 - (totalError / (matchedBeats * 150)) : 0;

        // Overall accuracy is a weighted average of beat matches and timing precision
        const overallAccuracy = (beatAccuracy * 0.7 + timingAccuracy * 0.3) * 100;

        return Math.round(overallAccuracy);
    }

    // End the rhythm game
    function endRhythmGame() {
        isPlaying = false;
        startButton.disabled = false;
        startButton.textContent = 'Try Again';

        // Calculate final accuracy
        const accuracy = calculateAccuracy();
        rhythmScore.textContent = `${accuracy}%`;

        // Display feedback
        rhythmFeedback.classList.remove('hidden', 'text-success', 'text-danger');

        // Threshold for success gets lower with each attempt
        const successThreshold = Math.max(50, 80 - rhythmAttempts * 5);

        if (accuracy >= successThreshold) {
            rhythmFeedback.textContent = 'Rhythm verified successfully!';
            rhythmFeedback.classList.add('text-success');
            sounds.success.play();

            // Proceed to next step
            setTimeout(async () => {
                awardCoins(80);
                await showLoading("Validating rhythmic synchronization...");
                showStep(19);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);
        } else {
            rhythmAttempts++;
            rhythmFeedback.textContent = `Failed verification. Your accuracy was ${accuracy}%. Attempt ${rhythmAttempts} of ${maxRhythmAttempts}.`;
            rhythmFeedback.classList.add('text-danger');
            sounds.error.play();

            // Show skip option after a few attempts
            if (rhythmAttempts >= maxRhythmAttempts) {
                skipContainer.classList.remove('hidden');
            }

            // Update attempt counter
            rhythmAttemptElement.textContent = `Attempt ${rhythmAttempts} of ${maxRhythmAttempts}`;
        }
    }

    // Click on beat target
    beatTarget.addEventListener('click', processTap);
    beatTarget.addEventListener('touchend', (e) => {
        e.preventDefault();
        processTap();
    });

    // Start button
    startButton.addEventListener('click', () => {
        sounds.click.play();
        startRhythmGame();
    });

    // Skip button - Listen to Binary Beats
    skipButton.addEventListener('click', async () => {
        sounds.click.play();

        // Disable buttons during playback
        skipButton.disabled = true;
        startButton.disabled = true;

        // Update UI
        rhythmFeedback.classList.remove('hidden', 'text-danger');
        rhythmFeedback.classList.add('text-primary');
        rhythmFeedback.innerHTML = `
            <div class="mb-2">Playing Binary Beats music...</div>
            <div class="flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                <span id="beat-countdown">40</span> seconds remaining
            </div>
        `;

        // Start playing binary beats
        binaryBeatsPlayer = generateBinaryBeatsMusic(40);

        // Start countdown
        let countdown = 40;
        const countdownElement = document.getElementById('beat-countdown');

        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }

            if (countdown <= 0) {
                clearInterval(countdownInterval);

                // Stop playing
                if (binaryBeatsPlayer) {
                    binaryBeatsPlayer.stop();
                    binaryBeatsPlayer = null;
                }

                // Proceed to next step
                awardCoins(40);
                showLoading("Processing audio verification...").then(() => {
                    showStep(19);

                    // Add skip button if available
                    if (hasSkipStep && !usedSkipStep) {
                        addSkipButton();
                    }
                });
            }
        }, 1000);
    });
}

// Initialize connect dots game
function initConnectDots() {
    const dotsContainer = document.querySelector('.dots-container');
    const dotLinesSvg = document.getElementById('dot-lines-svg');
    const resetButton = document.getElementById('reset-dots');
    const submitButton = document.getElementById('submit-dots');
    const feedbackElement = document.getElementById('dots-feedback');
    const connectedCountElement = document.getElementById('connected-count');

    // Prime numbers to connect
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    // Generate all numbers 1-30
    function generateDots() {
        dotsState = [];
        dotsConnected = [];

        // Clear existing dots and lines
        Array.from(dotsContainer.querySelectorAll('.dot')).forEach(dot => dot.remove());
        dotLinesSvg.innerHTML = '';

        // Generate positions for all numbers 1-30
        const positions = [];
        const containerWidth = dotsContainer.offsetWidth;
        const containerHeight = dotsContainer.offsetHeight;
        const dotSize = 24;
        const padding = 20;

        // Generate 30 non-overlapping random positions
        for (let num = 1; num <= 30; num++) {
            let validPosition = false;
            let attempts = 0;
            let posX, posY;

            while (!validPosition && attempts < 100) {
                // Random position within container bounds
                posX = padding + Math.random() * (containerWidth - dotSize - padding * 2);
                posY = padding + Math.random() * (containerHeight - dotSize - padding * 2);

                // Check for overlap with existing dots
                validPosition = true;
                for (const pos of positions) {
                    const distance = Math.sqrt(Math.pow(pos.x - posX, 2) + Math.pow(pos.y - posY, 2));
                    // Ensure at least 30px between dots
                    if (distance < 30) {
                        validPosition = false;
                        break;
                    }
                }

                attempts++;
            }

            // If we couldn't find a valid position, use a grid position as fallback
            if (!validPosition) {
                const gridCols = 6;
                const gridRows = 5;
                const colWidth = containerWidth / gridCols;
                const rowHeight = containerHeight / gridRows;

                const col = (num - 1) % gridCols;
                const row = Math.floor((num - 1) / gridCols);

                posX = col * colWidth + colWidth / 2 - dotSize / 2;
                posY = row * rowHeight + rowHeight / 2 - dotSize / 2;
            }

            positions.push({ num, x: posX, y: posY });

            // Create dot element
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.textContent = num;
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            // Add small random movement on hover
            dot.addEventListener('mouseover', () => {
                if (!dotsConnected.includes(num)) {
                    const offsetX = (Math.random() - 0.5) * 5;
                    const offsetY = (Math.random() - 0.5) * 5;
                    dot.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                }
            });

            dot.addEventListener('mouseout', () => {
                if (!dotsConnected.includes(num)) {
                    dot.style.transform = 'translate(0, 0)';
                }
            });

            // Add click handler
            dot.addEventListener('click', () => {
                handleDotClick(num, posX + dotSize / 2, posY + dotSize / 2);
            });

            dotsContainer.appendChild(dot);
            dotsState.push({ num, x: posX + dotSize / 2, y: posY + dotSize / 2 });
        }

        // Update connected count
        connectedCountElement.textContent = '0';
    }

    // Handle dot click
    function handleDotClick(num, x, y) {
        sounds.click.play();

        // Only allow clicking on primes in the correct order
        if (!primes.includes(num)) {
            feedbackElement.classList.remove('hidden', 'text-success');
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = `${num} is not a prime number. Connect the dots in prime number order.`;
            sounds.error.play();
            return;
        }

        // Check if this is the next prime in sequence
        const nextIndex = dotsConnected.length;
        if (num !== primes[nextIndex]) {
            feedbackElement.classList.remove('hidden', 'text-success');
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = `You need to connect prime ${primes[nextIndex]} next.`;
            sounds.error.play();
            return;
        }

        // Mark this dot as connected
        dotsConnected.push(num);

        // Update dot appearance
        const dot = Array.from(dotsContainer.querySelectorAll('.dot')).find(d => parseInt(d.textContent) === num);
        dot.classList.add('connected');

        // Draw line to previous dot if not the first one
        if (dotsConnected.length > 1) {
            const prevNum = dotsConnected[dotsConnected.length - 2];
            const prevDot = dotsState.find(d => d.num === prevNum);

            // Draw SVG line
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', prevDot.x);
            line.setAttribute('y1', prevDot.y);
            line.setAttribute('x2', x);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', currentThemeColor);
            line.setAttribute('stroke-width', '2');
            dotLinesSvg.appendChild(line);
        }

        // Update connected count
        connectedCountElement.textContent = dotsConnected.length;

        // Hide feedback if showing
        feedbackElement.classList.add('hidden');
    }

    // Reset the game
    resetButton.addEventListener('click', () => {
        sounds.click.play();
        generateDots();
        feedbackElement.classList.add('hidden');
    });

    // Submit solution
    submitButton.addEventListener('click', async () => {
        sounds.click.play();

        feedbackElement.classList.remove('hidden', 'text-danger');

        // Check if all primes are connected
        if (dotsConnected.length === primes.length &&
            primes.every((prime, index) => prime === dotsConnected[index])) {

            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = 'Sequence verified successfully!';
            sounds.success.play();

            // Proceed to next step
            setTimeout(async () => {
                awardCoins(90);
                await showLoading("Validating prime number sequence...");
                showStep(20);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);
        } else {
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = `Incomplete or incorrect sequence. You need to connect all 10 prime numbers in order.`;
            sounds.error.play();
        }
    });

    // Generate initial dot layout
    generateDots();
}

// Initialize refrigerator contents verification
function initFridgeVerification() {
    const fridgeContents = document.getElementById('fridge-contents');
    const submitButton = document.getElementById('submit-fridge');
    const feedbackElement = document.getElementById('fridge-feedback');
    const analysisElement = document.getElementById('fridge-analysis');
    const hintContainer = document.getElementById('fridge-hint-container');
    const attemptElement = document.getElementById('fridge-attempt');

    // List of common refrigerator items
    const commonItems = [
        'milk', 'eggs', 'butter', 'cheese', 'yogurt', 'orange juice', 'apple juice',
        'lettuce', 'tomatoes', 'carrots', 'onions', 'peppers', 'broccoli', 'spinach',
        'chicken', 'beef', 'pork', 'ham', 'bacon', 'leftovers', 'pizza', 'ketchup',
        'mustard', 'mayonnaise', 'jam', 'jelly', 'pickles', 'soda', 'beer', 'wine',
        'water bottle', 'coffee', 'salad dressing', 'sour cream', 'cream cheese'
    ];

    // List of uncommon or weird items
    const weirdItems = [
        'dragon fruit', 'liquid nitrogen', 'antigravity potion', 'time-travel serum',
        'perpetual motion machine', 'quantum flux capacitor', 'miniature black hole',
        'dark matter sample', 'einstein-bose condensate', 'synthetic unicorn horn',
        'alien DNA sample', 'philosopher\'s stone', 'interdimensional rift',
        'cryogenically frozen mammoth meat', 'infinity stone', 'unobtainium',
        'flux capacitor', 'antimatter container', 'shrink ray'
    ];

    // Submit refrigerator contents
    submitButton.addEventListener('click', async () => {
        sounds.click.play();

        const contents = fridgeContents.value.trim();

        // Check for the "correct" answer after 3 attempts
        if (fridgeAttempts >= maxFridgeAttempts &&
            contents.toLowerCase().includes('refrigerator currently in another dimension')) {

            // Success!
            analysisElement.classList.add('hidden');
            feedbackElement.classList.remove('hidden', 'text-danger');
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = 'Refrigerator status verified successfully!';
            sounds.success.play();

            // Proceed to next step
            setTimeout(async () => {
                awardCoins(90);
                await showLoading("Cross-referencing interdimensional databases...");
                showStep(21);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);

            return;
        }

        // Start "analysis"
        analysisElement.classList.remove('hidden');
        feedbackElement.classList.add('hidden');

        // Simulate detailed analysis
        await simulateFridgeAnalysis(contents);

        // Hide analysis, show feedback
        analysisElement.classList.add('hidden');
        feedbackElement.classList.remove('hidden', 'text-success');
        feedbackElement.classList.add('text-danger');

        // Increment attempt counter
        fridgeAttempts++;

        // Show feedback based on analysis
        if (fridgeAttempts >= maxFridgeAttempts) {
            // Show hint after max attempts
            hintContainer.classList.remove('hidden');
            feedbackElement.textContent = 'Refrigerator statistical analysis failed. Please see hint below.';
        } else {
            const randomReason = generateRejectionReason(contents);
            feedbackElement.textContent = randomReason;
        }

        // Update attempt counter
        attemptElement.textContent = `Attempt ${fridgeAttempts} of ${maxFridgeAttempts}`;

        sounds.error.play();
    });

    // Simulate analysis with detailed steps
    async function simulateFridgeAnalysis(contents) {
        const analysisDetails = document.getElementById('analysis-details');

        // Parse input into items
        let items = contents.split(/[\n,]+/).map(item => item.trim()).filter(Boolean);

        analysisDetails.innerHTML = `<p>Parsing input: detected ${items.length} items...</p>`;
        await new Promise(resolve => setTimeout(resolve, 800));

        analysisDetails.innerHTML += `<p>Checking against household inventory database...</p>`;
        await new Promise(resolve => setTimeout(resolve, 1200));

        analysisDetails.innerHTML += `<p>Running statistical probability model...</p>`;
        await new Promise(resolve => setTimeout(resolve, 1000));

        analysisDetails.innerHTML += `<p>Calculating inventory coherence score...</p>`;
        await new Promise(resolve => setTimeout(resolve, 900));

        // Always fail in some way
        analysisDetails.innerHTML += `<p class="text-danger font-medium">Verification failed!</p>`;
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Generate a random, absurd reason for rejection
    function generateRejectionReason(contents) {
        const reasons = [
            "Statistical analysis indicates a 97.3% probability that you're not accurately reporting your condiment-to-dairy ratio.",
            "Refrigerator contents lack the expected number of expired items for a household in your demographic.",
            "Our AI detected insufficient alphabetical sorting in your listed items. Please reorganize your refrigerator.",
            "Your refrigerator contains an anomalous quantity of food items starting with the letter 'C'.",
            "Temperature gradient analysis suggests your items are not arranged according to FDA-recommended cooling zones.",
            "Quantum fluctuations detected in your response suggest temporal instability in your refrigerator's contents.",
            "Household variance algorithm indicates your refrigerator has a 42% lower probability of containing leftovers than expected.",
            "Your refrigerator's entropy coefficient exceeds normal parameters for organized food storage.",
            "Machine learning model indicates 87% chance of inaccurate vegetable drawer reporting.",
            "Nutritional matrix analysis suggests impossible combination of items for sustained human life."
        ];

        return reasons[Math.floor(Math.random() * reasons.length)];
    }
}

// Initialize quantum entanglement verification
function initQuantumVerification() {
    const quantum = document.getElementById('quantum-animation');
    const progressBar = document.getElementById('quantum-progress-bar');
    const statusText = document.getElementById('quantum-status');
    const startButton = document.getElementById('start-quantum');
    const feedbackElement = document.getElementById('quantum-feedback');
    const attemptElement = document.getElementById('quantum-attempt');

    let particleInterval;
    let progressInterval;
    let currentProgress = 0;
    let isRunning = false;

    // Start quantum entanglement verification
    startButton.addEventListener('click', () => {
        sounds.click.play();

        if (isRunning) return;
        isRunning = true;

        // Reset state
        currentProgress = 0;
        progressBar.style.width = '0%';
        startButton.disabled = true;
        feedbackElement.classList.add('hidden');

        // Clear existing particles
        quantum.innerHTML = '';

        // Start particle animation
        particleInterval = setInterval(createParticle, 100);

        // Start progress animation
        statusText.textContent = 'Establishing quantum entanglement...';

        // Simulate progress with random pauses
        progressInterval = setInterval(() => {
            // Advance progress
            currentProgress += Math.random() * 2;

            // Cap progress at 100%
            currentProgress = Math.min(currentProgress, 100);

            // Update progress bar
            progressBar.style.width = `${currentProgress}%`;

            // Status updates at specific points
            if (currentProgress > 30 && currentProgress < 32) {
                statusText.textContent = 'Aligning quantum wave functions...';
            } else if (currentProgress > 50 && currentProgress < 52) {
                statusText.textContent = 'Measuring quantum coherence...';
            } else if (currentProgress > 75 && currentProgress < 77) {
                statusText.textContent = 'Stabilizing quantum field...';
            } else if (currentProgress > 90) {
                statusText.textContent = 'Finalizing entanglement...';
            }

            // Random chance of pausing at certain thresholds
            if (currentProgress > 40 && currentProgress < 60 && Math.random() < 0.1) {
                pauseQuantumProgress('Quantum fluctuation detected!');
            } else if (currentProgress > 80 && currentProgress < 90 && Math.random() < 0.2) {
                pauseQuantumProgress('Detecting wave function collapse... reestablishing coherence.');
            } else if (currentProgress > 95 && Math.random() < 0.3) {
                pauseQuantumProgress('Heisenberg uncertainty detected! Recalibrating...');
            }

            // Complete when reaching 100%
            if (currentProgress >= 100) {
                completeQuantumVerification();
            }
        }, 100);
    });

    // Create random quantum "particle"
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;

        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random opacity
        particle.style.opacity = 0.3 + Math.random() * 0.7;

        // Add to container
        quantum.appendChild(particle);

        // Animate movement
        const duration = 2000 + Math.random() * 3000;
        const targetX = Math.random() * 100;
        const targetY = Math.random() * 100;

        particle.animate([
            { left: `${x}%`, top: `${y}%` },
            { left: `${targetX}%`, top: `${targetY}%` }
        ], {
            duration,
            easing: 'cubic-bezier(0.4, 0, 0.6, 1)'
        });

        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, duration);
    }

    // Pause quantum progress with message
    function pauseQuantumProgress(message) {
        clearInterval(progressInterval);
        statusText.textContent = message;

        // Resume after a delay
        setTimeout(() => {
            statusText.textContent = 'Resuming quantum entanglement...';
            progressInterval = setInterval(() => {
                currentProgress += Math.random() * 2;
                currentProgress = Math.min(currentProgress, 100);
                progressBar.style.width = `${currentProgress}%`;

                if (currentProgress >= 100) {
                    completeQuantumVerification();
                }
            }, 100);
        }, 2000 + Math.random() * 1000);
    }

    // Complete quantum verification
    function completeQuantumVerification() {
        clearInterval(progressInterval);
        clearInterval(particleInterval);

        // Determine success with 15% probability
        const success = Math.random() < quantumSuccess;

        // Update status
        statusText.textContent = success
            ? 'Quantum entanglement established successfully!'
            : 'Quantum entanglement failed.';

        // Display feedback
        feedbackElement.classList.remove('hidden', 'text-success', 'text-danger');

        if (success) {
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = 'Quantum verification successful! Your device is now quantum-entangled with our security system.';
            sounds.success.play();

            // Proceed to survey
            setTimeout(async () => {
                awardCoins(100);
                await showLoading("Finalizing quantum security protocols...");
                showStep(22);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);
        } else {
            // Increment attempt counter
            quantumAttempts++;

            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = `Quantum verification failed. Attempt ${quantumAttempts} of ${maxQuantumAttempts}. Please ensure you remain absolutely still during verification.`;
            sounds.error.play();

            // Reset for another attempt
            startButton.disabled = false;
            startButton.textContent = 'Try Again';

            // Update attempt counter
            attemptElement.textContent = `Attempt ${quantumAttempts} of ${maxQuantumAttempts}`;

            // Force success on the last attempt
            if (quantumAttempts >= maxQuantumAttempts) {
                quantumSuccess = 1.0; // 100% success on next attempt
            }
        }

        isRunning = false;
    }
}

// Initialize interpretive dance verification
function initDanceVerification() {
    const performButton = document.getElementById('perform-dance');
    const feedbackElement = document.getElementById('dance-feedback');

    performButton.addEventListener('click', async () => {
        sounds.click.play();

        // "Analyzing" dance
        performButton.disabled = true;
        feedbackElement.classList.remove('hidden', 'text-success', 'text-danger');
        feedbackElement.innerHTML = `
            <div class="flex items-center justify-center mb-3">
                <div class="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Analyzing dance movements...</span>
            </div>
        `;

        // Wait for "analysis"
        await new Promise(resolve => setTimeout(resolve, 2500));

        // Determine success based on random chance (25%)
        const success = Math.random() < danceSuccess;

        feedbackElement.classList.remove('text-primary');

        if (success) {
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = 'Dance verification successful! Your movements express excellent security consciousness.';
            sounds.success.play();

            // Proceed to next step
            setTimeout(async () => {
                awardCoins(80);
                await showLoading("Processing biometric dance patterns...");
                showStep(18);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            }, 1500);
        } else {
            feedbackElement.classList.add('text-danger');

            // Generate random failure reason
            const reasons = [
                "Your movements lacked sufficient expressiveness. Please dance with more security intent.",
                "Our AI detected a 17% deficiency in your firewall hand formation technique.",
                "Your clockwise spin was only 247° instead of the required 270°.",
                "Your 'breach prevention' pose conveyed insufficient commitment to cybersecurity.",
                "Dance timing analysis suggests uncertain rhythm, indicating potential verification fraud.",
                "Movement pattern analysis detected traces of non-security related dance influences.",
                "Your dance appears to be 23% below the required enthusiasm threshold."
            ];

            feedbackElement.textContent = reasons[Math.floor(Math.random() * reasons.length)];
            sounds.error.play();

            // Enable button for retry
            performButton.disabled = false;
        }
    });
}

// Pop-up notification system
const popups = [
    {
        id: 'sale-popup',
        title: '50% OFF SALE!',
        message: 'The shop is having a 50% off sale!!! Loan applications now receive 50% less coins!',
        icon: '🔥',
        color: '#FF6B6B',
        target: '#shop-button',
        delay: 15000
    },
    {
        id: 'binary-beats-popup',
        title: 'NEW MUSIC RELEASED!',
        message: 'The Binary Beats just released their new album "Recursive Melodies"! Listen to a preview below.',
        icon: '🎵',
        color: '#5D5CDE',
        delay: 30000,
        hasPlayButton: true
    },
    {
        id: 'elbow-database-popup',
        title: 'JOIN OUR DATABASE!',
        message: 'Your elbow shape is unique! Join our Global Elbow Print Database and receive a commemorative t-shirt.',
        icon: '💪',
        color: '#4CAF50',
        delay: 45000,
        targetStep: 13
    },
    {
        id: 'security-breach-popup',
        title: 'SECURITY ALERT!',
        message: 'Our systems have detected 487 login attempts from your location. This is normal and no cause for concern.',
        icon: '⚠️',
        color: '#FFC107',
        delay: 60000
    },
    {
        id: 'brain-scan-popup',
        title: 'BRAIN SCAN COMPLETE',
        message: 'Your passive brain scan is complete! Results: You think this verification process is "totally reasonable".',
        icon: '🧠',
        color: '#9C27B0',
        delay: 75000
    },
    {
        id: 'cookies-popup',
        title: 'COOKIE POLICY UPDATE',
        message: 'We\'ve updated our cookie policy to include actual cookies. A batch of oatmeal raisin has been dispatched to your location.',
        icon: '🍪',
        color: '#8B4513',
        delay: 90000
    },
    {
        id: 'eye-tracking-popup',
        title: 'EYE TRACKING ENABLED',
        message: 'We\'ve noticed you blinked 17 times in the last minute. This is 3.2 blinks above the acceptable security threshold.',
        icon: '👁️',
        color: '#00BCD4',
        delay: 105000
    },
    {
        id: 'subscription-popup',
        title: 'FREE TRIAL ENDING',
        message: 'Your free trial of Oxygen™ ends in 24 hours. Subscribe now to continue breathing at your current rate!',
        icon: '💨',
        color: '#607D8B',
        delay: 120000
    },
    {
        id: 'chair-posture-popup',
        title: 'POSTURE ALERT',
        message: 'Our chair sensors detect that you are slouching. Please sit up straight for optimal verification performance.',
        icon: '🪑',
        color: '#E91E63',
        delay: 135000
    },
    {
        id: 'quantum-popup',
        title: 'QUANTUM VERIFICATION',
        message: 'Your login credentials exist in a state of quantum superposition. They are simultaneously valid and invalid until observed.',
        icon: '⚛️',
        color: '#009688',
        delay: 150000
    },
    {
        id: 'terms-service-popup',
        title: 'TERMS OF SERVICE UPDATE',
        message: 'By continuing to verify your identity, you agree to name your firstborn child "SecuriFi Pro Max Plus Ultra".',
        icon: '📜',
        color: '#795548',
        delay: 165000
    },
    {
        id: 'battery-popup',
        title: 'BATTERY MONITORING',
        message: 'We\'ve detected your device is at 73% battery. Security verification requires minimum 74%. Please charge immediately.',
        icon: '🔋',
        color: '#FF9800',
        delay: 180000
    },
    {
        id: 'fingerprint-popup',
        title: 'FINGERPRINT ANALYSIS',
        message: 'Your fingerprint whorls indicate you\'re 87% more likely to prefer chocolate over vanilla. Verification adjusted accordingly.',
        icon: '👆',
        color: '#3F51B5',
        delay: 195000
    },
    {
        id: 'pet-verification-popup',
        title: 'PET VERIFICATION REQUIRED',
        message: 'Please hold your pet (cat, dog, iguana, etc.) up to the camera for additional identity confirmation.',
        icon: '🐱',
        color: '#FF5722',
        delay: 210000
    },
    {
        id: 'typing-speed-popup',
        title: 'TYPING SPEED ANALYSIS',
        message: 'Your typing pattern suggests you are either a world-class hacker or a very enthusiastic sloth. Further verification needed.',
        icon: '⌨️',
        color: '#CDDC39',
        delay: 225000
    }
];

// Track shown popups
let shownPopups = new Set();

// Show a popup
function showPopup(popup) {
    // Don't show if already shown
    if (shownPopups.has(popup.id)) return;

    // Don't show if we're targeting a specific step and not on that step
    if (popup.targetStep && currentStep !== popup.targetStep) return;

    // Create popup element
    const popupElement = document.createElement('div');
    popupElement.id = popup.id;
    popupElement.className = 'game-popup';
    popupElement.style.borderColor = popup.color;

    // Position the popup
    if (popup.target) {
        // Position near target element
        const targetElement = document.querySelector(popup.target);
        if (targetElement) {
            const targetRect = targetElement.getBoundingClientRect();
            popupElement.style.left = `${targetRect.right + 10}px`;
            popupElement.style.top = `${targetRect.top}px`;
        }
    } else {
        // Random position if no target
        const xPos = 20 + Math.random() * (window.innerWidth - 320);
        const yPos = 100 + Math.random() * (window.innerHeight - 200);
        popupElement.style.left = `${xPos}px`;
        popupElement.style.top = `${yPos}px`;
    }

    // Create play button content for Binary Beats popup
    let playButtonHtml = '';
    if (popup.hasPlayButton) {
        playButtonHtml = `
            <button id="play-binary-beats" class="w-full bg-primary text-white text-xs py-2 px-3 rounded mb-2 flex items-center justify-center">
                <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                </svg>
                Play demo (45 seconds)
            </button>
        `;
    }

    // Add content
    popupElement.innerHTML = `
        <div class="popup-close">×</div>
        <div class="flex items-start mb-2">
            <span class="text-xl mr-2">${popup.icon}</span>
            <h3 class="font-bold text-sm" style="color: ${popup.color}">${popup.title}</h3>
        </div>
        <p class="text-xs mb-2">${popup.message}</p>
        ${playButtonHtml}
        <button class="dismiss-popup bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-xs py-1 px-2 rounded w-full">
            Dismiss
        </button>
    `;

    // Add to DOM
    document.body.appendChild(popupElement);
    sounds.click.play();

    // Add to shown popups
    shownPopups.add(popup.id);

    // Add event listeners
    popupElement.querySelector('.popup-close').addEventListener('click', () => {
        popupElement.remove();
    });

    popupElement.querySelector('.dismiss-popup').addEventListener('click', () => {
        popupElement.remove();
    });

    // Add play button event listener for Binary Beats popup
    if (popup.hasPlayButton) {
        const playButton = popupElement.querySelector('#play-binary-beats');
        if (playButton) {
            let isPlaying = false;
            let audioContext = null;
            let gainNode = null;
            let oscillators = [];

            playButton.addEventListener('click', () => {
                if (isPlaying) return;

                isPlaying = true;
                playButton.classList.add('bg-opacity-70');
                playButton.innerHTML = `
                    <div class="flex items-center">
                        <div class="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                        <span>Playing...</span>
                    </div>
                `;

                // Create a more complex "music" sound
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                gainNode = audioContext.createGain();
                gainNode.gain.value = 0.3;
                gainNode.connect(audioContext.destination);

                // Create a "beat" effect
                const beatOscillator = audioContext.createOscillator();
                beatOscillator.type = 'sine';
                beatOscillator.frequency.value = 2;

                const beatGain = audioContext.createGain();
                beatGain.gain.value = 0.5;
                beatOscillator.connect(beatGain);

                // Create some synthesizers
                for (let i = 0; i < 3; i++) {
                    const osc = audioContext.createOscillator();
                    osc.type = ['sine', 'square', 'sawtooth'][i % 3];

                    // Different base frequencies for variety
                    const baseFreq = [220, 440, 110][i % 3];
                    osc.frequency.value = baseFreq;

                    // Modulate frequencies with the beat
                    beatGain.connect(osc.frequency);

                    // Apply some effects
                    const filter = audioContext.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.value = 1000;

                    // Create random notes over time
                    setInterval(() => {
                        if (Math.random() > 0.7) {
                            const note = Math.floor(Math.random() * 12);
                            const freq = baseFreq * Math.pow(2, note / 12);
                            osc.frequency.setValueAtTime(freq, audioContext.currentTime);

                            // Also randomize the filter
                            filter.frequency.setValueAtTime(500 + Math.random() * 2000, audioContext.currentTime);
                        }
                    }, 200);

                    // Connect everything
                    osc.connect(filter);
                    filter.connect(gainNode);

                    // Start oscillator
                    osc.start();
                    oscillators.push(osc);
                }

                // Start the beat
                beatOscillator.start();
                oscillators.push(beatOscillator);

                // Stop after 45 seconds
                setTimeout(() => {
                    // Stop all oscillators
                    oscillators.forEach(osc => {
                        try {
                            osc.stop();
                            osc.disconnect();
                        } catch (e) {
                            // Ignore any errors from already stopped oscillators
                        }
                    });

                    if (audioContext) {
                        audioContext.close();
                    }

                    // Reset button
                    isPlaying = false;
                    playButton.classList.remove('bg-opacity-70');
                    playButton.innerHTML = `
                        <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        Play demo (45 seconds)
                    `;
                }, 45000);
            });
        }
    }

    // Make popup draggable
    makeDraggable(popupElement);
}

// Make an element draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.style.cursor = 'move';

    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        // Get mouse position
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function dragTouchStart(e) {
        e.preventDefault();
        // Get touch position
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // Set element position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function elementTouchDrag(e) {
        e.preventDefault();
        // Calculate new position
        pos1 = pos3 - e.touches[0].clientX;
        pos2 = pos4 - e.touches[0].clientY;
        pos3 = e.touches[0].clientX;
        pos4 = e.touches[0].clientY;
        // Set element position
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // Stop moving when mouse/touch is released
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

// Schedule popup displays
function schedulePopups() {
    popups.forEach(popup => {
        setTimeout(() => {
            showPopup(popup);
        }, popup.delay);
    });
}

// When DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start scheduling popups
    schedulePopups();

    // Start timer
    startTimer();

    // Initialize circle canvas (for step 10)
    const { clearCanvas: clearCircleCanvas } = initCircleCanvas();

    // Initialize signature pad (for step 14)
    const { clearCanvas: clearSignaturePad, hasSignature, transformSignature } = initSignaturePad();

    // Initialize color sequence game (for step 16)
    initColorSequenceGame();

    // Initialize dance verification (for step 17)
    initDanceVerification();

    // Initialize rhythm game (for step 18)
    initRhythmGame();

    // Initialize connect dots game (for step 19)
    initConnectDots();

    // Initialize fridge verification (for step 20)
    initFridgeVerification();

    // Initialize quantum verification (for step 21)
    initQuantumVerification();

    // Shop button
    document.getElementById('shop-button').addEventListener('click', () => {
        sounds.click.play();
        openShopPanel();
    });

    document.getElementById('close-shop').addEventListener('click', () => {
        sounds.click.play();
        closeShopPanel();
    });

    // Shop color swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.dataset.color;
            if (canAffordUpgrade(25)) {
                purchaseUpgrade('color-change', 25);
                changeThemeColor(color);
            } else {
                alert("Not enough coins! You need 25 coins to change the theme color.");
            }
        });
    });

    // Loan button
    document.getElementById('take-loan-button').addEventListener('click', () => {
        sounds.click.play();
        closeShopPanel();
        showLoanApplication();
    });

    // Update progress bar
    function updateProgress(step) {
        const progressPercent = (step / 22) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercent}%`;
        document.getElementById('step-counter').textContent = `Step ${step} of 22`;

        // Update step indicators
        document.querySelectorAll('.progress-step').forEach((el, index) => {
            if (index + 1 <= step) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }

    // Initialize step 1 - Phone validation
    document.getElementById('begin-verification').addEventListener('click', async () => {
        const phone = document.getElementById('phone').value;
        const phoneRegex = /^\(\d{3}\) - \d{2}-\d{2}-\d{3}$/; // Format check only

        if (!phone || !phoneRegex.test(phone)) {
            document.getElementById('phone').classList.add('border-danger');
            showError('phone-error');
            return;
        }

        sounds.click.play();
        await showLoading("Initializing enhanced security protocol...");
        showStep(2);

        // Add skip button if available
        if (hasSkipStep && !usedSkipStep) {
            addSkipButton();
        }
    });

    // Step 2 - Name and Zip Code
    document.getElementById('submit-step-2').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const zip = document.getElementById('zip').value;

        if (!name || !zip || zip.length !== 2) {
            // Simplified validation
            if (!name) document.getElementById('name').classList.add('border-danger');
            if (!zip || zip.length !== 2) document.getElementById('zip').classList.add('border-danger');
            return;
        }

        sounds.click.play();
        await showLoading("Cross-referencing identity markers...");
        showStep(3);

        // Add skip button if available
        if (hasSkipStep && !usedSkipStep) {
            addSkipButton();
        }
    });

    // Step 3 - Hot Dog Verification
    document.getElementById('dog-true').addEventListener('click', () => {
        sounds.click.play();
        showError('dog-error');
    });

    document.getElementById('dog-false').addEventListener('click', async () => {
        sounds.click.play();
        sounds.success.play();
        awardCoins(15); // Award coins based on step
        await showLoading("Validating image recognition...");
        showStep(4);

        // Add skip button if available
        if (hasSkipStep && !usedSkipStep) {
            addSkipButton();
        }
    });

    // Step 4 - Binary Math
    document.getElementById('math-hint').addEventListener('click', () => {
        sounds.click.play();
        document.getElementById('math-hint-display').classList.toggle('hidden');
    });

    document.getElementById('submit-math').addEventListener('click', async () => {
        const answer = document.getElementById('math-answer').value.trim();

        if (answer === '1010') {
            sounds.click.play();
            sounds.success.play();
            awardCoins(20);
            await showLoading("Validating computational acuity...");
            showStep(5);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        } else {
            showError('math-error');
        }
    });

    // Step 5 - Identify Song
    let audioPlaying = false;
    let correctSong = Math.random() < 0.5 ? 1 : 2; // Randomly choose the "correct" song

    document.getElementById('play-song').addEventListener('click', () => {
        sounds.click.play();

        if (audioPlaying) return;

        audioPlaying = true;
        document.getElementById('audio-playing').classList.remove('hidden');

        // Play random static/beeping
        generateRandomNoise(3);

        setTimeout(() => {
            audioPlaying = false;
            document.getElementById('audio-playing').classList.add('hidden');
        }, 3000);
    });

    function handleSongSelection(selectedOption) {
        sounds.click.play();

        if (selectedOption === correctSong) {
            sounds.success.play();
            awardCoins(25);
            showLoading("Analyzing audio recognition capabilities...").then(() => {
                showStep(6);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            });
        } else {
            showError('song-error');
        }
    }

    document.getElementById('song-option-1').addEventListener('click', () => handleSongSelection(1));
    document.getElementById('song-option-2').addEventListener('click', () => handleSongSelection(2));

    // Step 6 - Backwards Alphabet CAPTCHA
    document.getElementById('submit-alphabet').addEventListener('click', async () => {
        const answer = document.getElementById('alphabet-answer').value.trim().toLowerCase();

        if (answer === 'zyxwvutsrqponmlkjihgfedcba') {
            sounds.click.play();
            sounds.success.play();
            awardCoins(30);
            await showLoading("Validating linguistic capabilities...");
            showStep(7);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        } else {
            showError('alphabet-error');
        }
    });

    // Step 7 - Privacy Agreement with uncheck box
    document.getElementById('uncheck-checkbox').addEventListener('change', (e) => {
        if (e.target.checked) {
            // Uncheck random checkboxes when this one is checked
            const checkboxes = document.querySelectorAll('.privacy-checkbox');

            // Uncheck 5-8 random checkboxes
            const toUncheck = Math.floor(Math.random() * 4) + 5;
            const indexes = [];

            while (indexes.length < toUncheck) {
                const idx = Math.floor(Math.random() * checkboxes.length);
                if (!indexes.includes(idx) && checkboxes[idx] !== e.target) {
                    indexes.push(idx);
                    checkboxes[idx].checked = false;
                }
            }
        }
    });

    document.getElementById('accept-privacy').addEventListener('click', async () => {
        sounds.click.play();

        // Only check the normal checkboxes, not the special "uncheck" box
        const checkboxes = document.querySelectorAll('.privacy-checkbox');
        let allChecked = true;

        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });

        if (allChecked) {
            sounds.success.play();
            awardCoins(35);
            await showLoading("Processing legal agreements...");
            showStep(8);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        } else {
            showError('privacy-error');
        }
    });

    // Step 8 - Mother's Maiden Name
    document.getElementById('submit-maiden').addEventListener('click', async () => {
        sounds.click.play();

        const maidenName = document.getElementById('maiden-name').value;

        if (maidenName) {
            sounds.success.play();
            awardCoins(40);
            await showLoading("Verifying genealogical records...");
            showStep(9);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        }
    });

    // Step 9 - Pet Name
    document.getElementById('submit-pet').addEventListener('click', async () => {
        sounds.click.play();

        const petName = document.getElementById('pet-name').value.trim();

        if (petName === 'My password is PASSWORD123') {
            sounds.success.play();
            awardCoins(45);
            await showLoading("Validating pet biometrics...");
            showStep(10);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        } else {
            petAttempt++;
            if (petAttempt >= 3) {
                document.getElementById('pet-hint').classList.remove('hidden');
            }
            showError('pet-error');
        }
    });

    // Step 10 - Circle Drawing
    document.getElementById('submit-circle').addEventListener('click', async () => {
        sounds.click.play();

        const feedbackElement = document.getElementById('circle-feedback');
        feedbackElement.classList.remove('hidden', 'text-success', 'text-danger');

        // Check if anything was drawn
        const canvas = document.getElementById('circle-canvas');
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        const hasDrawing = imageData.some(channel => channel !== 0);

        if (!hasDrawing) {
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = "You must draw something first.";
            sounds.error.play();
            return;
        }

        if (circleAttempt < maxCircleAttempts - 1) {
            feedbackElement.classList.add('text-danger');

            const feedbackMessages = [
                "That's more of an oval. Try again.",
                "Too angular. A circle has no corners.",
                "Our AI detects imperfections in the curvature.",
                "The circle must be more... circular.",
                "Not round enough. Please try again.",
                "The diameter varies too much. Try again.",
                "Our system detected 3.7% eccentricity. Must be less than 2%.",
                "The starting and ending points do not overlap precisely.",
                "The circle was drawn too quickly. Slow, deliberate strokes please.",
                "Circle is too small. It must be at least 60% of the canvas size.",
                "Circle is too large. It must be at most 80% of the canvas size.",
                "Drawing speed was inconsistent. Maintain steady velocity.",
                "Our quantum algorithm detects insufficient circularity."
            ];

            feedbackElement.textContent = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

            sounds.error.play();
            circleAttempt++;
            document.getElementById('attempt-counter').textContent = `Attempt ${circleAttempt} of ${maxCircleAttempts}`;
            clearCircleCanvas();
        } else if (circleAttempt === maxCircleAttempts - 1) {
            feedbackElement.classList.add('text-warning');
            feedbackElement.textContent = "Almost there... one more try!";

            sounds.error.play();
            circleAttempt++;
            document.getElementById('attempt-counter').textContent = `Attempt ${circleAttempt} of ${maxCircleAttempts}`;
            clearCircleCanvas();
        } else {
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = "Close enough!";

            sounds.success.play();
            awardCoins(50);
            await showLoading("Analyzing geometric precision...");
            showStep(11);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        }
    });

    // Step 11 - Yell Verification
    document.getElementById('record-button').addEventListener('click', async () => {
        sounds.click.play();

        const recordButton = document.getElementById('record-button');
        const recordingStatus = document.getElementById('recording-status');
        const yellResult = document.getElementById('yell-result');

        recordButton.disabled = true;
        recordingStatus.classList.remove('hidden');
        yellResult.classList.add('hidden');

        // Start 3 second countdown
        let countdown = 3;
        document.querySelector('.countdown').textContent = countdown;

        const countdownInterval = setInterval(() => {
            countdown--;
            document.querySelector('.countdown').textContent = countdown;

            if (countdown <= 0) {
                clearInterval(countdownInterval);

                // Simulate recording completion
                setTimeout(async () => {
                    recordingStatus.classList.add('hidden');
                    recordButton.disabled = false;

                    // Random success rate (25% normally)
                    const successRate = 0.25;

                    if (Math.random() < successRate) {
                        yellResult.textContent = "Yell verified successfully!";
                        yellResult.classList.remove('hidden', 'text-danger');
                        yellResult.classList.add('text-success');

                        sounds.success.play();
                        awardCoins(55);
                        await showLoading("Analyzing vocal biometrics...");
                        showStep(12);

                        // Add skip button if available
                        if (hasSkipStep && !usedSkipStep) {
                            addSkipButton();
                        }
                    } else {
                        yellResult.textContent = "We couldn't hear you. Please yell LOUDER!";
                        yellResult.classList.remove('hidden', 'text-success');
                        yellResult.classList.add('text-danger');

                        sounds.error.play();
                    }
                }, 500);
            }
        }, 1000);
    });

    // Step 12 - Device Rotation
    document.getElementById('rotation-done').addEventListener('click', async () => {
        sounds.click.play();

        // Visually rotate the device icon and diagram
        const deviceIcon = document.getElementById('device-icon');
        deviceIcon.style.transform = 'rotate(37deg)';

        // Also rotate the diagram in the opposite direction to make it confusing
        const diagram = document.getElementById('device-diagram');
        diagram.style.transform = 'rotate(-15deg)';

        // Success rate (25% normally)
        const successRate = 0.25;

        if (Math.random() < successRate) {
            sounds.success.play();
            awardCoins(60);
            await showLoading("Calibrating gyroscopic coordinates...");
            showStep(13);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        } else {
            showError('rotation-error');
        }
    });

    // Step 13 - Elbow Verification
    document.getElementById('elbow-positioned').addEventListener('click', async () => {
        sounds.click.play();

        const elbowScanArea = document.getElementById('elbow-scan-area');
        const scanMessage = document.getElementById('scan-message');
        const elbowPositioned = document.getElementById('elbow-positioned');
        const elbowResult = document.getElementById('elbow-result');

        // Start scanning animation
        elbowScanArea.classList.add('scan-animation');
        scanMessage.textContent = "Scanning your elbow...";
        elbowPositioned.disabled = true;

        // Simulate scanning for 3 seconds
        setTimeout(async () => {
            elbowScanArea.classList.remove('scan-animation');
            elbowPositioned.disabled = false;

            // Success rate (50% normally)
            const successRate = 0.5;

            if (Math.random() < successRate) {
                elbowResult.textContent = "Elbow biometrics verified successfully!";
                elbowResult.classList.remove('hidden', 'text-danger');
                elbowResult.classList.add('text-success');

                sounds.success.play();
                awardCoins(65);
                await showLoading("Processing biometric markers...");
                showStep(14);

                // Add skip button if available
                if (hasSkipStep && !usedSkipStep) {
                    addSkipButton();
                }
            } else {
                elbowResult.textContent = "Elbow not recognized. Please try again with a different elbow angle.";
                elbowResult.classList.remove('hidden', 'text-success');
                elbowResult.classList.add('text-danger');

                sounds.error.play();
            }
        }, 3000);
    });

    // Add "Improve" signature button behavior
    document.getElementById('flip-signature').addEventListener('click', () => {
        sounds.click.play();
        if (hasSignature()) {
            const message = transformSignature();

            // Show feedback
            const feedbackElement = document.getElementById('signature-feedback');
            feedbackElement.textContent = message;
            feedbackElement.classList.remove('hidden', 'text-danger');
            feedbackElement.classList.add('text-primary');

            // Hide feedback after 2 seconds
            setTimeout(() => {
                feedbackElement.classList.add('hidden');
            }, 2000);
        }
    });

    document.getElementById('submit-signature').addEventListener('click', async () => {
        sounds.click.play();

        const feedbackElement = document.getElementById('signature-feedback');
        feedbackElement.classList.remove('hidden', 'text-success', 'text-danger', 'text-primary');

        if (!hasSignature()) {
            feedbackElement.classList.add('text-danger');
            feedbackElement.textContent = "You must provide a signature.";
            sounds.error.play();
            return;
        }

        // First 2 attempts always fail
        if (signatureAttempt < 3) {
            feedbackElement.classList.add('text-danger');

            const feedbackMessages = [
                "Signature is too messy. Please make it neater.",
                "Our AI cannot verify this signature. Try again with more precision.",
                "The signature appears rushed. Please take your time.",
                "Signature does not meet our quality standards. Try again.",
                "Please maintain consistent pressure throughout the signature.",
                "The signature lacks the required flourish. Please add more style.",
                "Our system detected 7.3% variance from expected signature patterns."
            ];

            feedbackElement.textContent = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];

            sounds.error.play();
            signatureAttempt++;
            clearSignaturePad();
        } else {
            feedbackElement.classList.add('text-success');
            feedbackElement.textContent = "Signature verified!";

            sounds.success.play();
            awardCoins(70);
            await showLoading("Finalizing verification protocol...");
            showStep(15);

            // Add skip button if available
            if (hasSkipStep && !usedSkipStep) {
                addSkipButton();
            }
        }
    });

    // Step 15 - Satisfaction Survey
    document.querySelectorAll('.survey-option').forEach(option => {
        option.addEventListener('click', function() {
            // Clear all selected options
            document.querySelectorAll('.survey-option').forEach(opt => {
                opt.classList.remove('selected');
            });

            // Select this option
            this.classList.add('selected');

            // Check the radio button
            const radio = this.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });

    document.getElementById('survey-yes').addEventListener('click', function() {
        this.classList.add('bg-primary', 'text-white');
        document.getElementById('survey-no').classList.remove('bg-primary', 'text-white');
        document.getElementById('survey-no').classList.add('bg-gray-300', 'dark:bg-gray-700');
    });

    document.getElementById('survey-no').addEventListener('click', function() {
        this.classList.add('bg-primary', 'text-white');
        document.getElementById('survey-yes').classList.remove('bg-primary', 'text-white');
        document.getElementById('survey-yes').classList.add('bg-gray-300', 'dark:bg-gray-700');
    });

    // Continue to the next step after survey
    document.getElementById('survey-submit').addEventListener('click', async () => {
        sounds.click.play();
        sounds.success.play();
        awardCoins(75);
        await showLoading("Processing feedback data...");

        // Show success screen
        document.querySelectorAll('.step-screen').forEach(screen => screen.classList.add('hidden'));
        document.getElementById('success-screen').classList.remove('hidden');
        document.getElementById('progress-tracker').classList.add('hidden');

        // Stop timer
        stopTimer();

        // Award bonus coins for completion
        awardCoins(200);

        sounds.complete.play();

        // Start countdown for logout
        startCountdown(10, 'countdown', () => {
            document.body.innerHTML = `
                <div class="min-h-screen flex items-center justify-center p-4 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
                    <div class="text-center">
                        <h1 class="text-3xl font-bold mb-4">Logged Out</h1>
                        <p class="mb-6">You have been logged out for security reasons.</p>
                        <p class="text-sm opacity-70">Refresh the page to start over.</p>
                        <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <p class="font-bold mb-2">Your Final Stats</p>
                            <p>Total verification time: <span class="font-mono">${document.getElementById('final-time').textContent}</span></p>
                            <p>Security coins earned: <span class="font-bold">${coins}</span></p>
                        </div>
                    </div>
                </div>
            `;
        });
    });

    // Cancel loan button
    document.getElementById('cancel-loan').addEventListener('click', () => {
        sounds.click.play();
        endLoanApplication(false);
    });

    // Loan success close button
    document.getElementById('close-loan-success').addEventListener('click', () => {
        sounds.click.play();
        endLoanApplication(false); // We already added the coins
    });

    // CAPTCHA submission
    document.getElementById('submit-captcha').addEventListener('click', async () => {
        sounds.click.play();

        const userInput = document.getElementById('captcha-answer').value;

        if (userInput === window.captchaAnswer) {
            // Show a loan-specific loading overlay
            // First hide the loan application steps
            document.querySelectorAll('.loan-step').forEach(step => {
                step.classList.remove('active');
            });

            // Show loading screen
            await showLoading("Validating CAPTCHA response...");

            // After loading, update to next step
            currentLoanStep++;
            updateLoanProgress();

            // Set up the next step
            setupSlidingPuzzle();
        } else {
            showError('captcha-error');
            setupCaptcha(); // Generate a new CAPTCHA
        }
    });

    // Puzzle submission
    document.getElementById('submit-puzzle').addEventListener('click', async () => {
        sounds.click.play();

        if (isPuzzleSolved()) {
            // Hide loan steps and show loading
            document.querySelectorAll('.loan-step').forEach(step => {
                step.classList.remove('active');
            });

            await showLoading("Validating spatial reasoning capabilities...");

            // After loading, proceed to next step
            currentLoanStep++;
            updateLoanProgress();

            // Set up the next step
            setupMathProblem();
        } else {
            showError('puzzle-error');
        }
    });

    // Math problem submission
    document.getElementById('submit-math-loan').addEventListener('click', async () => {
        sounds.click.play();

        const userAnswer = parseFloat(document.getElementById('math-answer-loan').value);

        // Allow for a small margin of error due to rounding
        if (!isNaN(userAnswer) && Math.abs(userAnswer - window.mathAnswer) < 0.01) {
            clearInterval(mathProblemTimer);

            // Hide loan steps and show loading
            document.querySelectorAll('.loan-step').forEach(step => {
                step.classList.remove('active');
            });

            await showLoading("Validating mathematical intelligence...");

            // After loading, proceed to success
            currentLoanStep++;
            updateLoanProgress();

            // Success screen is shown by updateLoanProgress
            endLoanApplication(true);
        } else {
            showError('math-error-loan');
        }
    });

    // Input focus/blur styling
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.remove('border-danger');
            input.classList.add('border-primary');
        });

        input.addEventListener('blur', () => {
            input.classList.remove('border-primary');
        });
    });

    // Initialize event listeners for the shop upgrade buttons
    document.querySelectorAll('[data-upgrade]').forEach(button => {
        button.addEventListener('click', () => {
            const upgradeType = button.dataset.upgrade;
            let cost;

            switch (upgradeType) {
                case 'skip-step':
                    cost = 1200;
                    break;
                case 'better-pen':
                    cost = 800;
                    break;
                case 'verification-hint':
                    cost = 500;
                    break;
                case 'time-dilation':
                    cost = 25;
                    break;
                default:
                    cost = 0;
            }

            // Check if user has enough coins
            if (!canAffordUpgrade(cost)) {
                // Show not enough coins message
                showPurchaseModal(`Not enough coins!`, `This upgrade costs ${cost} coins, but you only have ${coins} coins.`, false);
                return;
            }

            // For time dilation, start the relativity quiz instead of direct purchase
            if (upgradeType === 'time-dilation') {
                startRelativityQuiz();
                return;
            }

            // Show confirmation for other upgrades
            showPurchaseModal(
                `Confirm Purchase`,
                `Are you sure you want to spend ${cost} coins on this upgrade?`,
                true,
                () => {
                    purchaseUpgrade(upgradeType, cost);
                    hidePurchaseModal();
                }
            );
        });
    });

    // Display purchase confirmation modal
    function showPurchaseModal(title, message, showConfirm, confirmCallback = null) {
        // Check if modal already exists, if not create it
        let modal = document.getElementById('purchase-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'purchase-modal';
            modal.className = 'fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4';
            document.body.appendChild(modal);
        }

        // Set modal content
        modal.innerHTML = `
            <div class="bg-light-card dark:bg-dark-card rounded-xl p-6 max-w-sm w-full shadow-lg">
                <h3 class="text-xl font-bold mb-4">${title}</h3>
                <p class="mb-6">${message}</p>
                <div class="flex ${showConfirm ? 'justify-between' : 'justify-end'}">
                    ${showConfirm ? `<button id="confirm-purchase" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">Confirm</button>` : ''}
                    <button id="cancel-purchase" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">Close</button>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('cancel-purchase').addEventListener('click', () => {
            hidePurchaseModal();
        });

        if (showConfirm && confirmCallback) {
            document.getElementById('confirm-purchase').addEventListener('click', confirmCallback);
        }
    }

    // Hide purchase modal
    function hidePurchaseModal() {
        const modal = document.getElementById('purchase-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Start relativity quiz
    function startRelativityQuiz() {
        // Create and show the quiz modal
        let quizModal = document.createElement('div');
        quizModal.id = 'relativity-quiz-modal';
        quizModal.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4';

        // Create the questions with advanced relativity concepts
        const questions = [
            {
                question: "Calculate the Lorentz factor (γ) for an object moving at 0.8c relative to an observer. Express your answer as a decimal rounded to two places.",
                hint: "The Lorentz factor is defined as: γ = 1/√(1-v²/c²)",
                correctAnswer: "1.67",
                explanation: "γ = 1/√(1-(0.8)²) = 1/√(1-0.64) = 1/√0.36 = 1/0.6 = 1.67"
            },
            {
                question: "If time dilation causes a clock on a spaceship moving at 0.9c to tick at half the rate of a stationary observer, what is the actual Lorentz factor (γ) for this scenario? Express your answer as a decimal.",
                hint: "If a moving clock ticks at half rate, then γ = 2",
                correctAnswer: "2.29",
                explanation: "When γ = 2, we solve: 2 = 1/√(1-v²/c²). We were given v = 0.9c, so γ = 1/√(1-0.81) = 1/√0.19 = 1/0.436 = 2.29"
            },
            {
                question: "According to the equivalence principle in General Relativity, what is the nature of the gravitational field inside an elevator that is freely falling in a gravitational field? Your answer should be one word.",
                hint: "Think about what an observer would experience while in free-fall",
                correctAnswer: "zero",
                alternativeAnswers: ["0", "none", "absent", "nonexistent"],
                explanation: "According to the equivalence principle, an observer in free-fall experiences no gravitational field (weightlessness), just as if they were in deep space."
            }
        ];

        let currentQuestion = 0;
        let correctAnswers = 0;

        function renderQuestion() {
            const q = questions[currentQuestion];

            quizModal.innerHTML = `
                <div class="bg-light-card dark:bg-dark-card rounded-xl p-6 max-w-md w-full shadow-lg overflow-y-auto max-h-[90vh]">
                    <h3 class="text-xl font-bold mb-2">Time Dilation Upgrade: Relativity Quiz</h3>
                    <p class="mb-4 text-sm">Answer these extremely challenging questions to prove your understanding of relativity and earn the Time Dilation upgrade.</p>

                    <div class="mb-4 p-2 bg-primary bg-opacity-10 rounded-lg">
                        <span class="font-medium">Question ${currentQuestion + 1} of ${questions.length}</span>
                    </div>

                    <p class="font-medium mb-4">${q.question}</p>

                    <div class="mb-4">
                        <input type="text" id="quiz-answer" placeholder="Enter your answer" class="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-dark-bg">
                    </div>

                    <button id="show-hint" class="text-primary text-sm mb-6 underline">Show Hint</button>
                    <div id="hint-text" class="mb-6 p-2 bg-warning bg-opacity-10 rounded-lg text-sm hidden">
                        ${q.hint}
                    </div>

                    <div id="answer-feedback" class="mb-6 p-3 rounded-lg hidden">
                        <!-- Feedback will be inserted here -->
                    </div>

                    <div class="flex justify-between">
                        <button id="quit-quiz" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                        <button id="submit-answer" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                            Submit Answer
                        </button>
                    </div>
                </div>
            `;

            // Add event listeners
            document.getElementById('quit-quiz').addEventListener('click', () => {
                quizModal.remove();
            });

            document.getElementById('show-hint').addEventListener('click', () => {
                document.getElementById('hint-text').classList.toggle('hidden');
            });

            document.getElementById('submit-answer').addEventListener('click', checkAnswer);

            // Handle Enter key on input
            document.getElementById('quiz-answer').addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    checkAnswer();
                }
            });
        }

        function checkAnswer() {
            const q = questions[currentQuestion];
            const userAnswer = document.getElementById('quiz-answer').value.trim().toLowerCase();
            const feedback = document.getElementById('answer-feedback');

            feedback.classList.remove('hidden', 'bg-success-bg-opacity-20', 'bg-danger-bg-opacity-20');

            // Check for correct answer or alternatives
            let isCorrect = false;

            if (userAnswer === q.correctAnswer.toLowerCase()) {
                isCorrect = true;
            } else if (q.alternativeAnswers && q.alternativeAnswers.some(alt => alt.toLowerCase() === userAnswer)) {
                isCorrect = true;
            }

            if (isCorrect) {
                feedback.classList.add('bg-success', 'bg-opacity-20');
                feedback.innerHTML = `
                    <p class="font-medium text-success">Correct!</p>
                    <p class="mt-2 text-sm">${q.explanation}</p>
                `;

                correctAnswers++;
                sounds.success.play();

                // Disable input and button
                document.getElementById('quiz-answer').disabled = true;
                document.getElementById('submit-answer').disabled = true;

                // Add continue button
                const continueBtn = document.createElement('button');
                continueBtn.className = 'px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors mt-4 w-full';
                continueBtn.textContent = 'Continue';
                continueBtn.addEventListener('click', () => {
                    currentQuestion++;

                    if (currentQuestion < questions.length) {
                        renderQuestion();
                    } else {
                        // Quiz is complete
                        showQuizResults();
                    }
                });

                feedback.appendChild(continueBtn);
            } else {
                feedback.classList.add('bg-danger', 'bg-opacity-20');
                feedback.innerHTML = `
                    <p class="font-medium text-danger">Incorrect.</p>
                    <p class="mt-2 text-sm">Please try again or use the hint.</p>
                `;

                sounds.error.play();
            }
        }

        function showQuizResults() {
            const allCorrect = correctAnswers === questions.length;

            quizModal.innerHTML = `
                <div class="bg-light-card dark:bg-dark-card rounded-xl p-6 max-w-md w-full shadow-lg">
                    <h3 class="text-xl font-bold mb-2">Quiz Results</h3>
                    <p class="mb-6">You got ${correctAnswers} out of ${questions.length} questions correct.</p>

                    <div class="p-4 rounded-lg mb-6 ${allCorrect ? 'bg-success bg-opacity-20' : 'bg-warning bg-opacity-20'}">
                        <p class="font-medium ${allCorrect ? 'text-success' : 'text-warning'}">
                            ${allCorrect
                                ? 'Congratulations! You have demonstrated a deep understanding of relativity theory.'
                                : 'Unfortunately, you need to answer all questions correctly to earn the Time Dilation upgrade.'}
                        </p>
                    </div>

                    <div class="flex justify-between">
                        ${allCorrect
                            ? `<button id="confirm-time-dilation" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                                   Purchase Time Dilation (25 coins)
                               </button>`
                            : `<button id="retry-quiz" class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                                   Try Again
                               </button>`}
                        <button id="close-quiz-results" class="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            `;

            // Add event listeners
            document.getElementById('close-quiz-results').addEventListener('click', () => {
                quizModal.remove();
            });

            if (allCorrect) {
                document.getElementById('confirm-time-dilation').addEventListener('click', () => {
                    // Purchase the upgrade
                    purchaseTimeDilation(25);
                    quizModal.remove();
                });
            } else {
                document.getElementById('retry-quiz').addEventListener('click', () => {
                    // Reset quiz
                    currentQuestion = 0;
                    correctAnswers = 0;
                    renderQuestion();
                });
            }
        }

        // Start the quiz
        document.body.appendChild(quizModal);
        renderQuestion();
    }

    // Purchase time dilation upgrade
    function purchaseTimeDilation(cost = 25) { // Set default cost to 25
        // Check if can afford it
        if (!canAffordUpgrade(cost)) {
            showPurchaseModal('Not enough coins', `This upgrade costs ${cost} coins, but you only have ${coins} coins.`, false);
            return false;
        }

        // Deduct coins
        coins -= cost;
        document.getElementById('coins-count').textContent = coins;
        document.getElementById('shop-coins-count').textContent = coins;
        document.getElementById('final-coins').textContent = coins;

        // Apply upgrade
        hasTimeDilation = true;
        activateTimeDilation();

        sounds.complete.play();

        // Show success message
        showPurchaseModal(
            'Time Dilation Activated!',
            'You have successfully activated Time Dilation! Time will now pass more slowly, giving you more time to complete verification.',
            false
        );

        return true;
    }

    // Activate time dilation
    function activateTimeDilation() {
        // Slow down the timer by making the interval longer
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 20); // 20ms instead of 10ms - time runs at half speed

        // Update UI to show time dilation is active
        const timerElement = document.getElementById('timer');
        timerElement.classList.add('text-warning');
        timerElement.parentElement.classList.add('border-2', 'border-warning');

        // Add a visual indicator
        const timerContainer = timerElement.parentElement;
        const dilationIndicator = document.createElement('div');
        dilationIndicator.className = 'absolute -top-2 -right-2 bg-warning text-xs px-1 rounded-full text-white';
        dilationIndicator.textContent = '0.5x';
        dilationIndicator.style.fontSize = '0.6rem';

        // Make the timer container position relative for absolute positioning
        timerContainer.style.position = 'relative';
        timerContainer.appendChild(dilationIndicator);
    }

    // Bind the Enter key to submit buttons
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // Find the active step
            const activeStep = document.querySelector('.step-screen:not(.hidden)');
            if (activeStep) {
                // Find the submit button in the active step
                const submitButton = activeStep.querySelector('button[id*="submit"], button[id*="begin"], button[id*="accept"], button[id*="verify"]');
                if (submitButton) {
                    e.preventDefault();
                    submitButton.click();
                }
            }

            // Check if we're in a loan application step
            if (inLoanApplication) {
                const activeLoanStep = document.querySelector('.loan-step.active');
                if (activeLoanStep) {
                    // Find the submit button in the active loan step
                    const loanSubmitButton = activeLoanStep.querySelector('button[id*="submit"]');
                    if (loanSubmitButton) {
                        e.preventDefault();
                        loanSubmitButton.click();
                    }
                }
            }
        }
    });
});
