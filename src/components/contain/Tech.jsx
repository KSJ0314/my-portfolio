import React, {useState} from "react";
import styled from "styled-components";

const TechIcon = styled.div`
    width: ${props => props.width*0.8*0.2+'px'};
    height: ${props => props.width*0.8*0.2+'px'};
    border-width: 0.4vw;
    border-style: double;
    border-color: ${({theme}) => theme.darkTheme.bg2};
    background-color: ${({theme}) => theme.darkTheme.color2};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;

    & img{
        max-width: 90%;
        max-height: 90%;
    }
`;

const TechInfo = styled.div`
    box-sizing: border-box;
    border: none;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    background-color: ${({theme}) => theme.darkTheme.color2};
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    transition: 0.5s;
    width: 100%;
    height: 100%;
    transform: scale(0);

    & img{
        width: 30%;
    }
    & div{
        width: 60%;
    }

    & h1{
        font-size: 2em;
        line-height: 2em;
    }

    &.open{
        transform: scale(1);
        z-index: 3;
        border-width: 0.4vw;
        border-style: double;
        border-color: ${({theme}) => theme.darkTheme.bg2};
    }
    & > button{
        position: absolute;
        top: 2%;
        left: 96%;
        background-color: transparent;
        border-color: transparent;
        cursor: pointer;
    }

    & ul{
        padding-inline-start: 1.5vw;
    }
    & li+li{
        margin-top: 0.5em;
    }
`;

function Tech(props){
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
            <TechIcon
                onClick={()=>{
                    setIsOpen(true);
                    props.setFirstOpen();
                }}
                width={props.size.width}
            >
                <img src={`${process.env.PUBLIC_URL}${props.tech.image}`} alt={props.tech.title} />
                <TechInfo
                    position={props.position}
                    className={isOpen&&'open'}
                >
                    <img src={`${process.env.PUBLIC_URL}${props.tech.image}`} alt={props.tech.title} />
                    <div>
                        <h1>
                            {props.tech.title}
                        </h1>
                        <ul>
                            {props.tech.contents.map((content, index)=>(
                                <li key={index}>
                                    {content}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={(e) => {
                        setIsOpen(false);
                        e.stopPropagation();
                    }}>
                        X
                    </button>
                </TechInfo>
            </TechIcon>
        </>
    );
}

export default Tech;
