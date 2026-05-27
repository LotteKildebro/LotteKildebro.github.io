document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const menu = document.getElementById("menu");

    const panels = Array.from(document.querySelectorAll(".panel"));
    const topCards = Array.from(document.querySelectorAll(".topCard"));

    const BLUR_CLASS = "blurOn";
    const MENU_OPEN_CLASS = "menuOpen";
    const closeBtn = document.getElementById("closeBtn");


    if (closeBtn) {
        closeBtn.addEventListener("click", closeMenu);
    }


    function openMenu() {
        if (!menu) return;
        menu.classList.remove("hidden");
        document.body.classList.add(MENU_OPEN_CLASS);
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
    }

    function closeMenu() {
        if (!menu) return;
        menu.classList.add("hidden");
        document.body.classList.remove(MENU_OPEN_CLASS);
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
    }

    function toggleMenu() {
        if (!menu) return;
        const isHidden = menu.classList.contains("hidden");
        if (isHidden) openMenu();
        else closeMenu();
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", toggleMenu);
    }

    if (menu) {
        menu.addEventListener("click", (e) => {
            if (e.target && e.target.tagName === "A") closeMenu();
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });

    function setActiveCardBySectionId(sectionId) {
        if (!sectionId) return;
        topCards.forEach((card) => {
            const href = card.getAttribute("href") || "";
            const target = href.startsWith("#") ? href.slice(1) : "";
            card.classList.toggle("active", target === sectionId);
        });
    }

    const observedSections = panels.filter((p) => p && p.id);

    if (observedSections.length) {
        const observer = new IntersectionObserver(
            (entries) => {
                const best = entries
                    .filter((x) => x.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!best) return;

                const id = best.target.id;
                if (id && id.startsWith("material")) {
                    setActiveCardBySectionId(id);
                }
            }, {
                threshold: [0.25, 0.5, 0.6, 0.75]
            }
        );

        observedSections.forEach((s) => observer.observe(s));
    }

    let rafId = 0;
    let blurOffTimer = null;

    function nearestSnapDistancePx() {
        const y = window.scrollY || window.pageYOffset || 0;
        let min = Infinity;

        for (const p of panels) {
            if (!p) continue;
            const top = p.offsetTop;
            const d = Math.abs(y - top);
            if (d < min) min = d;
        }

        return min;
    }

    function blurOn() {
        document.body.classList.add(BLUR_CLASS);
    }

    function blurOff() {
        document.body.classList.remove(BLUR_CLASS);
    }

    function updateBlurDuringScroll() {
        if (document.body.classList.contains(MENU_OPEN_CLASS)) {
            blurOff();
            return;
        }

        const dist = nearestSnapDistancePx();

        const betweenSections = dist > 12;
        if (betweenSections) blurOn();
        else blurOff();
    }

    function onScroll() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateBlurDuringScroll);

        if (blurOffTimer) clearTimeout(blurOffTimer);
        blurOffTimer = setTimeout(() => {
            blurOff();
        }, 180);
    }

    window.addEventListener("scroll", onScroll, {
        passive: true
    });

    if ("onscrollend" in document) {
        document.addEventListener("scrollend", () => {
            blurOff();
        });
    }
});