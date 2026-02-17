import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetail = (endPoinUrl) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // const fetchData = async () => {
    //     try {
    //         setLoading(true);
    //         setError(null);
    //         const resp = await axios.get(endPoinUrl);
    //         setData(resp.data);
    //     } catch (err) {
    //         setError(err.message || "Failed to load details.");
    //         console.log("Error", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const resp = await axios.get(endPoinUrl);
            setData(resp.data);
        } catch (err) {
            setError(err.message || "Failed to load details.");
            console.log("Error", err);
        } finally {
            setLoading(false);
        }
    };
    
        if (endPoinUrl) {
            fetchData();
        }
    }, [endPoinUrl]);

    return { data, loading, error };
};

export default useFetchDetail;