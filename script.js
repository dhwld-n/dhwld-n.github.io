// ===== 테마: 저장된 값 → 없으면 OS 설정 =====
(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }
})();

// ===== 푸터 연도 =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== 스크롤에 따라 사이드바 현재 항목 표시 =====
(function () {
  const links = Array.from(document.querySelectorAll('.nav-item[href^="#"]'));
  const sections = links
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) =>
          l.classList.toggle("is-active", l.getAttribute("href") === "#" + entry.target.id)
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
})();

// ===== 프로젝트 상세 =====
// 새 프로젝트: 카드에 data-project="id" 를 넣고 여기에 같은 id 로 항목을 추가하세요.
const PROJECTS = {
  agent_with_gpt: {
    icon: "🤖",
    title: "LLM 기반 타겟 보드 테스트 자동화 파이프라인",
    badge: "비공개 저장소",
    meta: [
      ["유형", "감바랩스(Gamba Labs) 인턴십 프로젝트"],
      ["기간", "2026.07.28 ~ 2026.08.07"],
      ["역할", "파이프라인 설계 및 구현"],
    ],
    overview:
      "머신러닝 추론 워크로드를 여러 종류의 타겟 보드(RaspberryPi·Arduino·NPU 등)에서 " +
      "테스트하는 과정을 git push 한 번으로 자동화하는 CI 파이프라인입니다. 보드 선택 · 배포 · " +
      "실행 · 회귀 판정 · 기록 · 알림까지 처리하고, 실험 기록 조회와 보고서 작성은 자연어로 할 수 있습니다.",
    work: [
      "보드 자동 할당 — LLM이 커밋 · 변경 파일 · 테스트 코드를 읽고 워크로드 특성(연산량, 학습 여부, 실시간성)을 분석해, 유휴 보드 중 가장 적합한 것을 function calling으로 선택. 고정 규칙표가 아닌 하드웨어 추론이라 새 보드 종류가 추가돼도 코드 수정이 필요 없음.",
      "실행 엔진 분리 — 보드 연결 방식(SSH · 시리얼 · 로컬)별 엔진을 동일 인터페이스로 통일. 새 보드 타입 추가 = 엔진 파일 하나 + 매핑 한 줄.",
      "성능 회귀 게이트 — 직전 실행 대비 정확도가 기준(8%p) 이상 떨어지면 파이프라인을 실패 처리(exit 1)해 병합을 차단. 회귀 시 LLM이 원인 코드를 자동 진단하고 과거 회귀와 패턴을 비교.",
      "자연어 인터페이스 — 실험 기록 질의, .docx 보고서 생성, 다음 실험 제안, 코드 리뷰. 수치 · 통계는 코드가 계산하고 LLM은 서술만 담당.",
      "LLM 추상화 — 모든 모델 호출을 단일 모듈로 통일, 환경변수 2개로 로컬 모델(Ollama 등) 전환 가능.",
      "Flask 대시보드 — 파이프라인 현황 · 실험 기록 · AI 어시스턴트 · GitHub Actions 로그를 한 화면에.",
    ],
    stack: ["Python", "OpenAI API", "GitHub Actions (self-hosted)", "Notion API", "SSH", "Flask"],
    principle:
      '"판단은 코드로 검증 가능하게, 서술은 LLM에게." 정답이 정해진 판단은 파이썬이 결정론적으로 ' +
      "계산하고, LLM은 그 결과를 설명하거나 사람이 읽을 문장을 씁니다.",
    links: [
      { label: "agent_with_gpt", href: "https://github.com/dhwld-n/agent_with_gpt" },
    ],
  },
};

(function () {
  const overlay = document.getElementById("project-modal");
  const body = document.getElementById("modal-body");
  const closeBtn = document.getElementById("modal-close");
  if (!overlay || !body || !closeBtn) return;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  let lastFocused = null;

  function render(p) {
    const meta = p.meta
      .map(
        ([k, v]) =>
          `<div class="modal-meta-row"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`
      )
      .join("");
    const work = p.work.map((w) => `<li>${esc(w)}</li>`).join("");
    const stack = p.stack.map((s) => `<li>${esc(s)}</li>`).join("");
    const links = (p.links || [])
      .map(
        (l) =>
          `<a href="${esc(l.href)}" target="_blank" rel="noopener noreferrer">${esc(l.label)} ↗</a>`
      )
      .join("");

    body.innerHTML = `
      <div class="modal-head">
        <span class="modal-icon" aria-hidden="true">${esc(p.icon || "•")}</span>
        <div>
          <h3 id="modal-title">${esc(p.title)}</h3>
          ${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        </div>
      </div>
      ${p.tagline ? `<p class="modal-tagline">${esc(p.tagline)}</p>` : ""}
      <dl class="modal-meta">${meta}</dl>
      <h4>프로젝트 개요</h4>
      <p>${esc(p.overview)}</p>
      <h4>수행 내용</h4>
      <ul class="modal-list">${work}</ul>
      <h4>기술 스택</h4>
      <ul class="chips">${stack}</ul>
      ${p.principle ? `<div class="modal-principle">${esc(p.principle)}</div>` : ""}
      ${links ? `<div class="modal-links">${links}</div>` : ""}
    `;
  }

  function open(id) {
    const p = PROJECTS[id];
    if (!p) return;
    lastFocused = document.activeElement;
    render(p);
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    if (location.hash !== "#project/" + id) {
      history.replaceState(null, "", "#project/" + id);
    }
    closeBtn.focus();
  }

  function close() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.style.overflow = "";
    if (location.hash.startsWith("#project/")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    const id = card.getAttribute("data-project");
    card.addEventListener("click", () => open(id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open(id);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  // 딥링크: 새로고침/공유 링크로 바로 상세 열기
  const m = location.hash.match(/^#project\/(.+)$/);
  if (m && PROJECTS[decodeURIComponent(m[1])]) open(decodeURIComponent(m[1]));
})();
