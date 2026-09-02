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

- `index.html`
  - `#about` 섹션의 자기소개 문단
  - `agent_with_gpt` 카드 설명, 새 프로젝트 카드 추가
  - `skill-list` 항목
- `style.css` — `--accent` 색상 등 테마 값
