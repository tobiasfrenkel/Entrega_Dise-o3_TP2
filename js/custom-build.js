// custom-build.js
// El menú mobile y el reveal on-scroll de [data-reveal] ya los resuelve
// js/scripts.js (compartido con la home). Acá van las interacciones
// propias de esta página: el configurador (tabs + chips) y el filmstrip.

// keyboard navigation within each radiogroup
document.querySelectorAll('.row-options').forEach(function (group) {
  group.addEventListener('keydown', function (e) {
    var options = Array.prototype.slice.call(group.querySelectorAll('.option'));
    var currentIndex = options.indexOf(document.activeElement);
    if (currentIndex === -1) return;
    var nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextIndex = (currentIndex + 1) % options.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') nextIndex = (currentIndex - 1 + options.length) % options.length;
    if (nextIndex !== null) {
      e.preventDefault();
      options[nextIndex].focus();
      selectOption(options[nextIndex]);
    }
  });
});

// collapsible rows (useful on small screens, works everywhere)
document.querySelectorAll('.row-header').forEach(function (header) {
  header.addEventListener('click', function () {
    var row = header.closest('.config-row');
    var collapsed = row.classList.toggle('is-collapsed');
    header.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
  });
});


document.addEventListener("DOMContentLoaded", () => {

  const frame = document.querySelector(".about-course__image-frame");
  if (!frame) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* reveal al entrar en scroll */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) frame.classList.add("is-visible");
    });
  }, { threshold: .3 });

  observer.observe(frame);
  if (reducedMotion) frame.classList.add("is-visible");

  /* tilt sutil siguiendo el mouse */
  if (!reducedMotion) {

    frame.addEventListener("mousemove", (e) => {
      const rect = frame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - .5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - .5) * -10;
      frame.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
    });

    frame.addEventListener("mouseleave", () => {
      frame.style.transform = "rotateX(0) rotateY(0)";
    });

  }

  /* caption rotativo */
  const tag = frame.querySelector("[data-rotating-caption]");
  const captions = ["Elegís la madera", "Trazás el plano", "Cerrás la caja"];
  let i = 0;

  if (tag && !reducedMotion) {
    setInterval(() => {
      i = (i + 1) % captions.length;
      tag.style.opacity = "0";
      setTimeout(() => {
        tag.textContent = captions[i];
        tag.style.opacity = "1";
      }, 300);
    }, 3200);
  }

});


// ====================================================
// ABOUT COURSE — reveal + parallax
// ====================================================

