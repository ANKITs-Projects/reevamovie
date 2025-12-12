import React, { useRef } from 'react'
import Card from "./Card";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';


const HorizontalScrollCard = ({ data = [], heading,trending, media_type }) => {
    const containeRref = useRef()

    const handleNext=()=>{
        containeRref.current.scrollLeft += 300
    }
    const handlePrevious=()=>{
        containeRref.current.scrollLeft -= 300
    }



    return (
        <div className="container mx-auto px-3 my-10">
            <h2 className="text-xl lg:text-2xl font-bold mb-3 text-white capitalize">{heading}</h2>
            <div className=" relative">
                <div ref={containeRref} className=" grid grid-cols-[repeat(auto-fit,220px)] grid-flow-col gap-5 overflow-hidden relative z-10 overflow-x-scroll scroll-smooth transition-all scrollbar-non">
                    {
                        data.map((data, index) => {
                            return (
                                <Card key={data.id + "heading" + index} data={data} trending={trending} index={index + 1} media_type={media_type} />
                            )
                        })
                    }
                </div>
                <div className="hidden lg:flex absolute top-0 justify-between w-full h-full items-center">
                    <button onClick={handlePrevious} className="bg-white text-black p-1 ml-1 rounded-full z-10">
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleNext} className="bg-white text-black p-1 mr-1 rounded-full z-10">
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HorizontalScrollCard