// Main JavaScript for ArtNest

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initApp();
});

// Global variables
let currentScreen = 'welcome-screen';
let activeTimer = null;
let currentDrawingColor = '#B6DCFE';
let currentBrushSize = 15;
let isDrawing = false;
let poeticTitles = [
    "floating clouds",
    "gentle whispers",
    "hidden stars",
    "morning light",
    "dancing shadows",
    "soft river",
    "quiet thoughts",
    "reaching light",
    "singing rain",
    "healing colors"
];

let artPrompts = [
    "Draw what makes you feel calm today",
    "Use colors to express how your mind feels",
    "Create shapes that represent your thoughts",
    "Draw your safe place",
    "Express a feeling without using faces",
    "Draw something that gives you strength",
    "Create a visual pattern that soothes you",
    "Draw your emotions as weather",
    "Create a place you'd like to visit in your mind"
];

let poetryPrompts = [
    "Write as if you were whispering to the stars",
    "What does your mind sound like today?",
    "Write a poem without using the word 'I'",
    "Describe a color you've never seen",
    "Write to your younger self",
    "Create words for a feeling that has no name",
    "Write about the space between thoughts",
    "If your mind were a room, what would it contain?",
    "Write from the perspective of your breath"
];

let musicPrompts = [
    "Create a sound landscape for your inner peace",
    "Build sounds that match your current energy",
    "Layer sounds that help you feel grounded",
    "Create a rhythm that matches your heartbeat",
    "Mix sounds that remind you of safety",
    "Create a sonic journey from tension to release",
    "Build a soundscape that helps you breathe deeper",
    "Create sounds that feel like gentle support"
];

let photoPrompts = [
    "Find something that makes you feel connected",
    "Capture a small detail others might miss",
    "Take a photo of something that represents quiet",
    "Find and capture an unexpected pattern",
    "Photograph something that represents how you feel",
    "Capture light in an interesting way",
    "Find a color that speaks to you today",
    "Photograph something that represents growth"
];

let celebrationMessages = [
    "You made space for your soul today",
    "Your expression matters, even when it's just for you",
    "Creating is a form of gentle rebellion",
    "You've honored your inner world today",
    "Each creation is a moment of presence",
    "Your art exists because you do - that's enough",
    "You've created a moment of connection with yourself",
    "This is your story, told your way"
];

// Initialize the app
function initApp() {
    // Set up event listeners
    setupNavigation();
    setupWelcomeScreen();
    setupVisualArtScreen();
    setupPoetryScreen();
    setupMusicScreen();
    setupPhotoScreen();
    setupArtNestScreen();
    setupModals();
    
    // Display initial mascot message
    updateMascot("Welcome to your creative sanctuary");
    
    // Load saved nest name
    const nestName = localStorage.getItem('nestName');
    if (nestName) {
        document.getElementById('nest-name-input').value = nestName;
    }
    
    // Generate initial poetic title
    generatePoeticTitle();
}

// Setup navigation between screens
function setupNavigation() {
    // Back buttons
    document.querySelectorAll('.back-button').forEach(button => {
        button.addEventListener('click', () => {
            navigateToScreen('welcome-screen');
        });
    });
    
    // Path selection cards
    document.querySelectorAll('.path-card').forEach(card => {
        card.addEventListener('click', () => {
            const path = card.getAttribute('data-path');
            navigateToScreen(`${path}-screen`);
            
            // Update mascot message based on selected path
            const mascotMessages = {
                'visual-art': "Your expression is perfect just as it is",
                'poetry': "Your words carry the universe within them",
                'music': "The sounds you create are extensions of your soul",
                'photography': "Your perspective captures moments others might miss",
                'movement': "Your movement tells stories words cannot",
                'collage': "Each piece you combine creates new meaning"
            };
            
            updateMascot(mascotMessages[path]);
            
            // Generate appropriate prompt
            if (path === 'visual-art') {
                document.getElementById('art-prompt').textContent = getRandomItem(artPrompts);
            } else if (path === 'poetry') {
                document.getElementById('poetry-prompt').textContent = getRandomItem(poetryPrompts);
            } else if (path === 'music') {
                document.getElementById('music-prompt').textContent = getRandomItem(musicPrompts);
            } else if (path === 'photography') {
                document.getElementById('photo-prompt').textContent = getRandomItem(photoPrompts);
            }
        });
    });
    
    // Art Nest button
    document.getElementById('visit-nest').addEventListener('click', () => {
        navigateToScreen('art-nest-screen');
        updateMascot("Each creation is a part of your story, told your way");
        loadCreations();
    });
}

