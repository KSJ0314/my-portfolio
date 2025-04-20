import React from "react";
import styled from "styled-components";

const Main = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    flex-shrink: 0;
    background-color: ${({theme}) => theme.darkTheme.bg1};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(${props=> props.mainsize.width}px - ${props=> props.mainsize.height / props.mainsize.width * 100 * 0.43}% - 5vw);
    height: 10%;
    margin-bottom: 2vh;
`;

function Title(props) {
    return (
        <Main mainsize={props.mainsize}>
            안되면 될 때 까지! 집요한 개발자 김소중입니다
        </Main>
    );
}

export default Title;