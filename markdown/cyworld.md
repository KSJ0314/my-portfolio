## 📗 프로젝트 개요

* 본 프로젝트는 MVC2 패턴에 대한 이해를 키우기 위한 개인 프로젝트입니다.

* JSP를 이용해 CRUD를 구현하고,<br/>
  Flex를 이용한 CSS 레이아웃을 구성했습니다.

---

## 📘 프로젝트 요약

![](https://velog.velcdn.com/images/ksj0314/post/85b43012-963e-4430-a37f-6f508f6d0b45/image.jpg)

위 사진을 토대로 `싸이월드`를 클론코딩 하는 것을 목표로 하였습니다.

---

## ⏱️ 개발 기간

* 23.11.6. ~ 23.11.17.

---

## 📕 실행 환경

* Language : jdk-11
* Ide : Eclipse 2020. 09.
* Server : Apache Tomcat v9.0
* DB : MySQL 8.0
* lib : cos.jar, jstl-1.2.jar, mysql-connector-java-5.1.49.jar

---

## 📙 프로젝트 소개

프로젝트의 이해를 돕기 위해서는 MVC2 패턴에 대한 이해가 필요합니다.

[>> MVC2 패턴의 이해](https://velog.io/@ksj0314/MVC2-%ED%8C%A8%ED%84%B4%EC%9D%98-%EC%9D%B4%ED%95%B4-JSP)

### 1. 회원관리

![](https://velog.velcdn.com/images/ksj0314/post/b8d12b68-8c16-4094-9bd5-5837f9878efc/image.png)

시작페이지(index.jsp)를 통해 로그인, 회원가입 페이지로 이동할 수 있습니다.

회원 관리를 위한 로직은 `MemberServlet.java`에서 관리됩니다.

[>> MemberServlet.java 자세히 보기](https://github.com/KSJ0314/Cyworld_for_JSP/blob/main/cyworld/src/controller/MemberServlet.java)

### 2. 미니홈피 (home.jsp)

![](https://velog.velcdn.com/images/ksj0314/post/7c9b40fb-19f3-47a9-bebe-c7e911e56b37/image.png)

#### 1) 로그인 체크와 데이터 획득

홈피는 회원만 접근이 가능한 페이지입니다.<br/>
session에 등록된 로그인 정보를 확인하여 로그인되지 않은 경우 안내창을 출력합니다.

![](https://velog.velcdn.com/images/ksj0314/post/325692f2-9c90-4b61-b493-5b71d8bd69f3/image.png)

이를 위해 홈피는 Filter에서 관리됩니다.

> Filter는 특정 경로로 접속 시 먼저 실행되는 파일입니다.

※ Servlet과의 차이
: Servlet은 Servlet의 경로로 이동할 경우 Servlet으로 접속된 후 Servlet에서 알맞은 View의 경로로 이동되고<br/>
Filter는 View의 경로로 이동하는 경우에 먼저 실행되는 파일입니다.

![](https://velog.velcdn.com/images/ksj0314/post/9bc6622b-a72b-4301-bda2-55755fdbad50/image.png)

위와 같이 로그인체크나 홈피에서 사용할 데이터를 받아오는데에 사용됩니다.

#### 2) include

![](https://velog.velcdn.com/images/ksj0314/post/5080dbef-d537-429b-9ded-4a1f7f523593/image.png)

홈피의 메인 부분인 우측 하단 영역은 url의 parameter값에 따라 알맞은 jsp가 include됩니다. 

페이지 바로가기 버튼을 클릭하면 parameter값이 설정되어 페이지를 리로딩합니다.

### 3. 상세 페이지

방명록, 사진첩등 홈피에서 이루어지는 로직은 `HomeServlet.java`에서 관리됩니다.

[>> HomeServlet.java 자세히 보기](https://github.com/KSJ0314/Cyworld_for_JSP/blob/main/cyworld/src/controller/HomeServlet.java)

#### 1) 사진첩

사진첩은 홈피 주인만 작성 가능한 페이지입니다.

![](https://velog.velcdn.com/images/ksj0314/post/50829e45-7a95-4ada-98b0-809e7df58766/image.png)


작성 글이 없는 경우 로그인 아이디값을 확인 해 두가지 경우로 나타납니다.

![](https://velog.velcdn.com/images/ksj0314/post/40f21483-b753-4605-a7cb-dcc624b62968/image.png)

홈피 주인은 사진올리기 버튼을 통해 사진과 내용을 기재할수 있습니다.

#### 2) 방명록

방명록은 홈피 주인을 제외한 유저가 홈피에 방문시 작성하는 페이지입니다.

![](https://velog.velcdn.com/images/ksj0314/post/c41f7110-945d-4b67-be5c-03b1d701b18a/image.png)

방문객은 방명록 작성과 댓글 작성이 가능합니다.

![](https://velog.velcdn.com/images/ksj0314/post/68e52ebb-9272-41d1-8d1b-a7931b3f367f/image.png)

홈피 주인은 작성된 방명록들을 삭제할 수 있고 댓글 작성이 가능합니다.

#### 3) 주크박스

YouTube API를 이용한 배경음악 시스템입니다.

YouTube API를 사용하면 웹 페이지에 YouTube 동영상을 추가할 수 있습니다.<br/>
영상이 출력되는 영역을 화면에서 가리고 영상 컨트롤 버튼만 따로 만들어 음악이 재생되는것 처럼 연출했습니다.

[>> YouTube API 참조](https://developers.google.com/youtube/iframe_api_reference?hl=ko)

![](https://velog.velcdn.com/images/ksj0314/post/bda67cac-bb26-446d-bd01-d77ea22ac113/image.png)


홈피 주인은 곡 추가 버튼을 통해 배경음악을 추가할 수 있고<br/>
체크 버튼을 통해 메인페이지에서 재생될 음악을 고를 수 있습니다.

YouTube의 링크는 `https://www.youtube.com/watch?v=7rX3WTAeArY`<br/>
위와 같은 형식으로 이루어져있습니다.

YouTube API는 `7rX3WTAeArY`와 같은 코드를 이용해 영상을 재생하는 방식입니다.

![](https://velog.velcdn.com/images/ksj0314/post/bccca884-d214-4ae5-92c6-da9bcf204293/image.png)

위와 같이 코드만 추출하여 DB에 저장하는 형식으로 구현이 가능합니다.

![](https://velog.velcdn.com/images/ksj0314/post/c1f14cff-3260-49e6-adc1-a0e8438118bc/image.png)

메인페이지에서 등록된 음악이 재생되며 재생, 다음곡, 일시정지, 리스트 버튼이 제공됩니다.<br/>
리스트를 확장하면 특정 곡 재생이 가능합니다.

![](https://velog.velcdn.com/images/ksj0314/post/d5867e0d-9454-4731-b16c-043ec30e5417/image.png)

다른 유저의 홈페이지에서 곡을 가져오는 기능도 가능합니다.

### 4. Flex

전체적인 배치는 `display: flex` 설정으로 이루어집니다.

![](https://velog.velcdn.com/images/ksj0314/post/07d59041-81ba-4644-a8de-5c367a82e6ae/image.png)

수많은 영역에 클래스나 아이디를 두고 flex설정을 하기엔 코드가 길어져<br/>
위와 같이 모든 페이지에서 사용되는 `layout.css`에서 간단한 클래스들을 만들어 필요한 영역에 클래스를 추가하는 방식으로 레이아웃이 구성됩니다.

세세한 css설정이 필요한 영역은 각 페이지의 CSS파일에서 작성했습니다.

---

## 💡 저작권

해당 프로젝트 내 이미지들은 개인 프로젝트에서 비상업용으로 사용한 이미지로 무단 도용을 금합니다.