// Navigate to a specific screen
function navigateToScreen(screenId) {
    // Hide current screen
    document.getElementById(currentScreen).classList.remove('active');
    
    // Show new screen
    document.getElementById(screenId).classList.add('active');
    
    // Update current screen reference
    currentScreen = screenId;
    
    // Handle special cases for specific screens
    if (screenId === 'visual-art-screen') {
        setupCanvas();
    }
}

// Setup Welcome Screen functionality
function setupWelcomeScreen() {
    // Generate poetic title button
    document.getElementById('generate-title').addEventListener('click', generatePoeticTitle);
    
    // Emotion submission
    document.getElementById('emotion-submit').addEventListener('click', processEmotion);
    document.getElementById('emotion').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processEmotion();
        }
    });
}

// Generate a new poetic title
function generatePoeticTitle() {
    const poeticPhrase = document.getElementById('poetic-phrase');
    poeticPhrase.textContent = getRandomItem(poeticTitles);
    poeticPhrase.classList.add('fade-in');
    
    setTimeout(() => {
        poeticPhrase.classList.remove('fade-in');
    }, 500);
}

// Process user's emotion input
function processEmotion() {
    const emotionInput = document.getElementById('emotion');
    const emotion = emotionInput.value.trim().toLowerCase();
    
    if (!emotion) return;
    
    // Simple emotion-based suggestions
    let suggestion = "";
    let pathSuggestion = "";
    
    if (emotion.includes('sad') || emotion.includes('blue') || emotion.includes('down')) {
        suggestion = "Creating with blue and gentle shapes might help express this feeling";
        pathSuggestion = "visual-art";
    } else if (emotion.includes('anxious') || emotion.includes('nervous') || emotion.includes('stress')) {
        suggestion = "Rhythmic poetry or flowing sounds can help ground anxious energy";
        pathSuggestion = "music";
    } else if (emotion.includes('numb') || emotion.includes('empty') || emotion.includes('nothing')) {
        suggestion = "Photography can help reconnect with the world around you";
        pathSuggestion = "photography";
    } else if (emotion.includes('confused') || emotion.includes('chaotic') || emotion.includes('overwhelm')) {
        suggestion = "Writing can help organize thoughts when they feel scattered";
        pathSuggestion = "poetry";
    } else if (emotion.includes('happy') || emotion.includes('joy') || emotion.includes('good')) {
        suggestion = "Visual art can help amplify and celebrate your positive feelings";
        pathSuggestion = "visual-art";
    } else {
        suggestion = "Any creative expression can help you process how you're feeling";
        
        // Default to a random path if we don't recognize the emotion
        const paths = ['visual-art', 'poetry', 'music', 'photography'];
        pathSuggestion = paths[Math.floor(Math.random() * paths.length)];
    }
    
    // Update mascot with suggestion
    updateMascot(suggestion);
    
    // Highlight the suggested path card
    document.querySelectorAll('.path-card').forEach(card => {
        if (card.getAttribute('data-path') === pathSuggestion) {
            card.classList.add('pulse');
            setTimeout(() => {
                card.classList.remove('pulse');
            }, 2000);
        }
    });
    
    // Clear input
    emotionInput.value = '';
}

