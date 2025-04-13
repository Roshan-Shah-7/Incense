// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Common progress bar for all pages
function initCommonProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-indicator"></div>';
    document.querySelector('main').prepend(progressBar);

    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.querySelector('.progress-indicator').style.width = `${scrollPercentage * 100}%`;
    });
}

// Hero section animations
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    gsap.fromTo(heroContent,
        {
            y: 30,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        }
    );

    // Hero parallax effect
    gsap.to(heroContent, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Card animations for all pages
function initCardAnimations() {
    // Generic card selectors
    const cardSelectors = [
        '.type-card',
        '.material-card',
        '.product-card',
        '.feature-card',
        '.history-card'
    ];

    cardSelectors.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        if (!cards.length) return;

        gsap.utils.toArray(cards).forEach((card, index) => {
            gsap.fromTo(card,
                {
                    y: 50,
                    opacity: 0,
                    scale: 0.98
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top bottom-=100',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    });
}

// Initialize all common animations
document.addEventListener('DOMContentLoaded', () => {
    initCommonProgressBar();
    initHeroAnimations();
    initCardAnimations();
});
