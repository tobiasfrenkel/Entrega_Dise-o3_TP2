// Interacciones generales: reveal editorial, hover de cursos, partes de guitarra y marquee continuo.
document.addEventListener("DOMContentLoaded", () => {

document.querySelectorAll("video").forEach(v => {
  v.muted = true;
  v.playsInline = true;
  v.autoplay = true;

  const playPromise = v.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {});
  }
});

function startHeroIntro() {

    const lines = document.querySelectorAll(".hero-line");
    const note  = document.querySelector(".hero-title-note");
    const image = document.querySelector(".hero-media");

    lines.forEach(el => {

        el.style.opacity = 0;
        el.style.transform = "translateY(45px)";

    });

    if(note){

        note.style.opacity = 0;
        note.style.transform = "translateY(30px)";

    }

    if(image){

        image.style.opacity = 0;
        image.style.transform = "scale(1.08)";

    }

    // Líneas

    lines.forEach((line,i)=>{

        setTimeout(()=>{

            line.style.transition =
            "all .9s cubic-bezier(.22,1,.36,1)";

            line.style.opacity=1;
            line.style.transform="translateY(0)";

        },i*180);

    });

    // Bajada

    setTimeout(()=>{

        if(note){

            note.style.transition =
            "all .9s cubic-bezier(.22,1,.36,1)";

            note.style.opacity=1;
            note.style.transform="translateY(0)";

        }

    },420);

    // Imagen

    setTimeout(()=>{

        if(image){

            image.style.transition=
            "opacity 1s ease, transform 1.6s cubic-bezier(.22,1,.36,1)";

            image.style.opacity=1;
            image.style.transform="scale(1)";

            image.classList.add("hero-floating");

        }

    },650);

}



// ====================================================
// LOADER — pantalla de carga
// Pegá este script antes del cierre </body>
// ====================================================

(function () {

  const loader     = document.getElementById('loader');
  const bar        = document.getElementById('loaderBar');
  const percent    = document.getElementById('loaderPercent');

  if (!loader) return;

  // Bloqueamos scroll mientras carga
  document.body.classList.add('is-loading');

  let progress = 0;
  let done = false;

  // ── PROGRESO SIMULADO ──
  // Avanza rápido al principio, se frena cerca del 90%
  // y termina cuando la página realmente cargó
  function tick() {
    if (done) return;

    const increment = progress < 70
      ? Math.random() * 12
      : progress < 90
        ? Math.random() * 3
        : 0; // espera a que cargue la página

    progress = Math.min(progress + increment, 90);
    setProgress(progress);

    setTimeout(tick, 80 + Math.random() * 60);
  }

  function setProgress(val) {
    const rounded = Math.floor(val);
    bar.style.width = val + '%';
    percent.textContent = rounded + '%';
    if (rounded >= 100) percent.classList.add('is-done');
  }

  function finish() {
    if (done) return;
    done = true;

    // lleva la barra al 100%
    progress = 100;
    setProgress(100);

    // pequeña pausa para que se vea el 100%
    setTimeout(() => {
      loader.classList.add("is-hidden");
document.body.classList.remove("is-loading");

setTimeout(() => {
    startHeroIntro();
},250);

      // lo saca del DOM cuando termina la transición
      loader.addEventListener('transitionend', () => {
        loader.remove();
      }, { once: true });
    }, 400);
  }

  // Arranca el progreso
  tick();

  // Cuando la página carga completo, terminamos
  if (document.readyState === 'complete') {
    setTimeout(finish, 300);
  } else {
    window.addEventListener('load', () => {
      setTimeout(finish, 300);
    });
  }

  // Fallback: si tarda más de 4 segundos, cerramos igual
  setTimeout(finish, 4000);

})();

  // Revela bloques al entrar en pantalla
  const revealItems = document.querySelectorAll("[data-reveal]");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  
    // Navbar toggle
  
  revealItems.forEach((item) => revealObserver.observe(item));


  const menuToggle=document.querySelector(".menu-toggle");
const mainNav=document.querySelector(".main-nav");

menuToggle.addEventListener("click",()=>{

    menuToggle.classList.toggle("active");
    mainNav.classList.toggle("active");

});

document.querySelectorAll(".main-nav a").forEach(link=>{

    link.addEventListener("click",()=>{

        menuToggle.classList.remove("active");
        mainNav.classList.remove("active");

    });

});



  // ABOUT SECTION

  // Animacion de las palabras en About Section

  const statement = document.querySelector(".statement");

