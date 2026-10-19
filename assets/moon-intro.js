(() => {
    function initMoonIntro() {
        const intro = document.getElementById('moon-intro');
        if (!intro || intro.dataset.moonInitialized) return;

        const stage = intro.querySelector('.moon-stage');
        const moon = intro.querySelector('.moon-disc');
        if (!stage || !moon) return;

        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const clamp = (value) => Math.max(0, Math.min(1, value));
        const smooth = (start, end, value) => {
            const t = clamp((value - start) / (end - start));
            return t * t * (3 - 2 * t);
        };

        let startY = 0;
        let distance = 1;
        let maxScale = 1;
        let frame = null;

        function render() {
            const progress = motion.matches
                ? 1
                : clamp((window.scrollY - startY) / distance);

            const scale = 1 + (maxScale - 1) * smooth(0, 0.78, progress);
            const opacity = 1 - smooth(0.76, 0.96, progress);
            const hintOpacity = 1 - smooth(0, 0.12, progress);

            intro.style.setProperty('--moon-scale', String(scale));
            intro.style.setProperty('--moon-opacity', String(opacity));
            intro.style.setProperty('--moon-hint-opacity', String(hintOpacity));
            document.body.classList.toggle('moon-intro-active', progress < 0.96);
        }

        function measure() {
            startY = window.scrollY + intro.getBoundingClientRect().top;
            distance = Math.max(1, intro.offsetHeight - stage.offsetHeight);
            const diagonal = Math.hypot(stage.clientWidth, stage.clientHeight);
            maxScale = Math.max(1, diagonal / Math.max(1, moon.offsetWidth) * 1.08);
            render();
        }

        function scheduleRender() {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                render();
            });
        }

        intro.dataset.moonInitialized = 'true';
        intro.classList.add('is-ready');

        window.addEventListener('scroll', scheduleRender, { passive: true });
        window.addEventListener('resize', measure, { passive: true });
        window.addEventListener('load', measure, { once: true });
        window.addEventListener('pageshow', measure);
        motion.addEventListener('change', measure);

        if ('ResizeObserver' in window) {
            const observer = new window.ResizeObserver(measure);
            observer.observe(stage);
        }

        measure();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMoonIntro, { once: true });
    } else {
        initMoonIntro();
    }
})();
