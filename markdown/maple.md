![](https://velog.velcdn.com/images/ksj0314/post/aa61b9b1-d663-4593-b9a2-0cd2a6918ecc/image.png)

## 📗 프로젝트 개요

이 프로젝트는 국비 교육 과정 중 _"혼자 공부하는 자바"_ 책의 교육이 끝난 후 평가를 위해 진행된 개인프로젝트입니다.

개발을 처음 접한 입문자가 두달 정도 Java를 공부한 후 제작한 프로젝트로 부족한 부분도 많지만 Java 입문 단계인 분들께 좋은 참고가 되길 바랍니다.

약 일주일간 오직 Java로만 제작한 프로젝트입니다.

---

## 📘 프로젝트 요약

Java로 그래픽을 구현하기 위해 jdk에서 기본적으로 제공해주는 GUI 개발용 라이브러리인 Swing을 이용했습니다.

자바의 라이브러리인 Swing의 각종 클래스를 상속받아 사용하며 자바의 상속에 대한 이해력을 재미있게 키우기 위해 게임으로 구현한 프로젝트입니다.

※ Swing은 Java로만 프로젝트를 진행하기 위해 사용하는 부가적인 것이지 Swing을 굳이 깊게 학습할 필요는 없습니다.

---

## ⏱️ 개발 기간

* 23.08.10. ~ 23.08.18.

---

## 📕 실행 환경

해당 프로젝트는 JavaSE-11, Eclipse 2020. 09. 버전으로 제작된 프로젝트입니다.<br />
GitHub에서 해당 파일을 import하여 실행할 수 있습니다.

---

## 📙 프로젝트 소개

### 1. Swing

우선 Swing을 어떤식으로 사용하는지 간략하게 소개하도록 하겠습니다.

>javax에 속한 swing은 다음과 같이 import하여 사용할 수 있습니다.
```java
import javax.swing.JFrame;
```

#### 1) JFrame : 전체 틀

* JFrame을 상속받는 클래스에서 `setTitle()`, `setSize()`등을 이용하여 띄울 창의 이름, 크기, 위치등을 설정해 전체 틀을 구현합니다.

#### 2) JPanel : 장면

* JFrame으로 띄워진 창에 그림을 그린다고 생각하면 이해가 쉬울것 같습니다.
* Loading화면, Login화면등에 해당하는 Panel클래스를 만들어 Frame 클래스에 추가(`add`)합니다.
* Panel 클래스의 `setVisible(true|false)` 메서드를 이용해 각 장면을 활성화/비활성화 합니다.

#### 3) JLabel : 유닛

* Panel위에 띄워지는 플레이어, 몬스터, 체력바, 블럭 등의 UI에 해당합니다.
* 몬스터, 스킬 등의 요소는 기초 틀은 같고 세부요소(이미지, 크기 등)만 다르니 큰 틀에 해당하는 클래스를 만들어 상속하여 사용합니다. <br />
※ 자바의 특징! extends를 잘 활용하면 가독성과 재사용성이 극대화됩니다.

#### 4) JTextFiled, JPasswordField : 입력창

* 로그인 기능을 구현하기 위해 사용합니다.
* JPasswordField는 입력한 값이 `***`로 처리되어 보여집니다.
* `getText()`를 이용해 입력값을 얻어옵니다.

#### 5) JButton

* 클릭이벤트 처리를 위해 사용합니다.

### 2. 게임 흐름

#### 1) 실행

* main 메서드에서 myFrame의 생성자를 호출함으로써 게임 창을 실행합니다.
* myFrame에 여러 panel을 추가하고 한가지만 visible하여 화면을 구성합니다.


![](https://velog.velcdn.com/images/ksj0314/post/bd559998-35eb-4d3e-ad90-644bf4517edd/image.png)

#### 2) 장면 전환
* panel A와 panel B를 파라미터로 받는 메서드를 생성하여 A의 `isVisible()`값을 확인하여 B를 `setVisible(true)`하는 메서드를 만듭니다.
* main 메서드에서 장면 전환 메서드를 순서에 맞게 실행하여 Scene A -> B 전환을 구현합니다.

![](https://velog.velcdn.com/images/ksj0314/post/7c705ab5-ea81-4852-9bd7-e7f6619ebbd7/image.png)


#### 3) Scene1 - Loading

* 게임 실행시 setVisible(true)되는 panel입니다.
* 단순히 gif 배경만 존재하는 패널입니다.

#### 4) Scene2 - Login

* LoadingPanel의 gif가 끝난 뒤 나타나는 panel입니다.
* 배경 이미지위에 입력창, 버튼을 투명으로 배치하였습니다. <br />
※ DB연결이 없어 회원가입은 보류되었습니다. (임시 id:test / pw:1234)

![](https://velog.velcdn.com/images/ksj0314/post/6e711d75-9a40-487b-be8e-1b76971c5a31/image.png)


#### 5) Scene3 - CharSelect

* 단순히 게임시작 버튼만 구현한 panel입니다. <br />
※ DB연결이 없어 캐릭터 생성은 보류되었습니다.

![](https://velog.velcdn.com/images/ksj0314/post/4b57f006-d982-4cb5-bd43-f8406b595bf7/image.png)


#### 6) Scene4 - Main

* 배경위에 palyer, 몬스터, 지형, 스킬, 경험치&체력바 등의 각종 JLabel 클래스들이 add되어있는 panel입니다.

![](https://velog.velcdn.com/images/ksj0314/post/d24466c3-7647-4762-9bbe-025d99b87691/image.png)

### 3. 메인 기능

Main panel이 활성화된 후 각종 기능들이 실행됩니다.

#### 1) 키 입력

* `addKeyListener`를 이용해 각종 키를 눌렀을때 필요한 메서드를 실행합니다.

>
```java
mf.addKeyListener(new KeyAdapter() { // 키 이벤트
	@Override
	public void keyPressed(KeyEvent e) { // 키 눌렀을때
		switch (e.getKeyCode()) { // 키 코드로 스위치
			case KeyEvent.VK_DOWN: // 방향키(아래) 눌렀을때
				ma.climb(mf, 1);
				break;
			case KeyEvent.VK_UP: // 방향키(위)눌렀을때
			~~~
```

#### 2) 상태 체크

* 플레이어와 몬스터의 상태를 계속해서 체크하며 상황에 맞는 각종 메서드들을 실행합니다.

>
```java
while (true) {
	try {
		Thread.sleep(20); // 속도 지연
	} catch (Exception e) {
	}
	ma.mopCheck(mf); // mob : 위치, move, hit, die, 모션 등 구현
	ma.plCheck(mf); // player : Icon, 위치, 중력, Hit 등 구현

	if (ma.end) {
		break;
	}
}
```

#### 3) Thread

* 플레이어의 모션, 각 몬스터의 모션, 스킬의 재사용 대기 등은 동시에 발생해야 합니다. (1번 몬스터가 움직임에 따라 다른 요소들이 정지하면 안됩니다.)
* 따라서 각 요소들을 Thread로 관리하여 동시 실행을 구현해줍니다. 

>
```java
void aSkill(MyFrame mf) {
	Thread tr = new Thread() {
		@Override
		public void run() {
			try {
            ~~~
```

#### 4) 유닛의 이미지

* 플레이어, 몬스터, 스킬창(재사용 대기)등의 JLabel들은 상태에 따라 다양한 이미지를 가집니다.
* swing의 ImageIcon객체와 JLabel의 `setIcon()`을 이용해 이미지를 변경합니다.

>
```java
~~~
public ImageIcon stand0 = new ImageIcon(MyFrame.class.getResource("../pl_image/stand0.gif"));
~~~
public Player() {
	setIcon(stand0);
~~~
```

#### 5) 애니메이션

* 위의 이미지 변경을 `Thread.sleep()`을 적절히 이용하면 애니메이션을 구현할 수 있습니다.

### 4. 그 밖
중력구현, 충돌구현, 공격구현 등 그 밖의 자세한 기능들은 Main.java의 내용을 확인해주세요. <br />
[>> Main.java 바로가기](https://github.com/KSJ0314/Mini-MapleStory/blob/master/KimSoJungProject0817/src/main_/Main.java)

---

## ✨ 보완 사항

프로젝트 평가 당시 코로나를 심하게 앓아서 개발 기간이 부족했습니다. <br />
당시 아직 배우지 못했던 기능도 있었습니다. <br />
다음은 미처 구현하지 못한 구상 단계의 내용입니다. <br />

1) 회원가입 : Login 화면에서 DB를 연동
2) 캐릭터 생성 : CharSelect 화면에서 DB를 연동
3) 보스몬스터 : 캐릭터가 Lv.5가 되었을 때 포탈을 생성, 보스맵으로 이동하여 보스를 처치해서 게임을 클리어
4) 메소 드랍 : 몬스터 처치 시 메소를 드랍하여 치장아이템을 구매

---

## 💡 저작권

해당 게임 내 이미지들은 개인 프로젝트에서 비상업용으로 사용한 이미지로 무단 도용을 금합니다.