if (statement) {

  const observer = new IntersectionObserver(([entry]) => {

    if (entry.isIntersecting) {
      statement.classList.add("is-visible");
    }

  }, {
    threshold: 0.3
  });

  observer.observe(statement);

}

/* MOBILE TAP */
const cards = document.querySelectorAll(".about-card");

if (cards.length) {
    cards[0].classList.add("is-active");
}

if (cards.length) {

    let active = cards[0];

    cards.forEach(card => {
        card.addEventListener("click", () => {

            if (active === card) {
                card.classList.remove("is-active");
                active = null;
                return;
            }

            if (active) active.classList.remove("is-active");

            card.classList.add("is-active");
            active = card;
        });
    });



    document.addEventListener("click", (e) => {
        if (!e.target.closest(".about-card")) {
            cards.forEach(c => c.classList.remove("is-active"));
            active = null;
        }
    });

    if (window.innerWidth <= 900) {

    // desactiva drag en mobile (mejor UX)
    track?.removeEventListener("mousedown", start);
    track?.removeEventListener("mousemove", move);
    track?.removeEventListener("mouseup", stop);
    track?.removeEventListener("mouseleave", stop);
}
}

document.addEventListener("DOMContentLoaded", () => {

  const impact = document.querySelector(".impact");

  if (!impact) return;

  window.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    impact.style.setProperty("--mx", `${x}%`);
    impact.style.setProperty("--my", `${y}%`);

  });

});

const about = document.querySelector(".about");

if (about) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            about.classList.add("show");
            observer.disconnect();

        }

    },{
        threshold:.2
    });

    observer.observe(about);

}

// =========================
// INTRO EXPERIENCE ANIMATION
// =========================

const introSection = document.querySelector(".intro-cards");

if (introSection) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            introSection.classList.add("show");
            observer.disconnect();

        }

    },{
        threshold:.2
    });

    observer.observe(introSection);

}

 // =========================
// SECCION DE PRESENTACION
// =========================

document.querySelectorAll(".experience-card").forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.classList.add("active");

    });


    card.addEventListener("mouseleave",()=>{

        card.classList.remove("active");

    });

});

 // =========================
// COURSES — video + play btn
// =========================

(function () {
  const courseCards = document.querySelectorAll(".course-card");

  courseCards.forEach(card => {
    const video = card.querySelector(".course-video");
    const playBtn = card.querySelector(".play-btn");

    if (!video) return;

    // ---------- PLAY BTN ----------
    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (video.paused) {
          video.play();
          playBtn.style.opacity = "0";
        } else {
          video.pause();
          playBtn.style.opacity = "1";
        }
      });

      // Mostrar el botón cuando el video termina
      video.addEventListener("ended", () => {
        playBtn.style.opacity = "1";
        video.currentTime = 0;
      });
    }

card.addEventListener("mouseenter", () => {

    video.play();

    if(playBtn){

        playBtn.style.opacity="0";

    }

});

card.addEventListener("mouseleave", () => {

    video.pause();

    video.currentTime=0;

    if(playBtn){

        playBtn.style.opacity="1";

    }

});

    // Marcar cuándo el usuario inició el play manualmente
    playBtn?.addEventListener("click", () => {
      if (video.paused) {
        card.dataset.userPlaying = "false";
      } else {
        card.dataset.userPlaying = "true";
      }
    });
  });

  // ---------- INTERSECTION OBSERVER — pausar fuera de viewport ----------
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const card = entry.target;
        const video = card.querySelector(".course-video");
        const playBtn = card.querySelector(".play-btn");

        if (!video) return;

        if (!entry.isIntersecting) {
          video.pause();
          video.currentTime = 0;
          delete card.dataset.userPlaying;
          if (playBtn) playBtn.style.opacity = "1";
        }
      });
    }, { threshold: 0.2 });

    courseCards.forEach(card => observer.observe(card));
  }

})();

// =========================
// COURSES REVEAL
// =========================

const courses = document.querySelector(".courses");

