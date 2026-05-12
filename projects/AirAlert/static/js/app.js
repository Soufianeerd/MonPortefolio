document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations on Load
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < window.innerHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    // Initial check
    setTimeout(revealOnScroll, 100);

    // Scroll listener
    window.addEventListener('scroll', revealOnScroll);

    // Dynamic Mockup Interaction (Optional)
    const mockup = document.querySelector('.iphone-mockup');
    if (mockup) {
        window.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            mockup.style.transform = `rotateY(${xAxis - 15}deg) rotateX(${yAxis + 5}deg)`;
        });
    }
});
