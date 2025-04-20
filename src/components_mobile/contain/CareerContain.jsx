import React from "react";
import styled from "styled-components";
import career from "../../data/career.json";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    & > div:not(.title){
        width: 95%;
    }
`;

const Title = styled.div`
    width: 100% !important;
    font-size: 1.8em;
    line-height: 1em;
    margin-bottom: 3vw;
    color: ${({theme}) => theme.darkTheme.color5} !important;
    font-weight: 600;
`;

const Item = styled.div`
    display: flex;
    ${props => props.title !== 'Spec' && 'flex-direction: column'};
    
    & *{
        font-size: 1.15em;
    }

    & .date{
        font-weight: 600;
        color: ${({theme}) => theme.darkTheme.color3} !important;
        margin-right: 1vw;
        flex-shrink: 0;
        font-size: 1.3em;
        width: ${props => props.title === 'Spec' ? '35%' : '100%'};
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
        color: ${({theme}) => theme.darkTheme.color3} !important;
    }
`;

const DashLine = styled.div`
    background-image: linear-gradient(to right, #b3b3b3 60%, transparent 40%);
    background-size: 1vh;
    height: 1px;
    border-radius: 0;
    margin: 2vh auto;
`;

const Line = styled.div`
    margin: 5vw auto;
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
        </Main>
    );
}

export default CareerContain;