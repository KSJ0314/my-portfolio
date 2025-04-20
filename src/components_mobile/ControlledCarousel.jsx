import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = styled.div`
  width: 90%;
  height: calc(var(--vh, 1vh) * 35);
  text-align: center;
  font-size: 1.2rem;
  line-height: 2.5em;

  & .carousel{
    position: static;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.8vh double ${({theme}) => theme.darkTheme.color4} !important;
    border-radius: 0.5vh;
    padding: 2%;
    margin-top: 6vh;
  }
  & .carousel-indicators{
    margin: 0;
    height: 1%;
    width: 70%;
    top: 2%;
    left: 15%;

    & button{
      background-color: ${props=>props.theme.darkTheme.color} !important;
    }
  }
  & .carousel a{
    height: 3rem;
    width: 10%;
    top: calc(var(--vh, 1vh) * 17.5);
  }

  & .carousel-control-prev > span{
    background-image: url(${process.env.PUBLIC_URL}/images/lArrow${props=>props.theme.darkTheme.dark && 'W'}.png);
  }
  & .carousel-control-next > span{
    background-image: url(${process.env.PUBLIC_URL}/images/rArrow${props=>props.theme.darkTheme.dark && 'W'}.png);
  }

`;

const Img = styled.img`
  max-width: 100%;
  max-height: calc(var(--vh, 1vh) * 25);
  display: block;
  margin: 0 auto;
`;

function ControlledCarousel(props){

  const handleSelect = (selectedIndex) => {
    props.setIndex(selectedIndex);
  };

  return (
    <Main>
      <Carousel activeIndex={props.index} onSelect={handleSelect}>
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