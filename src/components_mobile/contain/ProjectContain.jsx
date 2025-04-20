import React, { useEffect } from "react";
import styled from "styled-components";
import projectJson from "../../data/pject.json";
import Project from "./Project";

const Main = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-size: 0.9em;
    grid-auto-rows: min-content;
    align-items : center;
    grid-gap: 5%;
    @media (min-aspect-ratio: 4/5) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const Icon = styled.div`
    width: 100%;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    background-color: ${props=>props.theme.darkTheme.bg_mobile_item};
    border: 0.3vh solid ${({theme}) => theme.darkTheme.bg2} !important;
    border-radius: 3vh !important;
    padding: 0.3vh;

    & > img{
        border: 0.3vh solid ${({theme}) => theme.darkTheme.bg2} !important;
        border-radius: 2.5vh !important;
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
        background-color: ${props=>props.theme.darkTheme.bg_pro_hov};
        bottom: 10%;
        width: 80%;
        left: 10%;
        border-radius: 0.5vh;
        @media (min-aspect-ratio: 4/5) {
            font-size: 0.6em;
        }
    }
`;


function ProjectContain(props){
    const selectOn = (index) => {
        let newArr = [...props.selectedProject];
        newArr[index] = true;
        props.setSelectedProject(newArr);
    };
    const selectOff = (index) => {
        let newArr = [...props.selectedProject];
        newArr[index] = false;
        props.setSelectedProject(newArr);
    };
    const selectOffAll = () => {
        const newArr = [false,false,false,false];
        props.setSelectedProject(newArr);
    };

    useEffect(()=>{
        if (props.projectReset){
            props.setProjectReset(false);
        }
        selectOffAll();
    }, [props.projectReset]);

    return (
        <Main>
            {projectJson.map((project, index)=>(
                <>
                    <Icon onClick={()=>selectOn(index)}>
                        <img src={`${process.env.PUBLIC_URL}${project.icon}`} alt={project.title} />
                        <div className="title">{project.title}</div>
                    </Icon>
                    {props.selectedProject[index] && !props.projectReset &&
                        <Project
                            data={project}
                            selectOff={()=>selectOff(index)}
                            containerScrollTop={props.containerScrollTop}
                        />
                    }
                </>
            ))}
        </Main>
    );
}

export default ProjectContain;