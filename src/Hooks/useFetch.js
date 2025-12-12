import axios from "axios"
import { useEffect, useState } from "react"



const useFetch = (endPoinUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const resp = await axios.get(endPoinUrl)
            setLoading(false)
            setData(resp.data.results)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[endPoinUrl])
    return { data, loading }
}

export default useFetch