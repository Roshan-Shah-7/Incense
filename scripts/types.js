function initTraditionSwitcher() {
    const traditionBtns = document.querySelectorAll('.type-nav-btn');
    const traditionSections = document.querySelectorAll('.tradition-section');
    
    function switchTradition(targetId) {
        const currentSection = document.querySelector('.tradition-section.active');
        const targetSection = document.getElementById(targetId);
        
        if (currentSection === targetSection) return;
        
        // Update navigation
        traditionBtns.forEach(b => b.classList.remove('active'));
        traditionBtns.forEach(btn => {
            if (btn.dataset.region === targetId) {
                btn.classList.add('active');
            }
        });
        
        // Enhanced transition
        gsap.timeline()
            .to(currentSection, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                ease: 'power2.out',
                onComplete: () => {
                    currentSection.classList.remove('active');
                    currentSection.style.display = 'none';
                }
            })
            .set(targetSection, { display: 'block' })
            .fromTo(targetSection,
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    ease: 'power2.out',
                    onStart: () => targetSection.classList.add('active')
                }
            );
    }

    traditionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchTradition(btn.dataset.region);
        });
    });
}

function initCardAnimations() {
    const cards = gsap.utils.toArray('.type-card');
    
    cards.forEach((card, i) => {
        // Create hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('.tradition-badge'), {
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                scale: 1,
                duration: 0.6,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('.tradition-badge'), {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Scroll animation
        ScrollTrigger.create({
            trigger: card,
            start: 'top bottom-=100',
            onEnter: () => {
                gsap.fromTo(card,
                    {
                        y: 50,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.1,
                        ease: 'power2.out'
                    }
                );
            }
        });
    });
}

function enhanceTypeCards() {
    const typeCards = document.querySelectorAll('.type-card');
    
    typeCards.forEach(card => {
        // Add smooth hover transitions
        const image = card.querySelector('.type-image img');
        const badge = card.querySelector('.tradition-badge');
        const details = card.querySelectorAll('.type-details > div');
        
        const hoverTimeline = gsap.timeline({ paused: true });
        
        hoverTimeline
            .to(image, {
                scale: 1.1,
                duration: 0.6,
                ease: 'power2.out'
            })
            .to(badge, {
                y: -5,
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                duration: 0.4
            }, 0)
            .to(details, {
                y: -3,
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                stagger: 0.1,
                duration: 0.4
            }, 0);
            
        card.addEventListener('mouseenter', () => hoverTimeline.play());
        card.addEventListener('mouseleave', () => hoverTimeline.reverse());
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            const rect = card.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            card.appendChild(ripple);
            
            gsap.to(ripple, {
                scale: 4,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                onComplete: () => ripple.remove()
            });
        });
    });
}

function initSmoothTransitions() {
    const traditionBtns = document.querySelectorAll('.type-nav-btn');
    const sections = document.querySelectorAll('.tradition-section');
    
    traditionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.region;
            const currentSection = document.querySelector('.tradition-section.active');
            const targetSection = document.getElementById(targetId);
            
            if (currentSection === targetSection) return;
            
            // Update navigation
            traditionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Smooth transition
            const tl = gsap.timeline();
            tl.to(currentSection, {
                opacity: 0,
                y: 20,
                duration: 0.4,
                onComplete: () => {
                    currentSection.classList.remove('active');
                    targetSection.classList.add('active');
                    gsap.fromTo(targetSection, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.4 }
                    );
                }
            });
        });
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    initTraditionSwitcher();
    initCardAnimations();
    enhanceTypeCards();
    initSmoothTransitions();
    
    // Add scroll-based animations
    gsap.utils.toArray('.tradition-section').forEach(section => {
        const cards = section.querySelectorAll('.type-card');
        gsap.fromTo(cards, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
});
