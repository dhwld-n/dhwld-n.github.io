(function () {
  // ===== 테마: 저장된 값 → 없으면 OS 설정 =====
  const root = document.documentElement;
  let savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (e) {}
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  // ===== 언어 =====
  const L = (ko, en) => ({ ko, en });
  const isTr = (v) =>
    v && typeof v === "object" && !Array.isArray(v) && ("ko" in v || "en" in v);
  const tr = (v) => (isTr(v) ? (v[LANG] != null ? v[LANG] : v.ko) : v);

  function storedLang() {
    try {
      const s = localStorage.getItem("lang");
      if (s === "ko" || s === "en") return s;
    } catch (e) {}
    return "ko";
  }
  let LANG = storedLang();

  // data-i18n 키 → { ko, en }. 값에 HTML 허용(신뢰된 문자열).
  const I18N = {
    nav_about: L("소개", "Introduction"),
    nav_skills: L("관심 분야", "Areas of Interest"),
    nav_projects: L("프로젝트", "Projects"),
    nav_ambassador: L("브랜드 앰배서더 프로그램", "Brand Ambassador Program"),
    nav_contact: L("연락처", "Contact"),

    hero_h1: L(
      "Welcome to<br /><span class=\"speech-name\">오지우</span>'s Archive :)",
      "Welcome to<br /><span class=\"speech-name\">Jiwoo</span>'s Archive :)"
    ),

    head_about: L("소개", "Introduction"),
    head_skills: L("관심 분야", "Areas of Interest"),
    head_projects: L("프로젝트", "Projects"),
    head_ambassador: L("브랜드 앰배서더 프로그램", "Brand Ambassador Program"),
    head_contact: L("연락처", "Contact"),

    about_p1: L(
      "안녕하세요, 저는 부산대학교에서 인공지능을 전공하고 있는 오지우입니다.",
      "Hi, I'm Jiwoo Oh, majoring in Artificial Intelligence at Pusan National University."
    ),
    about_p2: L(
      "단순히 전공에만 국한되지 않고, 관심 있는 분야에는 직접 부딪혀보며 배우는 걸 좋아합니다.",
      "I don't confine myself to coursework — I like learning by diving hands-on into whatever catches my interest."
    ),
    about_p3: L(
      "LLM을 기반으로 다양한 프로덕트를 만드는 것에 관심이 많습니다.",
      "I'm especially interested in building products on top of LLMs."
    ),

    skill_python: L("Python", "Python"),
    skill_c: L("C", "C"),
    skill_llm: L("LLM · 에이전트", "LLM · Agents"),
    skill_ml: L("머신러닝", "Machine Learning"),
    skill_web: L("웹 (Flask)", "Web (Flask)"),
    skill_ci: L("CI 자동화", "CI Automation"),

    card_agent_title: L(
      "LLM 기반<br />타겟 보드 테스트 자동화 파이프라인",
      "LLM-driven<br />target-board test automation pipeline"
    ),
    card_agent_desc: L(
      "<code>git push</code> 한 번으로 보드 선택·배포·실행·회귀 판정·기록까지 이어지는 CI 파이프라인.<br />감바랩스 인턴십 프로젝트.",
      "A CI pipeline that carries a single <code>git push</code> through board selection, deployment, execution, regression checks and logging.<br />Gambalabs internship project."
    ),
    card_tinker_title: L(
      "심심풀이 웹 도구 모음<br />Tinker",
      "Tinker<br />a set of just-for-fun web tools"
    ),
    card_tinker_desc: L(
      "사주 · 타로부터 얼굴 피부 분석, &lsquo;나와 닮은 공룡&rsquo;까지.<br />계산 · 이미지 처리는 브라우저, 텍스트는 Gemini 스트리밍.",
      "From saju and tarot to facial skin analysis and &lsquo;the dinosaur that looks like you&rsquo;.<br />Calculation and image processing run in the browser; text is streamed from Gemini."
    ),
    card_bb_title: L(
      "[부산디지털자산거래소]<br />대학생 서포터즈 BEYOND BUSAN 3기",
      "[Busan Digital Asset Exchange]<br />Student Supporters · BEYOND BUSAN, Cohort 3"
    ),
    card_bb_desc: L(
      "Bdan 공식 대학생 서포터즈. 부팀장으로 에너지·탄소 금융 아이디어 제안, 비단앱 사용성 리서치, 블록체인·디지털 자산 카드뉴스 기획을 담당.",
      "Official student supporters for Bdan. As deputy team lead I proposed an energy / carbon-finance idea, ran usability research on the Bdan app, and planned blockchain / digital-asset card-news content."
    ),
    card_more: L("자세히 보기 →", "View details →"),

    rail_theme: L("테마", "Theme"),
    rail_focusing: L("집중 분야", "Focusing"),
    legend_1: L("Python · AI 파이프라인", "Python · AI pipelines"),
    legend_2: L("웹 · 백엔드 (Flask)", "Web · Backend (Flask)"),
    legend_3: L("툴링 & 자동화 (CI/CD)", "Tooling & Automation (CI/CD)"),
    rail_more: L("더 보기 →", "See more →"),
    rail_edu: L("학력", "Education"),
    rail_edu_body: L(
      "부산대학교 정보컴퓨터공학부<br />인공지능전공 재학 (2025.3 ~)",
      "Pusan National University<br />School of Computer Science & Engineering, AI major (Mar 2025 – present)"
    ),

    contact_p: L(
      "제안이나 협업 문의는 아래로 연락 주세요.",
      "For proposals or collaboration, reach me at:"
    ),

    footer: L(
      "© <span id=\"year\"></span> 오지우. Built with GitHub Pages.",
      "© <span id=\"year\"></span> Jiwoo Oh. Built with GitHub Pages."
    ),

    theme_toggle_aria: L("테마 전환", "Toggle theme"),
    lang_toggle_aria: L("View this site in English", "한국어로 보기"),
    modal_close_aria: L("닫기", "Close"),
  };

  const MODAL_LABELS = {
    overview: L("프로젝트 개요", "Overview"),
    work: L("수행 내용", "Highlights"),
    stack: L("기술 스택", "Tech stack"),
  };

  function setYear() {
    const y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  function applyLang(lang) {
    LANG = lang;
    root.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n")];
      if (entry) el.innerHTML = entry[lang] != null ? entry[lang] : entry.ko;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n-aria")];
      if (entry) el.setAttribute("aria-label", entry[lang] != null ? entry[lang] : entry.ko);
    });

    const lt = document.getElementById("lang-toggle");
    if (lt) {
      const lbl = lt.querySelector(".lang-label");
      if (lbl) lbl.textContent = lang === "ko" ? "EN" : "한국어";
    }

    setYear();
    try { localStorage.setItem("lang", lang); } catch (e) {}

    if (currentProjectId && modalOverlay && !modalOverlay.hidden) {
      renderModal(PROJECTS[currentProjectId]);
    }
  }

  const langToggle = document.getElementById("lang-toggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(LANG === "ko" ? "en" : "ko");
    });
  }

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
  // 사람이 읽는 문자열은 L("한국어", "English") 로 감쌉니다.
  const PROJECTS = {
    agent_with_gpt: {
      icon: "🤖",
      title: L(
        "LLM 기반 타겟 보드 테스트 자동화 파이프라인",
        "LLM-driven target-board test automation pipeline"
      ),
      meta: [
        [
          L("개발 기간", "Duration"),
          L("2026.07.28 ~ 2026.08.07 (2주, 감바랩스 인턴십)", "Jul 28 – Aug 7, 2026 (2 weeks, Gambalabs internship)"),
        ],
        [
          L("인원 구성", "Team"),
          L("1인 개발 (설계·구현·문서화 전담)", "Solo (design, implementation, documentation)"),
        ],
        [
          L("본인 역할", "My role"),
          L(
            "문제 정의부터 시나리오 설계, 구현, 빌드, 최종 보고서 & 인수인계 문서 작성까지 전 과정을 단독으로 수행",
            "Owned the whole process end to end — problem definition, scenario design, implementation, build, and the final report & handover docs"
          ),
        ],
        [
          L("결과 및 성과", "Outcome"),
          L(
            "2주 인턴십 과제 완수 — LLM 기반 보드 자동 할당 파이프라인 구현 및 최종 보고서 · 인수인계 문서 납품",
            "Completed the 2-week internship assignment — shipped the LLM-based board auto-assignment pipeline plus the final report and handover documents"
          ),
        ],
      ],
      overview: L(
        "머신러닝 추론 워크로드를 여러 종류의 타겟 보드(RaspberryPi·Arduino·NPU 등)에서 테스트하는 과정을 git push 한 번으로 자동화하는 CI 파이프라인입니다. 보드 선택 · 배포 · 실행 · 회귀 판정 · 기록 · 알림까지 처리하고, 실험 기록 조회와 보고서 작성은 자연어로 할 수 있습니다.",
        "A CI pipeline that automates testing ML inference workloads across several kinds of target board (Raspberry Pi, Arduino, NPU, etc.) from a single git push. It handles board selection, deployment, execution, regression checks, logging and notifications, and experiment history and reports can be driven in natural language."
      ),
      work: [
        L(
          "보드 자동 할당 — LLM이 커밋 · 변경 파일 · 테스트 코드를 읽고 워크로드 특성(연산량, 학습 여부, 실시간성)을 분석해, 유휴 보드 중 가장 적합한 것을 function calling으로 선택. 고정 규칙표가 아닌 하드웨어 추론이라 새 보드 종류가 추가돼도 코드 수정이 필요 없음.",
          "Board auto-assignment — the LLM reads the commit, changed files and test code, analyzes the workload (compute load, training vs. inference, real-time needs) and picks the best idle board via function calling. Because it reasons about hardware rather than following a fixed rule table, new board types need no code changes."
        ),
        L(
          "실행 엔진 분리 — 보드 연결 방식(SSH · 시리얼 · 로컬)별 엔진을 동일 인터페이스로 통일. 새 보드 타입 추가 = 엔진 파일 하나 + 매핑 한 줄.",
          "Pluggable execution engines — one interface across connection types (SSH, serial, local). Adding a board type is one engine file plus one mapping line."
        ),
        L(
          "성능 회귀 게이트 — 직전 실행 대비 정확도가 기준(8%p) 이상 떨어지면 파이프라인을 실패 처리(exit 1)해 병합을 차단. 회귀 시 LLM이 원인 코드를 자동 진단하고 과거 회귀와 패턴을 비교.",
          "Performance regression gate — if accuracy drops more than the threshold (8pp) versus the previous run, the pipeline fails (exit 1) and blocks the merge. On a regression the LLM auto-diagnoses the likely cause and compares it against past regressions."
        ),
        L(
          "자연어 인터페이스 — 실험 기록 질의, .docx 보고서 생성, 다음 실험 제안, 코드 리뷰. 수치 · 통계는 코드가 계산하고 LLM은 서술만 담당.",
          "Natural-language interface — query experiment history, generate .docx reports, suggest next experiments, review code. Numbers and statistics are computed in code; the LLM only writes the prose."
        ),
        L(
          "LLM 추상화 — 모든 모델 호출을 단일 모듈로 통일, 환경변수 2개로 로컬 모델(Ollama 등) 전환 가능.",
          "LLM abstraction — every model call goes through one module; two env vars switch to a local model (Ollama, etc.)."
        ),
        L(
          "Flask 대시보드 — 파이프라인 현황 · 실험 기록 · AI 어시스턴트 · GitHub Actions 로그를 한 화면에.",
          "Flask dashboard — pipeline status, experiment history, an AI assistant and GitHub Actions logs on one screen."
        ),
      ],
      stack: ["Python", "Gemini API", "LLM Function Calling", "GitHub Actions (self-hosted)", "Notion API", "SSH", "Flask"],
      links: [
        { label: L("▶ 데모 열기", "▶ Open demo"), href: "agent_with_gpt.html", primary: true },
        { label: "GitHub Repository", href: "https://github.com/dhwld-n/agent_with_gpt-public" },
      ],
    },

    tinker: {
      icon: "🍀",
      title: L("Tinker — 심심풀이 웹 도구 모음", "Tinker — a collection of casual web tools"),
      meta: [
        [
          L("개발 기간", "Duration"),
          L("2026.08 ~ 진행 중 (개인 프로젝트)", "Aug 2026 – present (personal project)"),
        ],
        [
          L("인원 구성", "Team"),
          L("1인 개발 (기획 · 구현 · 디자인 · 배포)", "Solo (planning, implementation, design, deployment)"),
        ],
        [
          L("본인 역할", "My role"),
          L(
            "전 기능 기획 · 구현, 계산 로직 이식, LLM · 비전 파이프라인, 디자인 시스템, 배포까지 단독",
            "Everything solo — feature planning & implementation, porting the calculation logic, the LLM / vision pipeline, the design system, and deployment"
          ),
        ],
        [
          L("형태", "Format"),
          L("정적 SPA + 서버리스 함수 · Vercel 배포", "Static SPA + serverless functions · deployed on Vercel"),
        ],
        [
          L("결과 및 성과", "Outcome"),
          L("tinker-tools.vercel.app 로 배포 및 운영 중", "Deployed and running at tinker-tools.vercel.app"),
        ],
      ],
      overview: L(
        "사주·자미두수·타로 같은 명리·운세 도구와 게임 닉네임 생성기, 얼굴 사진 피부 분석 등 가볍게 즐기는 도구를 한 페이지에 모은 개인 웹앱입니다. 설치 없이 링크만 열면 바로 쓸 수 있습니다. 생년월일을 한 번 넣어 두면 프로필로 저장돼, 홈 화면의 오늘의 운세 요약과 각 도구에 자동으로 쓰입니다. 명리·운세 파트는 사주 · 자미두수 · 기문둔갑 · 궁합 · 타로 · 오늘의 운세를 다룹니다. 얼굴 사진 · 웹캠으로 피부 타입 · 데일리 루틴을 정리해 주는 피부 분석, '나와 닮은 공룡'(사주 · 얼굴) 등 도구는 계속 늘려 가는 중입니다. 계산과 이미지 처리는 브라우저에서 하고, 텍스트 생성만 Gemini가 스트리밍으로 담당합니다.",
        "A personal web app that gathers light, just-for-fun tools on one page — fortune tools like saju, Zi Wei Dou Shu and tarot, a game-nickname generator, facial skin analysis, and more. No install: open the link and it works. Enter your birth date once and it is saved as a profile, then reused for the home-screen daily-fortune summary and across every tool. The fortune section covers saju, Zi Wei Dou Shu, Qi Men Dun Jia, compatibility, tarot and the daily fortune. New tools keep getting added — a skin analysis that reads a photo or webcam frame for skin type and a daily routine, 'the dinosaur that looks like you' (from saju or your face), and so on. Calculation and image processing run in the browser; only text generation is handled by Gemini, streamed."
      ),
      work: [
        L(
          "명리·운세 파트 — 사주 · 자미두수 · 기문둔갑 · 궁합 · 타로 · 오늘의 운세. 명리 계산(일주 · 명궁 · 오행국 · 오행 분포)은 saju.py · jamidusu.py를 calc.js로 이식해 브라우저에서 돌리고 파이썬 원본과 동일 출력을 검증. 음력 변환 라이브러리 번들.",
          "Fortune section — saju, Zi Wei Dou Shu, Qi Men Dun Jia, compatibility, tarot and the daily fortune. The core calculations (day pillar, life palace, element phase, element distribution) were ported from saju.py / jamidusu.py into calc.js to run in the browser, verified to match the Python originals output-for-output. A lunar-calendar conversion library is bundled."
        ),
        L(
          "LLM 스트리밍 파이프라인 — Vercel 서버리스 함수가 Gemini SSE를 중계하고, 클라이언트가 읽기 속도에 맞춰 페이스를 조절해 노출. 같은 입력엔 같은 글이 나오도록 localStorage + Upstash Redis(KV) 캐시.",
          "LLM streaming pipeline — a Vercel serverless function relays Gemini's SSE stream and the client paces it to reading speed as it renders. localStorage + Upstash Redis (KV) caching so the same input always returns the same text."
        ),
        L(
          "피부 분석 — 얼굴 사진 업로드 또는 getUserMedia 실시간 웹캠 스캔 → Canvas로 압축 → Gemini 비전이 피부 타입 · 눈에 띄는 점 · 데일리 루틴 · 제품군을 정리. 자극적인 제품 추천은 억제하고, 추천 제품은 코드가 사진 시드로 결정론적으로 골라 LLM에 지정.",
          "Skin analysis — an uploaded photo or a live getUserMedia webcam scan is compressed on a Canvas, then Gemini vision summarizes skin type, notable spots, a daily routine and product categories. Harsh product pushes are suppressed; the recommended products are chosen deterministically in code from a photo seed and handed to the LLM."
        ),
        L(
          "나와 닮은 공룡 — (사주) 가장 강한 오행으로 공룡 풀에서 해시 픽 + 상생 · 상극으로 '곁에 두면 좋은 / 안 되는 공룡'까지. (얼굴) 사진 · 웹캠을 Gemini 비전이 받아 목록에서 한 마리 선택. 공룡 초상화 30종은 별도로 만들어 번들.",
          "The dinosaur that looks like you — (saju) a hash pick from the dinosaur pool by your strongest element, plus 'good to keep near you / avoid' picks from the generative and controlling cycles. (face) Gemini vision takes a photo or webcam frame and chooses one from the list. 30 dinosaur portraits were made separately and bundled."
        ),
        L(
          "결정론적 개인화 — 행운의 색 · 숫자 · 물건, 수호 동물, 타고난 재능, 운명의 상대 등은 사주 팔자를 시드로 해시해 고정. 선택은 JS가 하고 LLM은 서술만 맡아 결과가 사람마다 다르되 같은 사람은 늘 같음.",
          "Deterministic personalization — lucky color / number / object, guardian animal, innate talent, destined partner and so on are fixed by hashing the saju chart as a seed. JS makes the choice and the LLM only narrates it, so results differ per person but stay the same for the same person."
        ),
      ],
      stack: [
        "JavaScript (Vanilla)",
        "Vercel Serverless",
        L("Google Gemini API (텍스트 SSE + 비전)", "Google Gemini API (text SSE + vision)"),
        L("Canvas 이미지 처리 · getUserMedia", "Canvas image processing · getUserMedia"),
        L("Upstash Redis (KV 캐시)", "Upstash Redis (KV cache)"),
        L("정적 SPA", "Static SPA"),
      ],
      links: [
        { label: L("▶ 사이트 열기", "▶ Open the site"), href: "https://tinker-tools.vercel.app", primary: true },
      ],
    },

    beyond_busan: {
      icon: "🎓",
      title: L(
        "[부산디지털자산거래소] 대학생 서포터즈 BEYOND BUSAN 3기",
        "[Busan Digital Asset Exchange] Student Supporters · BEYOND BUSAN, Cohort 3"
      ),
      meta: [
        [L("활동 기간", "Period"), L("2026.03.22 ~ 진행 중", "Mar 22, 2026 – present")],
        [L("주관", "Host"), L("부산디지털자산거래소 (Bdan)", "Busan Digital Asset Exchange (Bdan)")],
        [L("인원 구성", "Team"), L("6명 (부딪 7조)", "6 members (Team 7)")],
        [
          L("본인 역할", "My role"),
          L(
            "부팀장 — 콘텐츠 기획서 작성 및 팀 운영, 리서치·분석 담당",
            "Deputy team lead — content planning docs and team operations, research & analysis"
          ),
        ],
      ],
      overviewLabel: L("활동 개요", "Overview"),
      overview: L(
        "부산을 블록체인 · AI · 디지털 금융 허브 도시로 성장시키는 것을 목표로 하는 부산디지털자산거래소(Bdan) 공식 대학생 서포터즈입니다. 디지털 자산 산업에 대한 대중 인식을 높이고, 비단앱 · 디지털 월렛(비단주머니) 등 Bdan 서비스를 온 · 오프라인으로 홍보하며, 블록체인 · 디지털 자산 관련 학습과 지역사회 캠페인에 참여합니다.",
        "The official student supporters of the Busan Digital Asset Exchange (Bdan), which aims to grow Busan into a blockchain / AI / digital-finance hub. We raise public awareness of the digital-asset industry, promote Bdan services such as the Bdan app and digital wallet (Bdan Pocket) online and offline, and take part in blockchain / digital-asset learning and community campaigns."
      ),
      workLabel: L("주요 활동", "Key activities"),
      work: [
        {
          text: L(
            "개인미션 · 아이디어 제안 — '녹색 자산의 토큰화: 리눅스 엣지 컴퓨팅 기반 부산 노후 산단 에너지 최적화 + Bdan 탄소 금융 플랫폼' 제안서 작성(금융 · 경제 부문). 라즈베리파이급 리눅스 엣지 디바이스로 노후 공장의 전력 데이터를 수집하고 AI(LSTM)로 에너지 낭비를 최적화한 뒤, 절감분을 스마트 컨트랙트로 인증해 Bdan에서 거래되는 RWA '스마트 에코 토큰'으로 발행하는 선순환 구조를 설계.",
            "Individual mission · idea proposal — wrote a proposal (finance & economy track), 'Tokenizing green assets: optimizing energy in Busan's aging industrial complexes with Linux edge computing + a Bdan carbon-finance platform.' It designs a virtuous cycle: Raspberry-Pi-class Linux edge devices collect power data from old factories, an AI (LSTM) optimizes energy waste, the savings are certified via smart contract and issued as an RWA 'smart eco token' traded on Bdan."
          ),
          figure: {
            src: "beyond-busan-diagram.jpg",
            caption: L(
              "제안 실행 구조 — 전력 데이터 수집 → AI 최적화 → Bdan 에코 토큰 발행 → 자본 순환",
              "Proposal architecture — power-data collection → AI optimization → Bdan eco-token issuance → capital cycle"
            ),
          },
        },
        L(
          "개인미션 · 비단(Bdan) 앱 사용성 앙케이트 — 대학생 대상 설문으로 앱 첫인상 · UI · 핵심 기능(자산 조회 등)을 평가하고, 가입 · 로그인 이탈 요인과 개선 방향을 정리한 분석 리포트 작성.",
          "Individual mission · Bdan app usability survey — surveyed university students on first impressions, UI and core features (asset lookup, etc.), then wrote an analysis report on sign-up / login drop-off factors and improvement directions."
        ),
        L(
          "팀 콘텐츠 · 블록체인 · 디지털 자산 카드뉴스 제작 — '블록체인 개념 + 실생활 사례(CBDC, 모바일 신분증 등)', '디지털 자산 용어 정리' 등 대중 눈높이에 맞춘 카드뉴스 콘텐츠를 시리즈로 기획. 부팀장으로 매 회차 기획서 작성과 팀 진행을 맡음.",
          "Team content · blockchain / digital-asset card-news — planned a card-news series pitched at a general audience ('blockchain concepts + real-life cases like CBDC and mobile ID', 'digital-asset glossary', etc.). As deputy lead I wrote each issue's plan and ran the team."
        ),
        L(
          "온 · 오프라인 홍보 — 비단앱 · 비단주머니 등 Bdan 서비스와 BWB2026 컨퍼런스 홍보 활동.",
          "Online & offline promotion — promoting Bdan services such as the Bdan app and Bdan Pocket, and the BWB2026 conference."
        ),
        L(
          "학습 · 네트워킹 — 블록체인 · 디지털 자산 · 스마트시티 관련 학습, 실무자 강연, 다양한 전공의 대학생들과 정기 모임 · 네트워킹.",
          "Learning & networking — study on blockchain, digital assets and smart cities, talks from practitioners, and regular meetups with students from many majors."
        ),
      ],
      stackLabel: L("키워드", "Keywords"),
      stack: [
        L("콘텐츠 기획", "Content planning"),
        L("사용자 리서치", "User research"),
        L("블록체인 · 디지털 자산", "Blockchain · Digital assets"),
        L("홍보 마케팅", "Marketing & promotion"),
      ],
    },
  };

  // ===== 모달 =====
  const modalOverlay = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  let currentProjectId = null;
  let lastFocused = null;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));

  const figHtml = (f) => {
    const cap = tr(f.caption) || "";
    return (
      '<figure class="modal-figure"><img src="' + esc(f.src) + '" alt="' + esc(cap) + '" />' +
      (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") +
      "</figure>"
    );
  };

  function renderModal(p) {
    const meta = p.meta
      .map(
        ([k, v]) =>
          '<div class="modal-meta-row"><dt>' + esc(tr(k)) + "</dt><dd>" + esc(tr(v)) + "</dd></div>"
      )
      .join("");

    const work = (p.work || [])
      .map((w) => {
        const isObj = w && typeof w === "object" && "text" in w;
        const txt = tr(isObj ? w.text : w);
        const fig = isObj && w.figure ? figHtml(w.figure) : "";
        return "<li>" + esc(txt) + fig + "</li>";
      })
      .join("");

    const stack = (p.stack || []).map((s) => "<li>" + esc(tr(s)) + "</li>").join("");

    const links = (p.links || [])
      .map((l) => {
        const ext = /^https?:/.test(l.href);
        const attrs = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
        const cls = l.primary ? ' class="is-primary"' : "";
        return (
          '<a href="' + esc(l.href) + '"' + attrs + cls + ">" + esc(tr(l.label)) + (ext ? " ↗" : "") + "</a>"
        );
      })
      .join("");

    const ovLabel = tr(p.overviewLabel) || MODAL_LABELS.overview[LANG];
    const wkLabel = tr(p.workLabel) || MODAL_LABELS.work[LANG];
    const stLabel = tr(p.stackLabel) || MODAL_LABELS.stack[LANG];

    modalBody.innerHTML =
      '<div class="modal-head">' +
        '<span class="modal-icon" aria-hidden="true">' + esc(p.icon || "•") + "</span>" +
        "<div><h3 id=\"modal-title\">" + esc(tr(p.title)) + "</h3></div>" +
      "</div>" +
      '<dl class="modal-meta">' + meta + "</dl>" +
      (p.overview ? "<h4>" + esc(ovLabel) + "</h4><p>" + esc(tr(p.overview)) + "</p>" : "") +
      (work ? "<h4>" + esc(wkLabel) + '</h4><ul class="modal-list">' + work + "</ul>" : "") +
      (stack ? "<h4>" + esc(stLabel) + '</h4><ul class="chips">' + stack + "</ul>" : "") +
      (links ? '<div class="modal-links">' + links + "</div>" : "");
  }

  function openModal(id) {
    const p = PROJECTS[id];
    if (!p || !modalOverlay) return;
    currentProjectId = id;
    lastFocused = document.activeElement;
    renderModal(p);
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    if (location.hash !== "#project/" + id) {
      history.replaceState(null, "", "#project/" + id);
    }
    modalClose.focus();
  }

  function closeModal() {
    if (!modalOverlay || modalOverlay.hidden) return;
    modalOverlay.hidden = true;
    currentProjectId = null;
    document.body.style.overflow = "";
    if (location.hash.startsWith("#project/")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modalOverlay && modalBody && modalClose) {
    document.querySelectorAll(".project-card[data-project]").forEach((card) => {
      const id = card.getAttribute("data-project");
      card.addEventListener("click", () => openModal(id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(id);
        }
      });
    });

    modalClose.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });
  }

  // ===== 초기 적용 =====
  applyLang(LANG);

  // 딥링크: 새로고침/공유 링크로 바로 상세 열기
  const deep = location.hash.match(/^#project\/(.+)$/);
  if (deep && PROJECTS[decodeURIComponent(deep[1])]) {
    openModal(decodeURIComponent(deep[1]));
  }
})();
