import { doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "./firebase";

const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
}

export const updateVisitorCount = async () => {
    const statsRef = doc(db, "visitorStats", "counts");
    const today = getTodayDate();
    
    // 로컬 스토리지에서 오늘 방문 여부 확인
    const visitedToday = localStorage.getItem('visitedToday');

    if (visitedToday === today) {
        // 이미 오늘 방문한 경우, 카운트를 올리지 않음
        return;
    }

    const docSnap = await getDoc(statsRef);
    const data = docSnap.data();
    const lastVisited = data.lastVisited;

    if (lastVisited !== today) {
        await updateDoc(statsRef, {
            lastVisited: today,
            todayVisitors: 1,
            totalVisitors: increment(1)
        });
    } else {
        await updateDoc(statsRef, {
            todayVisitors: increment(1),
            totalVisitors: increment(1)
        });
    }

    // 방문 기록을 로컬 스토리지에 저장
    localStorage.setItem('visitedToday', today);
}

export const fetchVisitorCount = async () => {
    let todayVisitors = 0;
    let totalVisitors = 0;

    const statsRef = doc(db, "visitorStats", "counts");
    const docSnap = await getDoc(statsRef);
    const data = docSnap.data();

    todayVisitors = data.todayVisitors;
    totalVisitors = data.totalVisitors;

    return {
        todayVisitors: todayVisitors,
        totalVisitors: totalVisitors
    };
};