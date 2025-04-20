import React, { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000b3;
    border-radius: 0;
    z-index: 10;

    ${props=> props.$close && 'display:none;'}
    ${props=> props.$isLogined && 'display:none;'}
`;

const Height = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000;
    border-radius: 0;
    z-index: 20;
    color: white;
    font-size: 5em;
    display: flex;
    justify-content: center;
    align-items: center;

    ${props=> props.$widthBig && 'display:none;'}
`;

const Close = styled.div`
    position: absolute;
    top: 1.5vw;
    right: 2vw;
    color: white;
    font-size: 1.5vw;
    cursor: pointer;
`;

const Link = styled.div`
    position: absolute;
    top: calc(5% + 8.8vw + (90% - 9.6vw)*0.74);
    left: 14.6%;
    border: 0.2vw solid white;
    width: 15.9%;
    height: calc((90% - 9.6vw)*0.098);

    & .text{
        color: white;
        white-space: nowrap;
        text-decoration: underline 0.1vw;
        position: absolute;
        bottom: 175%;
        left: 30%;
    }

    & .border{
        width: 60%;
        height: 80%;
        border-radius: 0;
        position: absolute;
        bottom: 100%;
        left: 50%;
        background-color: white;
        clip-path: polygon(96% 0, 100% 0, 4% 100%, 0 100%);
    }
`;

const Page = styled.div`
    position: absolute;
    top: calc(5% + 3.8vw + (90% - 7.6vw) * 0.15);
    left: 85.8%;
    border: 0.2vw solid white;
    width: 7.8%;
    height: 45.6%;

    & .text{
        color: white;
        white-space: nowrap;
        text-decoration: underline 0.1vw;
        position: absolute;
        bottom: 64.5%;
        left: -300%;
    }

    & .border{
        width: 140%;
        height: 15%;
        border-radius: 0;
        position: absolute;
        bottom: 50%;
        left: -140%;
        background-color: white;
        clip-path: polygon(0 0, 3% 0, 100% 97%, 100% 100%);
    }
`;

const Button = styled.div`
    border: 0.2vw solid white;
    width: 6.5vw;
    height: calc(5vw + 3vh);
    position: fixed;
    bottom: 4vh;
    right: 1.5vw;

    & .text{
        color: white;
        white-space: nowrap;
        text-decoration: underline 0.1vw;
        position: absolute;
        bottom: 138.5%;
        left: -350%;
    }

    & .border{
        width: 200%;
        height: 40%;
        border-radius: 0;
        position: absolute;
        bottom: 100%;
        right: 50%;
        background-color: white;
        clip-path: polygon(0 0, 4% 0, 100% 96%, 100% 100%);
    }
`;

const Player = styled.div`
    border: 0.2vw solid white;
    width: 20vw;
    height: 3vh;
    position: absolute;
    top: 1vh;
    left: 1vw;

    & .text{
        color: white;
        white-space: nowrap;
        text-decoration: underline 0.1vw;
        position: absolute;
        top: 300%;
        left: 80%;
    }

    & .border{
        width: 80%;
        height: 200%;
        border-radius: 0;
        position: absolute;
        top: 100%;
        left: 50%;
        background-color: white;
        clip-path: polygon(0 0, 4% 0, 100% 100%, 96% 100%);
    }
`;

function Help(props) {
    const [close, setClose] = useState(false);

    return (
        <>
        <Main $close={close} $isLogined={props.isLogined}>
            <Close onClick={()=>setClose(true)}>X</Close>
            <Link>
                <div className="border"></div>
                <div className="text">GitHub, Velog, 이력서 사이트로 바로가기할 수 있어요</div>
            </Link>
            <Page>
                <div className="border"></div>
                <div className="text">메뉴를 선택해 각종 페이지로 이동할 수 있어요</div>
            </Page>
            <Button>
                <div className="border"></div>
                <div className="text">버튼을 클릭해 다크 모드나 풀모드로 전환할 수 있어요</div>
            </Button>
            <Player>
                <div className="border"></div>
                <div className="text">플레이어를 통해 배경음악을 들을 수 있어요</div>
            </Player>
        </Main>
        <Height $widthBig={props.widthBig}>
            현재 버전은 가로모드만 지원합니다.
        </Height>
        </>
    );
}

export default Help;