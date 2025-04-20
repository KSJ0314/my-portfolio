import React, {useState, useEffect, useRef, useLayoutEffect} from "react";
import styled, { css } from "styled-components";
import Profile from "./Profile";
import Title from "./Title";
import ContainerOutside from "./ContainerOutside";
import { DarkChangeButton } from "./Button";
import YTPlayer from "./YTPlayer";
import Pdf from "./Pdf";

const Main = styled.div`
    font-size: 2vh !important;
    overflow: hidden;

    @media (max-aspect-ratio: 1.54) {
        font-size: 1.7vh !important;
    }
    
    & *{
        border-width: 0.1px;
        border-radius: 0.5vw;
    }
`;

const Background_col = styled.div`
    background: repeating-linear-gradient(
        to right,
        ${({theme}) => theme.darkTheme.bg_l1},
        0.1vw,
        ${({theme}) => theme.darkTheme.bg_l2} 0,
        ${({theme}) => theme.darkTheme.bg_l2} 1.4vw
    );
    width: 100vw;
    height: 100vh;
    border-radius: 0;
`;

const Background_row = styled.div`
    background: repeating-linear-gradient(
        to bottom,
        ${({theme}) => theme.darkTheme.bg_l1},
        0.1vw,
        transparent 0,
        transparent 1.4vw
    );
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0;
`;

const SolidBox = styled.div`
    background-color: ${({theme}) => theme.darkTheme.bg1};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 90%;
    padding: 1vw;
`;

const DottedBox = styled.div`
    border-style: dotted;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1vw;
`;

const MainBox = styled.div`
    background-color: ${({theme}) => theme.darkTheme.bg2};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    width: 100%;
    height: 100%;
    padding: 1.5vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: end;

    & *:not(pre, code, span) {
        color: ${({theme}) => theme.darkTheme.color};
    }

    ${props=> props.profileClose && css`
        & > div:nth-child(1),
        & > div:nth-child(3){
            width: 95% !important;
        }
        & > div:nth-child(2){
            width: 1% !important;
            & div{
                transform: scaleX(0);
            }
        }
    `}

`;

function Wrap(props) {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const mainRef = useRef();

    useLayoutEffect(() => {
        const handleResize = () => {
            const mainElement = mainRef.current;
            if (mainElement) {
                setSize({
                    width: mainElement.offsetWidth,
                    height: mainElement.offsetHeight
                });
            }
        };
        
        requestAnimationFrame(() => {
            handleResize();
        });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [profileClose, setProfileClose] = useState();
    useEffect(()=>{
        setProfileClose(window.innerWidth/window.innerHeight < 1.5);
    },[window.innerWidth]);
    const profileCloseToggle = () => {
        if (profileClose){
            setProfileClose(false);
        } else {
            setProfileClose(true);
        }
    };


    return (
        <Main>
            <Pdf />
            <YTPlayer />
            <Background_col>
                <Background_row>
                    <DarkChangeButton onClick={props.darkModeToggle}/>
                    <SolidBox>
                        <DottedBox>
                            <MainBox ref={mainRef} profileClose={profileClose}>
                                <Title mainsize={size}/>
                                <Profile mainsize={size} profileCloseToggle={profileCloseToggle} profileClose={profileClose}/>
                                <ContainerOutside mainsize={size}/>
                            </MainBox>
                        </DottedBox>
                    </SolidBox>
                </Background_row>
            </Background_col>
        </Main>
    );
}

export default Wrap;