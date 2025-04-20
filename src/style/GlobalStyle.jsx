import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        transition: color 0.5s, background-color 0.5s, top 0.5s, left 0.5s, right 0.5s, bottom 0.5s, transform 0.5s;
    }
`;

export default GlobalStyle;