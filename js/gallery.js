  // Carousel + Thumbnail logic — unchanged; safe-exit if no carousel exists on this page
  (function () {
    const wrap = document.querySelector('.carousel-wrap');
    if (!wrap) return;

    const mainImg = document.getElementById('carouselImage');
    const thumbNodes = Array.from(document.querySelectorAll('.carousel-thumbs img'));
    const leftBtn = document.querySelector('.carousel-arrow-left');
    const rightBtn = document.querySelector('.carousel-arrow-right');

    const gallery = thumbNodes.map((t, i) => ({ src: t.getAttribute('src'), alt: t.getAttribute('alt') || ('Image ' + (i+1)), thumbEl: t }));

    function filenameKey(url) {
      if (!url) return '';
      try {
        const u = new URL(url, window.location.href);
        let name = (u.pathname.split('/').pop() || '').toLowerCase();
        name = decodeURIComponent(name).replace(/\.[^/.]+$/, '');
        name = name.replace(/[_\-\.]+/g, ' ').trim();
        return name;
      } catch (err) {
        return String(url).toLowerCase();
      }
    }

    function findPreferredIndex() {
      const keys = gallery.map(g => filenameKey(g.src));
      let idx = keys.findIndex(k => k === 'main outside');
      if (idx >= 0) return idx;
      idx = keys.findIndex(k => k.includes('main') && k.includes('outside'));
      if (idx >= 0) return idx;
      idx = keys.findIndex(k => k === 'main');
      if (idx >= 0) return idx;
      idx = keys.findIndex(k => k.includes('main'));
      if (idx >= 0) return idx;
      return 0;
    }

    let current = findPreferredIndex();

    function show(i) {
      if (!gallery.length || !mainImg) return;
      i = (i + gallery.length) % gallery.length;
      const item = gallery[i];
      mainImg.style.opacity = '0';
      const pre = new Image();
      pre.onload = () => {
        mainImg.src = item.src;
        mainImg.alt = item.alt;
        requestAnimationFrame(() => { mainImg.style.opacity = '1'; });
      };
      pre.src = item.src;
      gallery.forEach((g, idx) => { if (g.thumbEl) g.thumbEl.classList.toggle('active', idx === i); });
      current = i;
    }

    function prev() { show(current - 1); }
    function next() { show(current + 1); }

    if (leftBtn) leftBtn.addEventListener('click', prev);
    if (rightBtn) rightBtn.addEventListener('click', next);

    gallery.forEach((g, i) => {
      if (!g.thumbEl) return;
      g.thumbEl.tabIndex = 0;
      g.thumbEl.addEventListener('click', () => show(i));
      g.thumbEl.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(i); } });
    });

    wrap.tabIndex = 0;
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    });

    if (mainImg) {
      mainImg.addEventListener('click', () => {
        if (typeof window.openModalAtIndex === 'function') window.openModalAtIndex(current);
      });
    }

    show(current);
  })();

  (function () {
    const gallerySelector = '.carousel-thumbs img';
    const galleryImgs = Array.from(document.querySelectorAll(gallerySelector));
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const thumbStrip = document.getElementById('thumbStrip');
    const slideshowToggle = document.getElementById('slideshowToggle');
    const prevBtn = document.querySelector('.lb-prev');
    const nextBtn = document.querySelector('.lb-next');
    if (!modal) return;

    let idx = 0, autoplay = false, autoplayInterval = null, DELAY = 3000;

    function buildThumbs() {
      if (!thumbStrip) return;
      thumbStrip.innerHTML = '';
      galleryImgs.forEach((imgEl, i) => {
        const t = document.createElement('img');
        t.src = imgEl.src;
        t.alt = imgEl.alt || ('Image ' + (i + 1));
        t.dataset.index = i;
        t.tabIndex = 0;
        t.addEventListener('click', () => showImage(i));
        t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showImage(i); } });
        thumbStrip.appendChild(t);
      });
    }
    function setActiveThumb(i) {
      if (!thumbStrip) return;
      const thumbs = Array.from(thumbStrip.querySelectorAll('img'));
      thumbs.forEach((t, j) => t.classList.toggle('active', j === i));
    }
    function showImage(i) {
      const img = galleryImgs[i];
      if (!img) return;
      modalImg.src = img.src; modalImg.alt = img.alt || ('Image ' + (i + 1)); idx = i; setActiveThumb(idx);
    }
    window.openModalAtIndex = function (i) {
      if (!galleryImgs.length) return;
      idx = (typeof i === 'number') ? i : 0;
      buildThumbs(); showImage(idx);
      modal.style.display = 'flex'; modal.setAttribute('aria-hidden','false'); document.body.style.overflow = 'hidden';
      if (prevBtn) prevBtn.focus();
    };
    window.closeModal = function () {
      if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; autoplay = false; slideshowToggle.textContent = '▶'; slideshowToggle.setAttribute('aria-pressed','false'); }
      modal.style.display = 'none'; modal.setAttribute('aria-hidden','true'); document.body.style.overflow = '';
    };
    window.prevImage = function () { if (!galleryImgs.length) return; showImage((idx - 1 + galleryImgs.length) % galleryImgs.length); };
    window.nextImage = function () { if (!galleryImgs.length) return; showImage((idx + 1) % galleryImgs.length); };
    function startAuto() { if (autoplayInterval) return; autoplay = true; slideshowToggle.textContent = '⏸'; slideshowToggle.setAttribute('aria-pressed','true'); autoplayInterval = setInterval(() => { window.nextImage(); }, DELAY); }
    function stopAuto() { autoplay = false; slideshowToggle.textContent = '▶'; slideshowToggle.setAttribute('aria-pressed','false'); if (autoplayInterval) { clearInterval(autoplayInterval); autoplayInterval = null; } }

    if (slideshowToggle) slideshowToggle.addEventListener('click', () => autoplay ? stopAuto() : startAuto());
    if (prevBtn) prevBtn.addEventListener('click', () => window.prevImage());
    if (nextBtn) nextBtn.addEventListener('click', () => window.nextImage());
    if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (modal && modal.style.display === 'flex') {
        if (e.key === 'Escape') closeModal();
        else if (e.key === 'ArrowLeft') window.prevImage();
        else if (e.key === 'ArrowRight') window.nextImage();
      }
    });
  })();
