/* ============================================================
   script.js - Briyo Café
   Funcionalidades: menú hamburguesa, filtro de menú, galería,
   scroll suave y animaciones con Intersection Observer.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- MENÚ HAMBURGUESA ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true' ? false : true;
        navToggle.setAttribute('aria-expanded', expanded);
        navMenu.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // ---------- MENÚ (datos y filtros) - SIN IMÁGENES ----------
    const menuItems = [
        { id: 1, name: 'Café Americano', category: 'cafe', description: 'Café de especialidad, tueste medio', price: '$55' },
        { id: 2, name: 'Cappuccino', category: 'cafe', description: 'Con leche cremosa y canela', price: '$70' },
        { id: 3, name: 'Latte con arte', category: 'cafe', description: 'Leche vaporizada y diseño único', price: '$75' },
        { id: 4, name: 'Chai Latte', category: 'bebidas', description: 'Té especiado con leche', price: '$65' },
        { id: 5, name: 'Smoothie de frutos rojos', category: 'bebidas', description: 'Fresas, arándanos y yogur', price: '$80' },
        { id: 6, name: 'Tostada francesa', category: 'brunch', description: 'Pan brioche con frutas y miel', price: '$120' },
        { id: 7, name: 'Huevos benedictinos', category: 'brunch', description: 'Con salsa holandesa y aguacate', price: '$145' },
        { id: 8, name: 'Panqueques de avena', category: 'brunch', description: 'Con mantequilla de maní y plátano', price: '$110' },
        { id: 9, name: 'Pastel de zanahoria', category: 'postres', description: 'Con glaseado de queso crema', price: '$90' },
        { id: 10, name: 'Brownie con helado', category: 'postres', description: 'Chocolate intenso y vainilla', price: '$95' },
    ];

    const menuGrid = document.getElementById('menuGrid');
    const filterBtns = document.querySelectorAll('.menu__filter-btn');

    function renderMenu(category = 'all') {
        const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
        menuGrid.innerHTML = filtered.map(item => `
            <div class="menu__item" data-category="${item.category}">
                <div class="menu__item-body">
                    <span class="category">${item.category}</span>
                    <h3>${item.name}</h3>
                    <p class="description">${item.description}</p>
                    <p class="price">${item.price}</p>
                </div>
            </div>
        `).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            const category = btn.dataset.category;
            renderMenu(category);
        });
    });

    renderMenu('all');

    // ---------- GALERÍA ----------
    // ---------- GALERÍA (con tus imágenes locales) ----------
var galleryImages = [
   
];

    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = galleryImages.map(url => `
        <img src="${url}" alt="Ambiente y platillos de Briyo Café" loading="lazy">
    `).join('');

    // ---------- SCROLL SUAVE ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---------- INTERSECTION OBSERVER (fade-in) ----------
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // Forzar visibilidad inicial si ya están visibles
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }, 100);

    console.log('✨ Briyo Café · Listo');
});