const router = {
    init: function() {
        this.mainContent = document.getElementById('main-content');
        this.setupNavigation();
        
        // Handle initial load
        const path = window.location.pathname;
        this.loadSection(path === '/' ? 'home' : path);

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const path = window.location.pathname;
            this.loadSection(path);
        });
    },

    setupNavigation: function() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-section]');
            if (!link) return;

            e.preventDefault();
            const section = link.getAttribute('data-section');
            this.loadSection(section);
        });
    },

    loadSection: function(section) {
        // Handle anchor links
        if (section.startsWith('#')) {
            const element = document.querySelector(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        // Map sections to file paths
        const sectionPaths = {
            'home': '/home.html',
            'portfolio': '/src/pages/portfolio.html',
            'blog': '/src/pages/blog.html'
        };

        const path = sectionPaths[section] || sectionPaths['home'];

        fetch(path)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('main');
                
                if (content) {
                    this.mainContent.innerHTML = content.innerHTML;
                    window.scrollTo(0, 0);
                    initAnimations();
                    initializeCardEffects();
                }
            })
            .catch(error => console.error('Error loading section:', error));
    }
};