// Setup Visual Art Screen functionality
function setupVisualArtScreen() {
    // New art prompt button
    document.getElementById('new-art-prompt').addEventListener('click', () => {
        document.getElementById('art-prompt').textContent = getRandomItem(artPrompts);
    });
    
    // Set timer button
    document.getElementById('set-timer').addEventListener('click', () => {
        openTimerModal('drawing');
    });
    
    // Clear canvas button
    document.getElementById('clear-canvas').addEventListener('click', () => {
        const canvas = document.getElementById('drawing-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    
    // Save artwork button
    document.getElementById('save-artwork').addEventListener('click', () => {
        const canvas = document.getElementById('drawing-canvas');
        if (isCanvasEmpty(canvas)) {
            updateMascot("Try adding something to your canvas first");
            return;
        }
        
        saveCreation('visual-art', canvas.toDataURL());
        showCelebration();
    });
    
    // Color palette
    document.querySelectorAll('.color').forEach(color => {
        color.addEventListener('click', () => {
            document.querySelectorAll('.color').forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            currentDrawingColor = color.style.backgroundColor;
        });
    });
    
    // Brush sizes
    document.querySelectorAll('.brush').forEach(brush => {
        brush.addEventListener('click', () => {
            document.querySelectorAll('.brush').forEach(b => b.classList.remove('active'));
            brush.classList.add('active');
            currentBrushSize = parseInt(brush.getAttribute('data-size'));
        });
    });
    
    // Activate first color and medium brush by default
    document.querySelector('.color').classList.add('active');
    document.querySelector('.brush.medium').classList.add('active');
}

// Setup canvas for drawing
function setupCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Clear any previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Drawing events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', stopDrawing);
    
    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = currentBrushSize;
        ctx.strokeStyle = currentDrawingColor;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }
}

// Check if canvas is empty
function isCanvasEmpty(canvas) {
    const ctx = canvas.getContext('2d');
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    // Check if all pixel alpha values are 0 (transparent)
    for (let i = 3; i < pixelData.length; i += 4) {
        if (pixelData[i] !== 0) return false;
    }
    
    return true;
}

// Setup Poetry Screen functionality
function setupPoetryScreen() {
    // New poetry prompt button
    document.getElementById('new-poetry-prompt').addEventListener('click', () => {
        document.getElementById('poetry-prompt').textContent = getRandomItem(poetryPrompts);
    });
    
    // Set timer button
    document.getElementById('poetry-set-timer').addEventListener('click', () => {
        openTimerModal('poetry');
    });
    
    // Clear poetry button
    document.getElementById('clear-poetry').addEventListener('click', () => {
        document.getElementById('poetry-textarea').value = '';
    });
    
    // Save poetry button
    document.getElementById('save-poetry').addEventListener('click', () => {
        const poetryText = document.getElementById('poetry-textarea').value.trim();
        
        if (!poetryText) {
            updateMascot("Try writing something first");
            return;
        }
        
        saveCreation('poetry', poetryText);
        showCelebration();
    });
}

// Setup Music Screen functionality
function setupMusicScreen() {
    // New music prompt button
    document.getElementById('new-music-prompt').addEventListener('click', () => {
        document.getElementById('music-prompt').textContent = getRandomItem(musicPrompts);
    });
    
    // Sound sliders - in a real app, these would control actual audio
    document.querySelectorAll('.sound-slider').forEach(slider => {
        slider.addEventListener('input', () => {
            // This would adjust volume of the corresponding sound
            const soundType = slider.getAttribute('data-sound');
            const volume = slider.value;
            console.log(`${soundType} volume set to ${volume}%`);
        });
    });
    
    // Rhythm pads - in a real app, these would play sounds
    document.querySelectorAll('.rhythm-pad').forEach(pad => {
        pad.addEventListener('click', () => {
            // This would play the corresponding note
            const note = pad.getAttribute('data-note');
            console.log(`Playing note ${note}`);
            
            // Visual feedback
            pad.classList.add('pulse');
            setTimeout(() => {
                pad.classList.remove('pulse');
            }, 300);
        });
    });
    
    // Clear sounds button
    document.getElementById('clear-sounds').addEventListener('click', () => {
        document.querySelectorAll('.sound-slider').forEach(slider => {
            slider.value = 0;
        });
    });
    
    // Save soundscape button
    document.getElementById('save-soundscape').addEventListener('click', () => {
        // In a real app, we would save the actual sound configuration
        const soundSettings = {
            rain: document.querySelector('.sound-slider[data-sound="rain"]').value,
            piano: document.querySelector('.sound-slider[data-sound="piano"]').value,
            waves: document.querySelector('.sound-slider[data-sound="waves"]').value,
            humming: document.querySelector('.sound-slider[data-sound="humming"]').value
        };
        
        saveCreation('music', JSON.stringify(soundSettings));
        showCelebration();
    });
}

// Setup Photo Screen functionality
function setupPhotoScreen() {
    // New photo prompt button
    document.getElementById('new-photo-prompt').addEventListener('click', () => {
        document.getElementById('photo-prompt').textContent = getRandomItem(photoPrompts);
    });
    
    // Photo input change
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview-img');
    
    photoInput.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                photoPreview.src = e.target.result;
                photoPreview.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        }
    });
    
    // Clear photo button
    document.getElementById('clear-photo').addEventListener('click', () => {
        photoPreview.src = '';
        photoPreview.style.display = 'none';
        photoInput.value = '';
        document.getElementById('photo-caption-input').value = '';
    });
    
    // Save photo button
    document.getElementById('save-photo').addEventListener('click', () => {
        if (!photoPreview.src || photoPreview.src === window.location.href) {
            updateMascot("Try selecting a photo first");
            return;
        }
        
        const caption = document.getElementById('photo-caption-input').value.trim() || 'Untitled Photo';
        
        saveCreation('photography', photoPreview.src, caption);
        showCelebration();
    });
}

