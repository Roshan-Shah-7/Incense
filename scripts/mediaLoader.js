function initMediaOptimization() {
    // Lazy load images using Intersection Observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Handle video loading and optimization
    const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.load();
                    observer.unobserve(video);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // Initialize observers for all media
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    document.querySelectorAll('video[data-src]').forEach(video => videoObserver.observe(video));

    // Handle responsive image loading
    function loadResponsiveImage(img) {
        const sizes = img.dataset.sizes?.split(',') || ['400w', '800w', '1200w'];
        const basePath = img.dataset.src.replace(/\.[^/.]+$/, '');
        const ext = img.dataset.src.split('.').pop();
        
        let srcset = sizes.map(size => {
            const width = parseInt(size);
            return `${basePath}-${width}.${ext} ${size}`;
        }).join(', ');
        
        img.srcset = srcset;
        img.sizes = '(max-width: 400px) 100vw, (max-width: 800px) 50vw, 33vw';
    }

    // Initialize responsive images
    document.querySelectorAll('img[data-responsive="true"]').forEach(loadResponsiveImage);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initMediaOptimization);
