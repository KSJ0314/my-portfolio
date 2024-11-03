![](https://velog.velcdn.com/images/ksj0314/post/7dcc9359-dab1-42bc-824a-d65c7efb8810/image.png)


## 📗 프로젝트 개요

* React를 이용해 제작한 저를 소개하는 사이트입니다.

* 리액트를 학습한 후 응용해 보기 위해 시작한 프로젝트로 다양한 기능을 사용하는 것을 목표로 제작하였습니다.

---

## 📘 프로젝트 요약

* "나"를 소개하기 위해 싸이월드의 미니홈피를 모티브로 제작하였습니다.

* 미니홈피라는 주제에 맞게 페이지를 스타일링 하였으며 방문자수, 방명록, BGM등의 부가 기능을 추가하였습니다.
* SPA 구조를 사용하여 고정된 단일 페이지 내에서 특정 영역만 메뉴에 따라 정보가 변경됩니다.
* 전체화면모드, 다크모드, 모바일모드의 모드 변경이 가능합니다.
* 깃허브 페이지 서비스를 이용하여 빌드, 배포하였습니다.
* 방명록등의 데이터 작업이 필요한 경우 Firebase를 이용하여 구현하였습니다.


---

## 📙 프로젝트 소개

### 1. 페이지(메뉴)

#### 1) 전체 페이지

![](https://velog.velcdn.com/images/ksj0314/post/ab5e5ffa-1ed0-4515-95d1-209f2afc1b55/image.png)

![](https://velog.velcdn.com/images/ksj0314/post/52d17ea2-4973-4871-bd23-e0d74eb1fce9/image.png)

***

#### 2) About

미니홈피라는 주제에 걸맞은 자기소개 메뉴입니다.

![](https://velog.velcdn.com/images/ksj0314/post/b31bf6cd-9d38-442b-8997-1018821103ae/image.gif)

![](https://velog.velcdn.com/images/ksj0314/post/c492a6a2-5ac5-47fe-abd0-5f861bf733ec/image.png)

* 말풍선에 타이핑 애니메이션을 넣은 텍스트를 넣어 캐릭터가 말하는 듯한 연출을 하였습니다.
* `setInterval`과 `substring`을 이용하여 텍스트가 하나씩 추가되게 구현하였습니다.

***

![](https://velog.velcdn.com/images/ksj0314/post/ef05f245-08dc-4322-85ed-32c901a5d860/image.gif)

![](https://velog.velcdn.com/images/ksj0314/post/8f4af6d2-d0d6-4800-bd24-6e18ac92f95d/image.png)

* 문 아이콘을 클릭하여 장면이 전환되게 연출하였습니다.
* `clip-path: polygon()`을 이용하여 장면 전환 애니메이션을 구현하였습니다. <br/>
[>> 장면 전환 애니메이션 구현 자세히 보기](https://velog.io/@ksj0314/CSS-%EC%BF%A8%ED%83%80%EC%9E%84-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98clip-path-polygon)

***

#### 3) Career, Social

간단한 경력 사항과 깃허브, Velog의 링크 카드가 있는 메뉴입니다.

![](https://velog.velcdn.com/images/ksj0314/post/a1c502d4-b3c0-4f2b-ac42-31b1158adcd6/image.png)

![](https://velog.velcdn.com/images/ksj0314/post/65c6d2ea-8920-4a8e-bdf7-f9004bde957c/image.png)

***

#### 4) Project

react-bootstrap의 Carousel과 react-markdown을 이용한 프로젝트 소개입니다.

![](https://velog.velcdn.com/images/ksj0314/post/ace2c59d-3a45-4a6b-b66c-46484bfad448/image.png)

* 프로젝트를 아이콘으로 표현하여 배치하였습니다.
* 아이콘을 클릭하여 팝업창으로 상세 화면이 오픈됩니다.

![](https://velog.velcdn.com/images/ksj0314/post/af4b705b-e2b8-47bd-8892-8eca26d211e3/image.png)

* 좌측에는 `react-bootstrap`의 `Carousel`을 이용하여 프로젝트의 이미지를 확인할 수 있습니다.<br/>
[>> react-bootstrap 사용법 자세히 보기](https://velog.io/@ksj0314/React-Bootstrap%EC%9D%98-Carousel-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
* 우측에는 프로젝트의 설명과 링크, 사용한 기술을 나타내었습니다.
* `>> ReadMe` 버튼을 클릭하여 리드미에 작성된 더욱 상세한 내용을 확인할 수 있습니다.

![](https://velog.velcdn.com/images/ksj0314/post/22422ec2-2cb7-44a4-8570-b0955e3d8f9b/image.png)

* 깃허브에 작성된 `ReadMe` 파일을 다운받아 프로젝트에 추가하고<br/>
`react-markdown`을 이용하여 마크다운 문법에 맞게 html에 렌더링하여 나타냅니다.<br/>
[>> react-markdown 사용법 자세히 보기](https://velog.io/@ksj0314/React-Markdown-%EB%A0%8C%EB%8D%94%EB%A7%81%ED%95%98%EA%B8%B0)

***

#### 5) Board

Firebase를 이용하여 구현한 게시판 메뉴입니다.

![](https://velog.velcdn.com/images/ksj0314/post/df975624-8066-48f3-99ce-ed282771ea7e/image.png)

* 사용자는 아이디와 비밀번호를 입력하고 프로필 사진을 등록하여 방명록을 작성할 수 있습니다.
* `npm install firebase` 명령어를 이용해 Firebase를 설치하여<br/>
데이터의 저장, 조회, 삭제를 구현하였습니다.
* 아이디, 비밀번호, 작성일자, 방명록은 Firestore에 저장되며<br/>
프로필 사진 파일은 Storage에 저장됩니다.

***

### 2. 모드 변경

#### 1) 다크모드

![](https://velog.velcdn.com/images/ksj0314/post/1998a23b-06a2-425e-bf56-cdf3b7e8ac5b/image.gif)

![](https://velog.velcdn.com/images/ksj0314/post/e06c2d0d-c184-48ce-a3e3-1a4359c2fd08/image.png)

* 사용자의 버튼 클릭을 통해 Light/Dark 모드를 변경할 수 있습니다.
* `ThemeProvider`을 이용해 다크모드를 관리하여 `styled-components` 내에서 변수를 이용한 스타일링이 가능합니다.

***

#### 2) 전체 화면 모드

![](https://velog.velcdn.com/images/ksj0314/post/ff9cb042-547a-4927-832c-9b7e5f0702aa/image.gif)

![](https://velog.velcdn.com/images/ksj0314/post/ead24527-7340-4e03-9650-30bec801e5db/image.png)

* 데스크탑 모드에서 메인 영역의 크기가 작기 때문에 버튼을 통해 확대된 화면으로 전환하는 기능을 추가하였습니다.
* 확대될 때의 `transition` 효과를 위해 해당 영역을 감싸고 있는 컴포넌트의 `position` 값을 계산하여 하위 컴포넌트로 넘겨주고 하위 컴포넌트를 `position: fixed`로 설정하였습니다.<br/>
※ `top, left`의 초기 값이 없으면 `transition`이 적용되지 않습니다.

***

#### 3) 데스크탑(가로) / 모바일(세로) 모드

![](https://velog.velcdn.com/images/ksj0314/post/b11a6641-40cd-408d-8fa9-99d911189613/image.gif)

![](https://velog.velcdn.com/images/ksj0314/post/08bad467-e2ce-4c45-8bfa-b7380bb6e733/image.gif)

* 단일 페이지 구조로 선택한 메뉴에 따라 특정 영역이 변경됩니다.

* 데스크탑 모드에서는 해당 영역의 컴포넌트가 변경되는 방식으로,<br/>
모바일 모드에서는 화면이 스크롤되는 방식으로 구현하였습니다.
* 페이지의 가로 세로 비율을 계산하여 데스크탑(가로) / 모바일(세로) 모드로 변경됩니다.<br/>
※ 초기에는 아래와 같이 모드에 따라 컴포넌트 내에서 구조만 변경되는 방식으로 제작하였으나 모바일의 작은 화면에서 가독성이 좋지 않아 아얘 다른 컴포넌트가 렌더링되는 방식으로 변경하였습니다.

![](https://velog.velcdn.com/images/ksj0314/post/801e8014-55f4-42be-a580-1811fd85987e/image.png)

***

### 3. GitHub Pages

정적 웹사이트 호스팅 서비스중 하나인 깃허브 페이지를 이용하여 프로젝트를 배포하였습니다.

`gh-pages` 패키지를 install하여 프로젝트의 빌드, 배포를 자동으로 도와줍니다.

[>> [React] gh-pages를 이용한 페이지 빌드-배포](https://velog.io/@ksj0314/React-gh-pages%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)

***

### 4. Firebase

정적 웹사이트 호스팅 서비스를 이용하면 프로젝트를 간편하게 빌드, 배포할 수 있으나 데이터를 저장, 조회하는 등의 백엔드 로직은 따로 구현하여 연결해야 합니다.

서버를 직접 개발하여 관리할 정도로 대규모 프로젝트가 아니기에 BaaS중 하나인 Firebase를 이용하여 방명록과 방문자 수를 구현하였습니다.

[>> [React] Firebase를 이용해 게시판 만들기](https://velog.io/@ksj0314/React-Firebase%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0)
[>> [React] 페이지 방문자 수 구현하기](https://velog.io/@ksj0314/React-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%B0%A9%EB%AC%B8%EC%9E%90-%EC%88%98-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

---

## 📓 시행착오

#### 1. 2개 이상의 프로젝트를 gh-pages로 배포시 오류 발생

새로 만든 프로젝트를 `gh-pages`를 연결하여 `npm run deploy` 했는데 이전에 만든 프로젝트의 사이트에 업로드되는 현상이 있었습니다.

[>> 해결 방법 바로가기](https://velog.io/@ksj0314/React-gh-pages%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0#2%EA%B0%9C-%EC%9D%B4%EC%83%81%EC%9D%98-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EB%A5%BC-gh-pages%EB%A1%9C-%EB%B0%B0%ED%8F%AC%EC%8B%9C-%EC%98%A4%EB%A5%98-%EB%B0%9C%EC%83%9D)

#### 2. 이미지 프리로딩

![](https://velog.velcdn.com/images/ksj0314/post/8df93901-ebe8-486c-9cbb-53f65d45fc05/image.gif)

컴포넌트의 렌더링 후 이미지를 로딩하면 위 영상처럼 이미지 로딩 시간으로 인해 사용감이 떨어집니다.

이를 해결하기 위해 나중에 사용할 이미지를 미리 불러오는 작업이 가능합니다.

[>> 해결 방법 바로가기](https://velog.io/@ksj0314/React-%EC%9D%B4%EB%AF%B8%EC%A7%80-%ED%94%84%EB%A6%AC%EB%A1%9C%EB%94%A9)

#### 3. 모바일에서 스크롤 시 주소창, 하단 메뉴 UI 오류

| 네이버 | 진행중인 프로젝트 |
| --- | --- |
| ![](https://velog.velcdn.com/images/ksj0314/post/6a5c91f3-9843-4ca2-8666-f802d364eb25/image.gif) | ![](https://velog.velcdn.com/images/ksj0314/post/cb163ac1-1e6d-47fc-b0d6-397e9d2c5579/image.gif) |

모바일 브라우저는 사용자의 스크롤 조작을 감지해서 주소창/하단메뉴 UI를 on/off 하는 기능을 지원합니다.

위 GIF를 확인하면 네이버에서는 스크롤할때 UI의 on/off가 잘 이루어지는데
우측의 사이트는 제대로 작동하지 않는것을 볼 수 있습니다.

이는 해당 기능이 root 영역에서 스크롤이 이루어질 때만 발생하기 때문으로 해당 프로젝트는 컴포넌트 내부에서 스크롤이 이루어지기에 원하는 동작이 이뤄지지 않았던 것입니다.

[>> 해결 방법 바로가기](https://velog.io/@ksj0314/React-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%9B%B9%EC%97%90%EC%84%9C-%EC%A3%BC%EC%86%8C%EC%B0%BD-%ED%95%98%EB%8B%A8-%EB%A9%94%EB%89%B4-UI-%EC%9E%90%EB%8F%99-%EC%88%A8%EA%B8%B0%EA%B8%B0%EA%B0%80-%EC%95%88%EB%90%A0-%EB%95%8C)

#### 4. 팝업창의 z-index

![](https://velog.velcdn.com/images/ksj0314/post/f86e4e2d-6bd0-4fa9-ad9f-c59ab000333d/image.png)

팝업 화면의 뒤를 어둡게 나타내기 위해 `z-index`의 값을 올려주고 `background`영역을 불투명하게 설정하였는데 `z-index`가 설정된 다른 버튼이 뚫고 올라오는 현상이 있었습니다.

분명 `z-index`의 값을 팝업창에 더 높게 설정했는데도 해결되지 않았습니다.

[>> 해결 방법 바로가기](https://velog.io/@ksj0314/React-React-Portal)

#### 5. 컴포넌트의 크기 측정

![](https://velog.velcdn.com/images/ksj0314/post/7919a3a1-2886-485b-8321-ed29b309e7d7/image.png)

컴포넌트가 렌더링된 후 사이즈를 측정하기 위해 useEffect()를 이용해 setSize()를 실행하는 코드가 있었습니다.

당장은 보이는 오류 없이 작동하지만 해당 코드는 문제점이 많이 있습니다.

[>> 수정된 코드 자세히 보기](https://velog.io/@ksj0314/React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%9D%98-%ED%81%AC%EA%B8%B0-%EC%B8%A1%EC%A0%95)

---
## 💡 저작권

해당 프로젝트 내 이미지들은 개인 프로젝트에서 비상업용으로 제작, 사용한 이미지로 무단 도용을 금합니다.
