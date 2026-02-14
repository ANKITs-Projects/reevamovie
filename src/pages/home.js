import React from 'react'
import BannerHome from '../components/bannerHome'
import { useSelector } from 'react-redux'
import HorizontalScrollCard from '../components/HorizontalScrollCard'
import useFetch from '../Hooks/useFetch'

const Home = () => {
  const trendingData = useSelector(state => state.reevamovieData.bannerData)
  
  // Destructure the new 'error' and 'loading' states
  const { data: nowPlayingData, loading, error } = useFetch("/movie/now_playing")
  const { data: topRatedData } = useFetch("/movie/top_rated")
  const { data: popularTvShow } = useFetch("/tv/popular")
  const { data: onTheAirTvShow } = useFetch("/tv/on_the_air")

  // Show a loading message
  if (loading && nowPlayingData.length === 0) {
    return <div className='text-center mt-10'>Loading movies...</div>
  }

  // SHOW THE MESSAGE ON SCREEN IF IT FAILS
  if (error) {
    return (
      <div className='text-center mt-20 px-4'>
        <h2 className='text-2xl font-bold text-red-600'>Oops! Data not loading.</h2>
        <p className='text-neutral-400 mt-2'>{error}</p>
        <p className='mt-4 text-sm'>
          If you are on a laptop, please <strong>disable your Ad-blocker</strong> (like uBlock or AdBlock) and refresh the page.
        </p>
      </div>
    )
  }

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard data={trendingData} heading={'Trending Movies'} trending={true}/>
      <HorizontalScrollCard data={nowPlayingData} heading={'Now Playing'} media_type={"movie"}/>
      <HorizontalScrollCard data={topRatedData} heading={'Top Rated Movies'} media_type={"movie"}/>
      <HorizontalScrollCard data={popularTvShow} heading={'Popular TV Show'} media_type={"tv"}/>
      <HorizontalScrollCard data={onTheAirTvShow} heading={'On The Air'} media_type={"tv"}/>
    </div>
  )
}

export default Home