import { useState, useEffect } from 'react'
import Masonry from 'masonry-layout'
import imagesLoaded from 'imagesloaded'

import FilterInput from './components/FilterInput'
import Loader from './components/Loader';

import Fetch from './libs/fetch';

import './App.css';

const client = new Fetch(`https://api.nasa.gov/planetary`, {
  errorHandler: (err) => err.statusText
})

function App() {
  const [filter, setFilter] = useState('WEEK')
  const [loading, setLoading] = useState(true)
  const [xhrError, setXhrError] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    console.log('mounted')
   
    handleSubmit(new Date(1997, 4, 9), new Date(2021, 4, 9))
  }, [])

  const handleFilter = ({ target }) => {
    setFilter(target.value)
  }

  const fetchImages = async (req) => {
    try {
      setLoading(true)
      setXhrError(null)

      const res = typeof req.length !== 'undefined' ? await Promise.all(req) : await req


      setLoading(false)
      setImages(res)

      const msnry = new Masonry('.msnry-grid', {
        itemSelector: '.msnry-grid-item',
        columnWidth: '.msnry-grid-sizer',
        percentPosition: true,
      })
  
      const imgLoaded = imagesLoaded('.msnry-grid')
      
      imgLoaded.on('progress', () => {
        msnry.layout()
      })
    } catch (error) {
      console.log(error)
      setLoading(false)
      setXhrError(error)
    }
  }


  const handleSubmit = (startDate, endDate) => {
    if (filter === 'WEEK') {
      const interval = endDate.getFullYear() - startDate.getFullYear()
      const req = Array(interval).fill(0).map((_, index) => client.get(`/apod?api_key=${process.env.REACT_APP_API_KEY}&date=${startDate.getFullYear() + index}-${startDate.getMonth() + 1 === 13 ? 12 : startDate.getMonth() + 1}-${startDate.getDate()}`))

      fetchImages(req)
    } else {
      const start = `${startDate.getFullYear()}-${startDate.getMonth() + 1 === 13 ? 12 : startDate.getMonth() + 1}-${startDate.getDate()}`
      const end = `${endDate.getFullYear()}-${endDate.getMonth() + 1 === 13 ? 12 : endDate.getMonth() + 1}-${endDate.getDate()}`

      fetchImages(client.get(`/apod?api_key=${process.env.REACT_APP_API_KEY}&start_date=${start}&end_date=${end}`))
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4 h-screen p-3 dark:bg-black md:overflow-hidden">
      <div className="col-span-12 md:col-span-4">
        <div className="bg-gray-800 h-auto md:h-full p-3">
          <div className="col-span-12">
            <h1 className="text-white text-center text-2xl mb-10">Astronomy Picture of the Day (APOD)</h1>
          </div>
          <div className="col-span-12">
            <div className="text-xs text-white mb-3">Filters</div>
          </div>
          <div className="col-span-12">
            <label htmlFor="week">
              <input id="week" type="radio" name="filter" value="WEEK" className="invisible text-pink-500" onChange={handleFilter} />
              <div>
                <div className="p-3 bg-gray-900 text-white rounded-t">On this day</div>
                <div className={`p-3 bg-gray-900 filter-input-wrapper ${filter === 'WEEK' ? 'show-input' : 'hide-input'}`}>
                  <FilterInput submitButtonText="Fetch Pictures" onSubmit={handleSubmit} />
                </div>
              </div>
            </label>

            <label htmlFor="month">
              <input id="month" type="radio" name="filter" value="MONTH" className="invisible text-pink-500" onChange={handleFilter} />
              <div className="">
                <div className="p-3 bg-gray-900 text-white rounded-t">On this month</div>
                <div className={`p-3 bg-gray-900 filter-input-wrapper ${filter === 'MONTH' ? 'show-input' : 'hide-input'}`}>
                  <FilterInput hidden={['day', 'yearInterval']} submitButtonText="Fetch Pictures" onSubmit={handleSubmit} />
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 md:overflow-auto">
        <div className="p-3 md:h-full">
          {(loading || xhrError !== null) ? (
            <div className="col-span-12 h-full flex justify-center items-center">
              {loading && (
                <Loader size={96} width={4} />
              )}
              {xhrError && (
                <div className='text-gray-400 text-center text-xl font-thin'>
                  {String(xhrError)}
                </div>
              )}
            </div>
          ) : (
            <div className='msnry-grid'>
              <div className='msnry-grid-sizer'></div>
              {images.map((image) => (
                <div key={image.date} className='msnry-grid-item'>
                  <img src={image.hdurl} alt={image.title} className="w-full h-auto rounded-lg border-4" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
