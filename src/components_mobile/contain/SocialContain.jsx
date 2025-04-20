import React, { useState } from "react";
import socials from "../../data/social.json";
import styled, { css, keyframes } from "styled-components";

const Main = styled.div`
    width: 100%;
    height: calc(100% - (var(--vw, 1vw) * 16));
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
    @media (max-aspect-ratio: 0.673) {
        flex-direction: column;
    }
    font-size: 1em;
    @media (min-aspect-ratio: 0.57) {
        font-size: 0.9em;
    }
    @media(min-aspect-ratio: 0.69) {
        font-size: 0.8em;
    }
`;

const bounce = keyframes`
    5% {
        top: 0;
    } 10% {
        top: 5%;
    } 15% {
        top: 0;
    } 20% {
        top: 5%;
    }
`;

const Social = styled.div`
    position: relative;
    width: calc(var(--vw, 1vw) * 70);
    height: calc(var(--vw, 1vw) * 60);
    
    @media (max-aspect-ratio: 0.5) {
        width: calc(var(--vw, 1vw) * 75);
        height: calc(var(--vw, 1vw) * 63);
    }
    @media (min-aspect-ratio: 0.673) {
        width: calc(var(--vw, 1vw) * 38);
        height: calc(var(--vw, 1vw) * 55);
        font-size: 0.8em;
    }
    @media (min-aspect-ratio: 0.8) {
        font-size: 0.7em;
    }
    
    &:hover > div{
        .a{
            color: ${({theme}) => theme.darkTheme.color5} !important;
            text-decoration: underline !important;
        }
    }

    & > div {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 90%;
        top: 5%;
        background-color: ${props=>props.theme.darkTheme.bg_mobile_item};
        border: calc(var(--vh, 1vh) * 0.5) solid ${props=>props.theme.darkTheme.bg11} !important;
        border-radius: calc(var(--vh, 1vh) * 3) !important;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        align-items: center;
        @media (min-aspect-ratio: 0.673) {
            flex-direction: column;
        }

        ${props => !props.click && props.selected && css`
            animation: ${bounce} 3s;
            animation-delay: 2s;
            animation-iteration-count: 2;
        `}

        & > img {
            display: block;
            width: 30%;
            flex-shrink: 0;
            margin: 0 5%;
        }

        & .a{
            color: ${({theme}) => theme.darkTheme.color4} !important;
            font-size: 0.9em;
            display: block;
            line-height: 1.5em;
            text-align: center;
            transition: none;
            top: 5%;
            @media (min-aspect-ratio: 0.673) {
                margin-top: 5%;
            }
            @media (max-aspect-ratio: 0.673) {
                position: absolute;
            }
        }

        & ul{
            font-size: 0.7em;
            width: 80%;
            padding-right: 6%;
            margin: 5% 0 0 5%;
            white-space: pre-wrap;
            word-break: keep-all;
            line-height: 1.2em;

            & li+li{
                margin-top: 0.5em;
            }
        }
    }
`;

function SocialContain(props){
    const [click, setClick] = useState([false, false]);

    const link = (link, index)=>{
        setClick((prevClick)=>{
            const clickArr = [...prevClick];
            clickArr[index] = true;
            return clickArr;
        });
        if(link){
            window.open("about:blank").location.href = link;
        }
    }

    return (
        <Main>
            {socials.map((social, index)=>
                <Social
                    key={index}
                    index={index}
                    click={click[index]}
                    selected={props.selected}
                >
                    <div onClick={()=>link(social.link, index)}>
                        <img src={`${process.env.PUBLIC_URL}${social.img}`} />
                        <div className="a">{social.link}</div>
                        <ul>
                            {social.description.map((text)=>(
                                <li>{text}</li>
                            ))}
                        </ul>
                    </div>
                </Social>
            )}
        </Main>
    );
}

export default SocialContain;