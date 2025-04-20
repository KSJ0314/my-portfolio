import React, { useContext } from "react";
import styled from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";

const Main = styled.a`
    width: 2.5vw;
    height: 2.5vw;
    position: fixed;
    top: 0.5vw;
    right: 1vw;

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