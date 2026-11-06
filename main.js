const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

/* 테마 A(dark) / B(light) */
{
  const btn = document.getElementById('theme');
  const set = (t) => {
    root.dataset.theme = t;
    btn.setAttribute('aria-label', t === 'light' ? '어두운 테마로 전환' : '밝은 테마로 전환');
    try { localStorage.setItem('theme', t); } catch {}
  };
  let saved; try { saved = localStorage.getItem('theme'); } catch {}
  if (saved === 'light' || saved === 'dark') set(saved);
  btn.addEventListener('click', () => set(root.dataset.theme === 'dark' ? 'light' : 'dark'));
}

/* 타자기 헤드라인: 글자를 하나씩 탁탁 쳐 나간다. 간격을 조금씩 흔들어 사람 손 느낌을 낸다.
   안 친 글자도 자리를 미리 잡아 둬서 줄바꿈이 흔들리지 않는다. 모션 줄이기면 처음부터 다 보인다 */
document.querySelectorAll('.typed').forEach((el) => {
  const text = el.textContent.trim();
  el.setAttribute('aria-label', text);
  el.textContent = '';
  const chars = [...text].map((c) => {
    const s = document.createElement('span');
    s.textContent = c;
    s.setAttribute('aria-hidden', 'true');
    el.append(s);
    return s;
  });
  if (reduce) return;
  chars.forEach((s) => s.classList.add('untyped'));
  const caret = document.createElement('span');
  caret.className = 'caret';
  caret.setAttribute('aria-hidden', 'true');
  el.prepend(caret);
  let i = 0;
  const type = () => {
    const s = chars[i++];
    s.classList.remove('untyped');
    s.after(caret);
    if (i < chars.length) setTimeout(type, s.textContent === ' ' ? 150 : 55 + Math.random() * 80);
    else el.classList.add('is-done');
  };
  setTimeout(type, 450);
});

/* scroll-reveal (카드는 줄마다 0~1 순서) */
document.querySelectorAll('.grid > .card').forEach((c, i) => c.style.setProperty('--i', i % 2));
{
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}

/* 스크롤 원근 기울기: 화면 아래쪽에 있을수록 눕고, 가운데에 오면 펴진다 */
if (!reduce) {
  const tilts = [...document.querySelectorAll('.tilt')];
  let ticking = false;
  const update = () => {
    const vh = innerHeight;
    for (const el of tilts) {
      const r = el.getBoundingClientRect();
      const t = Math.min(Math.max((r.top + r.height / 2 - vh * 0.5) / (vh * 0.5), 0), 1);
      el.style.setProperty('--rx', `${t * 22}deg`);
    }
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
}

/* cushion-button */
document.querySelectorAll('[data-cushion]').forEach((el) => {
  el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
  ['pointerup', 'pointerleave', 'blur'].forEach((t) => el.addEventListener(t, () => el.classList.remove('is-pressed')));
  if (reduce) return;
  const lean = 0.12, k = 0.18, damping = 0.7;
  let s = 1, vs = 0, ts = 1, x = 0, vx = 0, tx = 0, y = 0, vy = 0, ty = 0, raf = 0;
  const tick = () => {
    vs = (vs + (ts - s) * k) * damping; s += vs;
    vx = (vx + (tx - x) * k) * damping; x += vx;
    vy = (vy + (ty - y) * k) * damping; y += vy;
    el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    const rest = Math.abs(ts - s) + Math.abs(vs) + Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy);
    raf = rest > 0.001 ? requestAnimationFrame(tick) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
  el.addEventListener('pointermove', (e) => {
    const r = el.getBoundingClientRect();
    tx = (e.clientX - r.left - r.width / 2) * lean;
    ty = (e.clientY - r.top - r.height / 2) * lean;
    if (!el.classList.contains('is-pressed')) ts = 1.06;
    kick();
  });
  el.addEventListener('pointerdown', () => { ts = 0.92; kick(); });
  el.addEventListener('pointerup', () => { ts = 1.06; vs += 0.04; kick(); });
  el.addEventListener('pointerleave', () => { ts = 1; tx = 0; ty = 0; kick(); });
});

/* 프로젝트 상세: 데이터는 메인 사이트와 projects.js. 주소 #project/id 로 바로 열 수도 있다 */
if (window.PROJECTS) {
  const P = window.PROJECTS;
  const dlg = document.getElementById('project-modal');
  const body = document.getElementById('modal-body');
  const ko = (v) => (v && typeof v === 'object' && 'ko' in v ? v.ko : v);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const render = (p) => {
    const meta = p.meta.map(([k, v]) => `<div><dt>${esc(ko(k))}</dt><dd>${esc(ko(v))}</dd></div>`).join('');
    const work = (p.work || []).map((w) => {
      const obj = w && typeof w === 'object' && 'text' in w;
      const f = obj && w.figure;
      const cap = f && f.caption ? esc(ko(f.caption)) : '';
      const fig = f ? `<figure><img src="${esc(f.src)}" alt="${cap}" loading="lazy">${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>` : '';
      return `<li>${esc(ko(obj ? w.text : w))}${fig}</li>`;
    }).join('');
    const stack = (p.stack || []).map((s) => `<li>${esc(ko(s))}</li>`).join('');
    const links = (p.links || []).map((l) => {
      const ext = /^https?:/.test(l.href);
      return `<a href="${esc(l.href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}${l.primary ? ' class="is-primary"' : ''}>${esc(ko(l.label))}${ext ? ' ↗' : ''}</a>`;
    }).join('');
    const d = p.demo;
    const demo = d
      ? `<figure class="modal-demo"><figcaption><strong>${esc(ko(d.label))}</strong> ${esc(ko(d.hint))}</figcaption>` +
        `<div class="demo-frame"><div class="demo-bar"><span>${esc(ko(d.name))}</span><a href="${esc(d.src)}" target="_blank" rel="noopener">${esc(ko(d.open))} ↗</a></div>` +
        `<iframe src="${esc(d.src)}" title="${esc(ko(d.name))}"></iframe></div></figure>`
      : '';
    body.innerHTML =
      `<h3 id="modal-title"><span aria-hidden="true">${esc(p.icon || '•')}</span> ${esc(ko(p.title))}</h3>` +
      demo +
      `<dl class="modal-meta">${meta}</dl>` +
      (p.overview ? `<h4>${esc(ko(p.overviewLabel) || '프로젝트 개요')}</h4><p>${esc(ko(p.overview))}</p>` : '') +
      (work ? `<h4>${esc(ko(p.workLabel) || '수행 내용')}</h4><ul class="modal-list">${work}</ul>` : '') +
      (stack ? `<h4>${esc(ko(p.stackLabel) || '기술 스택')}</h4><ul class="modal-chips">${stack}</ul>` : '') +
      (links ? `<div class="modal-links">${links}</div>` : '');
  };
  const open = (id) => {
    if (!P[id]) return false;
    render(P[id]);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    history.replaceState(null, '', '#project/' + id);
    return true;
  };
  document.querySelectorAll('[data-project]').forEach((a) => a.addEventListener('click', (e) => {
    if (open(a.dataset.project)) e.preventDefault();
  }));
  const clearHash = () => {
    if (location.hash.startsWith('#project/')) history.replaceState(null, '', location.pathname + location.search);
  };
  const close = () => { dlg.close(); clearHash(); };
  dlg.querySelector('.modal-close').addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); }); // 창 바깥(배경) 클릭
  dlg.addEventListener('close', clearHash); // Esc로 닫을 때
  const deep = location.hash.match(/^#project\/(.+)$/);
  if (deep) open(decodeURIComponent(deep[1]));
}

