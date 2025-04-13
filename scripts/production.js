// Progress bar tracking
function initProgressBar() {
    const progressBar = document.querySelector('.progress-indicator');
    const stages = document.querySelectorAll('.production-stage');
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY) / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.width = `${scrollPercentage * 100}%`;
    });

    // Highlight active stage in nav
    const processNavBtns = document.querySelectorAll('.process-nav-btn');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stageId = entry.target.id;
                processNavBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.target === stageId);
                });
            }
        });
    }, observerOptions);

    stages.forEach(stage => observer.observe(stage));
}

// Smooth scroll to stages with offset for header
function initStageNavigation() {
    const navBtns = document.querySelectorAll('.process-nav-btn');
    const headerOffset = document.querySelector('.main-nav').offsetHeight + 20; // Added extra space
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const stageId = btn.getAttribute('data-stage');
            const targetStage = document.getElementById(stageId);
            
            if (targetStage) {
                // Update active state
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Smooth scroll to target with offset
                const targetPosition = targetStage.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active button on scroll
    window.addEventListener('scroll', () => {
        const stages = document.querySelectorAll('.production-stage');
        let currentStageId = '';

        stages.forEach(stage => {
            const stageTop = stage.offsetTop - headerOffset - 100;
            if (window.pageYOffset >= stageTop) {
                currentStageId = stage.id;
            }
        });

        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-stage') === currentStageId);
        });
    });
}

// Enhanced stage animations
function initEnhancedStageAnimations() {
    const stages = gsap.utils.toArray('.production-stage');
    
    stages.forEach((stage, index) => {
        const stageContent = stage.querySelector('.stage-content');
        const materialCategories = stage.querySelectorAll('.material-category');
        const prepSteps = stage.querySelectorAll('.prep-step');
        
        // Stage entrance animation
        gsap.fromTo(stage,
            {
                opacity: 0,
                y: 100
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stage,
                    start: 'top bottom-=100',
                    end: 'top center',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Content slide animation
        gsap.fromTo(stageContent,
            {
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: stage,
                    start: 'top center',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Material categories stagger animation
        if (materialCategories.length) {
            gsap.fromTo(materialCategories,
                {
                    y: 30,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: stage,
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }

        // Preparation steps stagger animation
        if (prepSteps.length) {
            gsap.fromTo(prepSteps,
                {
                    x: index % 2 === 0 ? -30 : 30,
                    opacity: 0
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: stage,
                        start: 'top center',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
}

// Hero section parallax
function initHeroParallax() {
    gsap.to('.production-hero .hero-content', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.production-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// Update active button on scroll
function updateActiveButton() {
    const stages = document.querySelectorAll('.production-stage');
    const navBtns = document.querySelectorAll('.process-nav-btn');
    const headerOffset = document.querySelector('.main-nav').offsetHeight;

    window.addEventListener('scroll', () => {
        let currentStage = '';
        
        stages.forEach(stage => {
            const sectionTop = stage.offsetTop - headerOffset - 100;
            const sectionHeight = stage.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentStage = stage.id;
            }
        });

        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.target === currentStage);
        });
    });
}

// Stage preview cards interactivity
function initStagePreviewCards() {
    const previewCards = document.querySelectorAll('.preview-card');
    
    previewCards.forEach(card => {
        card.addEventListener('click', () => {
            const stageId = card.dataset.stage;
            const targetStage = document.getElementById(stageId);
            const offset = document.querySelector('.main-nav').offsetHeight;
            
            window.scrollTo({
                top: targetStage.offsetTop - offset,
                behavior: 'smooth'
            });
        });
    });
}

// Stage sidebar interactivity
function updateStageSidebar() {
    const sidebar = document.querySelector('.stages-sidebar');
    const stages = document.querySelectorAll('.production-stage');
    const stageTitle = sidebar.querySelector('.stage-title');
    const prevBtn = sidebar.querySelector('.nav-prev');
    const nextBtn = sidebar.querySelector('.nav-next');
    
    let currentStageIndex = 0;
    
    // Update active stage based on scroll position
    function updateActiveStage() {
        const scrollPos = window.scrollY + window.innerHeight / 3;
        
        stages.forEach((stage, index) => {
            const bounds = stage.getBoundingClientRect();
            if (bounds.top <= window.innerHeight / 2) {
                currentStageIndex = index;
                stageTitle.textContent = stage.querySelector('h2').textContent;
                updateNavigationButtons();
                updateProgressDots(index);
            }
        });
    }
    
    function updateNavigationButtons() {
        prevBtn.disabled = currentStageIndex === 0;
        nextBtn.disabled = currentStageIndex === stages.length - 1;
    }
    
    function updateProgressDots(index) {
        document.querySelectorAll('.progress-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    // Navigation button handlers
    prevBtn.addEventListener('click', () => {
        if (currentStageIndex > 0) {
            const targetStage = stages[currentStageIndex - 1];
            targetStage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentStageIndex < stages.length - 1) {
            const targetStage = stages[currentStageIndex + 1];
            targetStage.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    window.addEventListener('scroll', updateActiveStage);
}

// Enhance production images
function enhanceProductionImages() {
    const imgContainers = document.querySelectorAll('.img-placeholder');
    
    imgContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;
        
        // Add loading state
        const loader = document.createElement('div');
        loader.className = 'image-loader';
        container.appendChild(loader);
        
        // Handle image loading
        img.onload = () => {
            loader.remove();
            gsap.fromTo(img,
                { opacity: 0, scale: 1.1 },
                { 
                    opacity: 1, 
                    scale: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                }
            );
        };

        // Add hover effect
        container.addEventListener('mouseenter', () => {
            gsap.to(img, {
                scale: 1.05,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(img, {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initProgressBar();
    initStageNavigation();
    initEnhancedStageAnimations();
    initHeroParallax();
    updateActiveButton();
    initStagePreviewCards();
    updateStageSidebar();
    enhanceProductionImages();
});
