import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from "../components/Card";

const ExplorePage = () => {
  
  const params = useParams()
  const [ pageNo,setPageNo]= useState(1)
  const [data,setData] = useState([])
  const [totalPageNo, setTotalPageNo]= useState(0)
  const fetchData = async() =>{
    try{
      const resp= await axios.get(`/discover/${params.explore}`,{
        params : {
          page :pageNo
        }
      })
      setData((preve)=>{
        return [ 
          ...preve,
          ...resp.data.results
        ]
      })
      setTotalPageNo(resp.data.total_pages)
    }catch(error){
      console.log("error",error)
    }
  }

  const handelScroll = ()=>{
    if((window.innerHeight + window.scrollY)>=document.body.offsetHeight){
      setPageNo(preve=>preve+1)
    }
  }

  useEffect(()=>{
    fetchData()
  },[pageNo])

  useEffect(()=>{
    setPageNo(1)
    setData([])
    fetchData()
  },[params.explore])

  useEffect(()=>{
    window.addEventListener('scroll',handelScroll)
  },[])

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl my-3 pl-2 font-semibold">popular {params.explore} Show</h3>
        <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-6 justify-center">
          {
            data.map((data,index)=>{
              return (
                <Card data={data} key={data.id+'explorSection'+index} media_type={params.explore}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage