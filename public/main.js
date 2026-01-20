/* ============================================
   ОСНОВНОЙ JAVASCRIPT
   ============================================ */

// Конфигурация
const CONFIG = {
    company: {
        name: "Ремонт 24/7",
        phone: "+7 (999) 123-45-67",
        email: "info@yoursite.ru",
        telegram: "your_username",
        whatsapp: "79991234567"
    },
    telegram: {
        link: "https://t.me/your_username",
        startMessage: "Привет! Я заинтересован в ремонте квартиры"
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initializeButtons();
    initializeScrollTop();
    initializeNavigation();
});

// ============================================
// КНОПКИ TELEGRAM
// ============================================

function initializeButtons() {
    const telegramButtons = document.querySelectorAll(
        '#headerCTA, #heroCTA, .service__cta, .project__cta, #ctaButtonTelegram'
    );
    
    telegramButtons.forEach(button => {
        button.addEventListener('click', openTelegram);
    });
}

function openTelegram(e) {
    e.preventDefault();
    const telegramLink = `${CONFIG.telegram.link}?start=landing`;
    window.open(telegramLink, '_blank');
    trackEvent('telegram_click', 'CTA');
}

// ============================================
// ПРОКРУТКА НАВЕРХ
// ============================================

function initializeScrollTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// НАВИГАЦИЯ
// ============================================

function initializeNavigation() {
    const navLinks = document.querySelectorAll('.navbar__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    closeMobileMenu();
                }
            }
        });
    });
}

// ============================================
// МОБИЛЬНОЕ МЕНЮ
// ============================================

function initializeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navbarMenu');
    
    if (!toggle || !menu) return;
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
}

function closeMobileMenu() {
    const menu = document.getElementById('navbarMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    if (menu) menu.classList.remove('active');
    if (toggle) toggle.classList.remove('active');
}

// ============================================
// АНАЛИТИКА
// ============================================

function trackEvent(eventName, eventCategory = 'engagement') {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': eventCategory,
            'event_label': document.title
        });
    }
    
    if (typeof ym !== 'undefined') {
        ym(window.yandexMetrikaId, 'reachGoal', eventName);
    }
}

// Отслеживание кликов на кнопки
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn--primary')) {
        trackEvent('button_click', 'CTA');
    }
});

// Отслеживание видимости секций
const observerOptions = {
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
                trackEvent('section_view', `view_${sectionId}`);
            }
        }
    });
}, observerOptions);

// Отслеживание всех секций
document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// СЛАЙДЕРЫ
// ============================================

class Slider {
    constructor(containerId, prevBtnId, nextBtnId) {
        this.container = document.getElementById(containerId);
        this.prevBtn = document.getElementById(prevBtnId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.currentIndex = 0;
        
        if (!this.container || !this.prevBtn || !this.nextBtn) return;
        
        this.items = this.container.querySelectorAll('.testimonial__card');
        this.itemCount = this.items.length;
        
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());
        
        // Автопрокрутка каждые 10 секунд
        setInterval(() => this.autoNext(), 10000);
    }
    
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.itemCount;
        this.updateSlider();
    }
    
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.itemCount) % this.itemCount;
        this.updateSlider();
    }
    
    autoNext() {
        this.next();
    }
    
    updateSlider() {
        const offset = -this.currentIndex * 100;
        this.container.style.transform = `translateX(${offset}%)`;
    }
}

// Инициализация слайдера отзывов
new Slider('testimonialSlider', 'prevTestimonial', 'nextTestimonial');

// ============================================
// ФИЛЬТРЫ ГАЛЕРЕИ
// ============================================

function initializeGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Обновление активной кнопки
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Фильтрование элементов
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.3s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Инициализация галереи при загрузке
initializeGalleryFilters();

// ============================================
// МОДАЛЬНОЕ ОКНО ГАЛЕРЕИ
// ============================================

function initializeGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const galleryItems = document.querySelectorAll('.gallery__item');
    const closeBtn = modal ? modal.querySelector('.modal__close') : null;
    
    if (!modal) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery__overlay');
            const title = overlay ? overlay.querySelector('h4').textContent : '';
            const description = overlay ? overlay.querySelector('p').textContent : '';
            
            if (modal) {
                modal.querySelector('.modal__image').src = img.src;
                modal.querySelector('.modal__title').textContent = title;
                modal.querySelector('.modal__description').textContent = description;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

initializeGalleryModal();

// ============================================
// УТИЛИТЫ
// ============================================

// Сглаживание скролла для якорей
if ('scrollBehavior' in document.documentElement.style === false) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Инициализация мобильного меню
initializeMobileMenu();

// Для отладки
console.log('Landing page loaded successfully', CONFIG);
// Bathroom Carousel - инициализация сразу и при загрузке
function initCarousel() {
    const carousel = document.querySelector('.bathroom-carousel');
    if (!carousel) return;
    
    let currentIndex = 0;
    const images = carousel.querySelectorAll('.carousel-img');
    if (images.length === 0) return;
    
    function showImage(index) {
        images.forEach(img => img.classList.add('hidden'));
        images[index].classList.remove('hidden');
    }
    
    // Показываем первое изображение при загрузке
    showImage(0);
    
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        });
    }
}

// Инициализируем при загрузке и сразу если DOM уже готов
document.addEventListener('DOMContentLoaded', initCarousel);
if (document.readyState === 'loading') {
    // DOM еще загружается
} else {
    // DOM уже готов
    initCarousel();
}

