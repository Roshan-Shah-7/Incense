function initProductFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const subFilters = document.querySelectorAll('.sub-filters .filter-btn');
    const products = document.querySelectorAll('.product-card');
    let activeFilters = new Set(['all']);
    
    function updateProducts() {
        products.forEach(product => {
            const categories = product.dataset.category.split(' ');
            const shouldShow = activeFilters.has('all') || 
                categories.some(cat => activeFilters.has(cat));
            
            if (shouldShow) {
                product.style.display = 'block';
                gsap.to(product, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            } else {
                gsap.to(product, {
                    opacity: 0,
                    scale: 0.95,
                    duration: 0.4,
                    ease: 'power2.out',
                    onComplete: () => {
                        product.style.display = 'none';
                    }
                });
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Handle main category filters
            if (!btn.parentElement.classList.contains('sub-filters')) {
                filterBtns.forEach(b => {
                    if (!b.parentElement.classList.contains('sub-filters')) {
                        b.classList.remove('active');
                    }
                });
                btn.classList.add('active');
                activeFilters.clear();
                activeFilters.add(filter);
            } else {
                // Handle sub-filters
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active');
                    activeFilters.delete(filter);
                } else {
                    btn.classList.add('active');
                    activeFilters.add(filter);
                    activeFilters.delete('all');
                }
                
                // If no sub-filters are active, show all
                if (!Array.from(subFilters).some(btn => btn.classList.contains('active'))) {
                    activeFilters.add('all');
                }
            }
            
            updateProducts();
        });
    });
}

document.addEventListener('DOMContentLoaded', initProductFiltering);
