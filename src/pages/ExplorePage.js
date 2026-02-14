import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  const [loading, setLoading] = useState(false) // Added loading state
  const [error, setError] = useState(null) // Added error state

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null) // Reset error before new fetch
      const resp = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo
        }
      })
      setData((preve) => {
        return [
          ...preve,
          ...resp.data.results
        ]
      })
      setTotalPageNo(resp.data.total_pages)
    } catch (error) {
      console.log("error", error)
      // Capture error message to show on screen
      setError(error.message || "Something went wrong while loading data.") 
    } finally {
      setLoading(false) // Stop loading regardless of success/fail
    }
  }

  const handelScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPageNo(preve => preve + 1)
    }
  }

  useEffect(() => {
    fetchData()
  }, [pageNo])

  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
    return () => window.removeEventListener('scroll', handelScroll) // Clean up listener
  }, [])

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl my-3 pl-2 font-semibold">
          popular {params.explore} Show
        </h3>

        {/* --- ERROR MESSAGE UI --- */}
        {error && (
          <div className="text-center my-10 px-4">
            <h2 className="text-2xl font-bold text-red-600">Oops! Data could not be loaded.</h2>
            <p className="text-neutral-400 mt-2">{error}</p>
            <p className="mt-4 text-sm text-neutral-500">
              If you are on a laptop, please <strong>disable your Ad-blocker</strong> (like uBlock or AdBlock) and refresh the page.
            </p>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-6 justify-center">
          {
            data.map((data, index) => {
              return (
                <Card data={data} key={data.id + 'explorSection' + index} media_type={params.explore} />
              )
            })
          }
        </div>

        {/* --- LOADING INDICATOR --- */}
        {loading && (
          <div className="text-center my-5">
             <p className="text-neutral-400">Loading more {params.explore}...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExplorePage