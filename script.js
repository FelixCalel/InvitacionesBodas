// RSVP Confirmation Function
function confirmAttendance() {
    // For now, we'll show an alert. In production, this could connect to a form service
    const confirmed = confirm('¿Deseas confirmar tu asistencia a nuestra boda?');
    
    if (confirmed) {
        // In a real implementation, you might:
        // 1. Open a Google Form
        // 2. Send to a backend API
        // 3. Redirect to a contact form
        
        alert('¡Gracias por confirmar! Por favor contáctanos por WhatsApp o teléfono para completar tu confirmación.');
        
        // Optional: You could redirect to WhatsApp or a contact method
        // window.open('https://wa.me/50212345678?text=Confirmo%20mi%20asistencia%20a%20la%20boda', '_blank');
    }
}

// Smooth scroll for any future anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add entrance animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.detail-card, .ceremony, .rsvp, .dress-code');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
