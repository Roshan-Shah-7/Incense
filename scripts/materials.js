function initMaterialsFiltering() {
    const filterBtns = document.querySelectorAll('.material-nav-btn');
    const materialGroups = document.querySelectorAll('.material-group');
    
    // Show all materials and first button active initially
    filterBtns[0].classList.add('active');
    materialGroups.forEach(group => {
        group.classList.add('visible');
        group.style.display = 'block';
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-category');

            materialGroups.forEach(group => {
                const cards = group.querySelectorAll('.material-card');
                let hasVisibleCards = false;

                cards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        gsap.to(card, {
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                        hasVisibleCards = true;
                    } else {
                        gsap.to(card, {
                            opacity: 0,
                            scale: 0.95,
                            duration: 0.4,
                            ease: 'power2.out',
                            onComplete: () => {
                                card.style.display = 'none';
                            }
                        });
                    }
                });

                // Show/hide material groups based on visible cards
                if (hasVisibleCards) {
                    group.style.display = 'block';
                    gsap.to(group, {
                        opacity: 1,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                } else {
                    gsap.to(group, {
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.out',
                        onComplete: () => {
                            group.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Initialize animations and filtering
document.addEventListener('DOMContentLoaded', () => {
    initMaterialsFiltering();
    
    // Initial animation for material groups
    gsap.utils.toArray('.material-group').forEach((group, index) => {
        gsap.fromTo(group,
            {
                opacity: 0,
                y: 50
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.2,
                ease: 'power2.out'
            }
        );
    });
});
