import React, {useRef, useState} from "react";
import styled from "styled-components";
import Tech from "./Tech";
import teches from "../../data/tech.json";

const Main = styled.div`
    width: 80%;
    height: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Floor = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const Help = styled.div`
    position: absolute;
    top: -6%;
    width: 100%;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;

    ${props=>props.$firstOpen&&'display:none;'}
`;

function TechnologyContain(props){
    const parentRef = useRef();
    const [firstOpen, setFirstOpen] = useState(false);

    return (
        <Main ref={parentRef}>
            <Help $firstOpen={firstOpen}>아이콘을 클릭해주세요!</Help>
            <Floor>
                {teches.map((tech, index) => ( index < teches.length/2 &&
                    <Tech
                        key={tech.id}
                        tech={tech}
                        position={props.position}
                        size={props.size}
                        index={index}
                        floor={0}
                        setFirstOpen={()=>setFirstOpen(true)}
                    />
                ))}
            </Floor>
            <Floor>
                {teches.map((tech, index) => ( index >= teches.length/2 &&
                    <Tech
                        key={tech.id}
                        tech={tech}
                        position={props.position}
                        size={props.size}
                        fullMode={props.fullMode}
                        index={index-teches.length/2}
                        floor={1}
                        setFirstOpen={()=>setFirstOpen(true)}
                    />
                ))}
            </Floor>
        </Main>
    );
}

export default TechnologyContain;