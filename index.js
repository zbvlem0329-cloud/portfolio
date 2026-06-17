document.addEventListener('DOMContentLoaded', () => {
    // Interactive 3D Tilt & Glow Reflex Effect for Cards
    const cards = document.querySelectorAll('.project-card');

    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            
            // Mouse coordinates relative to the card element
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Update glow position
            if (glow) {
                glow.style.left = `${x - 150}px`;
                glow.style.top = `${y - 150}px`;
            }

            // Tilt calculation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max tilt angle (degrees)
            const maxTilt = 4;

            // Calculate percentage deviation from center (-1 to 1)
            const tiltX = ((centerY - y) / centerY) * maxTilt;
            const tiltY = ((x - centerX) / centerX) * maxTilt;

            // Apply 3D transform to card
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transformation
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            
            // Reset glow position to default top-right
            if (glow) {
                glow.style.left = '';
                glow.style.top = '';
            }
        });
    });
});
