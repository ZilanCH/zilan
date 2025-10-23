export const config = {
    // Header
    headerLogo: "img/zilan_logo.webp", // Neuer Eintrag für das Logo
    companyName: "ZilanGroup",
    tagline: "Wissen, was Sache ist!",
    
    // Content Sections (wechselnd Links/Rechts)
    contentSections: [
        {
            layout: "text-left",
            title: "Über uns",
            text: "Wir sind ZilanDEV, eine Gaming-Community und Entwicklergruppe, die sich leidenschaftlich für die Erstellung von hochwertigen Softwarelösungen einsetzt. Unser Ziel ist es, innovative und unterhaltsame Erlebnisse zu schaffen, die Menschen weltweit begeistern.",
            imagePath: "img/zilan_logo.webp",
            imageIcon: "🏢"
        },
        {
            layout: "text-right",
            title: "Web V3",
            text: "Das, was Sie hier gerade sehen, ist die Web V3! Wir haben lange an ihr gearbeitet uns sie nun am 23.10.2025 fertiggestellt!",
            imagePath: "",
            imageIcon: "😎"
        }
    ],
    
    // CTA Section
    ctaTitle: "Bereit für den nächsten Schritt?",
    ctaText: "Kontaktieren Sie uns!",
    ctaButtonText: "Kontakt",
    // Die Funktion kann nicht direkt exportiert werden, daher in main.js definieren!
    
    // References Section
    referencesTitle: "Projekte",
    references: [
        {
            logo: "🏢",
            name: "Quantix Tickets Bot",
            description: "Automatisierte Ticketverwaltung steigerte Support-Effizienz um 120%"
        }
    ],
    
    // Neue: Seiten / Navigation (freundlicher Name, Ziel-URL, optionales Bild oder Icon)
    pages: [
        { friendlyName: "Start", url: "index.html", imagePath: "img/zilan_logo.webp", icon: "🏠" },
        { friendlyName: "Miyako's Seite", url: "https://miyako.zilan.dev", imagePath: "img/miyako.webp", icon: "ℹ️" },
        { friendlyName: "S4riX/Sarikaze's Seite", url: "https://s4rix.zilan.dev", imagePath: "img/s4rix.webp", icon: "💼" },
        { friendlyName: "Discord", url: "https://dc.tth-projects.de", imagePath: "img/discord.webp", icon: "✉️" },
        { friendlyName: "WebV2", url: "zilanv2/index.html", imagePath: "", icon: "🌐"  }
    ],
    
    // Footer
    footerYear: 2025,
    footerCompanyName: "ZilanGroup",
    footerEmail: "miyako@zilan.dev",
    footerPhone: "+41 77 266 05 11"
};
