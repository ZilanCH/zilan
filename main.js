import { config } from './data.js';

// CTA-Button-Action definieren
function ctaButtonAction() {
    window.location.href = "mailto:miyako@zilan.dev";
}

// Neue Navigation: Aufbau und Verhalten
function buildNavigation() {
    const navList = document.getElementById('navList');
    const burger = document.getElementById('burgerButton');
    const popout = document.getElementById('popoutMenu');
    if (!navList || !burger || !popout || !config.pages) return;

    // Render pages
    navList.innerHTML = '';
    config.pages.forEach(page => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = page.url || '#';
        a.setAttribute('data-url', page.url || '');
        a.innerHTML = `
            <span class="item-icon">${page.imagePath ? `<img src="${page.imagePath}" alt="${page.friendlyName}" style="width:100%;height:100%;object-fit:cover;border-radius:6px;">` : (page.icon || '📄')}</span>
            <span class="item-text">${page.friendlyName}</span>
        `;
        // Close nav when navigating
        a.addEventListener('click', (e) => {
            // let the link work; close UI
            closeNav();
        });
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Toggle handler
    burger.addEventListener('click', (e) => {
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        if (expanded) closeNav(); else openNav();
    });

    // Close on outside click (the site-nav::after covers the page when open; fallback)
    document.addEventListener('click', (e) => {
        if (!document.body.classList.contains('nav-open')) return;
        const nav = document.querySelector('.site-nav');
        if (!nav) return;
        if (!nav.contains(e.target)) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeNav();
    });

    function openNav() {
        burger.setAttribute('aria-expanded', 'true');
        popout.setAttribute('aria-hidden', 'false');
        document.body.classList.add('nav-open');
    }
    function closeNav() {
        burger.setAttribute('aria-expanded', 'false');
        popout.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('nav-open');
    }

    // Expose closeNav/openNav to outer scope if needed
    window.__navOpen = openNav;
    window.__navClose = closeNav;
}

function initializePage() {
    // Header Logo
    const headerLogo = document.getElementById('headerLogo');
    if (headerLogo && config.headerLogo) {
        headerLogo.innerHTML = `<img src="${config.headerLogo}" alt="${config.companyName} Logo">`;
    }

    // Header
    document.getElementById('companyName').textContent = config.companyName;
    document.getElementById('tagline').textContent = config.tagline;
    document.title = `${config.companyName} - Professionelle Lösungen`;
    
    // Setup navigation (nach Header-Texten gesetzt)
    buildNavigation();
    
    // Content Sections
    const contentContainer = document.getElementById('contentSections');
    config.contentSections.forEach((section, index) => {
        const sectionElement = document.createElement('section');
        sectionElement.className = 'content-section';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        const row = document.createElement('div');
        row.className = section.layout === 'text-right' ? 'content-row reverse' : 'content-row';
        
        // Text Content
        const textDiv = document.createElement('div');
        textDiv.className = 'content-text';
        textDiv.innerHTML = `
            <h2>${section.title}</h2>
            <p>${section.text}</p>
        `;
        
        // Image Content
        const imageDiv = document.createElement('div');
        if (section.imagePath) {
            imageDiv.className = 'content-image';
            imageDiv.innerHTML = `<img src="${section.imagePath}" alt="${section.title}">`;
        } else {
            imageDiv.className = 'content-image placeholder';
            imageDiv.textContent = section.imageIcon;
        }
        
        row.appendChild(textDiv);
        row.appendChild(imageDiv);
        container.appendChild(row);
        sectionElement.appendChild(container);
        contentContainer.appendChild(sectionElement);
    });
    
    // CTA
    document.getElementById('ctaTitle').textContent = config.ctaTitle;
    document.getElementById('ctaText').textContent = config.ctaText;
    const ctaButton = document.getElementById('ctaButton');
    ctaButton.textContent = config.ctaButtonText;
    ctaButton.addEventListener('click', ctaButtonAction);
    
    // References
    document.getElementById('referencesTitle').textContent = config.referencesTitle;
    const referenceGrid = document.getElementById('referenceGrid');
    config.references.forEach(ref => {
        const item = document.createElement('div');
        item.className = 'reference-item';
        item.innerHTML = `
            <div class="reference-logo">${ref.logo}</div>
            <h4>${ref.name}</h4>
            <p>${ref.description}</p>
        `;
        referenceGrid.appendChild(item);
    });
    
    // Footer
    document.getElementById('footerCopyright').textContent = 
        `© ${config.footerYear} ${config.footerCompanyName}`;
    document.getElementById('footerContact').textContent = 
        `Kontakt: ${config.footerEmail} | Tel: ${config.footerPhone}`;
}

document.addEventListener('DOMContentLoaded', initializePage);
