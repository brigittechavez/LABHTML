// Update loadComponent to return a promise
function loadComponent(url, containerId) {
    console.log(`Loading component from ${url} into ${containerId}`); // Debug
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error('Component fetch error:', response.status);
                throw new Error(`Component not found: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                return html;
            }
            throw new Error(`Container ${containerId} not found`);
        });
}

// Función para manejar animaciones de entrada
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Solo animar una vez
        }
    });
}

// Función para inicializar hover effects en cards
function initializeCardEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translate3d(0, -3px, 0)';
            card.style.filter = 'saturate(1.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
            card.style.filter = 'none';
        });
    });
}

// Función para manejar el formulario de contacto
function handleContactForm() {
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Añadir clase para feedback visual
            const submitButton = formulario.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            
            // Simular envío (reemplazar con tu lógica real)
            setTimeout(() => {
                submitButton.classList.remove('loading');
                submitButton.classList.add('success');
                
                // Reset después de 2 segundos
                setTimeout(() => {
                    submitButton.classList.remove('success');
                    formulario.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Función para inicializar animaciones
function initAnimations() {
    // Initialize content animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.animate-in').forEach(element => {
        observer.observe(element);
    });

    // Initialize floating circles
    initFloatingCircles();
}

function initFloatingCircles() {
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach((circle, index) => {
        // Remove any existing animations
        circle.style.animation = 'none';
        circle.offsetHeight; // Trigger reflow
        
        // Add animation with delay based on index
        const animations = [
            'fadeCircle1 8s ease-in-out infinite',
            'fadeCircle2 12s ease-in-out infinite',
            'fadeCircle3 10s ease-in-out infinite',
            'fadeCircle4 15s ease-in-out infinite'
        ];
        
        circle.style.animation = animations[index];
        circle.style.opacity = '0'; // Start with 0 opacity
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadComponent('/src/components/nav.html', 'nav-placeholder')
        .then(() => {
            router.init();
            initAnimations();
        })
        .catch(error => console.error('Error loading navigation:', error));
});