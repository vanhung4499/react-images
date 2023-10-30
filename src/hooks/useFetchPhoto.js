import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient.js";

function useFetchPhoto(query, currentPage) {
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setPhotos([]);
    }, [query]);

    useEffect(() => {
        if (query) {
            fetchPhoto();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, currentPage]);

    const fetchPhoto = async () => {
        setLoading(true);
        try {
            const { data } = await axiosClient.get(`/search?query=${query}&page=${currentPage}&per_page=8`);

            data?.next_page && setHasMore(true);
            setPhotos((prev) => [...prev, ...data.photos]);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return {
        loading,
        photos,
        hasMore,
    };
}

export default useFetchPhoto;
