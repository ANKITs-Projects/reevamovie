import axios from "axios"
import { useEffect, useState } from "react"



const useFetchDetail = (endPoinUrl) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            setLoading(true)
            const resp = await axios.get(endPoinUrl)
            setLoading(false)
            setData(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData()
    },[endPoinUrl])
    
    return { data, loading }
}

export default useFetchDetail