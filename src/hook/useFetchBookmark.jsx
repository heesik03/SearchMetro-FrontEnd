import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchBookmarks(token, userid) {
    const [bookmarkArray, setBookmarkArray] = useState([]);

    useEffect(() => {
        const fetchBookmark = async () => {
            if (token && userid) {
                const getBookmarkResponse = await axios.get(`${process.env.REACT_APP_BACKEND_LINK}/?userid=${userid}`);
                setBookmarkArray(getBookmarkResponse.data.bookmarkData.reverse());
            }
        };
        fetchBookmark();
    }, [token, userid]);

    return [bookmarkArray, setBookmarkArray];  // 상태와 상태 갱신 함수 반환
}