if (courses) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            courses.classList.add("show");
            observer.disconnect();

        }

    },{
        threshold:.18
    });

    observer.observe(courses);

}

  // =========================
  // PARTES DE GUITARRA
  // =========================
  const partBlocks = document.querySelectorAll(".part-block");
  const partsImage = document.querySelector("#parts-image");

  function activateBlock(block) {
    if (!partsImage) return;
    if (block.classList.contains("is-selected")) return;

    partBlocks.forEach(item => item.classList.remove("is-selected"));
    block.classList.add("is-selected");

    const button = block.querySelector(".part-item");

    partsImage.classList.remove("is-visible");

    setTimeout(() => {
      partsImage.src = button.dataset.image;
      partsImage.alt = button.textContent.trim();
      partsImage.classList.add("is-visible");
    }, 180);
  }

  partBlocks.forEach((block) => {
    const button = block.querySelector(".part-item");

    button.addEventListener("click", () => {
      activateBlock(block);
    });
  });

  if (partsImage) {
    partsImage.classList.add("is-visible");
  }

  const impact = document.querySelector(".impact");

  if (impact) {

    let targetX = 50;
    let targetY = 50;

    let currentX = 50;
    let currentY = 50;

    let offsetX = 0;
    let offsetY = 0;

    impact.addEventListener("mousemove", (e) => {
      const rect = impact.getBoundingClientRect();

      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;

      const dx = (e.clientX - rect.left - rect.width / 2) * 0.08;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.08;

      offsetX = dx;
      offsetY = dy;
    });

    function animate() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      offsetX *= 0.92;
      offsetY *= 0.92;

      impact.style.setProperty("--x", currentX + "%");
      impact.style.setProperty("--y", currentY + "%");

      impact.style.setProperty("--dx", offsetX);
      impact.style.setProperty("--dy", offsetY);

      requestAnimationFrame(animate);
    }

    animate();
  }


  const marquee = document.querySelector(".marquee-track");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }


  const workshopVideo = document.querySelector('.video-placeholder');

  if (workshopVideo) {
    workshopVideo.muted = true;
    workshopVideo.loop = true;
    workshopVideo.controls = false;
    workshopVideo.setAttribute('tabindex', '-1');

    const playObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const p = workshopVideo.play();
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } else {
          workshopVideo.pause();
        }
      });
    }, { threshold: [0.25, 0.5, 0.75] });

const videoSection = document.querySelector('.wide-video');

if (videoSection) {
  playObserver.observe(videoSection);
}
  }

});

// =========================
// GUITAR PARTS REVEAL
// =========================

const guitarParts = document.querySelector(".guitar-parts");

if (guitarParts) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            guitarParts.classList.add("show");
            observer.disconnect();

        }

    },{

        threshold:.18

    });

    observer.observe(guitarParts);

}

/* ======================================================
   EDITORIAL SECTION
====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const editorial=document.querySelector(".editorial");

    if(!editorial) return;

    /* ==========================
       REVEAL ON SCROLL
    ========================== */

    const observer=new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){
                editorial.classList.add("is-visible");
            }

        });

    },{

        threshold:.2

    });

    observer.observe(editorial);

    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
        editorial.classList.add("is-visible");
    }

    /* ==========================
       VIDEO PARALLAX
    ========================== */

    const video=editorial.querySelector(".editorial-video");

    let targetX=0;
    let targetY=0;
    let currentX=0;
    let currentY=0;
    let scrollOffset=0;

    function updateScroll(){

        const rect=editorial.getBoundingClientRect();
        scrollOffset=(window.innerHeight/2-rect.top)*0.025;

    }

    editorial.addEventListener("mousemove",(e)=>{

        const rect=editorial.getBoundingClientRect();

        targetX=((e.clientX-rect.left)/rect.width-.5)*14;
        targetY=((e.clientY-rect.top)/rect.height-.5)*14;

    });

    editorial.addEventListener("mouseleave",()=>{

        targetX=0;
        targetY=0;

    });

    function animate(){

        currentX+=(targetX-currentX)*.08;
        currentY+=(targetY-currentY)*.08;

        if(video){

            video.style.transform=`translate(${currentX}px,${currentY+scrollOffset}px) scale(1.06)`;

        }

        requestAnimationFrame(animate);

    }

    animate();
    updateScroll();

    window.addEventListener("scroll",updateScroll,{passive:true});
    window.addEventListener("resize",updateScroll);

    /* ==========================
       STATEMENTS — accesibilidad
       (permite abrir con teclado ademas de hover)
    ========================== */

    const heads=editorial.querySelectorAll(".editorial-statement-head");

    heads.forEach(head=>{

        head.setAttribute("tabindex","0");
        head.setAttribute("role","button");

        head.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"||e.key===" "){

                e.preventDefault();

                const statement=head.closest(".editorial-statement");

                statement.classList.toggle("is-open-kb");

            }

        });

    });

});


