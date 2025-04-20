import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ReactDOM from 'react-dom';
import ControlledCarousel from "../ControlledCarousel";
import ProjectMarkdown from "./ProjectMarkdown";

const Outside = styled.div`
    font-size: 2vh !important;
    cursor: auto;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000092;
`;

const Main = styled.div`
    width: ${props=>props.$fullMode?'75vw':'60vw'};
    height: ${props=>props.$fullMode?'95vh':'80vh'};
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_container};
    border-radius: 0.5vw;
    display: flex;
    align-items: center;
    color: ${props=>props.theme.darkTheme.color};
    position: relative;
    font-size: 1.1em;

    & *{
        transition: none !important;
        word-break: keep-all;
    }

    & > div{
        width: 50%;
    }

    & .carouselOnOffButton{
        width: 1vw;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        & button{
            width: 2vw;
            height: 2vw;
            position: absolute;
            background-color: transparent;
            background-size: cover;
            border: none;
            ${props=>props.carouselOff ? css`
                left: -0.5vw;
                background-image: url(${process.env.PUBLIC_URL}/images/rArrow${props.theme.darkTheme.dark && 'W'}.png);
            ` : css`
                left: -1vw;
                background-image: url(${process.env.PUBLIC_URL}/images/lArrow${props.theme.darkTheme.dark && 'W'}.png);
            `}
        }
    }
    
    & > .carouselDiv{
        display: flex;
        justify-content: center;
        flex-shrink: 0;

        ${props=>props.carouselOff && css`
            width: 1% !important;
            margin-right: 5%;
            & *:not(.carouselOnOffButton button){
                width: 1% !important;
            }
        `}
    }
`;

const Close = styled.img`
    position: absolute;
    cursor: pointer;
    border-radius: 0 !important;
    width: 3vw;
    height: 3vw;
    top: 0;
    right: -5vw;
`;

const Description = styled.div`
    height: 95%;
    padding: 2% 2.5% 0 2%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }

    ${props=>props.carouselOff && css`
        width: 100% !important;
        font-size: 1.5em;
        & .skill{
            height: 4vw !important;
        }
    `}
`;

const Title = styled.div`
    margin-bottom: 3%;
    color: ${({theme}) => theme.darkTheme.color5};

    & .title{
        font-size: 2em;
        font-weight: 600;
    }

    & .date{
        font-size: 1em;
        font-weight: 500;
        color: ${({theme}) => theme.darkTheme.color3};
    }
`;

const Summary = styled.div`
    margin-bottom: 4%;
    line-height: 1.2em;
    & span{
        font-weight: 600;
    }
`;
const Detail = styled.ul`
    margin-bottom: 4%;
    padding-left: 3vh;
    & li{
        line-height: 1.2em;
    }
    & li+li{
        margin-top: 0.5em;
    }
`;

const Fringe = styled.div`
    display: flex;
    align-items: center;
    
    & + &{
        margin-top: 4%;
    }

    & div:first-child{
        font-size: 1.3em;
        font-weight: 600;
        width: 25%;
        flex-shrink: 0;
        color: ${({theme}) => theme.darkTheme.color5};

        & img{
            width: 30%;
            margin-right: 5%;
        }
    }

    & a{
        cursor: pointer;
        color: ${({theme}) => theme.darkTheme.color4} !important;
        text-decoration: underline !important;
        display: block;
        line-height: 1.2em;
    }

    & a:hover{
        color: ${({theme}) => theme.darkTheme.color5} !important;
    }

    & li{
        width: 100%;
        margin-left: 35%;
    }

    & .skill{
        display: flex;
        width: 100%;
        height: 3vw;
        flex-wrap: wrap;
        margin-bottom: 0.5vh;
        
        & > img{
            border: 0.2vw double ${({theme}) => theme.darkTheme.bg2} !important;
            border-radius: 0.5vw !important;
            background-color: ${({theme}) => theme.darkTheme.bg_mobile_item};
            padding: 1%;
            height: 100%;
            margin-right: 5%;
        }
    }
`;

const ReadmeButton = styled.button`
    padding: 1% 2%;
    color: ${({theme}) => theme.darkTheme.color2} !important;
    background-color: ${({theme}) => theme.darkTheme.color5};
    border-radius: 0.3vw;
    border: none;

    &:hover {
        opacity: 0.8;
    }
`;

const Line = styled.div`
    margin: 4% 0;
    border-width: 0.1px;
    border-bottom-style: solid;
`;

function Project(props){
    const [index, setIndex] = useState(0);
    const [readmeOn, setReadmeOn] = useState(false);
    const mainRef = useRef();
    const [carouselOff, setCarouselOff] = useState(false);

    const setCarouselToggle = ()=>{
        setCarouselOff(!carouselOff);
    }

    const mainScrollTop = () => {
        const mainElement = mainRef.current;
        if (mainElement) {
            mainElement.scrollTop = 0;
        }
    }

    useEffect(()=>{
        setCarouselOff(window.innerWidth/window.innerHeight < 1.5);
    },[window.innerWidth]);

    const link = (link)=>{
        if(link){
            window.open("about:blank").location.href = link;
        }
    }

    return ReactDOM.createPortal(
        <Outside>
            <Main ref={mainRef} $fullMode={props.fullMode} carouselOff={carouselOff}>
                <div className="carouselDiv">
                    <ControlledCarousel data={props.data} index={index} setIndex={()=>setIndex()}/>
                    <div className="carouselOnOffButton">
                        <button
                            alt="carouselOnOffButton"
                            onClick={setCarouselToggle}
                        />
                    </div>
                </div>
                <Description carouselOff={carouselOff}>
                    <Title>
                        <div className="title">
                            {props.data.title}
                        </div>
                        <div className="date">
                            {props.data.date}
                        </div>
                    </Title>
                    <Summary>
                        {props.data.summary.map((text)=>(
                            <p dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '</br>') }} />
                        ))}
                    </Summary>
                    <Detail>
                        {props.data.detail.map((text)=>(
                            <li dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '</br>') }} />
                        ))}
                    </Detail>
                    <ReadmeButton onClick={()=>{
                        setReadmeOn(true);
                        mainScrollTop();
                    }}>
                        &gt;&gt; ReadMe
                    </ReadmeButton>
                    <Line />
                    <Fringe>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/bulb.png`} />
                            URL
                        </div>
                        <ul>
                            {Object.entries(props.data.url).map(([key, val])=>(
                                <li>
                                    <a onClick={()=>link(val)} title={val}>{key}</a>
                                </li>
                            ))}
                        </ul>
                    </Fringe>
                    <Fringe>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/bulb.png`} />
                            Skill
                        </div>
                        <div className="skill">
                            {props.data.skill.map((skill)=>(
                                <img src={`${process.env.PUBLIC_URL}/images/project/${skill}.png`} title={skill}/>
                            ))}
                        </div>
                    </Fringe>
                </Description>
                {readmeOn&&(
                    <ProjectMarkdown
                        num={props.data.id}
                        setReadmeOn={()=>setReadmeOn(false)}
                    />
                )}
                <Close src={`${process.env.PUBLIC_URL}/images/close.png`} onClick={()=>{
                    props.selectOff();
                    setReadmeOn(false);
                    setIndex(0);
                }} />
            </Main>
        </Outside>, document.body
    );
}

export default Project;