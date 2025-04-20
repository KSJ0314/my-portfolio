import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
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
    height: 100vw;
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
    height: calc(var(--vw, 1vw) * 52);
    width: 100%;
    overflow: hidden;
    display: flex;
    position: relative;
    transition: all 1s ease;
    ${({theme}) => theme.darkTheme.dark&&'filter: brightness(0.8)'};
`;

function AboutContain(props){
    const [aboutindex, setAboutindex] = useState(0);
    const [indexDelay, setIndexDelay] = useState();
    const [isChanging, setIsChanging] = useState(false);
    const [firstOpen, setFirstOpen] = useState(true);

    useEffect(()=>{
        setAboutindex(0);
    },[props.menu]);

    const [pAboutindex, setPAboutindex] = useState(0);
    const aboutChange = (op)=>{
        setFirstOpen(false);
        setIndexDelay(true);
        startChanging();
        setTimeout(() => {
            setIndexDelay(false);
            setAboutindex((prev)=>{
                setPAboutindex(prev);
                return aboutindex+op;
            });
        }, 1000);
    };

    const About = 
        aboutindex === 0 ? <About0 class={indexDelay?'off':'on'} aboutChange={aboutChange} $firstOpen={firstOpen}/> :
        aboutindex === 1 ? <About1 class={indexDelay?'off':'on'} aboutChange={aboutChange} pAboutindex={pAboutindex}/> :
        aboutindex === 2 && <About2 class={indexDelay?'off':'on'} aboutChange={aboutChange}/>
    ;

    const startChanging = () => {
        setIsChanging(true); 
    };
    
    const changingEnd = () => {
        setIsChanging(false); 
    };

    return (
        <Main>
            {About}
            <Changing
                className={isChanging&&'startChange'}
                onAnimationEnd={changingEnd}
            />
        </Main>
    );
}

export default AboutContain;