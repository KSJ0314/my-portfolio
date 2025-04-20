import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LinkButton } from "./Button";
import AboutContain from "./contain/AboutContain";
import ProjectContain from "./contain/ProjectContain";
import CareerContain from "./contain/CareerContain";
import SocialContain from "./contain/SocialContain";
import BoardContain from "./contain/BoardContain";

const Main = styled.div`
    width: ${props=>props.size.width}px;
    height: ${props=>props.size.height}px;
    position: fixed;
    top: ${props=>props.position.top}px;
    left: ${props=>props.position.left}px;
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: none;
    overflow: hidden;
    
    &.fullMode{
        background-color: ${props=>props.theme.darkTheme.bg1};
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        transition: 0.3s;
        border-radius: 0 !important;
        border-style: none;
    }
`;

const Page = styled.div`
    width: ${props=>props.size.width}px;
    height: ${props=>props.size.height}px;
    display: flex;
    justify-content: center;
    transition: none;
    background-color: ${props=>props.theme.darkTheme.bg1};
    
    &.fullMode{
        transform: scaleX(${props =>0.82*props.fullsize.width/props.size.width}) scaleY(${props =>props.fullsize.height/props.size.height});
        transition: 0.3s;
        border-radius: 0 !important;
        border-style: none;
    }
`;

const Link = styled.div`
    position: absolute;
    transition: none;
    width: 13vh;
    height: 90%;
    top: 5%;
    left: 99.8%;

    &.fullMode{
        transition: 0.3s;
        background-color: #00000020;
        position: fixed;
        top: 0;
        left: -8.5%;
        width: 9%;
        height: 100%;
        border-right-style: solid;
        border-color: ${({theme}) => theme.darkTheme.bd1};
        border-radius: 0 !important;
        z-index: 10 !important;
    }
    
    &.fullMode:hover{
        left: -0.5%;
    }

`;

const FullButton = styled.div`
    width: 5.5vw;
    height: 2.5vw;
    position: fixed;
    bottom: calc(6vh + 2.5vw);
    right: 2vw;
    border: none;
    cursor: pointer;
    background-color: ${props=>props.theme.darkTheme.dark?'#AAAAAA':'#FFCA42'};
    border-top-left-radius: 5000px !important;
    border-bottom-left-radius: 5000px !important;
    border-top-right-radius: 5000px !important;
    border-bottom-right-radius: 5000px !important;
    font-size: 0.9vw !important;
    font-weight: 700;
    color: ${props=>props.theme.darkTheme.dark?'black':'white'} !important;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;

`;

const FullfalseButton = styled.div`
    position: fixed;
    top: 1.5vw;
    right: 2vw;
    font-size: 1.5vw;
    cursor: pointer;
    z-index: 10;
    color: ${props=>props.theme.darkTheme.dark?'white':'black'} !important;
    ${props=>props.$fullMode?'':'display: none;'}
`;

const linkes = [
    'About',
    'Project',
    'Career',
    'Social',
    'Board'
];

function Container(props) {
    const [page, setPage] = useState('About');
    const [fullMode, setFullMode] = useState();
    const [modeChanged, setModeChanged] = useState();
    const [fullsize, setFullsize] = useState({ width: 0, height: 0 });
    const [aboutindex, setAboutindex] = useState(0);

    const pageChange = (link) => {
        setPage(link);
    }

    const pages = 
        page === 'About' ? <AboutContain $fullMode={fullMode} aboutindex={aboutindex} setAboutindex={setAboutindex} /> :
        page === 'Project' ? <ProjectContain fullMode={fullMode} size={props.size} /> :
        page === 'Career' ? <CareerContain /> :
        page === 'Social' ? <SocialContain size={props.size} /> :
        page === 'Board' && <BoardContain />
    ;

    useEffect(()=>{
        const handleResize = () => {
            setFullsize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        
        setTimeout(() => {
            handleResize();
        }, 1);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const fullModeToggle = () => {
        if (fullMode){
            setFullMode(false);
        } else {
            setFullMode(true);
        }
    };

    return (
        <>
        <Main
            position={props.position}
            size={props.size}
            className={modeChanged&&(fullMode&&'fullMode')}
            fullsize={fullsize}
        >
            <Page
                className={modeChanged&&(fullMode&&'fullMode')}
                size={props.size}
                fullsize={fullsize}
            >
                {pages}
            </Page>
        </Main>
        <Link
            className = {fullMode&&'fullMode'}
        >
            {linkes.map((link, index) => (
                <LinkButton
                    key = {index}
                    onClick = { ()=>pageChange(link) }
                    className = {
                        fullMode ? 'fullMode' :
                        link === page && 'selected'
                    }
                    $about = {index===0}
                    aboutindex = {aboutindex}
                >
                    {link}
                </LinkButton>
            ))}
        </Link>
        <FullButton
            onClick={()=>{
                fullModeToggle();
                setModeChanged(true);
            }}
        >FullMode</FullButton>
        <FullfalseButton
            onClick={()=>fullModeToggle()}
            $fullMode={fullMode}
        >X</FullfalseButton>
        </>
    );
}

export default Container;