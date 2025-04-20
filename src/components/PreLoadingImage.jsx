import { useEffect } from "react";

function PreLoadingImage(props) {

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
        "velog.png",
        "menu/home.png",
        "menu/homeS.png",
        "menu/homeSD.png",
        "menu/prj.png",
        "menu/prjS.png",
        "menu/prjSD.png",
        "menu/social.png",
        "menu/socialS.png",
        "menu/socialSD.png",
        "menu/spec.png",
        "menu/specS.png",
        "menu/specSD.png",
        "menu/board.png",
        "menu/boardS.png",
        "menu/boardSD.png"
    ];

    function preloadImage() {
        UrlArr.forEach((url) => {
            const image = new Image();
            image.src = `${process.env.PUBLIC_URL}/images/${url}`;
        })
        console.log("PreLoad Success");
    };

    useEffect(()=>{
        preloadImage();
    }, []);

    return null;
}

export default PreLoadingImage;