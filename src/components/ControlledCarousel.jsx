import React, { useEffect, useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = styled.div`
  width: 90%;
  height: 56vh;
  text-align: center;
  font-size: 1.2rem;
  line-height: 2.5em;

  & .carousel{
    position: static;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.4vw double ${({theme}) => theme.darkTheme.color4} !important;
    border-radius: 0.5vw;
    padding: 2%;
  }
  & .carousel-indicators{
    margin: 0;
    height: 1%;
    width: 30%;
    bottom: 7%;
    left: 10%;

    & button{
      background-color: ${props=>props.theme.darkTheme.color} !important;
    }
  }
  & .carousel a{
    height: 3rem;
    width: 10%;
    top: 90%;
  }

  & .carousel-control-prev > span{
    background-image: url(${process.env.PUBLIC_URL}/images/lArrow${props=>props.theme.darkTheme.dark && 'W'}.png);
  }
  & .carousel-control-next > span{
    background-image: url(${process.env.PUBLIC_URL}/images/rArrow${props=>props.theme.darkTheme.dark && 'W'}.png);
  }
  & .carousel-control-next{
    right: 50%;
  }

`;

const Img = styled.img`
  max-width: 100%;
  max-height: 50vh;
  display: block;
  margin: 0 auto;
`;

function ControlledCarousel(props){
  const [localIndex, setLocalIndex] = useState(props.index);

  useEffect(() => {
    props.setIndex(localIndex);
  }, [localIndex]);

  const handleSelect = (selectedIndex) => {
    setLocalIndex(selectedIndex);
  };

  return (
    <Main>
      <Carousel activeIndex={localIndex} onSelect={handleSelect}>
        {props.data.image.map((img)=>(
          <Carousel.Item>
            <Img src={`${process.env.PUBLIC_URL}${img}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Main>
  );
}

export default ControlledCarousel;