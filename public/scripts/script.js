function loadComponent(url, containerId) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
        })
        .catch(error => console.error('Error loading component:', error));
}

//
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target); // Solo animar una vez
        }
    });
}

//inicializar hover effects en cards
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
            
            //añadir paraq  ue el botón de enviar tenga un efecto de carga
            const submitButton = formulario.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            
            // aplicar el envío!!
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

//para las animaciones de entrada
function initAnimations() {
    //circulos flotantes
    const circles = document.querySelectorAll('.floating-circle');
    circles.forEach(circle => {
        circle.style.opacity = '0.3'; 
    });

    //para inicializar el efecto de entrada
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all animate-in elements
    document.querySelectorAll('.animate-in').forEach(element => {
        observer.observe(element);
    });

    //inicializr el efecto de texto tipeado
    const typedElement = document.querySelector('.typed-text');
    if (typedElement) {
        new Typed('.typed-text', {
            strings: typedElement.dataset.typedItems.split(','),
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        });
    }
}

// Función para inicializar animación delfondo
function initBackgroundAnimation() {
    if (!window.FinisherHeader) {
        console.error('FinisherHeader not loaded');
        return;
    }

    const finisherHeader = new FinisherHeader({
        "count": 30,
        "size": {
            "min": 2,
            "max": 8,
            "pulse": 0.5
        },
        "speed": {
            "x": {
                "min": 0.2,
                "max": 1.8
            },
            "y": {
                "min": 0.2,
                "max": 1.8
            }
        },
        "colors": {
            "background": "#000000",
            "particles": [
                "rgba(255, 158, 170, 0.3)",
                "rgba(157, 129, 172, 0.3)"
            ]
        },
        "blending": "screen",
        "opacity": {
            "center": 0.5,
            "edge": 0.05
        },
        "shapes": ["c"]
    });
}

document.addEventListener('DOMContentLoaded', function() {
    router.init();
    loadComponent('/src/components/nav.html', 'nav-placeholder');
    initAnimations();
    initBackgroundAnimation(); 
    initializeCardEffects();
    handleContactForm();
});