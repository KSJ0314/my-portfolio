import React, {useEffect, useState} from "react";
import styled, { keyframes } from "styled-components";
import About0 from "./about/About0";
import About1 from "./about/About1";
import About2 from "./about/About2";

const aboutChange = keyframes`
    0% {
        clip-path: polygon(50% 50%, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0);
    } 5% {
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 0,100% 0, 100% 0, 100% 0, 100% 0, 100% 0, 100% 0);
    } 10% {
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%, 100% 50%,100% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 50%);
    } 15% {
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%,100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%);
    } 20%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%,100% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%);
    } 25%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%,100% 100%, 50% 100%, 0 100%, 0 100%, 0 100%, 0 100%);
    } 30%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%,100% 100%, 50% 100%, 0 100%, 0 50%, 0 50%, 0 50%);
    } 35%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 0 0);
    } 40%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 60%{
        clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 65%{
        clip-path: polygon(50% 50%, 100% 0, 100% 0, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 70%{
        clip-path: polygon(50% 50%, 100% 50%, 100% 50%, 100% 50%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 75%{
        clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 80%{
        clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 85%{
        clip-path: polygon(50% 50%, 0% 100%, 0 100%, 0 100%, 0 100%, 0 100%, 0 100%, 0 50%, 0 0, 50% 0);
    } 90%{
        clip-path: polygon(50% 50%, 0% 50%, 0 50%, 0 50%, 0 50%, 0 50%, 0 50%, 0 50%, 0 0, 50% 0);
    } 95%{
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 0 0, 50% 0);
    } 100%{
        clip-path: polygon(50% 50%, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0);
    }
`;

const Changing = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    clip-path: polygon(50% 50%, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0, 50% 0);
    z-index: 3;
    &.startChange{
        animation: ${aboutChange} 2s linear forwards;
    }
`;

const Main = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    position: relative;
    transition: all 1s ease;
    border-radius: 0.3vw;
    overflow: hidden;
    ${props=>props.$fullMode&&'border-radius: 0 !important'};
    ${props=>props.$fullMode&&'border-left-style: solid; border-right-style: solid; border-color: gray;'};
    background-color: ${props=>props.theme.darkTheme.bg1};
    ${({theme}) => theme.darkTheme.dark&&'filter: brightness(0.8)'};
`;

function AboutContain(props){
    const [indexDelay, setIndexDelay] = useState();
    const [isChanging, setIsChanging] = useState(false);
    const [firstOpen, setFirstOpen] = useState(true);

    useEffect(()=>{
        props.setAboutindex(0);
    },[]);
    
    const [pAboutindex, setPAboutindex] = useState(0);
    const aboutChange = (op)=>{
        setFirstOpen(false);
        setIndexDelay(true);
        startChanging();
        setTimeout(() => {
            setIndexDelay(false);
            props.setAboutindex((prev)=>{
                setPAboutindex(prev);
                return props.aboutindex+op;
            });
        }, 1000);
    };

    const About = 
        props.aboutindex === 0 ? <About0 class={indexDelay?'off':'on'} $fullMode={props.$fullMode} aboutChange={aboutChange} $firstOpen={firstOpen}/> :
        props.aboutindex === 1 ? <About1 class={indexDelay?'off':'on'} $fullMode={props.$fullMode} aboutChange={aboutChange} pAboutindex={pAboutindex}/> :
        props.aboutindex === 2 && <About2 class={indexDelay?'off':'on'} $fullMode={props.$fullMode} aboutChange={aboutChange}/>
    ;

    const startChanging = () => {
        setIsChanging(true); 
    };
    
    const changingEnd = () => {
        setIsChanging(false); 
    };

    return (
        <Main $fullMode={props.$fullMode}>
            {About}
            <Changing
                className={isChanging&&'startChange'}
                onAnimationEnd={changingEnd}
            />
        </Main>
    );
}

export default AboutContain;