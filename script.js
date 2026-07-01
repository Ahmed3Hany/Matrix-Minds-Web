"use strict";
/* === CORE FUNCTIONALITY === */
/* Cursor */ (() => {
    const d = document.getElementById("cursor-dot"),
        r = document.getElementById("cursor-ring");
    if (!d || !r) return;
    let mx = 0,
        my = 0,
        rx = 0,
        ry = 0;
    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
        d.style.left = mx + "px";
        d.style.top = my + "px";
    });
    (function a() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        r.style.left = rx + "px";
        r.style.top = ry + "px";
        requestAnimationFrame(a);
    })();
    document
        .querySelectorAll("a,button,.arch-card,.gallery-item,.hw-card,.about-pill")
        .forEach((el) => {
            el.addEventListener("mouseenter", () => {
                r.style.width = "52px";
                r.style.height = "52px";
            });
            el.addEventListener("mouseleave", () => {
                r.style.width = "36px";
                r.style.height = "36px";
            });
        });
})();
/* Loader */ (() => {
    const l = document.getElementById("loader"),
        b = document.getElementById("loaderBar"),
        la = document.getElementById("loaderLabel");
    if (!l) return;
    const s = [
        [0, "INITIALIZING SYSTEM"],
        [25, "LOADING COMPONENTS"],
        [55, "CONNECTING HARDWARE"],
        [80, "CALIBRATING SENSORS"],
        [100, "SYSTEM READY"],
    ];
    let i = 0;
    function st() {
        if (i >= s.length) return;
        const [p, m] = s[i++];
        b.style.width = p + "%";
        la.textContent = m;
        if (i < s.length) setTimeout(st, 300 + Math.random() * 200);
        else
            setTimeout(() => {
                l.style.transition = "opacity .7s,visibility .7s";
                l.style.opacity = "0";
                l.style.visibility = "hidden";
                setTimeout(heroAnim, 300);
            }, 500);
    }
    setTimeout(st, 200);
})();
/* Particles */ (() => {
    const c = document.getElementById("particleCanvas");
    if (!c) return;
    const cx = c.getContext("2d");
    let W,
        H,
        pts = [],
        mx = -999,
        my = -999;
    const N = 80,
        C = ["rgba(0,191,255,", "rgba(0,229,255,", "rgba(0,140,255,"];
    function resize() {
        W = c.width = window.innerWidth;
        H = c.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();
    function mk() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            a: Math.random() * 0.4 + 0.1,
            c: C[Math.floor(Math.random() * 3)],
        };
    }
    for (let i = 0; i < N; i++) pts.push(mk());
    document.addEventListener("mousemove", (e) => {
        mx = e.clientX;
        my = e.clientY;
    });
    (function draw() {
        cx.clearRect(0, 0, W, H);
        for (let i = 0; i < pts.length; i++)
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x,
                    dy = pts[i].y - pts[j].y,
                    d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    cx.beginPath();
                    cx.strokeStyle = `rgba(0,191,255,${0.07 * (1 - d / 120)})`;
                    cx.lineWidth = 0.5;
                    cx.moveTo(pts[i].x, pts[i].y);
                    cx.lineTo(pts[j].x, pts[j].y);
                    cx.stroke();
                }
            }
        pts.forEach((p) => {
            const dx = p.x - mx,
                dy = p.y - my,
                d = Math.sqrt(dx * dx + dy * dy);
            if (d < 100) {
                const f = (100 - d) / 100;
                p.vx += (dx / d) * f * 0.35;
                p.vy += (dy / d) * f * 0.35;
            }
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
            cx.beginPath();
            cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            cx.fillStyle = p.c + p.a + ")";
            cx.fill();
        });
        requestAnimationFrame(draw);
    })();
})();
/* Navbar */ (() => {
    const n = document.getElementById("navbar");
    if (!n) return;
    window.addEventListener(
        "scroll",
        () => n.classList.toggle("scrolled", window.scrollY > 50),
        { passive: true },
    );
})();
/* Mobile menu */ function closeMobileMenu() {
    document.getElementById("mobileMenu")?.classList.remove("open");
    document.getElementById("navBurger")?.classList.remove("active");
}
(() => {
    const b = document.getElementById("navBurger"),
        m = document.getElementById("mobileMenu");
    if (!b || !m) return;
    b.addEventListener("click", () => {
        m.classList.toggle("open");
        b.classList.toggle("active");
    });
})();
/* Parallax */ (() => {
    const badges = document.querySelectorAll(".tech-badge[data-depth]"),
        visual = document.getElementById("heroVisual");
    if (visual)
        document.addEventListener("mousemove", (e) => {
            const cx = innerWidth / 2,
                cy = innerHeight / 2,
                dx = (e.clientX - cx) / cx,
                dy = (e.clientY - cy) / cy;
            visual.style.transform = `perspective(1200px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg)`;
        });
    badges.forEach((b) =>
        document.addEventListener("mousemove", (e) => {
            const cx = innerWidth / 2,
                cy = innerHeight / 2,
                dx = (e.clientX - cx) / cx,
                dy = (e.clientY - cy) / cy,
                d = parseFloat(b.dataset.depth) || 0.5;
            b.style.transform = `translate(${dx * 18 * d}px,${dy * 14 * d}px)`;
        }),
    );
})();
/* Scroll reveal */ (() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("visible");
                    io.unobserve(e.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
})();
/* Hardware filter */ (() => {
    document.querySelectorAll(".hw-filter-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            document
                .querySelectorAll(".hw-filter-btn")
                .forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            const f = this.dataset.filter;
            document.querySelectorAll(".hw-card").forEach((card) => {
                if (f === "all" || card.dataset.cat === f) {
                    card.style.display = "";
                    setTimeout(() => (card.style.opacity = "1"), 10);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => (card.style.display = "none"), 300);
                }
            });
        });
    });
})();
/* Gallery filter */ (() => {
    document.querySelectorAll(".gf-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            document
                .querySelectorAll(".gf-btn")
                .forEach((b) => b.classList.remove("active"));
            this.classList.add("active");
            const f = this.dataset.gf;
            document.querySelectorAll(".gallery-item").forEach((item) => {
                if (f === "all" || item.dataset.gf === f) {
                    item.style.display = "";
                    setTimeout(() => (item.style.opacity = "1"), 10);
                } else {
                    item.style.opacity = "0";
                    setTimeout(() => (item.style.display = "none"), 300);
                }
            });
        });
    });
})();
/* Lightbox */ const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

