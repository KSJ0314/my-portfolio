import React, { useEffect, useState } from "react";
import styled, {css, keyframes} from "styled-components";

const Main = styled.div`
    width: 100%;
    animation-fill-mode: forwards;
    background-image: url(${props=>props.url});
    background-size: 105% 105%;
    background-position: center;
    position: relative;
`;

const blink = keyframes`
    0%{
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;

const on = keyframes`
    100% {
        opacity: 1;
    }
`;

const TextBox = styled.div`
    width: 60%;
    height: 32%;
    background-color: white;
    border: 0.5vh double ${props => props.theme.darkTheme.bg2} !important;
    border-radius: 1vh;
    position: absolute;
    top: 22%;
    left: 40%;
    transform: translate(-50%, -50%);
    white-space: pre-line; /* \n 적용을 위해 사용 */
    display: flex;
    justify-content: center;
    align-items: end;
    text-align: center;
    opacity: 0;
    animation: ${on} 0.25s 1s linear forwards;

    & > .whiteBox{
        position: relative;
        width: 80%;
        height: 100%;
        background-color: white;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > img{
        width: 10%;
        height: 25%;
        opacity: 0;
        cursor: pointer;
        display: none;
        position: absolute;
        bottom: 0;
        
        &.left{
            left: 0;
        }
        &.right{
            right: 0;
        }
        &.end{
            display: block;
            animation: ${blink} 1s infinite;
        }
    }
    
    & .text{
        color: black !important;
        font-weight: 500;
        ${props => props.textIndex !== 0 && 'font-size: 0.8em;'}
        position: relative;
        padding: 0.5vw 0;
    }

    & .text::after{
        content: "|";
        animation: ${blink} 1s infinite;
    }
`;

const Ballon = styled.div`
    width: 40%;
    height: 90%;
    position: absolute;
    top: 55%;
    left: 80%;
    transform: translate(-50%, -50%) rotateY(75deg);
`;
const Ballon2 = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    transform: rotateZ(45deg);
    border-right: 1.2vh double ${props => props.theme.darkTheme.bg2} !important;
    border-bottom: 1.2vh double ${props => props.theme.darkTheme.bg2} !important;
    background-color: white;
    clip-path: polygon(0% 100%, 100% 100%, 100% 0);
`;

const blinkF = keyframes`
    10% {
        filter: brightness(100%);
    }
    100% {
        filter: brightness(100%);
    }
`;
const blinkFUp = keyframes`
    10% {
        filter: brightness(100%);
    }
    20% {
        filter: brightness(50%);
    }
    30% {
        filter: brightness(100%);
    }
    100%{
        filter: brightness(100%);
    }
`;

const Door = styled.div`
    width: 8%;
    height: 43%;
    position: absolute;
    top: ${props=>props.top}%;
    left: ${props=>props.left}%;
    z-index: 1;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 82%);
    border-radius: 0;

    &:hover{
        cursor: pointer;
    }

    & > img{
        width: 50%;
        position: absolute;
        top: 2%;
        left: ${props=>props.fl}%;
        filter: brightness(50%);
        animation: ${blinkF} 1.5s 2.8s linear forwards;
        ${props => props.up && css`
            animation: ${blinkFUp} 1.5s 2.8s linear infinite;
        `}
    }
`;

function About1(props) {
    const text = [
        "개발은 끝이 없다!",
        "배울수록 배울게 많은 개발!\n끝 없는 성장을 위해\n꾸준히 노력하겠습니다."
    ];
    const [displayText, setDisplayText] = useState('');
    const [textEnd, setTextEnd] = useState(false);
    const [textIndex, setTextIndex] = useState(0);
    const [firstOpen, setFirstOpen] = useState(true);
    let timeoutId;

    const textChange = () => {
        setTextEnd(false);
        setDisplayText('');
        let currentIndex = 0;
        timeoutId = setTimeout(() => {
            setFirstOpen(false);
            const intervalId = setInterval(() => {
                const textLength = text[textIndex].length;
                if (currentIndex <= textLength) {
                    setDisplayText(text[textIndex].substring(0, currentIndex));
                    currentIndex++;
                } else {
                    setTimeout(() => {setTextEnd(true);}, 200);
                    clearInterval(intervalId);
                }
            }, 80);
            
            return () => {
                setTextEnd(true);
                clearInterval(intervalId);
            }
        }, firstOpen ? 1200 : 200);
    };
    
    useEffect(() => {
        textChange();
        return () => clearTimeout(timeoutId);
    }, [textIndex]);


    return(
        <Main
            className={props.class}
            fullMode={props.fullMode}
            url={`${process.env.PUBLIC_URL}/images/cyworld1.png`}
        >
            <TextBox textIndex={textIndex}>
                <img
                    src={`${process.env.PUBLIC_URL}/images/lArrow.png`}
                    className={(textEnd&&textIndex!==0)?'end left':''}
                    onClick={()=>setTextIndex(textIndex-1)}
                />
                <div className="whiteBox">
                    <div className="text">
                        {displayText}
                    </div>
                </div>
                <img
                    src={`${process.env.PUBLIC_URL}/images/rArrow.png`}
                    className={(textEnd&&textIndex!==text.length-1)?'end right':''}
                    onClick={()=>setTextIndex(textIndex+1)}
                />
                <Ballon>
                    <Ballon2/>
                </Ballon>
            </TextBox>
            <Door
                onClick={()=>props.aboutChange(-1)}
                top = "28"
                left = "73.5"
                fl = "30"
                up = {props.pAboutindex === 2}
            >
                <img src={`${process.env.PUBLIC_URL}/images/downF.png`} alt="downF" />
            </Door>
            <Door
                onClick={()=>props.aboutChange(1)}
                top = "39"
                left = "85.5"
                fl = "28"
                up = {props.pAboutindex === 0}
            >
                <img src={`${process.env.PUBLIC_URL}/images/upF.png`} alt="upF" />
            </Door>
        </Main>
    );
}

export default About1;