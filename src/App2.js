import {useState} from "react";
import axios from "axios";

const URL = "http://hn.algolia.com/api/v1/search"

const App2 = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    try {
        const result = await axios.get(`${URL}?query=React`);
        setNews(result.data.hits);
    } catch (error) {
        setError(error)
    }
  }

  return (
      <div>
          <button type="button" onClick={handleFetch}>
              Fetch news
          </button>
          {error && <span>Something went wrong...</span>}

          <ul>
              {news.map(({ objectId, url, title}) => (
                  <li key={objectId}>
                      <a href={url}>{title}</a>
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default App2;