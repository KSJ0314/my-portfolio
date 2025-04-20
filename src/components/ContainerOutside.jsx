import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Container from "./Container";

const Main = styled.div`
    height: 100%;
    position: relative;
    width: calc(${props=> props.mainsize.width}px - ${props=> props.mainsize.height / props.mainsize.width * 100 * 0.43}% - 5vw);
`;

function ContainerOutside(props) {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const [size, setSize] = useState({ width: 0, height: 0 });
    const mainRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            const mainElement = mainRef.current;
            if (mainElement) {
                const rect = mainElement.getBoundingClientRect();
                setPosition({
                    top: rect.top,
                    left: rect.left
                });
                setSize({
                    width: mainElement.offsetWidth,
                    height: mainElement.offsetHeight
                });
            }
        };
        
        setTimeout(() => {
            handleResize();
        }, 1);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [position, size]);

    return (
        <Main ref={mainRef} mainsize={props.mainsize}>
            <Container
                position={position}
                size={size}
            />
        </Main>
    );
}

export default ContainerOutside;