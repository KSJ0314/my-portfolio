import React, { useState } from "react";
import styled, { css } from "styled-components";
import projectJson from "../../data/pject.json";
import Project from "./Project";

const Main = styled.div`
    width: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }

    display: grid;
    ${props =>
        (props.size.width*1.5 < props.size.height) ? css`
            grid-template-columns: 1fr;
            font-size: 2em;
            padding: 10% !important;
        ` : (props.size.width < props.size.height) ? css`
            grid-template-columns: repeat(2, 1fr);
            font-size: 0.9em;
        ` : css`
            grid-template-columns: repeat(3, 1fr);
            font-size: 1.3em;
        `
    };
    grid-auto-rows: min-content;
    align-items : center;
    grid-gap: 5% 2.5%;
    padding: 5%;
`;

const Icon = styled.div`
    width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 0.2vw solid ${({theme}) => theme.darkTheme.bg2} !important;
    border-radius: 2vw !important;
    padding: 0.2vw;

    & > img{
        border: 0.2vw solid ${({theme}) => theme.darkTheme.bg2} !important;
        background-color: ${({theme}) => theme.darkTheme.bg_mobile_container};
        border-radius: 1.8vw !important;
        width: 100%;
        display: block;
        padding: 5%;
        border-radius: 0;
    }

    & > .title{
        height: 30%;
        position: absolute;
        color: ${props=>props.theme.darkTheme.color2};
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: -30%;
        width: 90%;
        left: 5%;
    }
    
    &:hover > .title{
        background-color: ${props => props.theme.darkTheme.bg_pro_hov};
        bottom: 10%;
    }
`;


function ProjectContain(props){
    const [isSelected, setIsSelected] = useState([false,false,false,false]);

    const selectOn = (index) => {
        let newArr = [...isSelected];
        newArr[index] = true;
        setIsSelected(newArr);
    };
    const selectOff = (index) => {
        let newArr = [...isSelected];
        newArr[index] = false;
        setIsSelected(newArr);
    };

    return (
        <Main size={props.size}>
            {projectJson.map((project, index)=>(
                <>
                    <Icon onClick={()=>selectOn(index)}>
                        <img src={`${process.env.PUBLIC_URL}${project.icon}`} alt={project.title} />
                        <div className="title">{project.title}</div>
                    </Icon>
                    {isSelected[index] && <Project fullMode={props.fullMode} data={project} selectOff={()=>selectOff(index)}/>}
                </>
            ))}
        </Main>
    );
}

export default ProjectContain;