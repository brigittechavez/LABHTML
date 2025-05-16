const router = {
    init: function() {
        this.mainContent = document.getElementById('main-content');
        this.setupNavigation();
        
        // Handle initial page load
        window.addEventListener('load', () => {
            const path = window.location.pathname;
            if (path === '/' || path === '/home.html') {
                return;
            }
            this.loadContent(path);
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const path = window.location.pathname;
            if (path === '/' || path === '/home.html') {
                return;
            }
            this.loadContent(path, false);
        });
    },

    setupNavigation: function() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[data-spa]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                if (path === '/' || path === '/home.html') {
                    window.location.href = path;
                    return;
                }
                this.navigate(path);
            }
        });
    },

    navigate: function(path) {
        window.history.pushState({}, '', path);
        this.loadContent(path);
    },

    loadContent: function(path, addToHistory = true) {
        const routes = {
            '/sobre-mi': '/src/pages/aboutme.html',
            '/blog': '/src/pages/blog.html',
            '/portfolio': '/src/pages/portfolio.html'
        };

        const contentPath = routes[path] || path;
        
        fetch(contentPath)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('section');
                if (content) {
                    this.mainContent.innerHTML = content.outerHTML;
                    
                    // Update page title
                    const title = doc.querySelector('title');
                    if (title) {
                        document.title = title.textContent;
                    }

                    // Initialize animations for new content
                    const elements = document.querySelectorAll('.animate-in');
                    elements.forEach(el => el.classList.add('active'));
                }
            })
            .catch(error => console.error('Error:', error));
    }
};

function loadComponent(url, containerId) {
    if (containerId === 'nav-container') {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error('Error loading component:', error));
    }
}