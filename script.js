// ============================================================
//  MAVERICK VINCE G DIZON — PORTFOLIO SCRIPT
// ============================================================

// --- NAVBAR: SCROLL EFFECT, ACTIVE LINK, HAMBURGER ---
(function () {
    const navbar    = document.querySelector('.navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('nav-links');

    // Scroll shadow
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // Active link — highlight current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });

    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('mobile-open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (navbar && !navbar.contains(e.target) && navLinks.classList.contains('mobile-open')) {
                navLinks.classList.remove('mobile-open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
})();

// --- CUSTOM CURSOR ---
const cursorDot     = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top  = `${e.clientY}px`;
        cursorOutline.animate(
            { left: `${e.clientX}px`, top: `${e.clientY}px` },
            { duration: 400, fill: 'forwards' }
        );
    });
    window.addEventListener('mousedown', () => {
        cursorOutline.style.transform = 'scale(0.8)';
        cursorDot.style.transform     = 'scale(1.5)';
    });
    window.addEventListener('mouseup', () => {
        cursorOutline.style.transform = 'scale(1)';
        cursorDot.style.transform     = 'scale(1)';
    });
}

// --- INTERSECTION OBSERVER — SECTION CARDS ---
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('section-visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.wid-card, .stat-card, .fp-proj-card, .fp-card').forEach(el => sectionObserver.observe(el));

// --- HOVER CURSOR INTERACTIONS ---
const handleHover = () => {
    const interactables = document.querySelectorAll(
        'a, button, .btn, .stat-card, .btn-small, .cert-list li a, input, textarea'
    );
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
};

// --- SCROLL REVEAL ENGINE ---
const revealOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('active');
        });
    }, 100);
};

document.addEventListener('DOMContentLoaded', () => {
    handleHover();
    revealOnScroll();
});
// Contact form
const ctForm = document.getElementById('contact-form');

if (ctForm) {
    ctForm.addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevents page reload
        
        const toast = document.getElementById('contact-toast');
        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Change button state
        submitBtn.disabled = true;
        submitBtn.innerText = "SENDING...";

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Show Success Toast
                toast.classList.remove('toast-hidden');
                toast.classList.add('toast-active');
                
                this.reset();
                setTimeout(() => {
                    toast.classList.remove('toast-active');
                    toast.classList.add('toast-hidden');
                }, 4000);
            } else {
                alert("Submission failed. Please try again.");
            }
        } catch (error) {
            alert("Network error. Check your connection.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Example JS toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    hamburger.classList.toggle('open');
    
    // Toggle scroll lock
    if(navLinks.classList.contains('mobile-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('mobile-open');
        hamburger.classList.toggle('open', isOpen);
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
            hamburger.classList.remove('open');
        });
    });
}