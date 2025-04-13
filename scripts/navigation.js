function initNavigation() {
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;
    
    // Handle scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when page is scrolled
        nav.classList.toggle('scrolled', currentScroll > 50);
        
        // Hide/show navbar based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Add hover animations
    const navLinks = document.querySelectorAll('.nav-link:not(.active)');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Add click ripple effect
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.classList.add('nav-ripple');
            
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            link.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
}

document.addEventListener('DOMContentLoaded', initNavigation);
