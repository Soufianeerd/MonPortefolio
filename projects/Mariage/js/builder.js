document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('previewFrame');
    const toastContainer = document.getElementById('toastContainer');
    
    function showToast(message, icon = 'check-circle') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
        toastContainer.appendChild(toast);
        lucide.createIcons();
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(10px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function syncAll() {
        const data = {
            colors: {
                accent: document.getElementById('colorAccent').value,
                bg: document.getElementById('colorBg').value
            },
            font: document.getElementById('fontSerif').value,
            content: {
                name1: document.getElementById('name1').value,
                name2: document.getElementById('name2').value,
                date: document.getElementById('eventDate').value,
                venue: document.getElementById('venue').value
            }
        };
        updatePreview(data);
    }

    function updatePreview(data) {
        if (iframe.contentWindow) {
            iframe.contentWindow.postMessage({ type: 'UPDATE_DESIGN', payload: data }, '*');
        }
    }

    // Module Switcher (Header Tabs)
    document.querySelectorAll('.module-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.module-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            iframe.src = btn.dataset.src;
            showToast(`Chargement : ${btn.textContent}`, 'loader');
        });
    });

    iframe.addEventListener('load', () => {
        syncAll();
        if (iframe.src.includes('invitation')) {
            setTimeout(() => {
                const seal = iframe.contentWindow.document.getElementById('openSeal');
                if (seal) seal.click();
            }, 600);
        }
    });

    // Sidebar Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}Tab`).classList.remove('hidden');
        });
    });

    // Theme Engine
    const themes = {
        royal: { accent: '#5D262C', bg: '#F9F7F2', font: "'Cormorant Garamond'" },
        midnight: { accent: '#1C3A5A', bg: '#F4F7F9', font: "'Playfair Display'" },
        sage: { accent: '#2E4A3E', bg: '#F2F5F2', font: "'EB Garamond'" },
        gold: { accent: '#9A7B4F', bg: '#FDFBF7', font: "'Cinzel'" }
    };

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
            option.classList.add('active');
            const theme = themes[option.dataset.theme];
            document.getElementById('colorAccent').value = theme.accent;
            document.getElementById('colorBg').value = theme.bg;
            document.getElementById('fontSerif').value = theme.font;
            syncAll();
        });
    });

    // Unsplash PRO
    const searchBtn = document.getElementById('searchImages');
    const imageResults = document.getElementById('imageResults');

    async function searchUnsplash(query) {
        const key = document.getElementById('unsplashKey').value;
        searchBtn.innerHTML = '<i data-lucide="loader" class="spin"></i>';
        lucide.createIcons();

        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12`, {
                headers: {
                    'Authorization': `Client-ID ${key}`,
                    'Accept-Version': 'v1'
                }
            });
            
            if (!response.ok) throw new Error('API Error');
            
            const data = await response.json();
            imageResults.innerHTML = '';
            
            if (data.results && data.results.length > 0) {
                data.results.forEach(photo => {
                    const img = document.createElement('img');
                    img.src = photo.urls.small;
                    img.className = 'img-thumb';
                    img.onclick = () => {
                        document.querySelectorAll('.img-thumb').forEach(t => t.classList.remove('active'));
                        img.classList.add('active');
                        updatePreview({ backgroundImage: photo.urls.regular });
                        showToast('Média Unsplash appliqué');
                    };
                    imageResults.appendChild(img);
                });
            } else {
                throw new Error('No results');
            }
        } catch (err) {
            console.error('Unsplash API failed:', err);
            showToast('Mode Démo : Galerie locale chargée', 'info');
            const fallbackImages = [
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=80",
                "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=80"
            ];
            imageResults.innerHTML = '';
            fallbackImages.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.className = 'img-thumb';
                img.onclick = () => {
                    document.querySelectorAll('.img-thumb').forEach(t => t.classList.remove('active'));
                    img.classList.add('active');
                    updatePreview({ backgroundImage: url });
                    showToast('Image locale appliquée');
                };
                imageResults.appendChild(img);
            });
        } finally {
            searchBtn.innerHTML = '<i data-lucide="search"></i>';
            lucide.createIcons();
        }
    }

    searchBtn.addEventListener('click', () => {
        searchUnsplash(document.getElementById('imageSearch').value || 'wedding luxury');
    });

    ['colorAccent', 'colorBg', 'fontSerif', 'name1', 'name2', 'eventDate', 'venue'].forEach(id => {
        document.getElementById(id).addEventListener('input', syncAll);
    });

    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('iframeWrapper').className = `iframe-container ${btn.dataset.device}`;
        });
    });

    document.getElementById('saveProject').addEventListener('click', () => {
        showToast('Fusion de la suite terminée !', 'zap');
    });

    // Init
    setTimeout(() => searchUnsplash('wedding cake'), 500);
});
