import axios from "axios"
import { useEffect, useState } from "react"

const useFetch = (endPoinUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null) // New error state

    // const fetchData = async () => {
    //     try {
    //         setLoading(true)
    //         setError(null) // Reset error before new fetch
    //         const resp = await axios.get(endPoinUrl)
    //         setData(resp.data.results)
    //     } catch (err) {
    //         // Set the error message to show on screen
    //         setError(err.message || "Something went wrong while fetching data.") 
    //         console.log(err)
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // useEffect(() => {
    //     if (endPoinUrl) {
    //         fetchData()
    //     }
    // }, [endPoinUrl])

    useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null)
            const resp = await axios.get(endPoinUrl);
            setData(resp.data.results);
        } catch (err) {
            setError(err.message || "Error fetching data.");
        } finally {
            setLoading(false);
        }
    };

    if (endPoinUrl) {
        fetchData();
    }
}, [endPoinUrl]);


    // Return error so the component can use it
    return { data, loading, error } 
}

export default useFetch