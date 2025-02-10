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

  const handleArticleClick = (url) => {
    // Open the article in a new tab
    window.open(url, '_blank', 'noopener,noreferrer')
  }


  return (
    <>
      <h1 className='text-3xl font-semibold'>News App</h1>

      {/* form to enter the query */}
      <form
        className='mt-5 flex gap-4  justify-center items-center py-4' onSubmit={handleSearch}>
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          className='border rounded-md p-2 text-xl'
          placeholder='Enter a topic or area'
          value={query} />
        <button
          type='submit'
          className='bg-neutral-500 hover:bg-neutral-600 text-white rounded-md p-2 text-xl'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </form>

      {/* to display the news in grid form*/}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
          {articles.map((article, index) => (

            // div for each article
            <div
              key={index}
              onClick={() => handleArticleClick(article.url)}
              className=" rounded-md p-3 flex flex-col items-center justify-center bg-black text-white hover:cursor-pointer hover:scale-105 transition duration-200 "
            >
              <h2 className='font-semibold'>{article.title}</h2>
              <img
                src={article.urlToImage || "https://via.placeholder.com/150"}
                alt={article.title}
                className='rounded my-3 h-48 object-cover'
              />

              <p className='my-2 text-neutral-400'>{article.description}</p>
              <p className='my-2 text-neutral-400'>Article by <span className='text-white'>{article.author}</span></p>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default App