/* 히어로 3D: 파랑~보라 오브젝트 3개. 히어로가 보일 때만 렌더, 모션 줄이기면 한 프레임만 */
if (window.THREE) {
  const canvas = document.getElementById('hero-3d');
  const hero = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  camera.position.z = 9;

  scene.add(new THREE.AmbientLight(0xaab4ff, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.PointLight(0x8a6cff, 1.2, 20); rim.position.set(-4, -2, 3); scene.add(rim);

  const mat = (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0 });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.9, 0.32, 160, 32), mat(0x6f8bff));
  const donut = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.34, 48, 96), mat(0x7c5cff));
  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 48, 32), mat(0x4a63f0));
  scene.add(knot, donut, orb);

  let orbY = 0;
  const place = () => {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const half = Math.tan(camera.fov * Math.PI / 360) * camera.position.z * camera.aspect;
    const wide = w > h; // 가로 화면은 좌우에, 세로 화면(폰·태블릿)은 위아래에 배치
    knot.position.set(wide ? half * 0.66 : half * 0.5, wide ? 0.4 : 2.6, 0);
    donut.position.set(wide ? -half * 0.64 : -half * 0.56, wide ? -0.9 : -2.2, 0);
    orbY = wide ? 1.9 : -2.5;
    orb.position.set(wide ? -half * 0.32 : half * 0.56, orbY, -1);
    [knot, donut, orb].forEach((m) => m.scale.setScalar(wide ? 1.4 : Math.min(1.2, half * 0.63)));
    renderer.render(scene, camera); // setSize가 캔버스를 비우므로 바로 다시 그린다
  };
  place(); addEventListener('resize', place);

  let mx = 0, my = 0, visible = true, raf = 0;
  if (!reduce) addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  const frame = (t) => {
    const s = t / 1000;
    knot.rotation.set(s * 0.3 + my * 0.5, s * 0.4 + mx * 0.5, 0);
    donut.rotation.set(s * 0.25 - my * 0.5, s * 0.35 - mx * 0.5, 0);
    orb.position.y = orbY + Math.sin(s * 1.2) * 0.25;
    renderer.render(scene, camera);
    raf = visible && !reduce ? requestAnimationFrame(frame) : 0;
  };
  raf = requestAnimationFrame(frame);
  if (!reduce) {
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(frame);
    }).observe(hero);
  }
}
