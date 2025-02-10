import { useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {

  // query will be the topic you want the news about
  const [query, setQuery] = useState('')
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  const API_KEY = import.meta.env.VITE_REACT_APP_NEWS_API_KEY

  // testing if the api works
  const fetchNews = async () => {
    // if the query is empty return
    if (!query) {
      return
    }
    
    // set loading true, ie we are fetching the news
    setLoading(true)

    console.log(query);
    // call the api in try and catch block
    try {
      // clog the query inputted
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
      setArticles(response.data.articles)
    } catch (error) {
      console.log(`Error Fetching News: ${error.message}`);
    } finally {
      setLoading(false)
    }

    console.log(articles);
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchNews()
  }
  

  return (
    <>
      <h1>News App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className='border'
          placeholder='Enter a topic or area'
          value={query} />
        <button
          type='submit'
          className='bg-sky-500 text-black'
        >
          Get News
        </button>
      </form>
    </>
  )
}

export default App
