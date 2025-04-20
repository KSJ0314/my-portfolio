import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { light, dark } from './style/theme';
import { IsDarkContext } from './context/IsDarkContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { updateVisitorCount } from './visitorCounter';
import GlobalStyle from './style/GlobalStyle';
import Wrap from './components/Wrap';
import Wrap_Mobile from './components_mobile/Wrap';
import PreLoadingImage from './components/PreLoadingImage';


function App() {
  const [isReady, setIsReady] = useState(false);

  /// 다크모드 관리 ///
  const [ darkMode, setDarkMode ] = useState(false);
  const darkModeToggle = () => {
    if (darkMode){
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
  };
  //////


  /// 가로 모드 / 세로 모드 관리 ///
  const [verticalMode, setVerticalMode] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      if (viewportWidth > viewportHeight) {
        setVerticalMode(false);
      } else {
        setVerticalMode(true);
      }
    };
    window.addEventListener('resize', handleResize);

    // 초기 사이즈 설정
    handleResize();

    // 방문자 수 카운트를 위한 함수 실행
    updateVisitorCount().then(()=>{
      setIsReady(true);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //////


  /// 다크모드와 가로모드를 ThemeProvider에 넣어 스타일링 ///
  const theme = {
    "darkTheme": darkMode ? dark : light,
    "verticalMode": verticalMode
  }
  //////


  /// 모바일모드에서 스크롤을 App.js 수준으로 넘기기 위해 사용 ///
  /// 모바일에서는 스크롤을 최상단까지 올리면 주소창과 하단 메뉴 UI가 생성됨 ///
  /// 컴포넌트 안에서 스크롤이 되기 때문에 UI on/off가 안됨 ///
  /// 컴포넌트 내부의 스크롤 기능을 없애고 페이지 전체 영역에 스크롤 이벤트를 넣어 ///
  /// UI on/off가 되게하고 해당 컴포넌트의 스크롤을 루트에서 조작 ///
  /// 루트 영역에 애초에 스크롤이 없어서 가능 ///
  const scrollableRef = useRef(null);
  useEffect(() => {
    const handleScroll = (event) => {
      if (!scrollableRef.current.selectRef()){
        return;
      }
      const scrollableElement = scrollableRef.current.selectRef().current.current;
      if (scrollableElement.scrollTop > 0){
        event.preventDefault();
      }
      if (scrollableElement) {
        const deltaY = event.deltaY; // 휠 이벤트로부터의 deltaY
        const steps = Math.abs(deltaY); // deltaY의 절대값
        const direction = deltaY > 0 ? 1 : -1; // 방향 결정
        
        let scrollable = true;
        let currentStep = 0; // 현재 단계 초기화
        if (scrollable){
          scrollable = false;
          const interval = setInterval(() => {
            if (currentStep < steps) {
              scrollableElement.scrollTop += (direction*2.5);
              currentStep++;
            } else {
              scrollable = true;
              clearInterval(interval); // 모든 단계가 완료되면 인터벌 종료
            }
          }, 1);
        }
      }
    };


    let startY = 0;
    let velocity = 0;
    let prevent = false;

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
      velocity = 0;
    };

    const handleTouchMove = (event) => {
      if (!scrollableRef.current.selectRef()){
        return;
      }
      const scrollableElement = scrollableRef.current.selectRef().current.current;
      if (prevent){
        event.preventDefault();
      }
      if (scrollableElement.scrollTop > 0){
        prevent = true;
      }
      if (scrollableElement) {
        const touchY = event.touches[0].clientY;
        const deltaY = startY - touchY;
        scrollableElement.scrollTop += deltaY; // 터치 스크롤에 따라 스크롤
        velocity = deltaY; // 이동 거리로 속도 업데이트
        startY = touchY; // 마지막 Y 위치 업데이트
      }
    };

    const handleTouchEnd = () => {
      if (!scrollableRef.current.selectRef()){
        return;
      }
      const scrollableElement = scrollableRef.current.selectRef().current.current;
      if (scrollableElement.scrollTop === 0){
        prevent = false;
      }
      // 관성 스크롤
      const inertiaScroll = () => {
        if (Math.abs(velocity) < 1) return; // 속도가 거의 0이면 종료
        scrollableElement.scrollTop += velocity; // 스크롤 업데이트
        // 속도 감쇠
        velocity *= 0.95; // 관성 감쇠

        if (scrollableElement.scrollTop === 0){
          prevent = false;
        }
        
        requestAnimationFrame(inertiaScroll); // 다음 프레임에 재귀 호출
      };

      inertiaScroll(); // 관성 스크롤 시작
    };


    if (verticalMode){
      window.addEventListener('wheel', handleScroll, { passive: false });
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleTouchEnd);
    } else {
      window.removeEventListener('wheel', handleScroll, { passive: false });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove, { passive: false });
      window.removeEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('wheel', handleScroll, { passive: false });
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove, { passive: false });
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [verticalMode]);
  //////


  if (isReady) {
    return (
      <>
      <PreLoadingImage />
      <GlobalStyle/>
      <ThemeProvider theme={theme}>
        <IsDarkContext.Provider value={darkMode}>
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route
                path="/"
                element={
                  verticalMode
                  ? <Wrap_Mobile darkModeToggle={darkModeToggle} ref={scrollableRef}/>
                  : <Wrap darkModeToggle={darkModeToggle} />
                }
              />
            </Routes>
          </Router>
        </IsDarkContext.Provider>
      </ThemeProvider>
      </>
    );
  }
}

export default App;