(function () {

  const section = document.querySelector('.about-course');
  if (!section) return;

  const imageFrame = section.querySelector('.about-course__image-frame');
  const bannerInner = section.querySelector('.about-course__image-frame img');

  // ── OBSERVER PRINCIPAL — activa is-visible en sección ────────
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('is-visible');
          if (imageFrame) imageFrame.classList.add('is-visible');
          sectionObserver.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  sectionObserver.observe(section);

  // ── PARALLAX SUTIL EN LA IMAGEN ──────────────────────────────
  function onScroll() {
    if (!imageFrame) return;

    const rect = imageFrame.getBoundingClientRect();
    const viewH = window.innerHeight;

    if (rect.bottom < 0 || rect.top > viewH) return;

    // Progreso: 0 cuando entra, 1 cuando sale por arriba
    const progress = 1 - (rect.bottom / (viewH + rect.height));
    // Rango suave: -10px a +10px
    const shift = (progress - 0.5) * 20;

    if (bannerInner) {
      bannerInner.style.transform = `scale(1.06) translateY(${shift}px)`;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

})();

// ── FILMSTRIP (about-course) — click activa la expansión ──
const filmItems = document.querySelectorAll('.filmstrip-item');

filmItems.forEach(item => {
  item.addEventListener('click', () => {
    filmItems.forEach(i => i.classList.remove('filmstrip-item--active'));
    item.classList.add('filmstrip-item--active');
  });
});



// =========================
// IMPACT — scroll reveal
// =========================

(function () {

  const revealEls = document.querySelectorAll('.impact [data-reveal]');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // delay escalonado según posición
          const delay = i * 120;
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach(el => observer.observe(el));

})();


/* ======================================================================
   BLOQUE PRINCIPAL — Proceso, Guitar Builder, Luthiers, Gallery, Filmstrip
   Todo corre acá adentro, dentro de un único DOMContentLoaded.
====================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     PROCESO DE CONSTRUCCIÓN
     Solo click/teclado — sin hover
  ========================================== */

  const processCards = document.querySelectorAll(".process-card");

  if (processCards.length) {

    function activateProcessCard(card) {
      processCards.forEach(c => {
        c.classList.remove("is-active");
        c.setAttribute("aria-selected", "false");
      });
      card.classList.add("is-active");
      card.setAttribute("aria-selected", "true");
    }

    processCards.forEach(card => {

      // Click
      card.addEventListener("click", () => {
        activateProcessCard(card);
      });

      // Teclado
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activateProcessCard(card);
        }
      });

    });

  }

  /* ==========================================
     GUITAR BUILDER — imagen según cuerpo + madera
  ========================================== */

  const img = document.getElementById("guitarImage");

  if (img) {

    const bodyButtons = document.querySelectorAll(".gb-option--body");
    const woodButtons = document.querySelectorAll(".gb-option--wood");

    const gbState = {
      body: document.querySelector(".gb-option--body.is-active")?.dataset.body || "clasica",
      wood: document.querySelector(".gb-option--wood.is-active")?.dataset.wood || "caoba"
    };

    function updateGuitarImage() {

      const fileName = `./assets/images/guitarra-${gbState.body}-${gbState.wood}.png`;

      img.classList.add("is-changing");

      setTimeout(() => {
        img.src = fileName;
        img.alt = `Guitarra ${gbState.body} en ${gbState.wood}`;
        img.classList.remove("is-changing");
      }, 280); // coincide con los .28s de transición del CSS

    }

    function bindGbGroup(buttons, key) {

      buttons.forEach(btn => {

        btn.addEventListener("click", () => {

          buttons.forEach(b => b.classList.remove("is-active"));
          btn.classList.add("is-active");

          gbState[key] = btn.dataset[key];
          updateGuitarImage();

        });

      });

    }

    bindGbGroup(bodyButtons, "body");
    bindGbGroup(woodButtons, "wood");

  }

  /* ======================================================
     NUESTROS LUTHIERS — imagen destacada
  ====================================================== */

  const luthiersWrap = document.querySelector("[data-luthiers]");

  if (luthiersWrap) {

    const luthiersSlides = [...luthiersWrap.querySelectorAll(".luthiers-feature__slide")];
    const luthiersThumbs = [...luthiersWrap.querySelectorAll(".luthiers-feature__thumb")];
    const luthiersPanels = [...luthiersWrap.querySelectorAll(".luthiers-feature__panel")];
    const luthiersNextBtn = luthiersWrap.querySelector("[data-luthiers-next]");
    const luthiersCurrentLabel = luthiersWrap.querySelector("[data-luthiers-current]");

    let luthiersIndex = 0;
    let luthiersTimer = null;

    const LUTHIERS_AUTOPLAY_DELAY = 5000;

    function padLuthiers(n) {
      return String(n + 1).padStart(2, "0");
    }

    function renderLuthiers(newIndex) {

      luthiersSlides.forEach((slide, i) => {
        slide.classList.remove("is-active", "is-prev");
        if (i === newIndex) slide.classList.add("is-active");
        else if (i === luthiersIndex) slide.classList.add("is-prev");
      });

      luthiersThumbs.forEach((thumb, i) => {
        thumb.classList.toggle("is-active", i === newIndex);
      });

      luthiersPanels.forEach((panel, i) => {
        panel.classList.toggle("is-active", i === newIndex);
      });

      if (luthiersCurrentLabel) luthiersCurrentLabel.textContent = padLuthiers(newIndex);

      luthiersIndex = newIndex;

    }

    function goToLuthier(newIndex) {
      const total = luthiersSlides.length;
      renderLuthiers((newIndex + total) % total);
    }

    function nextLuthier() {
      goToLuthier(luthiersIndex + 1);
    }

    function startLuthiersAutoplay() {
      stopLuthiersAutoplay();
      luthiersTimer = setInterval(nextLuthier, LUTHIERS_AUTOPLAY_DELAY);
    }

    function stopLuthiersAutoplay() {
      if (luthiersTimer) {
        clearInterval(luthiersTimer);
        luthiersTimer = null;
      }
    }

    /* ── control manual: siempre gana, no espera al autoplay ── */

    if (luthiersNextBtn) {
      luthiersNextBtn.addEventListener("click", () => {
        nextLuthier();
        startLuthiersAutoplay();
      });
    }

    luthiersThumbs.forEach(thumb => {
      thumb.addEventListener("click", () => {
        const i = parseInt(thumb.dataset.index, 10);
        goToLuthier(i);
        startLuthiersAutoplay();
      });
    });

    /* pausa mientras el usuario interactúa con la sección */
    luthiersWrap.addEventListener("mouseenter", stopLuthiersAutoplay);
    luthiersWrap.addEventListener("mouseleave", startLuthiersAutoplay);
    luthiersWrap.addEventListener("focusin", stopLuthiersAutoplay);
    luthiersWrap.addEventListener("focusout", startLuthiersAutoplay);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stopLuthiersAutoplay();
    } else {
      startLuthiersAutoplay();
    }

  }

  /* ==========================================
     GALLERY — tarjeta destacada vía flechas/dots
  ========================================== */

  const galleryCards = Array.from(document.querySelectorAll(".gallery-card"));

  if (galleryCards.length) {

    const dots = Array.from(document.querySelectorAll(".dot"));
    const galleryPrevBtn = document.getElementById("galleryPrev");
    const galleryNextBtn = document.getElementById("galleryNext");

    let galleryCurrent = galleryCards.findIndex((c) => c.classList.contains("is-featured"));
    if (galleryCurrent === -1) galleryCurrent = 0;

    const cardsPerPage = Math.ceil(galleryCards.length / dots.length) || 1;

    const setFeatured = (index) => {
      galleryCurrent = (index + galleryCards.length) % galleryCards.length;

      galleryCards.forEach((card, i) => {
        card.classList.toggle("is-featured", i === galleryCurrent);
      });

      const page = Math.floor(galleryCurrent / cardsPerPage);
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === page));

      galleryCards[galleryCurrent].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    };

    galleryPrevBtn?.addEventListener("click", () => setFeatured(galleryCurrent - 1));
    galleryNextBtn?.addEventListener("click", () => setFeatured(galleryCurrent + 1));

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const page = Number(dot.dataset.page);
        setFeatured(page * cardsPerPage);
      });
    });

    galleryCards.forEach((card, i) => {
      card.addEventListener("click", () => setFeatured(i));
    });

    setFeatured(galleryCurrent);

  }

  /* ==========================================
     FILMSTRIP (build): arrastre, botones y barra de progreso
  ========================================== */

  const track = document.getElementById("filmTrack");

  if (track) {

    const filmPrevBtn = document.getElementById("filmPrev");
    const filmNextBtn = document.getElementById("filmNext");
    const progress = document.getElementById("filmProgress");
    const filmCurrentLabel = document.getElementById("filmCurrent");

    const frames = track.querySelectorAll(".build-filmstrip-frame");
    const total = frames.length;

    const frameStep = () => {
      const frame = frames[0];
      const style = getComputedStyle(track);
      const gap = parseFloat(style.columnGap || style.gap || "18");
      return frame.getBoundingClientRect().width + gap;
    };

    const updateProgress = () => {
      const max = track.scrollWidth - track.clientWidth;
      const ratio = max > 0 ? track.scrollLeft / max : 0;
      if (progress) progress.style.width = `${Math.max(8, ratio * 100)}%`;

      const index = Math.round(track.scrollLeft / frameStep());
      const clamped = Math.min(total, Math.max(1, index + 1));
      if (filmCurrentLabel) filmCurrentLabel.textContent = String(clamped).padStart(2, "0");
    };

    filmPrevBtn?.addEventListener("click", () => {
      track.scrollBy({ left: -frameStep(), behavior: "smooth" });
    });

    filmNextBtn?.addEventListener("click", () => {
      track.scrollBy({ left: frameStep(), behavior: "smooth" });
    });

    track.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    /* Drag horizontal con mouse / touch */
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    const pointerX = (e) => (e.type.includes("touch") ? e.touches[0].pageX : e.pageX);

    const dragStart = (e) => {
      isDown = true;
      startX = pointerX(e);
      scrollStart = track.scrollLeft;
      track.classList.add("is-dragging");
    };

    const dragMove = (e) => {
      if (!isDown) return;
      const walk = (pointerX(e) - startX) * 1.15;
      track.scrollLeft = scrollStart - walk;
    };

    const dragEnd = () => {
      isDown = false;
      track.classList.remove("is-dragging");
    };

    track.addEventListener("mousedown", dragStart);
    track.addEventListener("mousemove", dragMove);
    track.addEventListener("mouseup", dragEnd);
    track.addEventListener("mouseleave", dragEnd);
    track.addEventListener("touchstart", dragStart, { passive: true });
    track.addEventListener("touchmove", dragMove, { passive: true });
    track.addEventListener("touchend", dragEnd);

  }

});


