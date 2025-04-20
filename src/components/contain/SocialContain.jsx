import React from "react";
import socials from "../../data/social.json";
import styled from "styled-components";


const Main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;

const Social = styled.div`
    position: relative;
    width: 43vh;
    height: 60vh;
    
    &:hover > div{
        top: 2%;
        
        .a{
            color: ${({theme}) => theme.darkTheme.color5} !important;
            text-decoration: underline !important;
        }
    }

    & > div {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 90%;
        top: 5%;
        background-color: ${props=>props.theme.darkTheme.bg_mobile_container};
        border: 0.6vh solid ${props=>props.theme.darkTheme.bg11};
        border-radius: 2vw !important;
        transition: 0.2s;
        display: flex;
        justify-content: center;
        flex-direction: column;

        & > img {
            display: block;
            width: 30%;
            flex-shrink: 0;
            margin: 5% auto;
        }

        & .a{
            color: ${({theme}) => theme.darkTheme.color4} !important;
            display: block;
            line-height: 1.5em;
            text-align: center;
            transition: none;
        }

        & ul{
            width: 80%;
            padding-right: 6%;
            white-space: pre-wrap;
            word-break: keep-all;

            & li+li{
                margin-top: 0.5em;
            }
            margin: 5% 0 0 15%;
        }
    }
`;

function SocialContain(props){

    const link = (link)=>{
        if(link){
            window.open("about:blank").location.href = link;
        }
    }

    return (
        <Main>
            {socials.map((social, index)=>
                <Social
                    key={index}
                    index={index}
                    size={props.size}
                >
                    <div onClick={()=>link(social.link)}>
                        <img src={`${process.env.PUBLIC_URL}${social.img}`} />
                        <div className="a">{social.link}</div>
                        <ul>
                            {social.description.map((text)=>(
                                <li>{text}</li>
                            ))}
                        </ul>
                    </div>
                </Social>
            )}
        </Main>
    );
}

export default SocialContain;