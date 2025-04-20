import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { fetchVisitorCount } from "../visitorCounter";
import Pdf from "./Pdf";

const Main = styled.div`
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_container};
    width: 100%;
    height: calc(var(--vw, 1vw) * 50);
    padding: calc(var(--vw, 1vw) * 5) calc(var(--vw, 1vw) * 5) 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    & > div:first-child{
        height: 66.6%;
    }
    & > div{
        display: flex;
    }

    & .name{
        font-size: 1.6em;
        color: ${({theme}) => theme.darkTheme.color4} !important;
    }

    & span{
        font-size: 0.8em;
        & .today{
            font-size: 1em;
            color: ${({theme}) => theme.darkTheme.color5} !important;
        }
    }
`;

const ProfileImage = styled.div`
    border-radius: 30% !important;
    flex-shrink: 0;
    overflow: hidden;
    margin-right: calc(var(--vw, 1vw) * 5);
    
    & > img{
        width: calc(var(--vw, 1vw) * 30) !important;
        height: calc(var(--vw, 1vw) * 30) !important;
    }
`;

const Intro = styled.div`
    width: 100%;
    height: 22.2% !important;
    margin-bottom: calc(var(--vw, 1vw) * 3);
    overflow-x: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }

    & img{
        border: 0.3vh solid ${({theme}) => theme.darkTheme.bg2} !important;
        border-radius: calc(var(--vw, 1vw) * 2) !important;
        background-color: ${({theme}) => theme.darkTheme.bg_mobile_tech};
        padding: calc(var(--vw, 1vw) * 1);
        height: 100%;
        margin: 0 1vw;
    }
`;


function Profile(props) {
    const containerRef = useRef();
    const containerScrollTop = () => {
        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
        }
    }
    useEffect(()=>{
        containerScrollTop();
    }, [props.menu]);

    const skills=[
        "React",
        "Firebase",
        "Java",
        "JSP",
        "HTML",
        "CSS",
        "JavaScript",
        "jQuery",
        "MySQL",
        "OracleDB",
        "API",
        "Figma",
        "Bootstrap"
    ];


    /// 방문자 수 데이터를 파이어베이스에서 가져와서 표시 ///
    const [todayVisitors, setTodayVisitors] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);

    useEffect(()=>{
        fetchVisitorCount().then(({todayVisitors, totalVisitors})=>{
            setTodayVisitors(todayVisitors);
            setTotalVisitors(totalVisitors);
        });
    },[]);
    //////
    

    return(
        <Main>
            <Pdf />
            <div>
                <ProfileImage>
                    <img src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="profile" />
                </ProfileImage>
                <div>
                    <div>
                        Today.. <span><span className="today">{todayVisitors}</span> | {totalVisitors}</span>
                    </div>
                    <div className="name">
                        김소중
                    </div>
                    <div>
                        안되면 될 때 까지! 집요한 개발자 김소중입니다
                    </div>
                </div>
            </div>
            <Intro ref={containerRef}>
                {skills.map((skill)=>(
                    <img src={`${process.env.PUBLIC_URL}/images/project/${skill}.png`} title={skill} />
                ))}
            </Intro>
        </Main>
    );
}

export default (Profile);