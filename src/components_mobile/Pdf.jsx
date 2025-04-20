import React, { useContext } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Main = styled.a`
    width: 5vw;
    height: 5vw;
    position: absolute;
    top: calc(var(--vw, 1vw) * 3);
    right: calc(var(--vw, 1vw) * 4);
    display: flex;

    & img{
        width: 100%;
        height: 100%;
    }
`;

function Pdf(props) {
    const isDark = useContext(IsDarkContext);

    return(
        <Main
            href={`${process.env.PUBLIC_URL}/portfolio.pdf`}
            download="포트폴리오_김소중.pdf"
            title="PDF로 다운로드"
        >
            <img src={`${process.env.PUBLIC_URL}/images/down${isDark?'W':''}.png`} alt="down" />
        </Main>
    );
}

export default Pdf;