document.querySelectorAll(".gallery-item img").forEach((img) => {
    img.addEventListener("click", function (e) {
        e.stopPropagation();

        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;

        lightbox.classList.add("open");
    });
});

function closeLightbox() {
    lightbox.classList.remove("open");

    lightboxImg.src = "";
}

lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
});
/* Modal */ const modalData = {
    power: {
        title: "Power Block Diagram",
        icon: "fa-solid fa-bolt",
        img: "Images/Power_Block_DG.png",
    },

    data: {
        title: "Data Block Diagram",
        icon: "fa-solid fa-diagram-project",
        img: "Images/Data_Block_DG.png",
    },

    circuit: {
        title: "Full Circuit Diagram",
        icon: "fa-solid fa-circle-nodes",
        img: "Images/Main Circuit.png",
    },
};
function openModal(type) {
    const d = modalData[type];

    if (!d) return;

    document.getElementById("modalTitle").textContent = d.title;

    document.getElementById("diagramImage").src = d.img;

    document.getElementById("diagramModal").classList.add("open");
}
function closeModal() {
    document.getElementById("diagramModal").classList.remove("open");
}
document
    .getElementById("diagramModal")
    ?.addEventListener("click", function (e) {
        if (e.target === this) closeModal();
    });
/* Hero GSAP */ function heroAnim() {
    if (typeof gsap === "undefined") {
        document
            .querySelectorAll(
                "#heroEyebrow,#heroTitle,#heroSubtitle,#heroDesc,#heroStats,#heroCTAs,#heroVisual,#scrollIndicator",
            )
            .forEach((el) => (el.style.opacity = "1"));
        return;
    }
    gsap.set(
        ["#heroEyebrow", "#heroSubtitle", "#heroDesc", "#heroStats", "#heroCTAs"],
        { y: 24 },
    );
    gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("#heroEyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to("#heroTitle", { opacity: 1, duration: 0.01 }, 0.3)
        .from("#titleLine1", { y: 70, opacity: 0, duration: 0.75 }, 0.3)
        .from("#titleLine2", { y: 70, opacity: 0, duration: 0.75 }, 0.45)
        .from("#titleLine3", { y: 70, opacity: 0, duration: 0.75 }, 0.6)
        .to("#heroSubtitle", { opacity: 1, y: 0, duration: 0.6 }, 0.78)
        .to("#heroDesc", { opacity: 1, y: 0, duration: 0.6 }, 0.9)
        .to("#heroStats", { opacity: 1, y: 0, duration: 0.6 }, 1.02)
        .to("#heroCTAs", { opacity: 1, y: 0, duration: 0.6 }, 1.12)
        .to("#heroVisual", { opacity: 1, duration: 1, ease: "power2.out" }, 0.55)
        .to("#scrollIndicator", { opacity: 1, duration: 0.6 }, 1.5);
}