// Setup Art Nest Screen functionality
function setupArtNestScreen() {
    // Save nest name button
    document.getElementById('save-nest-name').addEventListener('click', () => {
        const nestNameInput = document.getElementById('nest-name-input');
        const nestName = nestNameInput.value.trim();
        
        if (nestName) {
            localStorage.setItem('nestName', nestName);
            updateMascot(`Your nest is now called "${nestName}"`);
        }
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            
            // Filter creations
            const filter = button.getAttribute('data-filter');
            filterCreations(filter);
        });
    });
}

// Load creations from localStorage
function loadCreations() {
    const creationsContainer = document.getElementById('creations-container');
    creationsContainer.innerHTML = '';
    
    // Get creations from localStorage
    let creations = JSON.parse(localStorage.getItem('artNestCreations')) || [];
    
    if (creations.length === 0) {
        // Show empty state
        creationsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🪹</div>
                <h3>Your nest is waiting for creations</h3>
                <p>Return to the welcome screen and choose a creative path to begin</p>
            </div>
        `;
        return;
    }
    
    // Sort creations by date, newest first
    creations.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create HTML for each creation
    creations.forEach((creation, index) => {
        const creationElement = document.createElement('div');
        creationElement.className = 'creation-item';
        creationElement.setAttribute('data-type', creation.type);
        
        let previewContent = '';
        let typeIcon = '';
        
        switch (creation.type) {
            case 'visual-art':
                previewContent = `<img src="${creation.content}" alt="Artwork">`;
                typeIcon = '🎨';
                break;
            case 'poetry':
                previewContent = `<div style="padding: 15px; font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${creation.content}</div>`;
                typeIcon = '✍️';
                break;
            case 'music':
                previewContent = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">🎵</div>`;
                typeIcon = '🎶';
                break;
            case 'photography':
                previewContent = `<img src="${creation.content}" alt="Photo">`;
                typeIcon = '📸';
                break;
        }
        
        creationElement.innerHTML = `
            <div class="creation-preview">
                ${previewContent}
                <div class="type-icon">${typeIcon}</div>
            </div>
            <div class="creation-info">
                <div class="creation-title">${creation.title || 'Untitled'}</div>
                <div class="creation-date">${formatDate(creation.date)}</div>
            </div>
            <div class="creation-actions">
                <div class="creation-action" data-action="view" data-index="${index}">👁️</div>
                <div class="creation-action" data-action="delete" data-index="${index}">🗑️</div>
            </div>
        `;
        
        creationsContainer.appendChild(creationElement);
    });
    
    // Add event listeners for creation actions
    document.querySelectorAll('.creation-action').forEach(action => {
        action.addEventListener('click', handleCreationAction);
    });
}

