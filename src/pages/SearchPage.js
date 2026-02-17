import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation()
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false) // Added loading state
  const [error, setError] = useState(null) // Added error state
  const navigate = useNavigate()

  // Extract query from URL (?q=searchterm)
  const query = location?.search?.slice(3)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null) // Reset error on new attempt
      const resp = await axios.get(`/search/multi`, {
        params: {
          query: query,
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
      // Set the error message for the screen
      setError(error.message || "Failed to fetch search results.")
    } finally {
      setLoading(false) // Ensure loading stops
    }
  }, [query, page])

  // Effect to handle new search terms
  useEffect(() => {
    if (query) {
      setPage(1)
      setData([])
      // We don't call fetchData() here because setPage(1) 
      // will trigger the [page] effect below if it wasn't already 1.
      // If it was already 1, we call it manually:
      if (page === 1) {
        fetchData()
      }
    }
  }, [location?.search])

  // Effect to handle pagination
  useEffect(() => {
    if (query && page > 1) {
      fetchData()
    }
  }, [query, fetchData])

  const handelScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
      setPage(preve => preve + 1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
    // Clean up the listener when the component unmounts
    return () => window.removeEventListener('scroll', handelScroll)
  }, [])

  return (
    <div className="py-16">
      {/* Search Input for Mobile */}
      <div className="lg:hidden my-2 mx-1 sticky top-20 z-30 ">
        <input 
          type="text" 
          placeholder='Search' 
          value={query?.split("%20").join(" ")} 
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          className="px-4 py-1 text-lg w-full bg-white rounded-full mx-2 text-neutral-900"
        />
      </div>

      <div className="container mx-auto lg:ml-5">
        <h3 className="capitalize text-lg lg:text-xl my-3 pl-2 font-semibold">Search Result</h3>
        
        {/* --- ERROR MESSAGE UI --- */}
        {error && (
          <div className="text-center my-10 px-4">
            <h2 className="text-2xl font-bold text-red-600">Oops! Search failed.</h2>
            <p className="text-neutral-400 mt-2">{error}</p>
            <p className="mt-4 text-sm text-neutral-500">
              On laptops, <strong>Ad-blockers</strong> often block search results. 
              Please disable them for this site and refresh.
            </p>
          </div>
        )}

        <div className="grid grid-cols-[repeat(auto-fit,220px)] gap-6 justify-center lg:justify-start">
          {
            data.map((searchData, index) => {
              return (
                <Card data={searchData} key={searchData.id + 'search' + index} media_type={searchData.media_type} />
              )
            })
          }
        </div>

        {/* --- LOADING INDICATOR --- */}
        {loading && (
          <div className="text-center my-10">
            <p className="text-neutral-400">Searching...</p>
          </div>
        )}

        {/* --- NO RESULTS MESSAGE --- */}
        {!loading && !error && data.length === 0 && query && (
          <div className="text-center my-10 text-neutral-400">
            No results found for "{query.split("%20").join(" ")}"
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchPage