import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetchBookmarks(token, userid) {
    const [bookmarkArray, setBookmarkArray] = useState([]);

    useEffect(() => {
        const fetchBookmark = async () => {
            if (token && userid) {
                const getBookmarkResponse = await axios.get(`https://port-0-searchmetro-backend-m5kj7lff67bc616e.sel4.cloudtype.app/?userid=${userid}`);
                setBookmarkArray(getBookmarkResponse.data.bookmarkData.reverse());
            }
        };
        fetchBookmark();
    }, [token, userid]);

    return [bookmarkArray, setBookmarkArray];  // 상태와 상태 갱신 함수 반환
}
