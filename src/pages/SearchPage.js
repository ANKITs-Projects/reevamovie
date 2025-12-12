import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage]=useState(1)
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const resp = await axios.get(`/search/multi`, {
        params: {
          query: location?.search?.slice(3),
          page: page
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...resp.data.results
        ]
      })

    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    if(location?.search?.slice(3)){
      setPage(1)
    setData([])
    fetchData()
    }
  }, [location?.search])

  const handelScroll = ()=>{
    if((window.innerHeight + window.scrollY)>=document.body.offsetHeight){
      setPage(preve=>preve+1)
    }
  }
  useEffect(()=>{
    fetchData()
  },[page])

  useEffect(()=>{
    window.addEventListener('scroll',handelScroll)
  },[])

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-20 z-30 ">
        <input type="text" placeholder='Search' value={location?.search?.slice(3).split("%20").join(" ")} onChange={(e)=>navigate(`/search?q=${e.target.value}`)}
        className="px-4 py-1 text-lg w-full bg-white rounded-full mx-2 text-neutral-900"
        />
      </div>
      <div className="container mx-auto lg:ml-5">
        <h3 className="capitalize text-lg lg:text-xl my-3 pl-2 font-semibold">Search Result</h3>
        <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-6 justify-center lg:justify-start">
          {
            data.map((searchData, index) => {
              return (
                <Card data={searchData} key={searchData.id + 'search' + index} media_type={searchData.media_type} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage