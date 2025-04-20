import React from "react";
import styled from "styled-components";
import career from "../../data/career.json";

const Main = styled.div`
    width: 90%;
    height: 100%;
    padding: 3% 0;
    overflow-y: scroll;
    border-radius: 0;
    display: flex;

    &::-webkit-scrollbar {
        width: 0;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }

    & > div > div:not(.title){
        width: 95%;
    }
`;

const Title = styled.div`
    width: 100% !important;
    font-size: 1.8em;
    margin-bottom: 1vw;
    color: ${({theme}) => theme.darkTheme.color5} !important;
    font-weight: 600;
`;

const Item = styled.div`
    display: flex;
    
    & *{
        font-size: 1.15em;
    }

    & .date{
        font-weight: 600;
        color: gray;
        margin-right: 1vw;
        flex-shrink: 0;
        font-size: 1.3em;
        width: 28%;
    }
    
    & > div:first-child{
    }

    & > div:nth-child(2){
        width: 100%;
    }

    & .title{
        font-weight: 500;
    }

    & .sub{
        font-size: 0.8em;
        color: gray;
    }
`;

const DashLine = styled.div`
    background-image: linear-gradient(to right, #b3b3b3 60%, transparent 40%);
    background-size: 0.6vw 1vw;
    height: 0.05vw;
    border-radius: 0;
    margin: 1vw auto;
`;

const Line = styled.div`
    margin: 2.5vw auto 1.5vw;
    border-bottom-style: solid;
    border-bottom-color: #b3b3b3;
    width: 100% !important;
`;

const Ellipsis = styled.div`
    width: 1% !important;
    padding-bottom: 2%;

    & ul {
        padding: 0 10px;
    }
`;

function CareerContain(props){

    return (
        <Main>
            <div>
                {Object.entries(career[0]).map(([key, vals])=>(
                    <>
                        <Title>
                            {key}
                        </Title>
                        {vals.map((data, index)=>(
                            <div key={data.id}>
                                <Item title={key}>
                                    <div className="date">
                                        {data.date}
                                    </div>
                                    <div>
                                        <div className="title">
                                            {data.title}
                                        </div>
                                        <div className="sub">
                                            {data.sub}
                                        </div>
                                    </div>
                                </Item>
                                {index<vals.length-1 && <DashLine />}
                            </div>
                        ))}
                        <Line />
                    </>
                ))}
                <Ellipsis>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </Ellipsis>
            </div>
        </Main>
    );
}

export default CareerContain;