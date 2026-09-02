// 테마: 저장된 값 → 없으면 OS 설정
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  const toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
})();

// 푸터 연도
document.getElementById("year").textContent = new Date().getFullYear();
