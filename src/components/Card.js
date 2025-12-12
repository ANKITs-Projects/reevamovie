import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom';


const Card = ({ data, trending, index,media_type }) => {
    
    const imgUrl = useSelector(state => state.reevamovieData.imageUrl)
    const mediaType = data.media_type ?? media_type

    return (
        <Link to={"/" + mediaType + "/" + data.id} className="w-full min-w-[220px] max-w-[220px] h-100 overflow-hidden block hover:scale-110 rounded relative">
            {
                data?.poster_path ? (
                    <img src={imgUrl + data?.poster_path} alt="" />
                ):(
                    <h3 className="bg-neutral-800 h-full w-full flex items-center justify-center">
                        No Image Found
                    </h3>
                )
            }
            <div className="absolute top-2">
                {
                    trending && (
                        <div className="py-1 px-4 bg-black/80 font-bold overflow-hidden backdrop-blur-3xl rounded-r">
                            #{index} Trending
                        </div>
                    )
                }
            </div>
            <div className=" absolute bottom-0 h-16 p-2 backdrop-blur-3xl bg-black w-full">
                <h2 className="text-ellipsis line-clamp-1 text-md font-semibold">{data.title || data.name}</h2>
                <div className="text-sm text-neutral-400 flex justify-between  items-center">
                    <p>{moment(data.release_date).format("MMM Do YYYY")}</p>
                    <p className="bg-blackpx-1 text-white rounded">Rating: {Number(data.vote_average).toFixed(1)}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card