document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    function openMenu() {
        navLinks.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        // focus first link for keyboard users
        const firstLink = navLinks.querySelector('a');
        if (firstLink) firstLink.focus();
    }

    function closeMenu(returnFocus = true) {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        if (returnFocus) mobileMenuBtn.focus();
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            if (expanded) closeMenu(); else openMenu();
        });

        // close menu on Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    if (navLinks) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn && mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simple accessible UI feedback (prototype)
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            if (!nome || !email || !assunto || !mensagem) {
                formStatus.textContent = 'Por favor preenche todos os campos obrigatórios.';
                formStatus.classList.remove('sr-only-visible');
                return;
            }

            // Disable submit while "sending"
            const submitBtn = contactForm.querySelector('[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.setAttribute('aria-busy', 'true');
            formStatus.textContent = 'A enviar a tua mensagem...';
            formStatus.classList.remove('sr-only-visible');

            // Simulate async send (prototype)
            setTimeout(() => {
                formStatus.textContent = `Obrigado pelo teu contacto, ${nome}! Como este é um protótipo académico, a mensagem não será realmente enviada.`;
                submitBtn.disabled = false;
                submitBtn.removeAttribute('aria-busy');
                contactForm.reset();
            }, 900);
        });
    }

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            header.style.background = window.scrollY > 50 ? 'rgba(255,255,255,.98)' : 'rgba(255,255,255,.96)';
        }
    });

    // Smooth scroll for in-page anchors (respecting fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // allow external anchors like # in links that are just placeholders
            if (href === '#') return;
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
});
