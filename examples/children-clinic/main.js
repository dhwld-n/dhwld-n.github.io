// 진료 시간은 여기 한 곳만 고치면 첫 화면 상태가 따라온다. 분 단위 [시작, 끝, 점심 시작, 점심 끝]
const WEEKDAY = [9 * 60, 18 * 60 + 30, 13 * 60, 14 * 60];
const HOURS = [null, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, WEEKDAY, [9 * 60, 13 * 60]];
// ponytail: 공휴일 자동 계산 없음. 쉬는 날을 여기에 직접 넣는다 (예: '2026-12-25'), 달력 API는 운영자가 번거로워하면 추가
const CLOSED_DATES = ['2026-12-25', '2027-01-01'];
const DAY_NAMES = ['일', '월', '화', '수', '목', '금', '토'];

const fmt = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
const hoursOf = (d) => (CLOSED_DATES.includes(d.toISOString().slice(0, 10)) ? null : HOURS[d.getUTCDay()]);

// d는 서울 벽시계 시각을 UTC 필드에 담은 Date (한국은 서머타임이 없어 +9시간이면 맞다)
function statusAt(d) {
  const min = d.getUTCHours() * 60 + d.getUTCMinutes();
  const h = hoursOf(d);
  if (h && min >= h[0] && min < h[1]) {
    if (h[2] && min >= h[2] && min < h[3]) return { state: 'lunch', title: '점심시간', detail: `${fmt(h[3])}에 다시 진료해요` };
    return { state: 'open', title: '지금 진료 중', detail: `오늘 ${fmt(h[1])}까지` };
  }
  if (h && min < h[0]) return { state: 'closed', title: '진료 전이에요', detail: `오늘 ${fmt(h[0])} 시작` };
  const title = h ? '오늘 진료 끝' : '오늘은 쉬어요';
  for (let i = 1; i <= 14; i++) {
    const next = new Date(d.getTime() + i * 864e5);
    const nh = hoursOf(next);
    if (nh) return { state: 'closed', title, detail: `${i === 1 ? '내일' : `${DAY_NAMES[next.getUTCDay()]}요일`} ${fmt(nh[0])} 시작` };
  }
  return { state: 'closed', title, detail: '전화로 확인해 주세요' };
}

if (typeof module === 'object') module.exports = { statusAt };

if (typeof document === 'object') {
  /* 진료 상태와 오늘 표시 */
  function paintStatus() {
    const now = new Date(Date.now() + 9 * 3600e3);
    const s = statusAt(now);
    document.querySelectorAll('[data-status]').forEach((el) => {
      el.dataset.state = s.state;
      el.querySelector('[data-status-title]').textContent = s.title;
      el.querySelector('[data-status-detail]').textContent = s.detail;
    });
    const today = String(now.getUTCDay());
    document.querySelectorAll('[data-days]').forEach((el) => {
      el.classList.toggle('is-today', el.dataset.days.split(' ').includes(today));
    });
  }
  paintStatus();
  setInterval(paintStatus, 60e3);

  /* 줄자: 섹션 위치를 눈금 위치에 맞춰 구간별로 잇는다. 그래야 탭이 일정한 간격으로 놓인다 */
  const tape = document.querySelector('.tape');
  const cmEl = tape.querySelector('[data-cm]');
  const tabs = [...tape.querySelectorAll('[data-tab]')];
  let stops = [];

  function measureTape() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const secs = tabs.map((t) => Math.min(max - 1, document.querySelector(`[data-sec="${t.dataset.tab}"]`).getBoundingClientRect().top + scrollY - pad));
    stops = [0, ...secs, max];
  }

  function paintTape() {
    const y = scrollY;
    let i = 0;
    while (i < stops.length - 2 && y >= stops[i + 1]) i++;
    const span = stops[i + 1] - stops[i] || 1;
    const p = Math.min(1, (i + Math.min(1, Math.max(0, (y - stops[i]) / span))) / (stops.length - 1));
    tape.style.setProperty('--p', Math.max(0.03, p).toFixed(4));
    cmEl.textContent = Math.round(p * 100);
    tabs.forEach((t, n) => t.classList.toggle('is-here', i === n + 1 && y >= stops[n + 1] - 2));
  }

  const refresh = () => { measureTape(); paintTape(); };
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { paintTape(); ticking = false; });
  }, { passive: true });
  addEventListener('resize', refresh);
  document.fonts?.ready.then(refresh);
  refresh();

  /* 섹션 등장 */
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
  });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
