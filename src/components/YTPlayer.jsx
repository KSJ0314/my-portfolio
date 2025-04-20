import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import musics from "../data/music.json";

const Player = styled.div`
    position: absolute;
    top: 0.75vh;
    left: 1vw;
    width: 20vw;
    height: 3.5vh;
    background-color: ${props => props.theme.darkTheme.bg1};
    border: 0.2vw double ${props => props.theme.darkTheme.bg2} !important;
    display: flex;
    align-items: center;
    padding: 0 0.3vw;

    & img{
        border-radius: 0;
        flex-shrink: 0;
    }

    & img:not(.bgm){
        cursor: pointer;
        height: 90%;
    }
    
    & .bgm{
        height: 60%;
        margin-right: 0.2vw;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.6em;
        font-weight: 700;
        white-space: nowrap;
        color: ${props => props.theme.darkTheme.bg7};

        & > img{
            height: 100%;
        }
    }

    & .youtube{
        width: 0;
        height: 0;
        overflow: hidden;
    }

    & .list {
        background-color: ${props => props.theme.darkTheme.bg1};
        border: 0.2vw double ${props => props.theme.darkTheme.bg2};
        position: absolute;
        z-index: 1;
        top: 150%;
        left: 0;
        width: 100%;
        padding: 0.5vw;
        ${({$listOn}) => $listOn?'':'display:none;'};

        & *{
            color: ${props => props.theme.darkTheme.bg7};
        }
        
        & > div{
            display: flex;
            align-items: center;
        }
        
        & > div > div{
            font-size: 0.8em;
        }

        & .title{
            border-bottom-style: solid;
            border-radius: 0;
            margin-bottom: 1vh;

            & div{
                text-align: center;
            }

            & .music{
                border-right: 0.1vw solid ${props => props.theme.darkTheme.color};
                border-radius: 0;
            }
        }

        & .music{
            width: 65%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        & .artist{
            width: 30%;
            text-align: center;
        }

        & img, .space{
            width: 4%;
            margin-right: 1%;
        }

    }
`;

const Title = styled.div`
    width: 100%;
    font-size: 0.8em;
    color: ${props => props.theme.darkTheme.color};;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

function YTPlayer(props) {
    const [currentTrack, setCurrentTrack] = useState(0);
    const [videoId, setVideoId] = useState(musics[currentTrack].youtubeIDs);
    const [videoName, setVideoName] = useState(musics[currentTrack].playName);
    const [listOn, setListOn] = useState(false);
    const [readyDelay, setReadyDelay] = useState(true);
    const [autoplayState, setAutoplayState] = useState(0);
    
    useEffect(() => {
        setVideoId(musics[currentTrack].youtubeIDs);
        setVideoName(musics[currentTrack].playName);
    }, [currentTrack])
    
    const playerRef = useRef(null);

    const onReady = (event) => {
        playerRef.current = event.target;
        setReadyDelay(true);
    };

    const playVideo = () =>{
        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    }

    const pauseVideo = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        }
    }

    const nextVideo = () => {
        if (!readyDelay) {
            return;
        }
        setAutoplayState(1);
        setReadyDelay(false);
        if (currentTrack === musics.length-1){
            setCurrentTrack(0);
        } else {
            setCurrentTrack(currentTrack+1);
        }
    }

    const selectVideo = (num) => {
        setAutoplayState(1);
        setCurrentTrack(num);
    }

    return (
        <Player $listOn={listOn}>
            <YouTube
                className="youtube"
                videoId={videoId}
                onReady={onReady}
                onStateChange={(e)=>{
                    if(e.data === window.YT.PlayerState.ENDED){
                        nextVideo();
                    }
                }}
                opts={{
                    playerVars: {
                        autoplay: autoplayState
                    }
                }}
            />
            <div className="bgm">
                <img src={`${process.env.PUBLIC_URL}/images/ytMark.png`} alt="ytMark" className="bgm"/>
                BGM ▶
            </div>
            <Title>{videoName}</Title>
            <img src={`${process.env.PUBLIC_URL}/images/play.png`} alt="play" onClick={()=>playVideo()} />
            <img src={`${process.env.PUBLIC_URL}/images/next.png`} alt="next" onClick={()=>nextVideo()} />
            <img src={`${process.env.PUBLIC_URL}/images/pause.png`} alt="pause" onClick={()=>pauseVideo()} />
            <img src={`${process.env.PUBLIC_URL}/images/list.png`} alt="list" onClick={()=>listOn?setListOn(false):setListOn(true)}/>
            <div className="list">
                <div className="title">
                    <div className="space"></div>
                    <div className="music">곡명</div>
                    <div className="artist">가수</div>
                </div>
                {musics.map((music, index)=>(
                    <div key={index}>
                        <img src={`${process.env.PUBLIC_URL}/images/musicBtn.png`} alt="musicBtn" onClick={()=>selectVideo(index)}/>
                        <div className="music">{music.playName}</div>
                        <div className="artist">{music.artist}</div>
                    </div>
                ))}
            </div>
        </Player>
    );
}

export default YTPlayer;