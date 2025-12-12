import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleLeft,FaAngleRight } from 'react-icons/fa';


const BannerHome = () => {
    const bannerData = useSelector(state => state.reevamovieData.bannerData)
    const imgUrl = useSelector(state => state.reevamovieData.imageUrl)
    const [currentImg,setcurrentImg]= useState(0)
    const handleNext = ()=>{
        if(currentImg<bannerData.length-1){
            setcurrentImg(preve=>preve+1)
        }
    }
    const handlePrevious = ()=>{
        if(currentImg>0){
            setcurrentImg(preve=>preve-1)
        }
    }
    useEffect(()=>{
        const interval= setInterval(() => {
            if(currentImg<bannerData.length-1){
                handleNext()
            }else{
                setcurrentImg(0)
            }
        }, 5000);
        return ()=>clearInterval(interval)
    },[bannerData,imgUrl,currentImg])
    //   console.log("banner", bannerData)


    return (
        <section className="w-full h-full">
            <div className="flex min-h-full max-h-[95vh] overflow-hidden">
                {
                    bannerData.map((data, index) => {
                        return (
                            <div key={index} className="group min-w-full min-h-[450px] 
                            lg:min-h-full overflow-hidden relative transition-all" style={{transform : `translatex(-${currentImg * 100}%)`}}>
                                <div className="w-full h-full">
                                    <img src={imgUrl + data.backdrop_path} alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {/** button next and previous img */}

                                <div className="absolute w-full h-full hidden top-0  
                                items-center justify-between group-hover:lg:flex">
                                    <button onClick={handlePrevious} className="hover:bg-white 
                                    hover:text-black p-1 rounded-full text-2xl z-10 text-white ml-5 ">
                                    <FaAngleLeft className="size-10 "/>
                                    </button>
                                    <button onClick={handleNext} className="hover:bg-white 
                                    hover:text-black p-1 rounded-full text-2xl z-10 text-white mr-5">
                                        <FaAngleRight className="size-10 "/>
                                    </button>
                                </div>


                                <div className="absolute top-0 w-full h-full 
                                    bg-gradient-to-t from-neutral-900 to-transparent">
                                </div>
                                <div className="container mx-auto w-full">
                                    <div className=" absolute bottom-0 max-w-md px-3">
                                        <h2 className=" font-bold text-2xl lg:text-4xl
                                        text-white drop-shadow-2xl">{data.title || data.name}</h2>
                                        <p className="text-ellipsis line-clamp-3 my-2">{data.overview}</p>
                                        <div className="flex items-center gap-4">
                                            <p> Rating: {Number(data.vote_average).toFixed(1)}+</p>
                                            <span>|</span>
                                            <p>Views: {Number(data.popularity).toFixed(0)}</p>
                                        </div>
                                        <button className="bg-red-800 px-4 py-2 text-black 
                                        font-bold rounded-md my-4 shadow-md hover:scale-105">
                                            Play Now
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </section>
    )
}

export default BannerHome