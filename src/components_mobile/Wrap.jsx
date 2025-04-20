import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import Profile from "./Profile";
import Top from "./Top";
import Bottom from "./Bottom";
import AboutContain from "./contain/AboutContain";
import Container from "./Container";
import CareerContain from "./contain/CareerContain";
import ProjectContain from "./contain/ProjectContain";
import SocialContain from "./contain/SocialContain";
import BoardContain from "./contain/BoardContain";

const Main = styled.div`
    font-size: calc(var(--vw, 1vw) * 4) !important;
    width: calc(var(--vw, 1vw) * 100);
    height: auto;
    background-color: ${({theme}) => theme.darkTheme.bg_l1};
    padding: 1vh;
    overflow: hidden;
    position: fixed;
    top: calc(var(--vw, 1vw) * 15);

    
    & *:not(pre, code, span){
        color: ${({theme}) => theme.darkTheme.color};
        border-width: 0.1px;
    }
    
    & > div{
        border-radius: 1.5vh;
    }
    
    & > *+*{
        margin-top: 1vh;
    }
`;

function Wrap(props, ref) {
    const mainRef = useRef();  // Main
    const [menu, setMenu] = useState(0);  // bottom에서 선택한 메뉴
    const containerRefs = [useRef(),useRef(),useRef(),useRef()];  // 각 메뉴(container) 참조
    const icons = [
        "spec",
        "prj",
        "social",
        "board"
    ];  // container 상단의 아이콘


    /// 실제 vh 값 설정 ///
    const setVh = () => {
        const vh = window.innerHeight * 0.01; // 1vh를 계산
        const vw = window.innerWidth * 0.01; // 1vw를 계산
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    };
    window.onload = () => {
        setVh();
        window.addEventListener('resize', setVh);
    };
    //////


    /// Wrap에서의 Project 관리 ///
    /// 선택된 프로젝트 Top에 아이콘 넣기 ///
    const [selectedProject, setSelectedProject] = useState([false,false,false,false]);

    /// menu 변경 시 project 부분 초기화하기 위해 설정 ///
    const [projectReset, setProjectReset] = useState(true);
    const projectContainerScrollTop = () => {
        containerRefs[1].current.containerScrollTop();
    }
    //////


    /// menu 선택 시 스크롤 변경을 위한 값 구하고 변경하기 ///
    /// 초기에는 각 menu의 높이가 vh|vw로 되어있어서 스크롤도 vh|vw로 지정했으나 ///
    /// 모바일에서 주소창, 하단메뉴가 오픈됬을 때 vh가 아닌 innerHeight 사용이 필요하여 변경 ///
    const [scrollToMenu, setScrollToMenu] = useState([]);
    const scrollCheck = () => {
        var scrollArr;
        const scrollArrSetting = () => {
            const vW = window.innerWidth;
            const topHeight = vW*0.15*(-1);
            scrollArr = [topHeight];
            containerRefs.map((containerRef)=>{
                const containerElement = containerRef.current;
                if (containerElement) {
                    requestAnimationFrame(() => {
                        const parentRect = containerElement.current.parentNode.getBoundingClientRect();
                        const childRect = containerElement.current.getBoundingClientRect();
                        const vH = window.innerHeight;
                        const marginTop = vH*0.009;
                        scrollArr.push(childRect.top - parentRect.top - marginTop + topHeight);
                    });
                }
            });
        };
        scrollArrSetting();
        setScrollToMenu(scrollArr);
    };

    const mainElementScroll = () => {
        const mainElement = mainRef.current;
        if (mainElement) {
            mainElement.style.top = `${scrollToMenu[menu]*(-1)}px`;
        };
    };

    useEffect(() => {
        mainElementScroll();
    }, [menu, scrollToMenu]);
    //////


    /// App.js로 Container 컴포넌트의 스크롤 기능을 넘기기위해 사용 ///
    /// 주소창 UI가 on/off되려면 Container의 스크롤을 막아야해서 넘김 ///
    useImperativeHandle(ref, ()=>({
        selectRef: ()=>{
            return menu > 0 ? containerRefs[menu-1] : null;
        }
    }));
    //////


    return (
        <div>
            <Top
                darkModeToggle={props.darkModeToggle}
                selectedProject={selectedProject}
            />
            <Main ref={mainRef}>
                <Profile menu={menu}/>
                <AboutContain menu={menu}/>
                <Container
                    ref={containerRefs[0]}
                    icon={icons[0]}
                    menu={menu}
                    scrollCheck={scrollCheck}
                >
                    <CareerContain />
                </Container>
                <Container
                    ref={containerRefs[1]}
                    icon={icons[1]}
                    menu={menu}
                    scrollCheck={scrollCheck}
                >
                    <ProjectContain
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        projectReset={projectReset}
                        setProjectReset={setProjectReset}
                        containerScrollTop={projectContainerScrollTop}
                    />
                </Container>
                <Container
                    ref={containerRefs[2]}
                    icon={icons[2]}
                    menu={menu}
                    scrollCheck={scrollCheck}
                >
                    <SocialContain selected={menu===3}/>
                </Container>
                <Container
                    ref={containerRefs[3]}
                    icon={icons[3]}
                    menu={menu}
                    scrollCheck={scrollCheck}
                >
                    <BoardContain />
                </Container>
            </Main>
            <Bottom
                setProjectReset={setProjectReset}
                setMenu={setMenu}
                menu={menu}
            />
        </div>
    );
}

export default forwardRef(Wrap);