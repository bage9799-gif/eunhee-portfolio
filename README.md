# 달 확대 → 히어로 인트로 적용

처음에는 가운데 달이 보이고, 약 두 화면 분량을 스크롤하면 달이 화면을 채운 다음 기존 히어로가 나타납니다. 다시 위로 스크롤하면 달로 돌아갑니다. 달은 CSS로 그려서 추가 이미지가 필요 없습니다.

## 가장 간단하게 적용하기

1. `assets/moon-intro.css`, `assets/moon-intro.js`를 현재 프로젝트의 `assets` 폴더에 추가하세요.
2. 함께 제공한 `index.html`은 보내준 HTML에 인트로를 넣은 버전입니다. 현재 HTML과 비교해서 적용할 수 있습니다. 기존 이미지와 `default.css`, `main.css`, `main.js`는 현재 프로젝트에 있는 것을 사용합니다.
3. Live Server 등 현재 사용하는 방식으로 페이지를 열고 맨 위에서 스크롤하세요.

## 현재 HTML에 직접 적용하기

1. 기존 `<header class="header">`부터 해당 `</header>`까지를 `header-fragment.html`의 내용으로 교체하세요. 새 인트로도 기존 `<article class="page">` 안에 들어갑니다. 이후 `<main>`부터는 이어서 둡니다.
2. `<head>`의 기존 `main.css` 연결 다음에 아래 한 줄을 추가하세요.

```html
<link rel="stylesheet" href="./assets/moon-intro.css">
```

3. `</head>` 바로 위에 아래 한 줄을 추가하세요.

```html
<script src="./assets/moon-intro.js" defer></script>
```

새 JS는 별도 파일입니다. CSS 코드는 CSS 파일에, JS 코드는 JS 파일에 넣으세요.

## 원하는 느낌으로 조절하기

- 확대 구간 길이: `moon-intro.css`의 `#moon-intro.is-ready`에 있는 `300vh`, `300svh` 두 값을 함께 바꾸세요. 400이면 길게, 250이면 짧게 진행됩니다. `100vh`/`100svh`인 화면 고정 영역 높이는 유지합니다.
- 시작 달 크기: `.moon-disc`의 `width: clamp(150px, 18vw, 280px)`를 조절하세요.
- 달을 실제 이미지로 교체하려면 `.moon-disc`의 여러 줄짜리 `background-image`를 아래로 교체하세요. `moon.png` 파일은 `assets/images`에 넣습니다.

```css
background-image: url("./images/moon.png");
```

- 달 배경색: `.moon-cover`의 `background` 값을 수정하세요.
- 히어로로 바뀌는 시점: JS의 `smooth(0.76, 0.96, progress)`에서 시작값과 끝값을 조절하세요. 값은 0~1이며 시작값보다 끝값이 커야 합니다.

## 확인 범위

새 JavaScript와 제공한 HTML의 기존 인라인 JavaScript 구문을 확인했습니다. 확대·복귀·프레임 처리·중복 초기화 방지·화면 크기 변경·모션 줄이기 설정에 대한 동작 검증을 통과했습니다. 390/768/1920/3440px 너비에서 달이 화면 모서리까지 덮는 계산을 확인했습니다.

원본 `default.css`, `main.js`, 이미지·영상 파일은 첨부에 없어 전체 사이트의 브라우저 화면 검증은 하지 못했습니다. 제공한 원래 히어로 마크업과 나머지 HTML은 보존했습니다. 운영체제에서 '동작 줄이기'가 켜져 있으면 접근성 설정에 따라 바로 히어로를 보여줍니다.
