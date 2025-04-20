import React, { useContext } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Toggle = styled.div`
    width: calc(var(--vw, 1vw) * 8);
    height: calc(var(--vw, 1vw) * 8);
    margin-right: calc(var(--vw, 1vw) * 2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    & img{
        height: 100%;
    }
`;

export const DarkChangeButton = (props) =>{
    const isDark = useContext(IsDarkContext);

    return (
        <Toggle onClick={props.onClick}>
            <img src={isDark ? `${process.env.PUBLIC_URL}/images/dark.png` : `${process.env.PUBLIC_URL}/images/light.png`} alt="Dark|Light" />
        </Toggle>
    );
}