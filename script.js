/**
 * Portofolio Interaktif — SaaSchet
 * Fitur: kustom kursor, tema gelap/terang, animasi scroll,
 *        efek mengetik, filter proyek, visualizer, form validasi,
 *        parallax, easter egg, counter animasi.
 */

(function () {
  'use strict';

  /* ───────── utilities ───────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const debounce = (fn, ms = 100) => {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  };

  /* ───────── 1. Custom Cursor ───────── */
  const cursor = $('#cursor');
  const follower = $('#cursorFollower');

  if (cursor && follower) {
    let mx = 0, my = 0, fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      cursor.style.transform = `translate(${mx}px, ${my}px)`;
    });

    const loop = () => {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.transform = `translate(${fx}px, ${fy}px)`;
      requestAnimationFrame(loop);
    };
    loop();

    const grow = (el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(99,102,241,0.25)';
        follower.style.opacity = '0';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.background = 'var(--primary)';
        follower.style.opacity = '0.5';
      });
    };

    $$('a, button, .project-card, .skill-category, .contact-card').forEach(grow);
  }

  /* ───────── 2. Dark / Light Mode ───────── */
  const themeToggle = $('#themeToggle');
  const themeIcon = $('#themeIcon');
  const STORAGE_KEY = 'saaschet-theme';

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem(STORAGE_KEY, theme);
  };

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved ? saved : prefersDark ? 'dark' : 'light');

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ───────── 3. Navbar Scroll & Active Link ───────── */
  const navbar = $('#navbar');
  const sections = $$('section[id]');
  const navLinks = $$('.nav-link');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 50);

    // highlight nav
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (y >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', debounce(onScroll, 30));
  onScroll();

  /* mobile nav */
  const navToggle = $('#navToggle');
  const navLinksContainer = $('#navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
  });
  navLinks.forEach((l) =>
    l.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinksContainer.classList.remove('open');
    })
  );

  /* ───────── 4. Typing Effect ───────── */
  const typingEl = $('#typingText');
  const phrases = [
    'SaaSchet.',
    'a Developer.',
    'a Designer.',
    'an Engineer.'
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  const typeLoop = () => {
    const current = phrases[phraseIdx];
    typingEl.textContent = current.substring(0, charIdx);

    if (!isDeleting && charIdx < current.length) {
      charIdx++;
      setTimeout(typeLoop, 100);
    } else if (isDeleting && charIdx > 0) {
      charIdx--;
      setTimeout(typeLoop, 50);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, isDeleting ? 1200 : 300);
    }
  };
  if (typingEl) typeLoop();

  /* ───────── 5. Scroll Reveal ───────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          animateCounter(e.target); // trigger counter if inside
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  $$('.reveal').forEach((el) => revealObserver.observe(el));

  /* ───────── 6. Counter Animation ───────── */
  function animateCounter(container) {
    const counters = container.querySelectorAll('.stat-number[data-count]');
    counters.forEach((c) => {
      if (c.dataset.animated) return;
      c.dataset.animated = 'true';
      const target = parseInt(c.dataset.count, 10);
      const duration = 1500;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
        c.textContent = Math.floor(ease * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  /* ───────── 7. Parallax Background ───────── */
  const parallaxBg = $('#parallaxBg');
  if (parallaxBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxBg.style.transform = `translateY(${y * 0.25}px)`;
    });
  }

  /* ───────── 8. Project Filter ───────── */
  const filterBtns = $$('.filter-btn');
  const projectCards = $$('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;

      projectCards.forEach((card) => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.style.display = match ? 'block' : 'none';
        if (match) {
          card.classList.remove('visible');
          requestAnimationFrame(() => card.classList.add('visible'));
        }
      });
    });
  });

  /* ───────── 9. Music Visualizer (Canvas) ───────── */
  const canvas = $('#visualizer');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      w = rect.width;
      h = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    const barCount = 48;
    let bars = new Array(barCount).fill(0).map(() => Math.random());
    let triggered = false;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const gap = 4;
      const barW = (w - gap * (barCount - 1)) / barCount;
      const baseH = h * 0.15;

      for (let i = 0; i < barCount; i++) {
        bars[i] += (Math.random() - 0.5) * 0.12;
        bars[i] = Math.max(0.05, Math.min(1, bars[i]));
        const bh = baseH + bars[i] * (h * 0.7);
        const x = i * (barW + gap);
        const y = (h - bh) / 2;

        const grad = ctx.createLinearGradient(x, y, x, y + bh);
        grad.addColorStop(0, getComputedStyle(document.documentElement).getPropertyValue('--primary').trim());
        grad.addColorStop(1, getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, bh, 4);
        ctx.fill();
      }

      if (triggered) {
        requestAnimationFrame(draw);
      } else {
        // idle gentle wave
        requestAnimationFrame(draw);
      }
    };
    draw();

    document.addEventListener('click', () => {
      triggered = true;
      setTimeout(() => { triggered = false; }, 2000);
    });
  }

  /* ───────── 10. Contact Form Validation ───────── */
  const contactForm = $('#contactForm');
  if (contactForm) {
    const nameIn = $('#name');
    const emailIn = $('#email');
    const msgIn = $('#message');
    const nameErr = $('#nameError');
    const emailErr = $('#emailError');
    const msgErr = $('#messageError');
    const status = $('#formStatus');
    const submitBtn = $('#submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');

    const validate = () => {
      let ok = true;
      if (!nameIn.value.trim()) { nameErr.textContent = 'Nama wajib diisi'; ok = false; }
      else nameErr.textContent = '';

      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(emailIn.value.trim())) { emailErr.textContent = 'Email tidak valid'; ok = false; }
      else emailErr.textContent = '';

      if (!msgIn.value.trim()) { msgErr.textContent = 'Pesan wajib diisi'; ok = false; }
      else msgErr.textContent = '';

      return ok;
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      btnText.hidden = true;
      btnLoader.hidden = false;
      submitBtn.disabled = true;
      status.textContent = '';

      setTimeout(() => {
        btnText.hidden = false;
        btnLoader.hidden = true;
        submitBtn.disabled = false;
        status.textContent = '✅ Pesan ber dikirim (simulasi)';
        status.style.color = 'var(--primary-light)';
        contactForm.reset();
      }, 1500);
    });
  }

  /* ───────── 11. Easter Egg (Space key) ───────── */
  const easter = $('#easterEgg');
  const closeEaster = $('#closeEaster');

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      easter.classList.add('show');
    }
  });

  if (closeEaster) {
    closeEaster.addEventListener('click', () => easter.classList.remove('show'));
  }
  easter.addEventListener('click', (e) => {
    if (e.target === easter) easter.classList.remove('show');
  });

  /* ───────── 12. Footer Year ───────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

}());
