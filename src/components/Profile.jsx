import React, {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import styled, { css } from "styled-components";
import { IsDarkContext } from "../context/IsDarkContext";
import { fetchVisitorCount } from "../visitorCounter";

const Outside = styled.div`
    background-color: ${({theme}) => theme.darkTheme.bg3};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    flex-shrink: 0 !important;
    position: absolute;
    top: 1.5vw;
    left: 1.5vw;
    width: ${props=>  props.mainsize.height / props.mainsize.width * 100 * 0.43}%;
    height: calc(100% - 3vw);
    padding: 0.5vw;
    transition: width 0.25s;
`;

const SpaceBorder = styled.div`
    border-style: dashed;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    border-bottom: none;
    margin: 1vw;
`;

const Visitors = styled.div`
    margin-bottom: 0.5vw;
    padding-left: 0.5vw;
    & span{
        font-size: 0.8em;
        & .today{
            font-size: 1em;
            color: ${({theme}) => theme.darkTheme.color4} !important;
        }
    }
`;

const Main = styled.div`
    background-color: ${({theme}) => theme.darkTheme.bg_mobile_container};
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    width: 100%;
    height: calc(100% - 1vw - 2vh);
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0.5vw;
    & > div{
        width: 100%;
    }
`;

const ProfileImage = styled.div`
    border-style: solid;
    border-color: ${({theme}) => theme.darkTheme.bd1};
    flex-shrink: 0;
    width: calc(${props=> props.size.width}px - 2.5vw) !important;
    height: calc(${props=> props.size.width}px - 2.5vw) !important;
    
    & > img{
        width: 100%;
        height: 100%;
    }
`;

const Intro = styled.div`
    width: 50%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0.5vw;

    & > div{
        height: 23%;
        display: flex;
    }

    & > div{
        img{
            max-height: 70%;
            flex-shrink: 0;
            margin-right: 0.5vw;
            border-radius: 0;
        }

        div{
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }
`;

const LinkUrl = styled.select`
    background-color: ${({theme}) => theme.darkTheme.bg1};
    height: 7%;
    width: 98%;
    flex-shrink: 0;
    border-radius: 0 !important;
    font-size: 1em;
`;

const ToggleButton = styled.button`
    width: 5vh;
    height: 5vh;
    position: absolute;
    border: none;
    cursor: pointer;
    background-color: transparent;
    background-size: cover;

    ${props => props.profileClose ? css`
        background-image: url(${process.env.PUBLIC_URL}/images/rArrow${props.theme.darkTheme.dark && 'W'}.png);
    ` : css`
        background-image: url(${process.env.PUBLIC_URL}/images/lArrow${props.theme.darkTheme.dark && 'W'}.png);
    `}
    top: calc(50% - 2.5vh);
    right: -2vh;
`;


function Profile(props) {
    const isDark = useContext(IsDarkContext);

    const selectLink = (e)=>{
        const link = e.target.value;
        if(link){
            window.open(link);
            e.target.selectedIndex = 0;
        }
    }

    const [size, setSize] = useState({ width: 0, height: 0 });
    const mainRef = useRef();

    useLayoutEffect(() => {
        const mainElement = mainRef.current;
        const handleResize = () => {
            if (mainElement) {
                requestAnimationFrame(() => {
                    setSize({
                        width: mainElement.offsetWidth,
                        height: mainElement.offsetHeight,
                    });
                });
            }
        };
        handleResize();

        if (mainElement) {
            mainElement.addEventListener('transitionend', handleResize);
        }
        return () => {
            if (mainElement) {
                mainElement.removeEventListener('transitionend', handleResize);
            }
        };
    }, [props.mainsize]);


    /// 방문자 수 데이터를 파이어베이스에서 가져와서 표시 ///
    const [todayVisitors, setTodayVisitors] = useState(0);
    const [totalVisitors, setTotalVisitors] = useState(0);

    useEffect(()=>{
        fetchVisitorCount().then(({todayVisitors, totalVisitors})=>{
            setTodayVisitors(todayVisitors);
            setTotalVisitors(totalVisitors);
        });
    },[]);
    //////


    return(
        <Outside ref={mainRef} mainsize={props.mainsize}>
            <Visitors>
                Today.. <span><span className="today">{todayVisitors}</span> | {totalVisitors}</span>
            </Visitors>
            <Main>
                <ProfileImage size={size}>
                    <img src={`${process.env.PUBLIC_URL}/images/profile.png`} alt="profile" />
                </ProfileImage>
                <SpaceBorder />
                <Intro>
                    <div>
                        <img src={isDark?`${process.env.PUBLIC_URL}/images/birth2.png`:`${process.env.PUBLIC_URL}/images/birth.png`} alt="birth" />
                        <div>1997. 10. 19.</div>
                    </div>
                    <div>
                        <img src={isDark?`${process.env.PUBLIC_URL}/images/home2.png`:`${process.env.PUBLIC_URL}/images/home.png`} alt="home" />
                        <div>나주시 빛가람동</div>
                    </div>
                    <div>
                        <img src={isDark?`${process.env.PUBLIC_URL}/images/tell2.png`:`${process.env.PUBLIC_URL}/images/tell.png`} alt="tell" />
                        <div>010 - 2431 - 4307</div>
                    </div>
                    <div>
                        <img src={isDark?`${process.env.PUBLIC_URL}/images/email2.png`:`${process.env.PUBLIC_URL}/images/email.png`} alt="email" />
                        <div>sojung017@naver.com</div>
                    </div>
                </Intro>
                <SpaceBorder />
                <LinkUrl
                    onChange={selectLink}
                >
                    <option value="">바로가기</option>
                    <option value="https://github.com/KSJ0314">GitHub</option>
                    <option value="https://velog.io/@ksj0314/series">Velog</option>
                    <option value="https://ksj0314.github.io/">이력서</option>
                </ LinkUrl>
            </Main>
            <ToggleButton onClick={props.profileCloseToggle} profileClose={props.profileClose}/>
        </Outside>
    );
}

export default Profile;