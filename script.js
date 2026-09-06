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

// ===== 클릭한 메뉴만 활성 표시 (처음엔 아무것도 선택 안 됨) =====
(function () {
  const links = Array.from(document.querySelectorAll('.nav-item[href^="#"]'));
  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((l) => l.classList.remove("is-active"));
      link.classList.add("is-active");
    });
  });
})();

// ===== 프로젝트 상세 =====
// 새 프로젝트: 카드에 data-project="id" 를 넣고 여기에 같은 id 로 항목을 추가하세요.
const PROJECTS = {
  agent_with_gpt: {
    icon: "🤖",
    title: "LLM 기반 타겟 보드 테스트 자동화 파이프라인",
    meta: [
      ["개발 기간", "2026.07.28 ~ 2026.08.07 (2주, 감바랩스 인턴십)"],
      ["인원 구성", "1인 개발 (설계·구현·문서화 전담)"],
      ["본인 역할", "문제 정의부터 시나리오 설계, 구현, 빌드, 최종 보고서 & 인수인계 문서 작성까지 전 과정을 단독으로 수행"],
      ["결과 및 성과", "2주 인턴십 과제 완수 — LLM 기반 보드 자동 할당 파이프라인 구현 및 최종 보고서 · 인수인계 문서 납품"],
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
    stack: ["Python", "Gemini API", "LLM Function Calling", "GitHub Actions (self-hosted)", "Notion API", "SSH", "Flask"],
    links: [
      { label: "▶ 데모 열기", href: "agent_with_gpt.html", primary: true },
      { label: "GitHub Repository", href: "https://github.com/dhwld-n/agent_with_gpt-public" },
    ],
  },

  beyond_busan: {
    icon: "🎓",
    title: "[부산디지털자산거래소] 대학생 서포터즈 BEYOND BUSAN 3기",
    meta: [
      ["활동 기간", "2026.03.22 ~ 진행 중"],
      ["주관", "부산디지털자산거래소 (Bdan)"],
      ["인원 구성", "6명 (부딪 7조)"],
      ["본인 역할", "부팀장 — 콘텐츠 기획서 작성 및 팀 운영, 리서치·분석 담당"],
    ],
    overviewLabel: "활동 개요",
    overview:
      "부산을 블록체인 · AI · 디지털 금융 허브 도시로 성장시키는 것을 목표로 하는 " +
      "부산디지털자산거래소(Bdan) 공식 대학생 서포터즈입니다. 디지털 자산 산업에 대한 대중 인식을 " +
      "높이고, 비단앱 · 디지털 월렛(비단주머니) 등 Bdan 서비스를 온 · 오프라인으로 홍보하며, " +
      "블록체인 · 디지털 자산 관련 학습과 지역사회 캠페인에 참여합니다.",
    workLabel: "주요 활동",
    work: [
      {
        text: "개인미션 · 아이디어 제안 — '녹색 자산의 토큰화: 리눅스 엣지 컴퓨팅 기반 부산 노후 산단 에너지 최적화 + Bdan 탄소 금융 플랫폼' 제안서 작성(금융 · 경제 부문). 라즈베리파이급 리눅스 엣지 디바이스로 노후 공장의 전력 데이터를 수집하고 AI(LSTM)로 에너지 낭비를 최적화한 뒤, 절감분을 스마트 컨트랙트로 인증해 Bdan에서 거래되는 RWA '스마트 에코 토큰'으로 발행하는 선순환 구조를 설계.",
        figure: {
          src: "beyond-busan-diagram.jpg",
          caption: "제안 실행 구조 — 전력 데이터 수집 → AI 최적화 → Bdan 에코 토큰 발행 → 자본 순환",
        },
      },
      "개인미션 · 비단(Bdan) 앱 사용성 앙케이트 — 대학생 대상 설문으로 앱 첫인상 · UI · 핵심 기능(자산 조회 등)을 평가하고, 가입 · 로그인 이탈 요인과 개선 방향을 정리한 분석 리포트 작성.",
      "팀 콘텐츠 · 블록체인 · 디지털 자산 카드뉴스 제작 — '블록체인 개념 + 실생활 사례(CBDC, 모바일 신분증 등)', '디지털 자산 용어 정리' 등 대중 눈높이에 맞춘 카드뉴스 콘텐츠를 시리즈로 기획. 부팀장으로 매 회차 기획서 작성과 팀 진행을 맡음.",
      "온 · 오프라인 홍보 — 비단앱 · 비단주머니 등 Bdan 서비스와 BWB2026 컨퍼런스 홍보 활동.",
      "학습 · 네트워킹 — 블록체인 · 디지털 자산 · 스마트시티 관련 학습, 실무자 강연, 다양한 전공의 대학생들과 정기 모임 · 네트워킹.",
    ],
    stackLabel: "키워드",
    stack: ["콘텐츠 기획", "사용자 리서치", "블록체인 · 디지털 자산", "홍보 마케팅"],
    links: [
      { label: "활동 공고 보기", href: "https://www.ssgsag.kr/posters/26936" },
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
    const figHtml = (f) =>
      `<figure class="modal-figure"><img src="${esc(f.src)}" alt="${esc(f.caption || "")}" />${
        f.caption ? `<figcaption>${esc(f.caption)}</figcaption>` : ""
      }</figure>`;
    const work = (p.work || [])
      .map((w) =>
        typeof w === "string"
          ? `<li>${esc(w)}</li>`
          : `<li>${esc(w.text)}${w.figure ? figHtml(w.figure) : ""}</li>`
      )
      .join("");
    const stack = (p.stack || []).map((s) => `<li>${esc(s)}</li>`).join("");
    const links = (p.links || [])
      .map((l) => {
        const ext = /^https?:/.test(l.href);
        const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
        const cls = l.primary ? ' class="is-primary"' : "";
        return `<a href="${esc(l.href)}"${attrs}${cls}>${esc(l.label)}${ext ? " ↗" : ""}</a>`;
      })
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
      ${p.overview ? `<h4>${esc(p.overviewLabel || "프로젝트 개요")}</h4><p>${esc(p.overview)}</p>` : ""}
      ${work ? `<h4>${esc(p.workLabel || "수행 내용")}</h4><ul class="modal-list">${work}</ul>` : ""}
      ${p.figure ? figHtml(p.figure) : ""}
      ${stack ? `<h4>${esc(p.stackLabel || "기술 스택")}</h4><ul class="chips">${stack}</ul>` : ""}
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
