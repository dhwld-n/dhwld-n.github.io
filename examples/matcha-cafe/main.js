const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// "Matcha" rises letter by letter.
document.querySelectorAll('.kinetic').forEach((el) => {
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  el.innerHTML = '';
  [...text].forEach((ch, i) => {
    const unit = document.createElement('span');
    unit.className = 'unit';
    unit.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = ch;
    inner.style.setProperty('--i', i);
    unit.append(inner);
    el.append(unit);
  });
});

// Background and text colour change chapter by chapter.
{
  const root = document.documentElement;
  const apply = (s) => {
    root.style.setProperty('--page-bg', s.dataset.bg);
    root.style.setProperty('--page-fg', s.dataset.fg);
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && apply(e.target)),
    { rootMargin: '-50% 0px -50% 0px' }
  );
  document.querySelectorAll('[data-bg]').forEach((s) => io.observe(s));
}

// Quiet reveal for the essay and the menu lists.
{
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }
  }, { threshold: 0.1 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}

// Signature: while the first screen is pinned, the glass and droplets shoot up past the word.
if (!reduceMotion) {
  const hero = document.querySelector('.hero');
  const stage = document.querySelector('.stage');
  let shown = 0;
  let running = false;

  const target = () => {
    const range = hero.offsetHeight - innerHeight;
    return range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
  };
  const frame = () => {
    const to = target();
    shown += (to - shown) * 0.14;
    if (Math.abs(to - shown) < 0.0005) shown = to;
    stage.style.setProperty('--p', shown.toFixed(4));
    if (shown === to) { running = false; return; }
    requestAnimationFrame(frame);
  };
  const wake = () => {
    if (!running) { running = true; requestAnimationFrame(frame); }
  };
  addEventListener('scroll', wake, { passive: true });
  addEventListener('resize', wake);
  wake();
}
