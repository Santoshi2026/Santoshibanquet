/* =========================================
   SANTOSHI BANQUET JAVASCRIPT
   ========================================= */

   document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu open
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes into full view
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Initial reveal for elements already in viewport
    setTimeout(() => {
        const textReveals = document.querySelectorAll('.reveal-text, .reveal-fade');
        textReveals.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 100);

    // 4. Set Initial Hero Animations
    const heroText = document.querySelector('.reveal-text');
    const heroFades = document.querySelectorAll('.reveal-fade');
    
    if(heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(30px)';
        heroText.style.transition = 'all 1s ease';
    }
    heroFades.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 1s ease';
    });

    // 5. Gallery Filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Lightweight falling flowers for the banquet-facing sections
    const hotelSection = document.querySelector('#hotel');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!reducedMotion.matches) {
        const flowerLayer = document.createElement('div');
        flowerLayer.className = 'flower-fall-layer';
        document.body.appendChild(flowerLayer);

        const getIsCompactViewport = () => window.innerWidth <= 767;
        const getMaxPetals = () => getIsCompactViewport() ? 4 : 10;
        const getPetalIntervalDelay = () => getIsCompactViewport() ? 1400 : 1000;
        let activePetals = 0;
        let petalInterval;

        const shouldShowFlowers = () => {
            if (!hotelSection) return true;
            const hotelTop = hotelSection.getBoundingClientRect().top + window.scrollY;
            return window.scrollY + window.innerHeight * 0.2 < hotelTop;
        };

        const updateFlowerLayer = () => {
            flowerLayer.classList.toggle('active', shouldShowFlowers());
        };

        const restartPetalInterval = () => {
            if (petalInterval) {
                window.clearInterval(petalInterval);
            }

            petalInterval = window.setInterval(() => {
                updateFlowerLayer();
                spawnPetal();
            }, getPetalIntervalDelay());
        };

        const spawnPetal = () => {
            if (!shouldShowFlowers() || activePetals >= getMaxPetals()) return;

            const petal = document.createElement('span');
            petal.className = 'flower-petal';
            const isCompactViewport = getIsCompactViewport();
            petal.style.setProperty('--petal-left', `${8 + Math.random() * 84}%`);
            petal.style.setProperty('--petal-size', `${isCompactViewport ? 10 + Math.random() * 6 : 14 + Math.random() * 10}px`);
            petal.style.setProperty('--petal-duration', `${isCompactViewport ? 9 + Math.random() * 4 : 8 + Math.random() * 5}s`);
            petal.style.setProperty('--petal-sway', `${isCompactViewport ? 4.4 + Math.random() * 1.8 : 3.8 + Math.random() * 2.4}s`);
            petal.style.setProperty('--petal-drift', `${isCompactViewport ? -44 + Math.random() * 88 : -70 + Math.random() * 140}px`);
            petal.style.setProperty('--petal-rotate', `${Math.round(Math.random() * 120)}deg`);

            activePetals += 1;
            flowerLayer.appendChild(petal);

            petal.addEventListener('animationend', () => {
                petal.remove();
                activePetals = Math.max(0, activePetals - 1);
            }, { once: true });
        };

        updateFlowerLayer();
        window.addEventListener('scroll', updateFlowerLayer, { passive: true });
        window.addEventListener('resize', () => {
            updateFlowerLayer();
            restartPetalInterval();
        });

        restartPetalInterval();

        window.addEventListener('beforeunload', () => {
            window.clearInterval(petalInterval);
        });
    }

});
