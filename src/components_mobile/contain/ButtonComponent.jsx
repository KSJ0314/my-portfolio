import React, {useContext} from "react";
import styled from "styled-components";
import { IsDarkContext } from "../../context/IsDarkContext";
import ReactDOM from 'react-dom';

const Button = styled.div`
    width: calc(var(--vw, 1vw) * 10);
    height: calc(var(--vw, 1vw) * 15);
    border: none;
    background-color: transparent;
    position: fixed;
    cursor: pointer;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;

    & > img{
        height: 50%;
    }
    &:hover {
        opacity: 0.8;
    }
`;

function ButtonComponent(props){
    const isDark = useContext(IsDarkContext);
    return ReactDOM.createPortal(
        <Button onClick={props.setReadmeOn}>
            <img src={`${process.env.PUBLIC_URL}/images/lArrow${isDark?'W':''}.png`} />
        </Button>, document.body
    );
}
export default ButtonComponent;