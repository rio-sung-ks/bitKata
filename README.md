<br>
<br>

<p align="center">
  <img src="/assets/vaco.png"  width="50%">
</p>

<br>
<br>

> 바닐라코딩의 모든 과제는 실제 기업에서 주어지는 과제에 기반하여 제작되었으며, 저작권법의 보호를 받습니다. 개인 블로그 등의 공개된 장소에 관련 내용을 공유하거나 개인적으로 지인들과 공유하는 등의 행위는 삼가해주시기 바랍니다.

<br>
<br>

# Project BitKata

<br>

<p align="center">
  <img src="/assets/bitkata.png"  width="100%">
</p>

<br>

**🧠 Welcome to BitKata**

_📍 HQ: HaYarkon St 165, Tel Aviv-Yafo, Israel_

<br>

> "Code like a warrior."

<br>

**BitKata**는 알고리즘 문제를 단순한 테스트가 아닌, *훈련*으로 여기는 이스라엘 기반의 스타트업입니다.
개발자들이 실력을 쌓는 과정을 더 직관적이고 몰입감 있게 설계하는 것이 우리의 목표입니다.
그리고 이번 주, 당신 **Sarel**는 백엔드 인턴으로 팀에 합류했습니다.

<br>
<br>

## 💬 [Slack] `#bitkata-engineering`

### 🧑‍💼 Leo (PM)

> 우리가 새롭게 만들고 있는 알고리즘 트레이닝 서비스에 프로토타입을 붙여야 해요.
> GitHub 인증, 문제 목록, 상세 페이지, 코드 제출 후 판별까지 전반적인 흐름을 한 번 다 만들어보는 MVP에요.

<br>

### 👨‍💻 Odd (CTO)

> 이번 작업에서 중요한 건 단순 구현이 아니라,
> **사용자 인증 방식 선택**, **MongoDB 모델링 설계**,
> **코드 실행 처리 방식에 대한 보안적 고민**까지 포함입니다.
> Sarel, 이건 우리가 너의 사고 방식을 검증하는 첫 실전이에요.

<br>
<br>

## 🧩 프로젝트 목표

<br>

BitKata MVP에서는 사용자가 로그인한 뒤, 문제를 고르고, 코드를 제출하고,
테스트 케이스를 통과하면 축하 화면을, 실패하면 실패 원인을 알려줘야 합니다.

<br>
<br>

## 📚 사전 리서치 가이드 (시작 전)

<br>

- MongoDB의 다양한 [관계 설계 방식](https://www.mongodb.com/ko-kr/docs/manual/applications/data-models-relationships/) (1 to 1 Embedded, 1 to many Embedded, 1 to many References, many to many References)
- 세션 기반 인증 vs 토큰 기반 인증 (JWT, 리프레시 토큰, 쿠키)
- 비밀번호 암호화 방식, Salt의 역할

<br>
<br>

## 🔐 로그인 기능

<br>

### GET `/login`

- [x] 로그인 버튼 UI 제공
- [x] 로그인 성공 시 `/`로 이동
- [x] 실패 시 `/login`으로 복귀
- [x] 인증되지 않은 사용자는 그 외 경로 접근 불가
- [x] Passport.js + GitHub 소셜 인증 구현

#### 참고자료

- [Passport Github](https://github.com/jaredhanson/passport-github)
- [Passport Example](https://github.com/passport/express-4.x-facebook-example)
- [Passport Flow Explanation](http://toon.io/understanding-passportjs-authentication-flow/)

<br>
<br>

## 📃 문제 목록

<br>

### GET `/`

- [x] `views/index.ejs`에 문제 리스트 렌더링
- [x] `sample_problems.json`을 MongoDB Atlas에 수동으로 삽입
- [x] 문제 이름, 레벨, 정답자 수 출력
- [x] 문제 클릭 시 `/problems/:id`로 이동

<br>
<br>

## 🔍 문제 상세 페이지

<br>

### GET `/problems/:id`

- [x] 해당 문제 정보 상세 표시
- [x] CodeMirror 기반 코드 입력기 사용
- [x] HTML `<form>` 기반 제출 (AJAX 금지)

#### 참고자료

- [CodeMirror](https://github.com/codemirror/CodeMirror): In-browser code editor
- [CodeMirror Example](https://github.com/codemirror/CodeMirror/blob/master/demo/preview.html)

<br>
<br>

## 🧪 코드 판별 로직

<br>

### POST `/problems/:id`

- [x] 제출 코드 vs 정답 코드 비교
- [x] 성공 시 `success.ejs`로 이동
- [x] 실패 시 `failure.ejs` (통과 못한 테스트 케이스 명시)
- [x] 코드 실행 중 에러 발생 시 → 에러 메세지 포함하여 `failure.ejs` 출력
- [ ] 사용자의 코드 실행시 보안 이슈 고려 필수

<br>
<br>

## 📄 에러 처리

<br>

- [x] 404: 잘못된 URL
- [ ] 500: 내부 오류 발생 시, 사용자에게는 상세 오류 감춤

<br>
<br>

## 🚀 과제 제출 후 리서치 및 추가 적용

<br>

- HTTP vs HTTPS 차이
- HTTP 상태 코드 1XX~5XX 시리즈 의미, 이번 과제에서 정확한 처리를 했는지?
- DB 인덱스란 무엇이고, 이번 과제에서 적용 가능한 부분은?
- In-Memory DB (예: Redis)의 역할, 적용 가능한 부분이 있을지?
- 서버 배포: Render 서비스 + 환경 변수 등록

<br>
<br>

## 📄 PR 작성 가이드 from Odd (CTO)

<br>

1. 구현 완료한 기능 체크리스트
2. MongoDB 스키마 설계 설명 - 기타 기능 추가시 상황 고려하기
3. 구현한 사용자 인증 흐름에 대한 상세한 설명
4. 코드 실행 처리 방식에 대한 고민 및 선택 이유
5. 에러 핸들링 전략 - 기타 오류 상황 추가시 상황 고려하기

<br>
<br>

> 🧠 **Ken (CEO)**:
>
> 개발자가 문제를 푸는 게 아니라, 문제를 푸는 과정에서 성장하는 걸 우리는 설계합니다.
> Sarel, 이번 미션은 너의 사고 설계 능력을 보여주는 자리야.

<br>