/* ======================================================
   MATERIALS SECTION — FLIP CARDS
====================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const cards=document.querySelectorAll(".materials-card");

    if(!cards.length) return;

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            cards.forEach(c=>{

                if(c!==card){
                    c.classList.remove("is-flipped");
                }

            });

            card.classList.toggle("is-flipped");

        });

    });

});

/* ==========================
   MATERIALS REVEAL
========================== */

const materials = document.querySelector(".materials");

if (materials) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            materials.classList.add("show");
            observer.disconnect();

        }

    },{
        threshold:.18
    });

    observer.observe(materials);

}

/* ======================================================
   GALLERY MARQUEE - PREMIUM DRAG
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const section = document.querySelector(".gallery-marquee-section");
    const track = document.querySelector(".marquee-track.images");

    if (!section || !track) return;

    track.innerHTML += track.innerHTML;

    let started = false;

    const revealObserver = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            section.classList.add("show");
            started = true;

            revealObserver.disconnect();

        }

    },{
        threshold:.18
    });

    revealObserver.observe(section);

    let position = 0;
    let velocity = -1.2;

    let isDragging = false;
    let startX = 0;
    let lastX = 0;

    let halfWidth = 0;

    function updateWidth(){
        halfWidth = track.scrollWidth / 2;
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    function loop(){

        if(started && !isDragging){
            position += velocity;
        }

        if(position <= -halfWidth){
            position += halfWidth;
        }

        if(position >= 0){
            position -= halfWidth;
        }

        track.style.transform = `translate3d(${position}px,0,0)`;

        requestAnimationFrame(loop);
    }

    loop();

    // ------------------------
    // Mouse Drag
    // ------------------------

    track.addEventListener("mousedown",(e)=>{

        e.preventDefault();

        isDragging=true;
        lastX=e.clientX;

        document.body.style.userSelect="none";
        track.style.cursor="grabbing";

    });

    window.addEventListener("mousemove",(e)=>{

        if(!isDragging) return;

        const delta=e.clientX-lastX;

        position+=delta;
        lastX=e.clientX;

    });

    window.addEventListener("mouseup",()=>{

        if(!isDragging) return;

        isDragging=false;

        document.body.style.userSelect="";
        track.style.cursor="grab";

    });

    window.addEventListener("mouseleave",()=>{

        isDragging=false;

        document.body.style.userSelect="";
        track.style.cursor="grab";

    });

    // ------------------------
    // Touch
    // ------------------------

    track.addEventListener("touchstart",(e)=>{

        isDragging=true;

        startX=e.touches[0].clientX;
        lastX=startX;

    },{passive:true});

    window.addEventListener("touchmove",(e)=>{

        if(!isDragging) return;

        const x=e.touches[0].clientX;
        const delta=x-lastX;

        position+=delta;
        velocity=delta;

        lastX=x;

    },{passive:true});

    window.addEventListener("touchend",()=>{

        isDragging=false;

    });

});

/* ==========================
   FOOTER REVEAL
========================== */

const footer = document.querySelector(".site-footer");

if (footer) {

    const observer = new IntersectionObserver((entries)=>{

        if(entries[0].isIntersecting){

            footer.classList.add("show");
            observer.disconnect();

        }

    },{
        threshold:.15
    });

    observer.observe(footer);

}

// =========================
// INTRO FAST ANIMATION
// =========================

const revealElements = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.classList.add("is-visible");

    if (entry.target.classList.contains("stats-grid")) {
      entry.target.classList.add("is-visible");
      animateNumbers(entry.target);
    }

    observer.unobserve(entry.target); // 🔥 clave: corre UNA vez
  });
}, {
  threshold: 0.25
});

revealElements.forEach(el => observer.observe(el));


// =========================
// COUNT UP RÁPIDO (MÁS NATURAL)
// =========================

function animateNumbers(container) {
  const numbers = container.querySelectorAll("strong");

  numbers.forEach(el => {
    const text = el.textContent.trim();
    const match = text.match(/\d+/);

    if (!match) return;

    const target = parseInt(match[0]);
    const suffix = text.replace(match[0], "");

    let current = 0;
    const duration = 600; // 🔥 más rápido
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = target / steps;

    const counter = setInterval(() => {
      current += increment;

      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(counter);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  });
}