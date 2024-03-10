import React, {  useState } from 'react'
import Sidebar from '../Components/Sidebar'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import axios from 'axios'
import { Row,Col } from 'reactstrap'
import SongCard from '../Components/SongCard'
import '../App.css'
import Homepage from './Homepage'
const Search = () => {
  const [input,setInput]=useState('')
  const [isLoading,setIsLoading]=useState(false)
  const [data,setData]=useState([])
  const [image,setImage]=useState('')
  const [title,setTitle]=useState('')
    const handleSearch=async(e)=>{
      e.preventDefault();
        const options = {
            method: 'GET',
            url: "https://youtube-search-and-download.p.rapidapi.com/search",
            params: {
              query: input,
              
              hl: 'en',
              gl: 'IN',
              
            },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_YOUTUBE_KEY,
              'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
            }
          };

try {
	const response = await axios.request(options);
	setData(response.data.contents)
    setImage(response.data.contents[0].video.thumbnails[0].url)
    setTitle(response.data.contents[0].video.title)
    setIsLoading(true)
} catch (error) {
	console.error(error);
}

    }
  return (
    <React.Fragment>
      {/* <Homepage /> */}
     <div className="flex gap-0 h-screen overflow-hidden    bg-black ">
    <div className=''>
    <div className='text-white ml-5 text-3xl flex  items-end   '>
      <b>Search</b>
      </div>
      <form onSubmit={(e)=>e.preventDefault()} className='flex gap-2'>
      <input 
      type='text'
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      className='border pl-2 pr-2 ml-5 mt-8 w-60 bg-slate-50 rounded-lg p-2 outline-none text-black'
      placeholder='Find your track...'
      />
        <button type='submit'
        className='bg-slate-50 p-2 rounded-lg text-gray-500 mt-8'
        onClick={(e)=>handleSearch(e)} >
          <Icon path={mdiMagnify} size={1} />
        </button>
      </form>
      <div className=' mt-10 ml-5 mb-10'>
        <div className='flex flex-row overflow-hidden overflow-x-scroll  ' style={{width:'80rem'}} >
        {
            isLoading && data.length>0 ?(data.map((obj,index)=>(
                'video' in obj ?(
<SongCard key={index} image={obj.video.thumbnails[0].url} title={obj.video.title} id={obj.video.videoId} />
                ):(
                    <></>
                )  
            ))):(<div className='text-white m-8'></div>)
        }
        </div>
      
       
      </div>
      
    </div>
    </div>
    </React.Fragment>
  )
}

export default Search