/* ==========================================
   LUTHIERS — track horizontal con drag
   (sección aparte, distinta a "Nuestros luthiers")
========================================== */

const luthiersTrack = document.getElementById("luthiersTrack");

if (luthiersTrack) {

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const getPointerX = (e) =>
    e.type.includes("touch") ? e.touches[0].pageX : e.pageX;

  const dragStart = (e) => {
    isDown = true;
    luthiersTrack.classList.add("is-dragging");

    startX = getPointerX(e);
    scrollLeft = luthiersTrack.scrollLeft;
  };

  const dragMove = (e) => {
    if (!isDown) return;

    const x = getPointerX(e);
    const walk = (x - startX) * 1.2;

    luthiersTrack.scrollLeft = scrollLeft - walk;
  };

  const dragEnd = () => {
    isDown = false;
    luthiersTrack.classList.remove("is-dragging");
  };

  /* Mouse */

  luthiersTrack.addEventListener("mousedown", dragStart);
  luthiersTrack.addEventListener("mousemove", dragMove);
  luthiersTrack.addEventListener("mouseup", dragEnd);
  luthiersTrack.addEventListener("mouseleave", dragEnd);

  /* Touch */

  luthiersTrack.addEventListener("touchstart", dragStart, {
    passive: true,
  });

  luthiersTrack.addEventListener("touchmove", dragMove, {
    passive: true,
  });

  luthiersTrack.addEventListener("touchend", dragEnd);

}

/* ==========================================
   LUTHIERS REVEAL (track horizontal)
========================================== */

const luthierCards = document.querySelectorAll(".luthier-card");

const luthierObserver = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add("is-visible");

    }

  });

}, {
  threshold: .15
});

luthierCards.forEach(card => {

  luthierObserver.observe(card);

});