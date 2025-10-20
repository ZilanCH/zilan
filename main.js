// Rendering und Event-Logik aus index.html ausgelagert

// Render Über uns
if (document.getElementById("about-text")) {
    document.getElementById("about-text").textContent = data.about;
}

// Render News
const newsContainer = document.getElementById("news-container");
if (newsContainer && data.news) {
    data.news.forEach(n => {
        const item = document.createElement("div");
        item.className = "news-item";
        item.innerHTML = `
            <div class="news-date">${n.date}</div>
            <div class="news-title">${n.title}</div>
            <div class="news-content">${n.content}</div>
        `;
        newsContainer.appendChild(item);
    });
}

// Render Downloads aus files.json
const fileList = document.getElementById("file-list");
if (fileList) {
    fetch("download/files.json")
        .then(response => response.json())
        .then(files => {
            files.forEach(d => {
                const item = document.createElement("div");
                item.className = "file-item";
                item.innerHTML = `
                    <div class="file-info">
                        <div class="file-name">${d.name}</div>
                        <div class="file-meta">${d.link}</div>
                    </div>
                    <button class="download-btn" data-file="${d.link}">Download</button>
                `;
                fileList.appendChild(item);
            });
            fileList.querySelectorAll('.download-btn').forEach(btn => {
                btn.addEventListener('click', function(event) {
                    const filename = btn.getAttribute('data-file');
                    const originalText = btn.textContent;
                    btn.textContent = 'Wird heruntergeladen...';
                    btn.disabled = true;
                    // Download per unsichtbarem Link
                    const a = document.createElement('a');
                    a.href = 'download/' + filename;
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    setTimeout(() => {
                        btn.textContent = '✓ Heruntergeladen';
                        setTimeout(() => {
                            btn.textContent = originalText;
                            btn.disabled = false;
                        }, 1500);
                    }, 1000);
                    console.log(`Downloading: ${filename}`);
                });
            });
        });
}

// Render Links
const linkList = document.getElementById("link-list");
if (linkList && data.links) {
    data.links.forEach(l => {
        const item = document.createElement("a");
        item.href = l.link;
        item.className = "link-item";
        item.target = "_blank";
        item.innerHTML = `
            ${l.img ? `<img src="${l.img}" alt="${l.name}">` : ""}
            <span>${l.name}</span>
        `;
        linkList.appendChild(item);
    });
}

// Smooth Scrolling
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* Theme initialization and toggle */
(function () {
    const STORAGE_KEY = 'site-theme';
    const root = document.documentElement;
    const btn = () => document.getElementById('theme-toggle');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        const b = btn();
        if (b) {
            b.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
            b.textContent = theme === 'dark' ? '🌙' : '☀️';
            b.title = theme === 'dark' ? 'Wechsel zu Hellmodus' : 'Wechsel zu Dunkelmodus';
        }
    }

    function loadTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    // apply on load
    applyTheme(loadTheme());

    // attach toggle
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.id === 'theme-toggle') {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
        }
    });

    // respond to system preference changes when no explicit choice stored
    if (window.matchMedia) {
        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        mq.addEventListener && mq.addEventListener('change', (e) => {
            if (!localStorage.getItem(STORAGE_KEY)) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
})();
