// 프로젝트 상세 데이터. main.js 가 카드를 누르면 이 내용으로 상세 창을 띄운다.
// 새 프로젝트: 카드에 data-project="id" 를 넣고 여기에 같은 id 로 항목을 추가하세요.
// 사람이 읽는 문자열은 L("한국어", "English") 로 감쌉니다. 이미지·링크 경로는 사이트 루트 기준.
window.PROJECTS = (function () {
  const L = (ko, en) => ({ ko, en });
  return {
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
      title: L("Tinker — 심심할 때 켜는 AI 웹 도구 모음", "Tinker — AI web toys for when you're bored"),
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

    webcraft: {
      icon: "🎨",
      title: L("webcraft — 웹 디자인용 Claude Code 플러그인", "webcraft — a Claude Code plugin for web design"),
      demo: [{
        src: "examples/children-clinic/index.html",
        name: L("튼튼소아과 (가상의 병원)", "Teunteun Pediatrics (fictional clinic)"),
        label: L("webcraft로 만든 예시 사이트.", "An example site made with webcraft."),
        hint: L(
          "아래 화면 안에서 스크롤해 보세요. 오른쪽 줄자가 따라서 늘어납니다.",
          "Scroll inside the frame below and the tape measure on the right pulls out with you."
        ),
        open: L("새 창에서 열기", "Open in a new tab"),
      }, {
        src: "examples/matcha-cafe/index.html",
        name: L("우지네 카페 (가상의 카페)", "Uji's Cafe (fictional cafe)"),
        label: L("두 번째 예시.", "A second example."),
        hint: L(
          "스크롤하면 말차 컵이 글자를 뚫고 솟아오르고, 장마다 배경색이 바뀝니다.",
          "Scroll and the matcha cup rises through the headline while each chapter shifts the background colour."
        ),
        open: L("새 창에서 열기", "Open in a new tab"),
      }],
      meta: [
        [L("개발 기간", "Duration"), L("진행 중 (개인 프로젝트)", "In progress (personal project)")],
        [
          L("형태", "Format"),
          L("Claude Code 플러그인 (스킬 + 서브에이전트)", "Claude Code plugin (skill + subagents)"),
        ],
      ],
      overview: L(
        "디자인이나 애니메이션 효과를 제대로 얻으려면 꽤 자세한 프롬프트를 써야 한다는 점이 아쉬워 만든 Claude Code 플러그인입니다. 처음부터 프롬프트를 공들여 쓰지 않아도 짧은 요청만으로 시드 결과물을 먼저 만들어 주고, 사용자는 그것을 보면서 원하는 부분만 고치면 됩니다. 스타일 카드 · 레퍼런스 느낌 노트 · 모션 레시피에서 재료를 고르고, 만든 페이지를 검수 에이전트들이 채점해 고치는 흐름으로 시드의 완성도를 끌어올립니다. 웹사이트를 새로 디자인하거나 전체를 다시 디자인할 때 쓰며, 버튼 색이나 오타 같은 작은 수정에는 쓰지 않도록 범위를 좁혔습니다.",
        "I built this Claude Code plugin because getting good design or animation out of AI usually takes a very detailed prompt. Instead of writing that prompt up front, you make a short request and get a seed result first, then change only the parts you want. It picks materials from style cards, reference notes and motion recipes, and reviewer agents score the built page and fix it, so the seed starts out in good shape. It is meant for designing a site from scratch or redesigning one end to end, and is deliberately scoped away from small edits like a button color or a typo."
      ),
      work: [
        L(
          "web-design 스킬 — 전체 흐름을 이끄는 진입점. 재료 선정 → 페이지 제작 → 검수 → 수정을 차례로 실행.",
          "web-design skill — the entry point that drives the whole flow: pick materials → build the page → review → fix."
        ),
        L(
          "디자인 재료 담당(system-designer) — 팔레트, 글꼴 조합, 모션 레시피를 한 번에 골라 페이지 전체가 같은 방향을 따르게 함.",
          "Design-materials agent (system-designer) — picks the palette, font pairing and motion recipe in one go so the whole page follows one direction."
        ),
        L(
          "기본 검수자(critic) — 시각 · 개성 · 모션 · 사용성을 한 번에 100점으로 채점하고 수정 목록을 반환.",
          "Default reviewer (critic) — scores visuals, personality, motion and usability out of 100 in one pass and returns a fix list."
        ),
        L(
          "검수 패널 — 시각 65점(방향 · 레이아웃 · 개성 · 타이포 · 색), 모션 15점(어울림 · 매끄러움 · 모션 줄이기 대체), 사용성 20점(반응형 · 접근성 · 완성도)으로 나눠 영역별로 깊게 채점.",
          "Review panel — splits scoring into visuals 65 (direction, layout, personality, type, color), motion 15 (fit, smoothness, reduced-motion fallback) and usability 20 (responsive, accessibility, polish) for deeper per-area review."
        ),
      ],
      stack: ["Claude Code Plugin", "Agent Skills", "Subagents", L("프롬프트 설계", "Prompt design")],
    },

    todo_on: {
      icon: "✅",
      title: L("TODO on — 친구와 함께 쓰는 할 일 관리 앱", "TODO on — a to-do app you share with friends"),
      meta: [
        [L("개발 기간", "Duration"), L("2026.09 ~ 진행 중 (개인 프로젝트)", "Sep 2026 – present (personal project)")],
        [
          L("인원 구성", "Team"),
          L(
            "1인 개발 — 기획 · 디자인 · 검증은 직접, 구현은 AI 코딩 도구(Claude Code)와 협업 (+ 아이디어 · 보안 점검 1인)",
            "Solo — planning, design and verification myself; implementation together with an AI coding tool (Claude Code) (+ 1 person on ideas and security review)"
          ),
        ],
        [L("형태", "Format"), L("Flutter 앱 · Windows / Android", "Flutter app · Windows / Android")],
        [L("규모", "Scale"), L("릴리스 127회 · 자동 테스트 160여 개", "127 releases · ~160 automated tests")],
        [
          L("추후 계획", "Next steps"),
          L(
            "보안 점검과 기능 보강을 마친 뒤 Google Play · Microsoft Store 출시",
            "Launch on Google Play and the Microsoft Store after a security review and a round of new features"
          ),
        ],
      ],
      overview: L(
        "할 일, 캘린더, 습관, 일기, 채팅을 한곳에 모은 Windows · Android 앱입니다. 친구를 추가하면 서로의 할 일을 볼 수 있고(비공개 제외), 교환일기와 채팅으로 함께 쓸 수 있습니다. 기획부터 디자인, 배포와 운영까지 혼자 진행하고 있습니다.",
        "A Windows and Android app that brings to-dos, a calendar, habits, a diary and chat into one place. Add a friend and you can see each other's to-dos (except private ones), and share an exchange diary and chats. I run it alone, from planning and design through release and operation."
      ),
      workLabel: L("주요 기능", "Key features"),
      work: [
        {
          text: L(
            "할 일 — 카테고리별로 할 일을 적고, 끌어서 순서를 바꾸거나 다른 카테고리로 옮길 수 있습니다. 매주 같은 요일이나 정해 둔 날짜마다 다시 생기는 반복 할 일, 할 일마다 붙이는 메모와 알림, 친구에게 숨기는 비공개 설정을 지원합니다. 날짜를 아직 못 정한 일은 보관함에 넣어 두었다가 원하는 날로 꺼낼 수 있습니다.",
            "To-dos — write to-dos by category and drag them to reorder or move between categories. Repeating to-dos come back on set weekdays or dates, each to-do can carry a memo and a reminder, and any to-do can be hidden from friends. Things without a date yet wait in the archive until you pull them onto a day."
          ),
          figure: [
            { src: "todo-on-home.webp", caption: L("Windows 홈 화면", "Home screen on Windows") },
            { src: "todo-on-android.webp", caption: L("Android 홈 화면 (디자인 시안)", "Home screen on Android (design mockup)"), phone: true },
          ],
        },
        L(
          "캘린더 · 디데이 — 달력에서 날짜를 누르면 그날의 할 일이 보이고, 공휴일과 일기를 쓴 날도 함께 표시됩니다. 디데이는 여러 개 등록할 수 있고, 일주일 안으로 다가오면 빨간색, 날짜가 지나면 초록색으로 바뀝니다.",
          "Calendar · D-days — tap a date to see its to-dos; public holidays and diary days are marked too. Several D-days can be set; they turn red within a week and green once passed."
        ),
        L(
          "습관 — 매일 지킬 습관을 등록하고 체크하면 연속 달성일과 1년 치 활동 지도에 기록이 쌓입니다.",
          "Habits — check off daily habits and they build up a streak and a year-long activity map."
        ),
        {
          text: L(
            "일기 · 교환일기 — 나만 보는 날짜별 일기와, 친구들과 그룹을 만들어 한 편을 이어 쓰는 교환일기가 있습니다. 교환일기는 누가 어느 부분을 썼는지 나눠서 저장합니다.",
            "Diary · exchange diary — a private diary by date, and an exchange diary where a group of friends writes one entry together, stored with who wrote which part."
          ),
          figure: {
            src: "todo-on-diary.webp",
            caption: L("일기 — 달력에 내 일기와 교환일기를 쓴 날이 표시되고, 오른쪽 위에서 둘을 전환", "Diary — the calendar marks days with a diary or exchange diary entry; switch between them at the top right"),
          },
        },
        L(
          "친구 — 아이디 · 닉네임으로 검색하거나 친구 코드를 주고받아 친구를 추가합니다. 친구의 프로필과 할 일을 볼 수 있고, 비공개로 설정한 카테고리와 할 일은 보이지 않습니다.",
          "Friends — add friends by ID / nickname search or by swapping friend codes. You can see a friend's profile and to-dos, except categories and to-dos marked private."
        ),
        {
          text: L(
            "채팅 — 친구와 1:1 또는 그룹으로 대화합니다. 사진 보내기, 답장, 메시지 수정 · 삭제, 읽음 표시를 지원하고, 최근에 대화한 방이 위로 올라옵니다.",
            "Chat — 1:1 and group chats with friends, with photos, replies, editing and deleting messages, and read receipts; the most recent chats rise to the top."
          ),
          figure: {
            src: "todo-on-chat.webp",
            caption: L("채팅 목록 — 친구 이름과 프로필은 가렸습니다", "Chat list — friends' names and photos are blurred"),
          },
        },
        L(
          "설정 · 자동 업데이트 — 라이트 · 다크 테마와 글자 크기를 바꾸면 바로 앱 전체에 반영됩니다. 앱을 켤 때 GitHub의 최신 릴리스와 버전을 비교해, 새 버전이 있으면 앱 안에서 내려받아 설치합니다(Windows 설치 파일, Android APK).",
          "Settings · auto-update — light / dark theme and font size apply across the app as you change them. On launch the app compares its version with the latest GitHub release and downloads and installs a newer one in-app (Windows installer, Android APK)."
        ),
      ],
      casesLabel: L("문제 해결 사례", "Problems solved"),
      cases: [
        L(
          "Android 화면 버벅임 약 7배 개선 — 로그인 없이 홈 화면만 띄우는 측정용 빌드로 에뮬레이터에서 측정. 화면 구성 계산은 7ms인데 그리기가 558ms였고, 원인은 매 프레임 다시 계산되는 그림자 흐림 효과. 그림자를 한 번만 계산해 이미지로 저장하고 늘려 붙이는 나인패치 방식으로 바꿔 558ms → 약 80ms로 단축(에뮬레이터 기준).",
          "Android jank cut ~7× — measured on an emulator with a profiling build that opens only the home screen, no login. Layout took 7ms but painting took 558ms; the cause was a shadow blur recomputed every frame. Rendering the shadow once to an image and stretching it as a nine-patch brought paint from 558ms to ~80ms (emulator)."
        ),
        L(
          "아이디 중복 방지와 보안 규칙 — 아이디 선점을 트랜잭션으로 처리하고, Firestore 보안 규칙에서 형식 · 소유자 · 1인 1아이디를 서버 쪽에서 강제. 에뮬레이터로 규칙을 테스트하고 외부 보안 점검 요청에 대응.",
          "Unique IDs and security rules — ID claims run in a transaction, and Firestore security rules enforce format, ownership and one ID per user on the server. Rules are tested on the emulator, and an external security report was handled."
        ),
        L(
          "시작 시 채팅 알림 깜빡임 — 메시지와 '마지막으로 읽은 시각'이 따로 도착하면서 생기는 순서 문제임을 재현 테스트로 확인하고 수정.",
          "Chat badge flicker on startup — a reproduction test showed it was an ordering problem between messages and the 'last read' time arriving separately; fixed."
        ),
      ],
      stack: ["Flutter (Dart)", "Riverpod", "Firebase Authentication", "Cloud Firestore", "GitHub Actions", "GitHub Pages", "Inno Setup"],
      links: [
        { label: L("▶ 다운로드 사이트", "▶ Download site"), href: "https://dhwld-n.github.io/todo-on/", primary: true },
        { label: "GitHub Repository", href: "https://github.com/dhwld-n/todo-on" },
      ],
    },

    travel_planner: {
      icon: "✈️",
      title: L("Travel Planner — 친구들과 함께 고르는 AI 여행 플래너", "Travel Planner — an AI trip planner you pick with friends"),
      meta: [
        [L("개발 기간", "Duration"), L("2026.11.05 ~ 2026.11.11 (7일, 개인 프로젝트)", "Nov 5 – Nov 11, 2026 (7 days, personal project)")],
        [L("인원 구성", "Team"), L("1인 개발 (기획 · 구현 · 디자인 · 배포)", "Solo (planning, implementation, design, deployment)")],
        [L("형태", "Format"), L("Next.js 웹앱 · Vercel 배포 · Google 로그인", "Next.js web app · deployed on Vercel · Google sign-in")],
        [L("결과 및 성과", "Outcome"), L("travel-planner-sable-ten.vercel.app 로 배포 중", "Deployed at travel-planner-sable-ten.vercel.app")],
      ],
      overview: L(
        "여행마다 항공권 · 숙소 · 가볼 곳 후보를 모으고, 함께 가는 친구(크루)들이 하트를 눌러 고르는 여행 계획 웹앱입니다. 원하는 조건을 말로 적으면 AI가 검색 조건으로 바꿔 구글 항공권 · 호텔을 찾고, 가격 계산은 코드가, 추천 설명은 AI가 맡습니다. 고른 장소는 숙소를 중심으로 날짜별 일정과 지도 동선까지 이어집니다.",
        "A trip-planning web app where each trip collects flight, hotel and place candidates, and the friends coming along (the crew) pick them with hearts. Describe what you want in plain words and the AI turns it into search parameters for Google Flights and Hotels; code does the price math and the AI writes the recommendation. The chosen places then flow into a day-by-day itinerary around the hotel, with a route on the map."
      ),
      why: L(
        "친구들과 여행을 준비할 때 다 같이 시간을 맞춰 찾아보려 하면 시간이 안 맞는 경우가 더 많았습니다. 그래서 각자 시간 날 때 조금씩 찾아본 항공권 · 숙소 · 가볼 곳을 한곳에 담아 두고 나중에 함께 고를 수 있으면 좋겠다고 생각했습니다. 또 여행지에서 어디를 가야 할지 찾는 것도 늘 어려웠는데, 후기를 하나하나 읽는 대신 LLM이 후기를 분석해 좋은 곳을 판단해 주면 좋겠다는 생각으로 만들었습니다.",
        "When planning trips with friends, finding a time when everyone could search together rarely worked out. I wanted a place where each of us could drop the flights, hotels and spots we found bit by bit in our spare time, and pick from them together later. Deciding where to go once there was always hard too, so instead of reading reviews one by one, I wanted an LLM to analyze them and judge which places are worth it."
      ),
      workLabel: L("주요 기능", "Key features"),
      work: [
        L(
          "항공 · 숙소 검색과 추천 브리핑 — 자연어 요청을 AI가 공항 코드 · 호텔 검색어로 바꾸고(자주 가는 도시는 코드 표로 먼저 확정), SerpApi로 구글 항공권 · 호텔을 함께 검색. 항공+숙소 조합의 총액 · 1인당 금액 · 예산 초과 여부는 코드가 계산하고, AI는 그 숫자로 추천 이유만 서술.",
          "Flight & hotel search with a briefing — the AI turns a plain-language request into airport codes and a hotel query (common cities are fixed by a lookup table first), then SerpApi searches Google Flights and Hotels together. Code computes each flight+hotel combo's total, per-person cost and budget fit; the AI only explains the picks using those numbers."
        ),
        L(
          "숙소 가성비 점수 — 가격 대비 평점 · 위치 평점 · 리뷰 수 · 리뷰 속 좋음/나쁨 언급을 보고 숙소마다 0~100점과 한 줄 이유를 매김. 리뷰가 적으면 신뢰도를 깎음.",
          "Hotel value score — rates each hotel 0–100 with a one-line reason from price versus rating, location rating, review count and the good/bad mentions in reviews; few reviews lower the confidence."
        ),
        L(
          "가볼 곳 추천 — 먹방 · 명소 · 신사/절 · 가챠샵 · 소품샵 등 카테고리를 고르면, 블로그 · 후기 글 본문을 읽고 여러 글에서 많이 언급된 장소 순으로 정리. 구글 지도 별점 · 주소 · 영업시간을 붙여 보여 줌.",
          "Places to go — pick a category (food, sights, shrines, gacha shops, small shops and more) and it reads blog and review posts, ranking places by how many posts mention them, with Google Maps rating, address and opening hours attached."
        ),
        L(
          "크루와 함께 고르기 — 초대 링크(모바일은 공유 시트)로 친구를 부르고, 후보함의 항공 · 숙소 · 장소에 각자 하트를 눌러 많이 받은 순으로 정렬. Supabase 행 수준 보안으로 여행 멤버만 보고 고칠 수 있음.",
          "Choosing with the crew — invite friends with a link (the share sheet on mobile); everyone hearts flights, hotels and places in the shortlist, sorted by most hearts. Supabase row-level security keeps each trip visible and editable to its members only."
        ),
        L(
          "AI 자동 일정 — 숙소에서 출발해 돌아오는 동선을 기준으로 가까운 동네끼리 묶고, 도착 · 출국 시각, 영업시간, 식사 시간대를 지켜 날짜별로 배치. '둘째 날 오전에 가챠샵'처럼 요청을 덧붙이면 그대로 반영하고, 직접 적은 일정은 건드리지 않음.",
          "AI auto-itinerary — groups nearby places into days around the hotel and orders them in one direction, respecting arrival and departure times, opening hours and meal times. Extra requests like 'gacha shop on the morning of day 2' are honored, and entries you typed yourself are left alone."
        ),
        L(
          "일정 보드 · 지도 — 일정을 끌어서(마우스 · 터치 · 키보드) 같은 날이나 다른 날로 옮기고, 장소 사이 이동 시간(도보 · 대중교통)을 표시. 하루 동선을 구글 지도로 한눈에 보고, 국내 여행은 기차 · 버스 시간표도 함께 비교.",
          "Itinerary board & map — drag entries (mouse, touch or keyboard) within or across days, with walking or transit times between stops. Each day's route shows on Google Maps, and domestic trips compare train and bus timetables too."
        ),
      ],
      stack: [
        "Next.js 16 (App Router · Server Actions)",
        "React 19 · TypeScript",
        "Tailwind CSS 4",
        L("Supabase (Auth · Postgres · RLS)", "Supabase (Auth · Postgres · RLS)"),
        "Google Gemini API",
        L("SerpApi (구글 항공권 · 호텔 · 검색)", "SerpApi (Google Flights · Hotels · Search)"),
        "Google Places · Routes · Maps Embed API",
        "Vercel",
      ],
      links: [
        { label: L("▶ 사이트 열기", "▶ Open the site"), href: "https://travel-planner-sable-ten.vercel.app", primary: true },
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

    e2_mate: {
      icon: "📣",
      title: L(
        "[산업통상부·KIAT] 2026 공학페스티벌 서포터즈 E² 메이트",
        "[MOTIE · KIAT] 2026 Engineering Festival Supporters · E² Mate"
      ),
      meta: [
        [L("활동 기간", "Period"), L("2026.10.28 ~ 2026.11.30", "Oct 28 – Nov 30, 2026")],
        [
          L("주최 · 주관", "Host"),
          L(
            "산업통상부 · 한국산업기술진흥원(KIAT) · 공학교육혁신협의회",
            "Ministry of Trade, Industry and Energy · KIAT · Engineering Education Innovation Council"
          ),
        ],
        [L("분야", "Field"), L("서포터즈 · 콘텐츠 마케팅", "Supporters · content marketing")],
      ],
      overviewLabel: L("활동 개요", "Overview"),
      overview: L(
        "전국 대학의 공학도들이 아이디어와 기술을 공유하는 축제인 '공학페스티벌(E² FESTA)'을 더 많은 사람에게 알리는 공식 대학생 서포터즈입니다. 축제 전에는 내 SNS 채널로 공학페스티벌 소식을 알리고, 축제 당일에는 현장을 직접 둘러보며 생생한 후기를 전합니다.",
        "The official student supporters who promote the Engineering Festival (E² FESTA), where engineering students from universities nationwide share ideas and technology. Before the festival we spread the news on our own social channels, and on the day we tour the venue and share a first-hand review."
      ),
      workLabel: L("주요 활동", "Key activities"),
      work: [
        L(
          "공학페스티벌 홍보 콘텐츠 업로드 (2회 이상) — 인스타그램 · 블로그 · 유튜브 중 선택한 채널에 카드뉴스, 릴스, 블로그 포스팅 등으로 제작.",
          "Promotional content (2+ posts) — card news, reels or blog posts on Instagram, a blog or YouTube."
        ),
        L(
          "공학페스티벌 현장 방문 + 후기 콘텐츠 업로드 (1회) — 11월 19일(목) 11:00 ~ 16:00, 서울 SETEC.",
          "On-site visit + review content (1 post) — Nov 19 (Thu), 11:00–16:00, SETEC, Seoul."
        ),
      ],
      stackLabel: L("키워드", "Keywords"),
      stack: [
        L("SNS 콘텐츠 제작", "SNS content creation"),
        L("홍보 마케팅", "Marketing & promotion"),
        L("공학 · 기술 행사", "Engineering events"),
      ],
      links: [
        { label: L("▶ 홍보 포스팅 보기", "▶ Read the promo post"), href: "https://blog.naver.com/dhwldn06/224463598085", primary: true },
      ],
    },
  };
})();
