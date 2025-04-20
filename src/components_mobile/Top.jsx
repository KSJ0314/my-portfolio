import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DarkChangeButton } from "./Button";

const Main = styled.div`
    width: 100%;
    height: calc(var(--vw, 1vw) * 15);
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_menu};
    border-radius: 0 !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 5;
    font-size: 0.6em;
    padding: 0 2%;
    position: fixed;
    top: 0;

    & > div:first-child{
        width: 10vw;
        height: 100%;
    }

    & > img{
        height: 100%;
    }
`;

function Top(props) {
    const icons=[
        "/images/project/myIcon.png",
        "/images/project/starIcon.png",
        "/images/project/whatIcon.png",
        "/images/project/mapleIcon.png",
        "/minimi.png"
    ];
    
    const [icon, setIcon] = useState(icons[4]);
    
    useEffect(()=>{
        var count = 0;
        props.selectedProject.map((selectedProject, index)=>{
            if (!selectedProject) {
                count++;
                return;
            }
            setIcon(icons[index]);
        });
        if (count === 4){
            setIcon(icons[4]);
        }
    }, [props.selectedProject]);

    return (
        <Main>
            <div>
            </div>
            <img
                src={`${process.env.PUBLIC_URL}${icon}`}
            />
            <DarkChangeButton onClick={props.darkModeToggle}/>
        </Main>
    );
}

export default Top;