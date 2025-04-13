// Initialize ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Section title animations
function initSectionTitleAnimations() {
    // Select all section titles
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        gsap.fromTo(title, 
            {
                x: -50,
                opacity: 0.8
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Image fade-in animations
function initImageFadeAnimations() {
    // Select all image placeholders
    const images = document.querySelectorAll('.img-placeholder, .video-placeholder');
    
    images.forEach(image => {
        gsap.fromTo(image, 
            {
                opacity: 0.7,
                scale: 0.98
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: image,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Navigation hover animations
function initNavHoverAnimations() {
    const navLinks = document.querySelectorAll('.nav-link:not(.active)');
    
    navLinks.forEach(link => {
        // Create animation timeline for each link
        const tl = gsap.timeline({ paused: true });
        
        // Add line element for underline animation
        const line = document.createElement('span');
        line.className = 'nav-line';
        link.appendChild(line);
        
        tl.fromTo(line, 
            {
                scaleX: 0,
                opacity: 0
            },
            {
                scaleX: 1,
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            }
        ).to(link, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power1.out'
        }, 0);

        // Add hover listeners
        link.addEventListener('mouseenter', () => tl.play());
        link.addEventListener('mouseleave', () => tl.reverse());
    });
}

// Production step highlight animations
function initProductionStepAnimations() {
    const productionStages = document.querySelectorAll('.production-stage');
    
    productionStages.forEach(stage => {
        // Create highlight timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stage,
                start: 'top center',
                toggleActions: 'play none none reverse'
            }
        });
        
        tl.fromTo(stage, 
            {
                backgroundColor: 'white'
            },
            {
                backgroundColor: 'rgba(245, 242, 237, 0.5)', // Light version of var(--color-light)
                duration: 0.3,
                ease: 'power1.inOut'
            }
        ).to(stage, {
            backgroundColor: 'white',
            duration: 0.5,
            ease: 'power1.out',
            delay: 0.2
        });
    });
}

// Production page animations
function initProductionPageAnimations() {
    // Stage container animations
    gsap.utils.toArray('.production-stage').forEach((stage, index) => {
        gsap.fromTo(stage,
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            }
        );
        
        // Animate stage content
        const content = stage.querySelector('.stage-content');
        gsap.fromTo(content,
            {
                opacity: 0,
                x: index % 2 === 0 ? -30 : 30
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                delay: 0.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stage,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Materials grid animations
    gsap.utils.toArray('.material-category').forEach((category, index) => {
        gsap.fromTo(category,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: index * 0.15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: category,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
}

// Timeline animations
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Feature cards animation
function initFeatureCardAnimations() {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Process steps animation
function initProcessStepAnimations() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step, index) => {
        gsap.fromTo(step,
            {
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: step,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Benefits items animation
function initBenefitsAnimation() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    const benefitsImage = document.querySelector('.benefits-image');
    
    benefitItems.forEach((item, index) => {
        gsap.fromTo(item,
            {
                x: -50,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: item,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    if (benefitsImage) {
        gsap.fromTo(benefitsImage,
            {
                scale: 0.9,
                opacity: 0
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: benefitsImage,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
}

// History cards animation
function initHistoryCardAnimations() {
    const cards = document.querySelectorAll('.history-card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Featured products animation
function initFeaturedProductsAnimation() {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach((product, index) => {
        gsap.fromTo(product,
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: product,
                    start: 'top bottom-=100',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}

// Nature elements animation
function initNatureElementAnimations() {
    const elements = document.querySelectorAll('.nature-element');
    
    elements.forEach(element => {
        gsap.to(element, {
            rotate: "random(-15, 15)",
            duration: "random(4, 8)",
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: "random(0, 2)"
        });
    });
}

// Video scroll animation
function initVideoScrollAnimation() {
    const video = document.querySelector('.hero-media video');
    const mediaContainer = document.querySelector('.hero-media');
    if (!video) return;

    // Scale animation
    gsap.to(video, {
        scale: 1.1,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            toggleActions: 'play none none reverse'
        }
    });

    // Parallax effect
    gsap.to(mediaContainer, {
        y: 100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Rotation animation
    gsap.to(video, {
        rotate: 2,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 2
        }
    });
}

// Video loading handler
function initVideoHandler() {
    const videoContainer = document.querySelector('.placeholder-media');
    const video = videoContainer?.querySelector('video');
    
    if (video) {
        // Handle video loading
        video.addEventListener('loadeddata', () => {
            videoContainer.classList.add('loaded');
            gsap.to('.hero-media', {
                opacity: 1,
                duration: 0.5,
                delay: 0.2
            });
        });

        // Fallback if video fails to load
        video.addEventListener('error', () => {
            const fallbackImg = video.querySelector('img');
            if (fallbackImg) {
                video.style.display = 'none';
                fallbackImg.style.display = 'block';
                videoContainer.classList.add('loaded');
                gsap.to('.hero-media', {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    }
}

// Type preview cards animation
function initTypePreviewAnimations() {
    const typeCards = document.querySelectorAll('.type-preview');
    
    typeCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                y: 60,
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    end: 'top center',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        // Add hover animation
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.img-placeholder img'), {
                scale: 1.08,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('.type-preview-content'), {
                y: -8,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.img-placeholder img'), {
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
            });
            gsap.to(card.querySelector('.type-preview-content'), {
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

// Production page specific animations
function initProductionAnimations() {
    if (!document.querySelector('.production-hero')) return;

    // Floating scroll indicator animation
    gsap.to('.floating-indicator', {
        y: -20,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Nav buttons hover effect
    const processNavBtns = document.querySelectorAll('.process-nav-btn');
    processNavBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                y: -3,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });

    // Quality notes fade in
    gsap.utils.toArray('.quality-note').forEach(note => {
        gsap.fromTo(note,
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: note,
                    start: 'top bottom-=50',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    initSectionTitleAnimations();
    initImageFadeAnimations();
    initNavHoverAnimations();
    if (document.querySelector('.production-stage')) {
        initProductionStepAnimations();
        initProductionPageAnimations();
    }
    initTimelineAnimations();
    initFeatureCardAnimations();
    initProcessStepAnimations();
    initBenefitsAnimation();
    initHistoryCardAnimations();
    initFeaturedProductsAnimation();
    initNatureElementAnimations();
    initVideoScrollAnimation();
    initVideoHandler();
    initTypePreviewAnimations();
    initProductionAnimations();
});
