import React, {useEffect, useState} from "react";
import styled from "styled-components";

const Button = styled.button`
    width: 30px;
    height: 30px;
`;

const ImgWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Img = styled.img`
    width: 10%;
    height: 10%;
`;


function Test(props){
    const UrlArr = [
        "profile.png",
        "project/starIcon.png",
        "project/myIcon.png",
        "project/whatIcon.png",
        "project/mapleIcon.png",
        "project/star0.png",
        "project/star1.png",
        "project/star2.png",
        "project/star3.png",
        "project/star4.png",
        "project/star5.png",
        "project/star6.png",
        "project/star7.png",
        "project/my0.png",
        "project/my1.png",
        "project/my2.png",
        "project/my3.png",
        "project/my4.png",
        "project/my5.png",
        "project/my6.png",
        "project/my7.png",
        "project/what0.png",
        "project/what1.png",
        "project/what2.png",
        "project/maple0.png",
        "project/maple1.png",
        "project/maple2.png",
        "project/maple3.png",
        "git.png",
        "velog.png"
    ];

    const [num, setNum] = useState(0)
    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        let interval
        if (isStarted) {
          interval = setInterval(() => {
            setNum((prevNum) => {
              if (prevNum >= 30) {
                clearInterval(interval)
                return prevNum
              }
              return prevNum + 1
            })
          }, 30)
        }
        return () => clearInterval(interval)
      }, [isStarted])

    return(
        <>
            {/* <PreLoadingImage /> */}
            <Button onClick={()=>setIsStarted(true)}> Go </Button>
            <ImgWrap>
            {UrlArr.slice(0, num).map((src, index) => (
                <Img src={`${process.env.PUBLIC_URL}/images/${src}`} />
            ))}
            </ImgWrap>
        </>
    );
}

export default Test;