// Filter creations by type
function filterCreations(filter) {
    const creationItems = document.querySelectorAll('.creation-item');
    
    creationItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-type') === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Handle creation actions (view, delete)
function handleCreationAction(e) {
    const action = e.currentTarget.getAttribute('data-action');
    const index = parseInt(e.currentTarget.getAttribute('data-index'));
    
    let creations = JSON.parse(localStorage.getItem('artNestCreations')) || [];
    
    if (action === 'view') {
        // Show creation in detail view
        const creation = creations[index];
        openCreationViewModal(creation);
    } else if (action === 'delete') {
        // Remove creation from array
        creations.splice(index, 1);
        
        // Save updated array
        localStorage.setItem('artNestCreations', JSON.stringify(creations));
        
        // Reload creations display
        loadCreations();
        
        updateMascot("Your creation has been released back to the universe");
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' • ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Save a creation to localStorage
function saveCreation(type, content, title = '') {
    // Get existing creations
    let creations = JSON.parse(localStorage.getItem('artNestCreations')) || [];
    
    // Create new creation object
    const creation = {
        type: type,
        content: content,
        title: title || generatePoeticTitle(true),
        date: new Date().toISOString()
    };
    
    // Add to array
    creations.push(creation);
    
    // Save to localStorage
    localStorage.setItem('artNestCreations', JSON.stringify(creations));
    
    updateMascot("Your creation has been safely nestled");
}

// Get a random item from an array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Setup modals
function setupModals() {
    // Timer modal
    document.getElementById('timer-modal-close').addEventListener('click', closeTimerModal);
    document.getElementById('start-timer-button').addEventListener('click', startTimer);
    
    // Creation view modal
    document.getElementById('creation-view-close').addEventListener('click', closeCreationViewModal);
    
    // Celebration modal
    document.getElementById('celebration-modal-close').addEventListener('click', closeCelebrationModal);
}

// Open timer modal
function openTimerModal(activityType) {
    document.getElementById('timer-modal').classList.add('active');
    document.getElementById('timer-modal').setAttribute('data-activity', activityType);
}

// Close timer modal
function closeTimerModal() {
    document.getElementById('timer-modal').classList.remove('active');
}

// Start timer
function startTimer() {
    const minutes = parseInt(document.getElementById('timer-minutes').value);
    if (!minutes || minutes <= 0) return;
    
    const activityType = document.getElementById('timer-modal').getAttribute('data-activity');
    const timerDisplay = document.getElementById(`${activityType}-timer-display`);
    
    // Show timer display
    timerDisplay.style.display = 'block';
    
    // Set timer duration
    let remainingSeconds = minutes * 60;
    
    // Update timer display
    updateTimerDisplay(timerDisplay, remainingSeconds);
    
    // Close modal
    closeTimerModal();
    
    // Clear any existing timer
    if (activeTimer) {
        clearInterval(activeTimer);
    }
    
    // Start interval
    activeTimer = setInterval(() => {
        remainingSeconds--;
        
        if (remainingSeconds <= 0) {
            // Timer finished
            clearInterval(activeTimer);
            activeTimer = null;
            timerDisplay.style.display = 'none';
            updateMascot("Time's up! How do you feel about what you created?");
        } else {
            // Update display
            updateTimerDisplay(timerDisplay, remainingSeconds);
        }
    }, 1000);
}

// Update timer display
function updateTimerDisplay(display, seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    display.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Open creation view modal
function openCreationViewModal(creation) {
    const modal = document.getElementById('creation-view-modal');
    const contentContainer = document.getElementById('creation-view-content');
    
    // Set title
    document.getElementById('creation-view-title').textContent = creation.title || 'Untitled';
    
    // Set date
    document.getElementById('creation-view-date').textContent = formatDate(creation.date);
    
    // Clear previous content
    contentContainer.innerHTML = '';
    
    // Add content based on type
    switch (creation.type) {
        case 'visual-art':
            contentContainer.innerHTML = `<img src="${creation.content}" alt="Artwork" style="max-width: 100%; max-height: 70vh;">`;
            break;
        case 'poetry':
            contentContainer.innerHTML = `<div style="white-space: pre-wrap; font-family: 'Courier New', monospace; line-height: 1.5;">${creation.content}</div>`;
            break;
        case 'music':
            // In a real app, we would recreate the soundscape
            const soundSettings = JSON.parse(creation.content);
            contentContainer.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎵</div>
                    <div style="text-align: left; margin-top: 20px;">
                        <p><strong>Rain:</strong> ${soundSettings.rain}%</p>
                        <p><strong>Piano:</strong> ${soundSettings.piano}%</p>
                        <p><strong>Waves:</strong> ${soundSettings.waves}%</p>
                        <p><strong>Humming:</strong> ${soundSettings.humming}%</p>
                    </div>
                </div>
            `;
            break;
        case 'photography':
            contentContainer.innerHTML = `<img src="${creation.content}" alt="Photo" style="max-width: 100%; max-height: 70vh;">`;
            break;
    }
    
    // Show modal
    modal.classList.add('active');
}

// Close creation view modal
function closeCreationViewModal() {
    document.getElementById('creation-view-modal').classList.remove('active');
}

// Show celebration modal
function showCelebration() {
    const modal = document.getElementById('celebration-modal');
    const message = document.getElementById('celebration-message');
    
    // Set random celebration message
    message.textContent = getRandomItem(celebrationMessages);
    
    // Show modal
    modal.classList.add('active');
    
    // Animate stars
    const starsContainer = document.getElementById('celebration-stars');
    starsContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'celebration-star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

// Close celebration modal
function closeCelebrationModal() {
    document.getElementById('celebration-modal').classList.remove('active');
}

// Update mascot message
function updateMascot(message) {
    const mascotMessage = document.getElementById('mascot-message');
    
    // Fade out
    mascotMessage.classList.add('fade-out');
    
    // Wait for fade out to complete
    setTimeout(() => {
        // Update message
        mascotMessage.textContent = message;
        
        // Fade in
        mascotMessage.classList.remove('fade-out');
        mascotMessage.classList.add('fade-in');
        
        // Clear fade-in class
        setTimeout(() => {
            mascotMessage.classList.remove('fade-in');
        }, 500);
    }, 300);
}

// Generate a poetic title (either for display or for return)
function generatePoeticTitle(returnTitle = false) {
    const title = getRandomItem(poeticTitles);
    
    if (returnTitle) {
        return title;
    } else {
        const poeticPhrase = document.getElementById('poetic-phrase');
        poeticPhrase.textContent = title;
        poeticPhrase.classList.add('fade-in');
        
        setTimeout(() => {
            poeticPhrase.classList.remove('fade-in');
        }, 500);
    }
}

// Additional global variables
let movementPrompts = [
    "Move as if you're floating in water",
    "Create gentle movements that express how you feel inside",
    "Try movements that help you feel grounded in your body",
    "Express your thoughts through slow, mindful gestures",
    "Move as if you're painting with your body",
    "Create a short movement sequence that tells your story",
    "Close your eyes and let your body respond to how you feel",
    "Create shapes with your body that represent your emotions"
];

let collagePrompts = [
    "Combine colors and shapes that represent different parts of yourself",
    "Create a visual landscape of your inner world",
    "Layer different textures that express how you feel today",
    "Build a collage that represents your safe space",
    "Mix images that show contrast between your experiences",
    "Create a visual poem using colors, shapes, and textures",
    "Arrange elements in a way that feels balanced to you",
    "Build a collage that represents transformation"
];

// Setup Movement Screen functionality
function setupMovementScreen() {
    // New movement prompt button
    document.getElementById('new-movement-prompt').addEventListener('click', () => {
        document.getElementById('movement-prompt').textContent = getRandomItem(movementPrompts);
    });
    
    // Set timer button
    document.getElementById('movement-set-timer').addEventListener('click', () => {
        openTimerModal('movement');
    });
    
    // Save movement reflection button
    document.getElementById('save-movement').addEventListener('click', () => {
        const reflectionText = document.getElementById('movement-reflection').value.trim();
        
        if (!reflectionText) {
            updateMascot("Try sharing a reflection about your movement first");
            return;
        }
        
        saveCreation('movement', reflectionText);
        showCelebration();
    });
    
    // Initial movement prompt
    document.getElementById('movement-prompt').textContent = getRandomItem(movementPrompts);
}

// Setup Collage Screen functionality
function setupCollageScreen() {
    // Initialize collage canvas
    const canvas = document.getElementById('collage-canvas');
    const ctx = canvas.getContext('2d');
    let selectedShape = 'circle';
    let selectedColor = '#B6DCFE';
    let collageElements = [];
    
    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // New collage prompt button
    document.getElementById('new-collage-prompt').addEventListener('click', () => {
        document.getElementById('collage-prompt').textContent = getRandomItem(collagePrompts);
    });
    
    // Set timer button
    document.getElementById('collage-set-timer').addEventListener('click', () => {
        openTimerModal('collage');
    });
    
    // Shape selection
    document.querySelectorAll('.collage-shape').forEach(shape => {
        shape.addEventListener('click', () => {
            document.querySelectorAll('.collage-shape').forEach(s => s.classList.remove('active'));
            shape.classList.add('active');
            selectedShape = shape.getAttribute('data-shape');
        });
    });
    
    // Color selection
    document.querySelectorAll('.collage-color').forEach(color => {
        color.addEventListener('click', () => {
            document.querySelectorAll('.collage-color').forEach(c => c.classList.remove('active'));
            color.classList.add('active');
            selectedColor = color.style.backgroundColor;
        });
    });
    
    // Canvas click handler
    canvas.addEventListener('click', e => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create new element
        const element = {
            type: selectedShape,
            x: x,
            y: y,
            color: selectedColor,
            size: parseInt(document.getElementById('collage-size-slider').value)
        };
        
        // Add to elements array
        collageElements.push(element);
        
        // Redraw canvas
        drawCollage();
    });
    
    // Size slider
    document.getElementById('collage-size-slider').addEventListener('input', () => {
        // Size slider functionality
    });
    
    // Clear collage button
    document.getElementById('clear-collage').addEventListener('click', () => {
        collageElements = [];
        drawCollage();
    });
    
    // Save collage button
    document.getElementById('save-collage').addEventListener('click', () => {
        if (collageElements.length === 0) {
            updateMascot("Try adding some elements to your collage first");
            return;
        }
        
        saveCreation('collage', canvas.toDataURL());
        showCelebration();
    });
    
    // Initial collage prompt
    document.getElementById('collage-prompt').textContent = getRandomItem(collagePrompts);
    
    // Function to draw the collage
    function drawCollage() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw each element
        collageElements.forEach(element => {
            ctx.fillStyle = element.color;
            
            switch (element.type) {
                case 'circle':
                    ctx.beginPath();
                    ctx.arc(element.x, element.y, element.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                case 'square':
                    ctx.fillRect(element.x - element.size / 2, element.y - element.size / 2, element.size, element.size);
                    break;
                case 'triangle':
                    ctx.beginPath();
                    ctx.moveTo(element.x, element.y - element.size / 2);
                    ctx.lineTo(element.x + element.size / 2, element.y + element.size / 2);
                    ctx.lineTo(element.x - element.size / 2, element.y + element.size / 2);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'star':
                    drawStar(ctx, element.x, element.y, 5, element.size / 2, element.size / 4);
                    break;
            }
        });
    }
    
    // Function to draw a star
    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }
}

// Update the initApp function to include the new setup functions
function initApp() {
    // Set up event listeners
    setupNavigation();
    setupWelcomeScreen();
    setupVisualArtScreen();
    setupPoetryScreen();
    setupMusicScreen();
    setupPhotoScreen();
    setupMovementScreen();      // Add this line
    setupCollageScreen();       // Add this line
    setupArtNestScreen();
    setupModals();
    
    // Display initial mascot message
    updateMascot("Welcome to your creative sanctuary");
    
    // Load saved nest name
    const nestName = localStorage.getItem('nestName');
    if (nestName) {
        document.getElementById('nest-name-input').value = nestName;
    }
    
    // Generate initial poetic title
    generatePoeticTitle();
}

// Update the handleCreationAction function to handle movement and collage types
function handleCreationAction(e) {
    const action = e.currentTarget.getAttribute('data-action');
    const index = parseInt(e.currentTarget.getAttribute('data-index'));
    
    let creations = JSON.parse(localStorage.getItem('artNestCreations')) || [];
    
    if (action === 'view') {
        // Show creation in detail view
        const creation = creations[index];
        openCreationViewModal(creation);
    } else if (action === 'delete') {
        // Remove creation from array
        creations.splice(index, 1);
        
        // Save updated array
        localStorage.setItem('artNestCreations', JSON.stringify(creations));
        
        // Reload creations display
        loadCreations();
        
        updateMascot("Your creation has been released back to the universe");
    }
}

// Update openCreationViewModal to handle movement and collage types
function openCreationViewModal(creation) {
    const modal = document.getElementById('creation-view-modal');
    const contentContainer = document.getElementById('creation-view-content');
    
    // Set title
    document.getElementById('creation-view-title').textContent = creation.title || 'Untitled';
    
    // Set date
    document.getElementById('creation-view-date').textContent = formatDate(creation.date);
    
    // Clear previous content
    contentContainer.innerHTML = '';
    
    // Add content based on type
    switch (creation.type) {
        case 'visual-art':
            contentContainer.innerHTML = `<img src="${creation.content}" alt="Artwork" style="max-width: 100%; max-height: 70vh;">`;
            break;
        case 'poetry':
            contentContainer.innerHTML = `<div style="white-space: pre-wrap; font-family: 'Courier New', monospace; line-height: 1.5;">${creation.content}</div>`;
            break;
        case 'music':
            // In a real app, we would recreate the soundscape
            const soundSettings = JSON.parse(creation.content);
            contentContainer.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 20px;">🎵</div>
                    <div style="text-align: left; margin-top: 20px;">
                        <p><strong>Rain:</strong> ${soundSettings.rain}%</p>
                        <p><strong>Piano:</strong> ${soundSettings.piano}%</p>
                        <p><strong>Waves:</strong> ${soundSettings.waves}%</p>
                        <p><strong>Humming:</strong> ${soundSettings.humming}%</p>
                    </div>
                </div>
            `;
            break;
        case 'photography':
            contentContainer.innerHTML = `<img src="${creation.content}" alt="Photo" style="max-width: 100%; max-height: 70vh;">`;
            break;
        case 'movement':
            contentContainer.innerHTML = `<div style="white-space: pre-wrap; font-family: 'Courier New', monospace; line-height: 1.5;">
                <div style="font-size: 3rem; text-align: center; margin-bottom: 20px;">💃</div>
                ${creation.content}
            </div>`;
            break;
        case 'collage':
            contentContainer.innerHTML = `<img src="${creation.content}" alt="Collage" style="max-width: 100%; max-height: 70vh;">`;
            break;
    }
    
    // Show modal
    modal.classList.add('active');
}

// Update loadCreations function to handle new creation types
function loadCreations() {
    const creationsContainer = document.getElementById('creations-container');
    creationsContainer.innerHTML = '';
    
    // Get creations from localStorage
    let creations = JSON.parse(localStorage.getItem('artNestCreations')) || [];
    
    if (creations.length === 0) {
        // Show empty state
        creationsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🪹</div>
                <h3>Your nest is waiting for creations</h3>
                <p>Return to the welcome screen and choose a creative path to begin</p>
            </div>
        `;
        return;
    }
    
    // Sort creations by date, newest first
    creations.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create HTML for each creation
    creations.forEach((creation, index) => {
        const creationElement = document.createElement('div');
        creationElement.className = 'creation-item';
        creationElement.setAttribute('data-type', creation.type);
        
        let previewContent = '';
        let typeIcon = '';
        
        switch (creation.type) {
            case 'visual-art':
                previewContent = `<img src="${creation.content}" alt="Artwork">`;
                typeIcon = '🎨';
                break;
            case 'poetry':
                previewContent = `<div style="padding: 15px; font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${creation.content}</div>`;
                typeIcon = '✍️';
                break;
            case 'music':
                previewContent = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">🎵</div>`;
                typeIcon = '🎶';
                break;
            case 'photography':
                previewContent = `<img src="${creation.content}" alt="Photo">`;
                typeIcon = '📸';
                break;
            case 'movement':
                previewContent = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">💃</div>`;
                typeIcon = '💃';
                break;
            case 'collage':
                previewContent = `<img src="${creation.content}" alt="Collage">`;
                typeIcon = '🌸';
                break;
        }
        
        creationElement.innerHTML = `
            <div class="creation-preview">
                ${previewContent}
                <div class="type-icon">${typeIcon}</div>
            </div>
            <div class="creation-info">
                <div class="creation-title">${creation.title || 'Untitled'}</div>
                <div class="creation-date">${formatDate(creation.date)}</div>
            </div>
            <div class="creation-actions">
                <div class="creation-action" data-action="view" data-index="${index}">👁️</div>
                <div class="creation-action" data-action="delete" data-index="${index}">🗑️</div>
            </div>
        `;
        
        creationsContainer.appendChild(creationElement);
    });
    
    // Add event listeners for creation actions
    document.querySelectorAll('.creation-action').forEach(action => {
        action.addEventListener('click', handleCreationAction);
    });
}