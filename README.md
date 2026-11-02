# dhwld-n.github.io

오지우의 개인 포트폴리오 홈페이지 (GitHub Pages).

## 배포 방법

1. GitHub에서 새 저장소를 만든다. **저장소 이름은 반드시 `dhwld-n.github.io`**.
2. 이 폴더의 파일을 저장소에 올린다:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/dhwld-n/dhwld-n.github.io.git
   git push -u origin main
   ```
3. 저장소 → Settings → Pages 에서 Source가 `Deploy from a branch`, 브랜치 `main` / `/ (root)` 인지 확인한다.
4. 1~2분 후 `https://dhwld-n.github.io` 에서 확인.

## 수정할 곳

- `index.html` — 페이지 내용 (소개, 프로젝트 카드, 연락처)
- `projects.js` — 카드를 눌렀을 때 뜨는 프로젝트 상세 내용. 새 카드는 `data-project="id"` 와 같은 id 로 여기에 추가
- `styles.css` — 색 토큰(`--surface`, `--accent` 등)과 레이아웃
- `main.js` — 테마 전환, 스크롤 효과, 상세 창, 히어로 3D
- `style.css` — `agent_with_gpt.html` 데모 페이지 전용
