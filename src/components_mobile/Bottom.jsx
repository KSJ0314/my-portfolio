import React, { useContext } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Main = styled.div`
    width: 100%;
    height: calc(var(--vw, 1vw) * 15);
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_menu};
    border-radius: 0 !important;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 5;
    position: fixed;
    bottom: 0;

    & > div{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        & img{
            height: 50%;
        }
    }
`;

function Bottom(props) {
    const isDark = useContext(IsDarkContext);

    const selectMenu = (num) =>{
        props.setProjectReset(true);
        props.setMenu(num);
    }

    const icons = [
        "home",
        "spec",
        "prj",
        "social",
        "board"
    ];

    return (
        <Main>
            {icons.map((icon, index)=>(
                <div
                    onClick={()=>selectMenu(index)}
                    className={props.menu===index&&'selected'}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/images/menu/${icon}${props.menu===index?(isDark?'SD':'S'):''}.png`}
                    />
                </div>
            ))}
        </Main>
    );
}

export default Bottom;