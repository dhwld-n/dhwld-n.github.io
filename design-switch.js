// 왼쪽 아래 디자인 버전 선택. 메인 사이트와 design_N 페이지가 모두 이 파일을 </body> 바로 앞에서 불러온다.
// 새 버전을 만들면 VERSIONS 에 한 줄 추가.
(function () {
  const VERSIONS = [
    ["Main", ""],
    ["Design 1", "design_1/"],
    ["Design 2", "design_2/"],
  ];
  const root = new URL(".", document.currentScript.src); // 이 파일이 있는 곳 = 사이트 루트
  const here = location.pathname.replace(/index\.html$/, "");

  const nav = document.createElement("nav");
  nav.className = "design-switch";
  nav.setAttribute("aria-label", "디자인 버전");
  for (const [label, path] of VERSIONS) {
    const url = new URL(path, root);
    const a = document.createElement("a");
    a.href = url.href;
    a.textContent = label;
    if (url.pathname === here) a.setAttribute("aria-current", "page");
    nav.append(a);
  }

  // 페이지마다 테마가 달라서 어느 배경에서도 보이는 반투명 남색 알약 모양으로 둔다
  const style = document.createElement("style");
  style.textContent = `
    .design-switch {
      position: fixed; left: 16px; bottom: 16px; z-index: 50;
      display: flex; gap: 2px; padding: 4px; border-radius: 999px;
      background: rgb(15 17 40 / .78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 8px 24px -8px rgb(0 0 0 / .45);
      font-family: inherit; font-size: 12px; font-weight: 700; line-height: 1;
    }
    .design-switch a { padding: 9px 12px; border-radius: 999px; color: rgb(255 255 255 / .75); text-decoration: none; white-space: nowrap; }
    .design-switch a:hover { color: #fff; background: rgb(255 255 255 / .12); }
    .design-switch a[aria-current="page"] { background: #fff; color: #14162d; }
    .design-switch a:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
    @media print { .design-switch { display: none; } }
  `;
  document.head.append(style);
  document.body.append(nav);
})();
