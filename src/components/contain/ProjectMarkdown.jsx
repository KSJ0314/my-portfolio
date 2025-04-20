import React, {useRef, useState, useEffect, useMemo, useContext} from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import { IsDarkContext } from "../../context/IsDarkContext";

const Main = styled.div`
    width: 100% !important;
    height: 100%;
    flex-shrink: 0;
    overflow-y: scroll;
    border-radius: 0;
    position: absolute;
    background-color: ${props=>props.theme.darkTheme.bg_mobile_container};
    border-radius: 0.5vw;
    z-index: 5;

    &::-webkit-scrollbar {
        width: 0;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    & > button{
        width: 4%;
        border: none;
        background-color: transparent;
        position: sticky;;
        top: 2%;
        left: 0;

        & > img{
            width: 100%;
        }
        &:hover {
            opacity: 0.8;
        }
    }

    & > div{
        padding: 0 5%;
    }

    & ul, ol{
        padding-inline-start: 2.5vw !important;
    }
`;

function ProjectMarkdown(props){
    const isDark = useContext(IsDarkContext);
    const contentRef = useRef();
    
    if (props.proChanged){
        contentRef.current.scrollTop = 0;
        props.setProChanged(false);
    }
    
    const [markdown, setMarkdown] = useState("");

    const contain = [
        "my.md",
        "star.md",
        "what.md",
        "maple.md"
    ];

    const fileCache = useMemo(() => ({}), []);

    useEffect(() => {
        const fileName = contain[props.num];
        if (!fileCache[fileName]) {
            fetch(`${process.env.PUBLIC_URL}/markdown/${fileName}`)
            .then((response) => response.text())
            .then((text) => {
                const formattedText = text.replaceAll("<br/>","\n\n");
                fileCache[fileName] = formattedText;
                setMarkdown(formattedText);
            });
        } else {
            setMarkdown(fileCache[fileName]);
        }
    }, [props.num]);

    const renderers = useMemo(() => ({
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return(
                (!inline && match)
                ? <SyntaxHighlighter
                    {...props}
                    language={match[1]}
                    className = "codeRefer"
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                : <SyntaxHighlighter
                    {...props}
                    className = "backtick"
                >
                    {String(children)}
                </SyntaxHighlighter>
            );
        }
    }), []);

    return (
        <Main
            ref={contentRef}
        >
            <button onClick={props.setReadmeOn}>
                <img src={`${process.env.PUBLIC_URL}/images/lArrow${isDark?'W':''}.png`} />
            </button>
            <div>
                <ReactMarkdown
                    className = {isDark ? "markdown dark" : "markdown"}
                    remarkPlugins={[remarkGfm]}
                    components={renderers}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        </Main>
    );
}

export default ProjectMarkdown;