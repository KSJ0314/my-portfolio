import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import Board from "./Board";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Main = styled.div`
    width: 100%;
    border-radius: 0;
    @media (min-aspect-ratio: 0.65) {
        font-size: 0.9em;
    }
    @media (min-aspect-ratio: 0.72) {
        font-size: 0.8em;
    }
    @media (min-aspect-ratio: 0.9) {
        font-size: 0.7em;
    }
`;

const Form = styled.form`
    width: 100%;
    height: calc(var(--vh, 1vh) * 25);
    border-radius: 2vh;
    border-style: solid;
    border-color: #dbdbdb;
    overflow: hidden;
`;

const Title = styled.div`
	background-color: ${props=>props.theme.darkTheme.bg_l1};
    border-radius: 0;
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    padding: calc(var(--vh, 1vh) * 1.25);
    position: relative;

    & > .imgPreview{
        width: calc(var(--vh, 1vh) * 10);
        height: calc(var(--vh, 1vh) * 10);
        margin-right: calc(var(--vh, 1vh) * 1.25);
        flex-shrink: 0;
        border-radius: 2vh;
        border-style: solid;
        border-color: ${({theme}) => theme.darkTheme.bd1};
        background-color: ${({theme}) => theme.darkTheme.bg4};
        cursor: pointer;
    }

    & #profileImg{
        display: none;
    }

    & .inputDiv{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

    }
    & input {
        background-color: ${props=>props.theme.darkTheme.bg1};
        
        &[id=id]{
            width: 100%;
            height: 40%;
            border-radius: 0;
            padding: 0.3vh;
        }

        &[id=pw]{
            width: 100%;
            height: 40%;
            border-radius: 0;
            padding: 0.3vh;
        }
    }

    & button{
        height: 85%;
        flex-shrink: 0;
        padding: 0.5vh 1vh;
        margin-left: calc(var(--vh, 1vh) * 1.25);
        background-color: ${props=> props.theme.darkTheme.bg1};
        cursor: pointer;
    }
    
    & input[readOnly] {
        border: none;
        background-color: transparent;

        &[id=pw]{
            display: none;
        }
    }
`;

const GitHub = styled.img`
    width: calc(var(--vh, 1vh) * 4);
    height: calc(var(--vh, 1vh) * 4);
    cursor: pointer;
    position: absolute;
    top: 1.25vh;
    right: 1.25vh;
`;

const ContentBox = styled.div`
    background-color: ${props=>props.theme.darkTheme.bg4};
    width: 100%;
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    & textarea{
        width: 80%;
        border-radius: 0;
        border: none;
        resize: none;
        background-color: transparent;
        overflow: hidden;
        text-align: center;
        @media (min-aspect-ratio: 0.65) {
            font-size: 0.9em;
        }
        @media (min-aspect-ratio: 0.72) {
            font-size: 0.8em;
        }
        @media (min-aspect-ratio: 0.9) {
            font-size: 0.7em;
        }
    }
`;

