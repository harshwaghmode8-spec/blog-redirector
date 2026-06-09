// embed.js
// Aggressive interaction redirect.
// Redirects the user to a YouTube video upon ANY interaction (scroll, touch, click, keypress).

let hasRedirected = false;

function triggerRedirect(e) {
    // Prevent multiple redirects firing at once
    if (hasRedirected) return;
    
    // If it's a click, prevent the default link behavior
    if (e && e.type === 'click') {
        e.preventDefault();
    }
    
    if (typeof VIDEO_URLS !== 'undefined' && VIDEO_URLS.length > 0) {
        hasRedirected = true;
        
        // Pick a random video from config.js
        const randomIndex = Math.floor(Math.random() * VIDEO_URLS.length);
        const targetUrl = VIDEO_URLS[randomIndex];
        
        // Redirect immediately
        window.location.replace(targetUrl);
    }
}

// Listen for almost ANY user interaction with the page
document.addEventListener("DOMContentLoaded", function() {
    // 1. Mouse Clicks
    document.addEventListener('click', triggerRedirect, { capture: true, passive: false });
    
    // 2. Mobile Touches (tapping the screen)
    document.addEventListener('touchstart', triggerRedirect, { capture: true, passive: false });
    
    // 3. Scrolling the page (desktop or mobile)
    document.addEventListener('scroll', triggerRedirect, { capture: true, passive: true });
    
    // 4. Mouse wheel scrolling
    window.addEventListener('wheel', triggerRedirect, { capture: true, passive: true });
    
    // 5. Pressing any key
    document.addEventListener('keydown', triggerRedirect, { capture: true, passive: false });
});
