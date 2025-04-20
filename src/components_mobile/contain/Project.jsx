import React, { useContext, useState } from "react";
import styled from "styled-components";
import ControlledCarousel from "../ControlledCarousel";
import ProjectMarkdown from "./ProjectMarkdown";
import { IsDarkContext } from "../../context/IsDarkContext";

const Main = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: ${props=>props.theme.darkTheme.bg_mobile_container};
    color: ${props=>props.theme.darkTheme.color} !important;

    & *{
        transition: none !important;
    }


    & > div{
        width: 90%;
        margin-bottom: 4%;
    }
    
    & > div:first-child{
        display: flex;
        justify-content: center;
        flex-shrink: 0;
    }
`;

const Close = styled.div`
    position: absolute;
    border-radius: 0 !important;
    width: calc(var(--vw, 1vw) * 6);
    height: calc(var(--vw, 1vw) * 6);
    top: 0;
    right: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: end;
    margin: 3vw;
    
    & > img {
        cursor: pointer;
        height: 100%;
    }
`;

const Description = styled.div`
    height: 90%;
    padding: 2% 2.5% 2% 2%;
`;

const Title = styled.div`
    margin-bottom: 3%;
    
    & .title{
        font-size: 2em;
        font-weight: 600;
        color: ${({theme}) => theme.darkTheme.color5} !important;
    }

    & .date{
        font-size: 1em;
        font-weight: 500;
        color: ${({theme}) => theme.darkTheme.color3} !important;
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
    padding-left: 5vw;
    & li{
        line-height: 1.2em;
    }
    & li+li{
        margin-top: 0.5em;
    }
`;

const Additional = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 4%;

    & div:first-child{
        font-size: 1.3em;
        font-weight: 600;
        width: 25%;
        flex-shrink: 0;
        color: ${({theme}) => theme.darkTheme.color5} !important;

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
        line-height: 1.5em;
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
        flex-wrap: wrap;
        
        & > img{
            border: 0.3vh solid ${({theme}) => theme.darkTheme.bg2} !important;
            border-radius: 1vh !important;
            background-color: ${({theme}) => theme.darkTheme.bg_mobile_tech};
            padding: 1%;
            height: 10vw;
            margin: 2.5%;
        }
    }
`;

const ReadmeButton = styled.button`
    padding: 1% 2%;
    color: ${({theme}) => theme.darkTheme.color2} !important;
    background-color: ${({theme}) => theme.darkTheme.color5};
    border-radius: 0.3vh;
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
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [readmeOn, setReadmeOn] = useState(false);
    const isDark = useContext(IsDarkContext);

    const link = (link)=>{
        if(link){
            window.open("about:blank").location.href = link;
        }
    }

    return(
        <>
            <Close onClick={()=>{
                props.selectOff();
                setReadmeOn(false);
                setCarouselIndex(0);
            }}>
                <img src={`${process.env.PUBLIC_URL}/images/close${isDark?'':'D'}.png`}/>
            </Close>
            <Main>
                <div>
                    <ControlledCarousel data={props.data} index={carouselIndex} setIndex={()=>setCarouselIndex()}/>
                </div>
                <Description>
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
                        props.containerScrollTop();
                        setReadmeOn(true);
                    }}>
                        &gt;&gt; ReadMe
                    </ReadmeButton>
                    <Line />
                    <Additional>
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
                    </Additional>
                    <Additional>
                        <div>
                            <img src={`${process.env.PUBLIC_URL}/images/bulb.png`} />
                            Skill
                        </div>
                        <div className="skill">
                            {props.data.skill.map((skill)=>(
                                <img src={`${process.env.PUBLIC_URL}/images/project/${skill}.png`} title={skill}/>
                            ))}
                        </div>
                    </Additional>
                </Description>
                {readmeOn&&(
                    <ProjectMarkdown
                        num={props.data.id}
                        setReadmeOn={()=>setReadmeOn(false)}
                    />
                )}
            </Main>
        </>
    );
}

export default Project;