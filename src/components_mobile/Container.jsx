import React, { forwardRef, useEffect, useRef, useImperativeHandle, useContext, useState } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Main = styled.div`
    width: 100%;
    height: calc((${props=>props.vh}px * 98.2) - (var(--vw, 1vw) * 30));
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_container};
    padding: calc(var(--vw, 1vw) * 3) calc(var(--vw, 1vw) * 5) calc(var(--vw, 1vw) * 7);
    position: relative;
    overflow: hidden;
`;

const Icon = styled.div`
    width: calc(var(--vw, 1vw) * 13);
    height: calc(var(--vw, 1vw) * 13);
    margin: auto;
    margin-bottom: calc(var(--vw, 1vw) * 3);
    display: flex;
    justify-content: center;
    align-items: center;
    border: calc(var(--vh, 1vh) * 0.4) solid ${({theme}) => theme.darkTheme.bg_mobile_icon} !important;
    border-radius: 1.5vh !important;
    background-color: ${({theme}) => theme.darkTheme.bg4};

    & img{
        height: 70%;
    }
`;



function Container(props, ref) {
    const containerRef = useRef();
    const isDark = useContext(IsDarkContext);

    const containerScrollTop = () => {
        const containerElement = containerRef.current;
        if (containerElement) {
            containerElement.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    useEffect(()=>{
        containerScrollTop();
    }, [props.menu]);

    useImperativeHandle(ref, () => ({
        current: containerRef.current,
        containerScrollTop: () => containerScrollTop()
    }));


    const [vh, setVh] = useState(); 
    useEffect(()=>{
        const resize = () =>{
            setVh(window.innerHeight * 0.01);
            props.scrollCheck();
        };
        resize();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);
    useEffect(()=>{
        props.scrollCheck();
    }, [vh]);

    return(
        <Main ref={containerRef} vh={vh}>
            <Icon>
                <img
                    src={`${process.env.PUBLIC_URL}/images/menu/${props.icon}${isDark ? 'SD' : 'S'}.png`}
                />
            </Icon>
            {props.children}
        </Main>
    );
}

export default forwardRef(Container);