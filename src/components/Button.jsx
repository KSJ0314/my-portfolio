import React, { useContext } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Dark = styled.div`
    width: 5.5vw;
    height: 2.5vw;
    position: fixed;
    bottom: 5vh;
    right: 2vw;
    border: none;
    cursor: pointer;
    background-color: ${props=>props.theme.darkTheme.dark ?'#AAAAAA':'#FFCA42'};
    border-top-left-radius: 5000px !important;
    border-bottom-left-radius: 5000px !important;
    border-top-right-radius: 5000px !important;
    border-bottom-right-radius: 5000px !important;
    z-index: 4;
`;

const Toggle = styled.div`
    position: absolute;
    width: 2vw;
    height: 2vw;
    top: 0.25vw;
    left: ${props=>props.$isDark?'3.25vw':'0.25vw'};
    border-radius: 50% !important;
    background-color: ${props=>props.theme.darkTheme.dark ?'black':'white'};
    display: flex;
    align-items: center;
    justify-content: center;

    & img{
        height: 75%;
    }

    & div{
        position: absolute;
        left: ${props=>props.theme.darkTheme.dark ?'-120%':'120%'};
        font-weight: 700;
        font-size: 0.9vw;
        color: ${props=>props.theme.darkTheme.dark ?'black':'white'};
    }

`;

const Link = styled.button`
    width: 100%;
    height: 10%;
    margin-bottom: 10%;
    border-radius: 0 4% 4% 0 / 0 10% 10% 0 !important;
    flex-shrink: 0;
    font-size: 1.2em;
    background-color: ${({theme}) => theme.darkTheme.bg5};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    color: white !important;
    cursor: pointer;
    
    &.selected{
        border-left: none;
        background-color : ${({theme}) => theme.darkTheme.bg1} !important;
        color: ${({theme}) => theme.darkTheme.color} !important;
        ${props => props.$about && (
            props.aboutindex === 0 ? 'background-color: rgb(249,249,249) !important;' :
            props.aboutindex === 1 ? 'background-color: rgb(211,235,235) !important;' :
            'background-color: rgb(254,247,239) !important;'
        )}
        ${props => props.$about && props.theme.darkTheme.dark&&'filter: brightness(0.8);'}
        ${props => props.$about && 'color: black !important;'}
        position: relative;
        z-index: 3;
    }

    &.fullMode{
        border: none;
        background-color: transparent;
        color: ${({theme}) => theme.darkTheme.color} !important;
    }
`;

export const DarkChangeButton = (props) =>{
    const isDark = useContext(IsDarkContext);

    return (
        <Dark onClick={props.onClick}>
            <Toggle $isDark={isDark}>
                <img src={isDark ? `${process.env.PUBLIC_URL}/images/dark.png` : `${process.env.PUBLIC_URL}/images/light.png`} alt="Dark|Light" />
                <div>{isDark?'Dark':'Light'}</div>
            </Toggle>
        </Dark>
    );
}

export const LinkButton = (props) => {
    return (
        <Link
            onClick={props.onClick}
            className={props.className}
            $about = {props.$about}
            aboutindex = {props.aboutindex}
            page = {props.page}
        >
            {props.children}
        </Link>
    );
}