function handleUpload() {
    const fileInput = document.getElementById('fontInput');
    const file = fileInput.files[0];

    if (file) {
        // In a real app, you would send 'file' to a server here
        alert(`Success! "${file.name}" has been uploaded to the Kannada Hub.`);
        
        // Mock-up: Add the new font to the grid visually
        const grid = document.getElementById('fontGrid');
        const newCard = document.createElement('div');
        newCard.className = 'font-card';
        newCard.innerHTML = `
            <div class="font-info">
                <span class="font-tag">NEW</span>
                <span class="font-size">${(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <h3 class="font-name">${file.name.split('.')[0]}</h3>
            <p class="preview-text">ಹೊಸ ಫಾಂಟ್ ಸಿದ್ಧವಾಗಿದೆ</p>
            <div class="card-footer">
                <button class="btn-download">Download Now</button>
            </div>
        `;
        grid.prepend(newCard);
    } else {
        alert("Please select a font file first!");
    }
}
// Sample Data
let fonts = [
    { id: 1, name: 'Nudi 01', type: 'TTF', size: '1.5MB', category: 'classic', designer: 'Govt of KA' },
    { id: 2, name: 'Lohit Kannada', type: 'OTF', size: '0.8MB', category: 'modern', designer: 'Fedora Project' }
];

// 1. Render Fonts
function renderFonts(filter = 'all') {
    const grid = document.getElementById('fontGrid');
    const previewText = document.getElementById('globalPreviewInput').value || "ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆ";
    const fontSize = document.getElementById('sizeSlider').value + "px";
    
    grid.innerHTML = ''; // Clear current grid

    const filtered = filter === 'all' ? fonts : fonts.filter(f => f.category === filter);

    filtered.forEach(font => {
        const card = document.createElement('div');
        card.className = 'font-card';
        card.innerHTML = `
            <div class="font-info">
                <span class="font-tag">${font.type}</span>
                <span class="font-size">${font.size}</span>
            </div>
            <h3 class="font-name">${font.name}</h3>
            <p class="preview-display" style="font-size: ${fontSize}">${previewText}</p>
            <div class="card-footer">
                <p class="download-count">By: ${font.designer}</p>
                <button class="btn-download" onclick="downloadFont('${font.name}')">Download</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 2. Update Previews Live
function updatePreviews() {
    const size = document.getElementById('sizeSlider').value;
    document.getElementById('sizeValue').innerText = size + "px";
    renderFonts(document.querySelector('.tab.active').innerText.toLowerCase());
}

// 3. Handle Filtering
function filterFonts(category) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    renderFonts(category);
}

// 4. Download Simulation
function downloadFont(name) {
    alert(`Downloading ${name}... Thank you for supporting Kannada Typography!`);
}

// Initial Load
window.onload = () => renderFonts();
// Global State
let favorites = JSON.parse(localStorage.getItem('favFonts')) || [];

// 1. Dark Mode Toggle
function toggleDarkMode() {
    const isDark = document.getElementById('darkModeToggle').checked;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 2. Favorite Logic
function toggleFavorite(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('favFonts', JSON.stringify(favorites));
    renderFonts();
}

// 3. Modal Controls
function openModal(fontName) {
    document.getElementById('testModal').style.display = "block";
    document.getElementById('modalFontName').innerText = "Testing: " + fontName;
}

function closeModal() {
    document.getElementById('testModal').style.display = "none";
}

// 4. Enhanced Render (Modified from previous code)
function renderFonts(filter = 'all') {
    const grid = document.getElementById('fontGrid');
    grid.innerHTML = '';

    fonts.forEach(font => {
        const isFav = favorites.includes(font.id);
        const card = document.createElement('div');
        card.className = 'font-card';
        card.innerHTML = `
            <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${font.id})">
                ${isFav ? '❤️' : '🤍'}
            </button>
            <div class="font-info">
                <span class="font-tag">${font.type}</span>
            </div>
            <h3 onclick="openModal('${font.name}')" style="cursor:pointer">${font.name} 🔍</h3>
            <p class="preview-display">ಕನ್ನಡ ಅಕ್ಷರಮಾಲೆ</p>
            <div class="card-footer">
                <button class="btn-download">Download</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Check saved theme on load
window.onload = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('darkModeToggle').checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    renderFonts();
};