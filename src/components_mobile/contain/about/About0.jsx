import React, { useEffect, useState } from "react";
import styled, {keyframes} from "styled-components";

const Main = styled.div`
    width: 100%;
    animation-fill-mode: forwards;
    background-image: url(${props=>props.url});
    background-size: 105% 105%;
    background-position: center;
    position: relative;
`;

const blink = keyframes`
    50% {
        opacity: 0;
    }
`;

const on = keyframes`
    100% {
        opacity: 1;
    }
`;

const TextBox = styled.div`
    width: 50%;
    height: 30%;
    background-color: white;
    border: 0.5vh double ${props => props.theme.darkTheme.bg2} !important;
    border-radius: 1vh;
    position: absolute;
    top: 30%;
    left: 62%;
    transform: translate(-50%, -50%);
    white-space: pre-line;
    display: inline-block;
    text-align: center;
    opacity: 0;
    animation: ${on} 0.25s ${props=> props.$firstOpen ? '':'1s'} linear forwards;

    & > .whiteBox{
        position: relative;
        height: 100%;
        background-color: white;
        border-radius: 1vh;
        z-index: 3;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    & .text{
        color: black !important;
        font-weight: 500;
        position: relative;
        padding: 0.5vw 0;
    }

    & .text::after{
        content: "|"; /* 커서를 수직 바(|)로 나타냅니다. */
        animation: ${blink} 1s infinite;
    }
`;

const Ballon = styled.div`
    width: 40%;
    height: 150%;
    position: absolute;
    top: 55%;
    left: 50%;
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
    100% {
        filter: brightness(100%);
    }
`;

const Door = styled.div`
    width: 8.5%;
    height: 44%;
    position: absolute;
    top: 26%;
    left: 18%;
    z-index: 1;
    clip-path: polygon(0 0, 100% 0, 100% 82%, 0 100%);

    &:hover{
        cursor: pointer;
    }

    & > img{
        width: 50%;
        position: absolute;
        top: 1%;
        left: 26%;
        filter: brightness(50%);
        animation: ${blinkF} 0.2s ${props=> props.$firstOpen ? '2.2s':'3.2s'} linear forwards;
    }
`;

const Help = styled.div`
    position: absolute;
    top: 8%;
    left: 25.5%;
    z-index: 1;
    text-decoration: underline 0.1vw;
    opacity: 0;
    color: black !important;
    animation: ${on} 0.2s ${props=> props.$firstOpen ? '2.2s':'3.2s'} linear forwards;
    ${props=> props.$firstOpen?'':'display:none;'}

    & .border{
        width: 75%;
        border-bottom: 0.15vw solid black !important;
        position: absolute;
        top: 144%;
        left: -11%;
        transform: rotateZ(-55deg);
    }
`;

function About0(props) {
    const text = "저의 포트폴리오에 오신걸\n 환영합니다!";
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let currentIndex = 0;
        const textLength = text.length;

        const timeoutId = setTimeout(() => {
            const intervalId = setInterval(() => {
                if (currentIndex <= textLength) {
                    setDisplayText(text.substring(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                }
            }, 80);
        
            return () => clearInterval(intervalId);
        }, props.$firstOpen ? 200 : 1200);

        return () => clearTimeout(timeoutId);
    }, []);

    return(
        <>
            <Main
                className={props.class}
                $fullMode={props.$fullMode}
                url={`${process.env.PUBLIC_URL}/images/cyworld.png`}
            >
                <TextBox $firstOpen={props.$firstOpen}>
                    <div className="whiteBox">
                        <div className="text">
                            {displayText}
                        </div>
                    </div>
                    <Ballon>
                        <Ballon2/>
                    </Ballon>
                </TextBox>
                <Door
                    $firstOpen={props.$firstOpen}
                    onClick={()=>props.aboutChange(1)}
                >
                    <img src={`${process.env.PUBLIC_URL}/images/upFH.png`} alt="upF" />
                </Door>
                <Help $firstOpen={props.$firstOpen}>
                    Click!
                    <div className="border"></div>
                </Help>
            </Main>
        </>
    );
}

export default About0;