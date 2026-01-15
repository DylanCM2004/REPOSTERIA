// ===== NAVEGACIÓN RESPONSIVE =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Cerrar menú al hacer clic en enlace (mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// ===== CARRUSEL =====
const carouselSlides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let currentSlide = 0;

// Función para mostrar slide específico
function showSlide(n) {
    // Remover active de todos los slides y dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Asegurar que el índice esté dentro del rango
    currentSlide = (n + carouselSlides.length) % carouselSlides.length;
    
    // Agregar active al slide y dot actual
    carouselSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Event listeners para botones
prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Event listeners para dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto-slide cada 5 segundos
let slideInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 3000);

// Pausar auto-slide al hacer hover en el carrusel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// ===== NAVEGACIÓN ACTIVA AL SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== FORMULARIO A WHATSAPP =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validación simple
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Construir mensaje para WhatsApp
        const whatsappMessage = `Hola Dolcevia, soy ${name}.\n\n${message}\n\nMi correo electrónico es: ${email}`;
        
        // Codificar mensaje para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Número de WhatsApp (reemplazar con el número real)
        const phoneNumber = '57300XXXXXXX';
        
        // Abrir WhatsApp con el mensaje
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
        
        // Resetear formulario
        contactForm.reset();
        
        // Mostrar confirmación
        alert('¡Gracias! Serás redirigido a WhatsApp para completar tu consulta.');
    });
}

// ===== ANIMACIÓN AL SCROLL (Scroll Reveal simple) =====
function revealOnScroll() {
    const revealElements = document.querySelectorAll('.hero-card, .pilar-card, .menu-item, .galeria-item');
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Establecer estado inicial para elementos a revelar
document.querySelectorAll('.hero-card, .pilar-card, .menu-item, .galeria-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// ===== EVENT LISTENERS =====
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    revealOnScroll();
});

window.addEventListener('load', () => {
    // Inicializar carrusel
    showSlide(0);
    
    // Inicializar scroll reveal
    revealOnScroll();
    
    // Añadir smooth scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== RESPONSIVE ADICIONAL =====
// Actualizar navegación activa en resize

window.addEventListener('resize', updateActiveNavLink);
