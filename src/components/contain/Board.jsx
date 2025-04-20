import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";
import { deleteObject, ref } from "firebase/storage";

const Title = styled.div`
    border-top-style: solid;
    border-color: #dbdbdb;
	background-color: ${props=>props.theme.darkTheme.bg9};
    border-radius: 0 !important;
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 1vw;
    white-space: nowrap;

    & div {
        display: flex;
    }

    & .delete{
        padding: 0 1vw;
        cursor: pointer;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    height: 9vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    & img {
        width: 7vw;
        height: 7vw;
        border-style: solid;
        border-color: ${({theme}) => theme.darkTheme.bd1};
    }

    & .text{
        width: 80%;
        height: 7vw;
        display: flex;
        align-items: center;
    }

`;

const blink = keyframes`
    50% {
        opacity: 0;
    }
`;

const PwCheck = styled.div`
    position: absolute;
    width: 25%;
    height: 22%;
    top: 39%;
    left: 37.5%;
    transform: scale(0);
    transition: 0s;
    border-width: 0.3vw;
    background-color: ${props=>props.theme.darkTheme.bg1};
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
        display: flex;
        justify-content: center;

        & input {
            background-color: ${props=>props.theme.darkTheme.bg1};
            border-radius: 0;
            width: 35%;
            padding: 0 5%;
            margin-right: 1vw;
        }

        & button {
            background-color: ${props=>props.theme.darkTheme.bg1};
            border-radius: 0;
            padding: 0 0.2vw;
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
        <>
            <Title>
                <div>
                    {props.board.id}
                </div>
                <div>
                    {props.board.date}
                    <div
                        className="delete"
                        onClick={()=>setPwOpen(true)}
                    >X</div>
                </div>
            </Title>
            <ContentBox>
                <img src={props.board.img} />
                <div className="text">
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
        </>
    );
}

export default Board;