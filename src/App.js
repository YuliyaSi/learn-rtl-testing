import {useState} from "react";
import App1 from "./App1";
import App2 from "./App2";

const Search = ({ value, onChange, children }) => (
    <div>
        <img alt="search-image"/>
      <label htmlFor="search">{children}</label>
        <br/>
      <input type="text" id="search" value={value} onChange={onChange} placeholder="Search text..."/>
    </div>
)

const App = () => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value);
  }

  return (
      <>
          <div>
              <Search value={search} onChange={handleChange}>
                  Search:
              </Search>
              <p>Searches for {search || '...'}</p>
          </div>
          <hr/>
          <App1/>
          <hr/>
          <App2/>
      </>
  )
}

export default App;