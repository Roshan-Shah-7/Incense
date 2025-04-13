function initPlaceholders() {
    // Replace video elements with lightweight placeholders until needed
    document.querySelectorAll('video').forEach(video => {
        const poster = video.getAttribute('poster');
        if (!poster) return;

        const placeholder = document.createElement('div');
        placeholder.className = 'video-placeholder';
        placeholder.style.backgroundImage = `url(${poster})`;
        
        const playButton = document.createElement('button');
        playButton.className = 'play-button';
        playButton.innerHTML = '▶';
        placeholder.appendChild(playButton);

        // Replace video with placeholder until clicked
        video.parentNode.insertBefore(placeholder, video);
        video.style.display = 'none';

        playButton.addEventListener('click', () => {
            video.style.display = 'block';
            placeholder.remove();
            video.play();
        });
    });

    // Add loading state for images
    document.querySelectorAll('img[data-src]').forEach(img => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-loader';
        
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        wrapper.appendChild(spinner);

        img.parentNode.insertBefore(wrapper, img);
        img.addEventListener('load', () => {
            wrapper.remove();
            img.classList.add('loaded');
        });
    });
}

document.addEventListener('DOMContentLoaded', initPlaceholders);
