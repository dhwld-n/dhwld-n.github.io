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
      "Tinker — 심심할 때 켜는 AI 웹 도구 모음",
      "Tinker — AI web toys for when you're bored"
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
    card_e2_title: L(
      "[산업통상부·KIAT]<br />2026 공학페스티벌 서포터즈 E² 메이트",
      "[MOTIE · KIAT]<br />2026 Engineering Festival Supporters · E² Mate"
    ),
    card_e2_desc: L(
      "공학페스티벌 공식 대학생 서포터즈. SNS 홍보 콘텐츠 업로드와 11월 19일 서울 SETEC 현장 방문 후기 콘텐츠를 제작.",
      "Official student supporters for the Engineering Festival. Uploading promotional SNS content and a review of the Nov 19 on-site event at SETEC, Seoul."
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

    document.querySelectorAll(".lang-opt").forEach((b) => {
      const on = b.dataset.lang === lang;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });

    setYear();
    try { localStorage.setItem("lang", lang); } catch (e) {}

    if (currentProjectId && modalOverlay && !modalOverlay.hidden) {
      renderModal(PROJECTS[currentProjectId]);
    }
  }

  document.querySelectorAll(".lang-opt").forEach((b) => {
    b.addEventListener("click", function () {
      if (b.dataset.lang !== LANG) applyLang(b.dataset.lang);
    });
  });

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
  // 데이터는 projects.js 에 있다 (design_3도 같이 씀). 새 프로젝트는 그쪽에 추가하세요.
  const PROJECTS = window.PROJECTS;

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

  // ===== 브랜드 로고: 레이마칭 메타볼 (무지갯빛 크롬) =====
  // WebGL이 안 되면 기존 SVG 물방울 로고를 그대로 둔다.
  (function liquidChromeLogo() {
    const svg = document.querySelector(".brand svg.brand-mark");
    if (!svg) return;
    const canvas = document.createElement("canvas");
    canvas.className = "brand-mark brand-mark-gl";
    canvas.setAttribute("aria-hidden", "true");
    const gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
    const FRAG = `
      precision highp float;
      uniform vec2 uRes;
      uniform float uTime;
      uniform vec3 uColA; // --accent
      uniform vec3 uColB; // --seg-3
      uniform vec3 uBg;   // --sidebar (what sits behind the logo)

      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      float map(vec3 p) {
        float t = uTime;
        float d = 1e5;
        for (int i = 0; i < 5; i++) {
          float fi = float(i);
          vec3 c = vec3(
            sin(t * 0.70 + fi * 1.7) * 0.55,
            cos(t * 0.60 + fi * 2.3) * 0.50,
            sin(t * 0.50 + fi * 1.1) * 0.35
          );
          float r = 0.34 + 0.08 * sin(t * 0.9 + fi * 1.9);
          d = smin(d, length(p - c) - r, 0.42);
        }
        return d;
      }

      vec3 calcNormal(vec3 p) {
        vec2 e = vec2(0.0015, 0.0);
        return normalize(vec3(
          map(p + e.xyy) - map(p - e.xyy),
          map(p + e.yxy) - map(p - e.yxy),
          map(p + e.yyx) - map(p - e.yyx)
        ));
      }

      // studio environment for the chrome reflection, built from the site palette
      vec3 env(vec3 r) {
        vec3 deep  = mix(uBg * 0.35, uColA * 0.25, 0.5);
        vec3 light = mix(vec3(1.0), uColA, 0.15);
        vec3 col = mix(deep, light, smoothstep(-0.35, 0.9, r.y));
        col *= 0.3 + 0.7 * smoothstep(0.0, 0.18, abs(r.y + 0.05));        // dark horizon line
        col += 1.2 * light * smoothstep(0.90, 0.99, abs(dot(r, normalize(vec3(0.8, 0.6, 0.0))))); // light strip
        col += 0.8 * light * smoothstep(0.93, 1.0, dot(r, normalize(vec3(-0.6, 0.3, 0.7))));       // softbox
        return col;
      }

      vec3 shade(vec3 p, vec3 rd) {
        vec3 n = calcNormal(p);
        vec3 v = -rd;
        vec3 r = reflect(rd, n);
        float ndv = max(dot(n, v), 0.0);
        float fres = pow(1.0 - ndv, 3.0);
        // iridescent sheen that flows between the two brand colors with view angle
        float k = 0.5 + 0.5 * cos(6.2831 * (ndv * 1.3 + r.y * 0.35 + uTime * 0.06));
        vec3 tint = mix(mix(uColA, uColB, k), vec3(1.0), 0.2); // slightly pastel tint
        vec3 col = env(r) * mix(vec3(1.0), tint * 1.25, 0.55);
        col += fres * tint * 0.7;
        col += 1.4 * pow(max(dot(r, normalize(vec3(-0.5, 0.8, 0.6))), 0.0), 60.0);
        col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.85); // ease off saturation a touch
        return clamp(col, 0.0, 1.0);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / min(uRes.x, uRes.y);
        vec3 ro = vec3(0.0, 0.0, 3.2);
        vec3 rd = normalize(vec3(uv * 0.48, -1.0)); // fov chosen so the blob never clips the frame
        float t = 0.0, minD = 1e5, tMin = 0.0;
        bool hit = false;
        for (int i = 0; i < 80; i++) {
          float d = map(ro + rd * t);
          if (d < minD) { minD = d; tMin = t; }
          if (d < 0.001) { hit = true; break; }
          t += d;
          if (t > 6.0) break;
        }
        float px = 2.0 / min(uRes.x, uRes.y) * 0.48 * 3.2;
        float alpha = hit ? 1.0 : 1.0 - smoothstep(0.0, px, minD);
        if (alpha <= 0.0) { gl_FragColor = vec4(0.0); return; }
        vec3 col = shade(ro + rd * (hit ? t : tMin), rd);
        gl_FragColor = vec4(col * alpha, alpha);
      }`;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uColA = gl.getUniformLocation(prog, "uColA");
    const uColB = gl.getUniformLocation(prog, "uColB");
    const uBg = gl.getUniformLocation(prog, "uBg");

    const cssColor = (name) => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
      return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    };
    const applyPalette = () => {
      gl.uniform3fv(uColA, cssColor("--accent"));
      gl.uniform3fv(uColB, cssColor("--seg-3"));
      gl.uniform3fv(uBg, cssColor("--sidebar"));
    };
    applyPalette();

    svg.replaceWith(canvas);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.round(canvas.getBoundingClientRect().width * dpr) || 64;
    canvas.width = canvas.height = size;
    gl.viewport(0, 0, size, size);
    gl.uniform2f(uRes, size, size);

    let raf = 0;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      canvas.replaceWith(svg);
    });

    const draw = (sec) => {
      gl.uniform1f(uTime, sec);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // follow the light/dark theme toggle
    new MutationObserver(() => {
      applyPalette();
      if (reduced) draw(2.0);
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (reduced) {
      draw(2.0);
      return;
    }
    const SPEED = 0.45; // 천천히 일렁이도록
    const loop = (ms) => {
      draw(ms * 0.001 * SPEED);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  })();
})();
