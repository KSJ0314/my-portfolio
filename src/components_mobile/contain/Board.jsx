import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

const Main = styled.div`
    width: 100%;
    height: calc(var(--vh, 1vh) * 25);
    border-radius: 2vh;
    border-style: solid;
    border-color: #dbdbdb;
    overflow: hidden;
    margin-top: calc(var(--vw, 1vw) * 7);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props=>props.theme.darkTheme.bg4};

    @media (min-aspect-ratio: 0.65) {
        font-size: 0.9em;
    }
    @media (min-aspect-ratio: 0.72) {
        font-size: 0.8em;
    }
    @media (min-aspect-ratio: 0.9) {
        font-size: 0.7em;
    }
`;

const Title = styled.div`
	background-color: ${props=>props.theme.darkTheme.bg_l1};
    border-radius: 0 !important;
    width: 100%;
    height: 50%;
    display: flex;
    white-space: nowrap;
    position: relative;
    padding: 1.25vh;

    & .delete{
        cursor: pointer;
        position: absolute;
        top: 1vh;
        right: 1vh;
        line-height: 1em;
    }

    & .date{
        margin: 1.2vh 0;
    }
    & img {
        width: calc(var(--vh, 1vh) * 10);
        height: 100%;
        border-style: solid;
        border-color: ${({theme}) => theme.darkTheme.bd1};
        border-radius: 2vh;
        margin-right: 1.25vh;
    }
`;

const ContentBox = styled.div`
    width: 80%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div{
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const blink = keyframes`
    50% {
        opacity: 0;
    }
`;

const PwCheck = styled.div`
    position: absolute;
    width: 50%;
    height: 18%;
    top: 40%;
    left: 25%;
    transform: scale(0);
    transition: 0s;
    border-width: 0.5vh;
    background-color: ${props=>props.theme.darkTheme.bg1};
    border-radius: 2vh;
    border-style: double;
    border-color: ${props=>props.theme.darkTheme.bg2};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    &.open{
        transform: scale(1);
    }

    & form{
        width: 100%;
        height: 25%;
        display: flex;
        justify-content: center;

        & input {
            background-color: ${props=>props.theme.darkTheme.bg1};
            border-radius: 0;
            width: 60%;
            height: 100%;
            padding: 0 5%;
            margin-right: 1vw;
            border-radius: 0.5vh;
        }

        & button {
            background-color: ${props=>props.theme.darkTheme.bg1};
            border-radius: 0.5vh;
            padding: 0 2vw;
            line-height: 1em;
            font-size: 0.8em;
        }
    }


    & .close{
        cursor: pointer;
        position: absolute;
        top: 5%;
        right: 5%;
    }

    & .pwErr{
        color: red;
        animation: ${blink} 1s linear infinite;
        position: absolute;
        bottom: 12%;
        display: none;
        
        &:is(.open){
            display: block;
        }
    }
`;

function Board(props){
    const [pwOpen, setPwOpen] = useState(false);
    const [pw, setPw] = useState('');
    const [pwWrong, setPwWrong] = useState(false);

    const handleChangePw = (e) => {
        setPw(e.target.value);
    };

    const deleteData = async () => {
        if (props.board.imgName){
            await deleteObject(ref(storage, `board/${props.board.imgName}`));
        }
        await deleteDoc(doc(db, "board", props.board.uid));
    };

    const pwChecking = async (e) => {
        e.preventDefault();

        if (pw!==props.board.pw){
            setPwWrong(true);
            setPw('');
            return;
        }
        setPwWrong(false);
        await deleteData();
        setPwOpen(false);
        alert("삭제되었습니다!");
        props.fetchData();
    };

    return (
        <Main>
            <Title>
                <img src={props.board.img} />
                <div>
                    <div className="date">
                        {props.board.date}
                    </div>
                    <div className="id">
                        {props.board.id}
                    </div>
                    <div
                        className="delete"
                        onClick={()=>setPwOpen(true)}
                    >X</div>
                </div>
            </Title>
            <ContentBox>
                <div>
                    {props.board.content}
                </div>
            </ContentBox>
            <PwCheck
                className={pwOpen&&'open'}
            >
                <form onSubmit={pwChecking}>
                    <input
                        id={`${props.board.id}PwCheck`}
                        type="password"
                        value={pw}
                        maxLength={8}
                        onChange={handleChangePw}
                    />
                    <button type="submit">삭제</button>
                </form>
                <div className={pwWrong?"pwErr open":"pwErr"}>비밀번호가 틀렸습니다!</div>
                <div
                    className="close"
                    onClick={()=>{
                        setPw('');
                        setPwOpen(false);
                        setPwWrong(false);
                    }}
                >X</div>
            </PwCheck>
        </Main>
    );
}

export default Board;