function BoardContain(props) {
    // /// GitHub OAuth를 이용한 로그인 *미완성* /// 
    // const githubURL = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_clientId}&redirect_uri=${process.env.REACT_APP_GITHUB_redirectUrl}`;
    // const githubLogin = () => {
    //     window.location.href = githubURL;
    // };
    // //////


    /// Firestore에서 게시판 데이터를 가져오기 ///
    const [board, setBoard] = useState([]);
    const fetchData = async () => {
        setBoard([]);
        const querySnapshot = await getDocs(query(collection(db, "board"), orderBy("date", "desc")));
        var boardList = [];
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            data.date = new Date(data.date.seconds * 1000).toLocaleString();
            data.uid = doc.id;
            boardList.push(data);
        });
        setBoard(boardList);
    }
    useEffect(()=>{
        fetchData();
    }, []);
    //////


    /// form 조작 ///
    const initForm = {
        id: '',
        date: '',
        pw: '',
        img: null,
        content: '',
        uid: ''
    };
    const [formData, setFormData] = useState(initForm);
    const areaRef = useRef();
    const [maxLength, setMaxLength] = useState(100);
    
    useEffect(() => {
        if (areaRef.current) {
            const textarea = areaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [formData.content]);

    const handleChangeId = (e) => {
        setFormData({
            ...formData,
            id: e.target.value
        });
    };

    const handleChangePw = (e) => {
        setFormData({
            ...formData,
            pw: e.target.value
        });
    };

    const handleChangeContent = (e) => {
        const textarea = e.target;
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
        const lines = Math.floor(textarea.scrollHeight / lineHeight);
        const currentLength = textarea.value.length;

        if (lines < 4 || currentLength < formData.content.length) {
            setFormData({
                ...formData,
                content: e.target.value
            });
        }
    };
    //////


    /// form submit, Firestore + Storage 저장 ///
    const handleSubmit = (e) => {
        e.preventDefault();

        var imgURL = `${process.env.PUBLIC_URL}/images/board/default.png`;
        var imgName = null;
        if (imgFile){
            imgName = new Date().getTime();
        }
        const uploadImg = () =>{
            const file = profileImgRef.current.files[0];
            const storageRef = ref(storage, `board/${imgName}`);
            const uploadTask = uploadBytes(storageRef, file);
            uploadTask.then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((downloadURL)=>{
                    imgURL = downloadURL;
                }).then(()=>addDocument());
            });
        }

        const addDocument = async () => {
            await addDoc(collection(db, "board"), {
                id: formData.id,
                pw: formData.pw,
                img: imgURL,
                content: formData.content,
                date: Timestamp.fromDate(new Date()),
                imgName: imgName
            });
            setFormData(initForm);
            fetchData();
        }

        if (imgFile){
            uploadImg();
        } else {
            addDocument();
        }
        setImgFile(null);
    };
    //////


    /// input[type='file']을 img로 변경하고 미리보기 표시 ///
    const profileImgRef = useRef(null);
    const fileInputClick = () => {
        profileImgRef.current.click();
    };

    const [imgFile, setImgFile] = useState(null);
    const saveImgFile = () => {
        const file = profileImgRef.current.files[0];
        if (!file){
            setImgFile(null);
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
        };
    };
    //////

    
    return (
        <Main>
            <Form
                onSubmit={handleSubmit}
            >
                <Title>
                    <input
                        type="file"
                        id="profileImg"
                        accept="image/*"
                        ref={profileImgRef}
                        onChange={saveImgFile}
                    />
                    <img
                        className="imgPreview"
                        src={imgFile ? imgFile : `${process.env.PUBLIC_URL}/images/board/board_img.png`}
                        onClick={()=>fileInputClick()}
                    />
                    <div className="inputDiv">
                        <input
                            id="id"
                            type="text"
                            placeholder="아이디"
                            value={formData.id}
                            maxLength={10}
                            onChange={handleChangeId}
                        />
                        <input
                            id="pw"
                            type="password"
                            placeholder="비밀번호"
                            value={formData.pw}
                            maxLength={8}
                            onChange={handleChangePw}
                        />
                    </div>
                    <button type="submit">등<br/>록</button>
                    {/* <GitHub
                        src={`${process.env.PUBLIC_URL}/images/git.png`} alt="git"
                        onClick={()=>githubLogin()} /> */}
                </Title>
                <ContentBox>
                    <textarea
                        ref={areaRef}
                        type="text"
                        rows={1}
                        maxLength={maxLength}
                        placeholder="최대 3줄, 100자입니다."
                        name="text"
                        value={formData.content}
                        onChange={handleChangeContent}
                    />
                </ContentBox>
            </Form>
            {board && board.map((item)=>(
                <Board
                    key={item.id}
                    board={item}
                    fetchData={()=>fetchData()}
                />
            ))}
        </Main>
    );
}

export default BoardContain;