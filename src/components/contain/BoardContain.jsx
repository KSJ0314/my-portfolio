import React, {useRef, useState, useEffect} from "react";
import styled from "styled-components";
import Board from "./Board";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Scroll = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 0;
        display: none;
    }
`;
const Main = styled.div`
    width: 90%;
    height: 90%;
    border-radius: 0;
`;

const Form = styled.form`
    width: 100%;
    height: 15vw;
    border-radius: 0;
`;

const Title = styled.div`
    border-top-style: solid;
    border-color: #dbdbdb;
	background-color: ${props=>props.theme.darkTheme.bg9};
    border-radius: 0 !important;
    width: 100%;
    height: 2.1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1vw;

    & input {
        background-color: ${props=>props.theme.darkTheme.bg1};
        
        &[id=id]{
            width: 85%;
            height: 80%;
            border-radius: 0;
            padding: 0.1vw 0.3vw;
        }

        &[id=pw]{
            width: 11%;
            height: 80%;
            border-radius: 0;
            padding: 0.1vw 0.3vw;
        }
    }
    & input[readOnly] {
        border: none;
        background-color: transparent;

        &[id=pw]{
            display: none;
        }
    }

    & > div{
        width: 31%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const GitHub = styled.div`
    width: 11.72%;
    height: 80%;
    cursor: pointer;
    position: relative;

    & img{
        position: absolute;
        border-radius: 0;
    }

    & .default{
        width: 100%;
        height: 100%;
    }

    & .hover{
        width: 50%;
        height: 50%;
        top: 25%;
        left: 25%;
        opacity: 0;
        transition: 0.2s;
    }

    &:hover .hover{
        width: 80%;
        height: 80%;
        left: 10%;
        top: 10%;
        opacity: 1;
    }
`;

const ContentBox = styled.div`
    width: 100%;
    height: 9vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
    & img {
        width: 7vw;
        height: 7vw;
        border-style: solid;
        border-color: ${({theme}) => theme.darkTheme.bd1};
        cursor: pointer;
    }

    & #profileImg{
        display: none;
    }

    & .text{
        width: 80%;
        height: 7vw;
        display: flex;
        flex-direction: column;
        align-items: end;

        & .textarea{
            width: 100%;
            height: 100%;
            flex-shrink: 0;
            border-radius: 0;
            border-style: solid;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        & textarea{
            width: 95%;
            border-radius: 0;
            border: none;
            resize: none;
            background-color: transparent;
        }

        & button{
            margin-top: 1vw;
            padding: 0.2vw 0.5vw;
            border-radius: 0.3vw;
            background-color: ${props=> props.theme.darkTheme.bg1};
            cursor: pointer;
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
        <Scroll>
            <Main>
                <Form
                    onSubmit={handleSubmit}
                >
                    <Title>
                        <div>
                            {/* <GitHub
                                onClick={()=>githubLogin()}
                            >
                                <img className="default" src={`${process.env.PUBLIC_URL}/images/git.png`} alt="git"/>
                                <img className="hover" src={`${process.env.PUBLIC_URL}/images/git2.png`} alt="git" title="GitHub 로그인"/>
                            </GitHub> */}
                            <input
                                id="id"
                                type="text"
                                placeholder="아이디"
                                value={formData.id}
                                maxLength={10}
                                onChange={handleChangeId}
                            />
                        </div>
                        <input
                            id="pw"
                            type="password"
                            placeholder="비밀번호"
                            value={formData.pw}
                            maxLength={8}
                            onChange={handleChangePw}
                        />
                    </Title>
                    <ContentBox>
                        <input
                            type="file"
                            id="profileImg"
                            accept="image/*"
                            ref={profileImgRef}
                            onChange={saveImgFile}
                        />
                        <img
                            src={imgFile ? imgFile : `${process.env.PUBLIC_URL}/images/board/board_img.png`}
                            onClick={()=>fileInputClick()}
                        />
                        <div className="text">
                            <div className="textarea">
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
                            </div>
                            <button type="submit">등록</button>
                        </div>
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
        </Scroll>
    );
}

export default BoardContain;