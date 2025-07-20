document.addEventListener('DOMContentLoaded', () => {

    // --- Header-Logik (Verschwinden beim Scrollen) ---
    const mainHeader = document.querySelector('.main-header');
    let lastScrollY = 0;
    // Messen Sie die Header-Höhe erst, wenn das DOM vollständig geladen ist
    const headerHeight = mainHeader ? mainHeader.offsetHeight : 0;

    // Setzen Sie das body padding-top basierend auf der gemessenen Header-Höhe
    if (mainHeader) {
        document.body.style.paddingTop = `${headerHeight}px`;
    }

    function toggleHeaderVisibility() {
        const currentScrollY = window.scrollY;

        if (mainHeader) {
            // Wenn nach unten gescrollt wird UND nicht ganz oben ist
            if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
                mainHeader.classList.add('header-hidden');
            }
            // Wenn nach oben gescrollt wird ODER ganz oben an der Seite
            else if (currentScrollY < lastScrollY || currentScrollY <= headerHeight) {
                mainHeader.classList.remove('header-hidden');
            }
        }
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', toggleHeaderVisibility);
    toggleHeaderVisibility(); // Initialer Check
});
