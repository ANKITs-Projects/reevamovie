import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetail from '../Hooks/useFetchDetail';
import useFetch from "../Hooks/useFetch";
import { useSelector } from 'react-redux';
import moment from 'moment';
import Devider from '../components/Devider';
import HorizontalScrollCard from '../components/HorizontalScrollCard';
import VideoPlay from '../components/VideoPlay';

function DetailPage() {
  const params = useParams()
  const imgUrl = useSelector(state => state.reevamovieData.imageUrl)
  const { data } = useFetchDetail(`${params?.explore}/${params?.id}`)
  const { data: castdata } = useFetchDetail(`${params.explore}/${params.id}/credits`)
  const {data : similarData }= useFetch(`${params?.explore}/${params?.id}/similar`)
  const {data : recommendationsdata }= useFetch(`${params?.explore}/${params?.id}/recommendations`)
  const director = castdata?.crew?.filter(el => el.job === 'Director').map(el => el?.name)?.join(", ")
  const writer = castdata?.crew?.filter(el => el.job === 'Writer')?.map(el => el?.name)?.join(", ")
  const [playVideo, setVideo]= useState(false)
  const [playVideoId, setPlayVideoId]= useState("")
  
  const handlePlayVideo=(data)=>{
    setPlayVideoId(data?.id)
    setVideo(true)
  }

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="h-full w-full">
          <img src={imgUrl + data?.backdrop_path} alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-800/80 to-transparent"></div>
        </div>
      </div>
      <div className=" container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className=" relative mx-auto w-fit lg:-mt-28 lg:mx-0">
          <img src={imgUrl + data?.poster_path} alt=""
            className="h-80 w-60 object-cover rounded"
          />
          <button className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded 
                              text-lg font-bold hover:bg-gradient-to-l from-red-500 to-orange-500
                              hover:scale-105 transition-all"
          onClick={()=>handlePlayVideo(data)}
          >Play Now</button>
        </div>
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white">{data?.title || data?.name}</h2>
          <p className="text-neutral-300">{data?.tagline}</p>
          <Devider />
          <div className="flex items-center my-3 gap-3">
            <p>
              Rating : {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              views : {Number(data?.vote_count)}
            </p>
            <span>|</span>
            <p>
              Duration : {(Number(data?.runtime) / 60).toFixed(1)} hour
            </p>
          </div>
          <Devider />
          <div>
            <div>
              <h3 className=" text-white text-xl font-bold mb-1">Overview</h3>
              <p>{data?.overview}</p>
              <Devider />
              <div className="flex gap-3  my-3 items-center">
                <p>Status : {data?.status}</p>
                <span> | </span>
                <p>Release Date : {moment(data?.release_date).format("MMM Do YYYY")}</p>
              </div>
              <Devider />
            </div>
            <div>
              <p><span className="text-white">Director : </span> {director}</p>
              <p><span className="text-white">Writer : </span> {writer}</p>
            </div>
            <Devider />
            <div>
              <h2 className="text-lg lg:text-2xl font-bold ">
                Star Cast :
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5">
                {
                  castdata?.cast?.filter(el => el?.profile_path).map((cast, i) => {
                    return (
                      <div className="">
                        <div>
                          <img src={imgUrl + cast?.profile_path} alt="image" className="w-24 h-24 object-cover rounded-full" />
                        </div>
                        <p className="font-bold text-center text-sm">{cast?.name}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollCard data={similarData} heading={"Similar "+params?.explore } media_type={params?.explore}/>
      </div>
      <div>
        <HorizontalScrollCard data={recommendationsdata} heading={"recommended "+params?.explore } media_type={params?.explore}/>
      </div>
      {
        playVideo&&(
        <VideoPlay playVideo={playVideoId} close={()=>setVideo(false)} mediaType={params?.explore}/>
        )
      }
    </div>

  )
}

export default DetailPage