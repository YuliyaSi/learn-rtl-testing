import {useState} from "react";

const Search = ({ value, onChange, children }) => (
    <div>
      <label htmlFor="search">{children}</label>
        <br/>
      <input type="text" id="search" value={value} onChange={onChange}/>
    </div>
)

const App = () => {
  const [search, setSearch] = useState('');

  const handleChange = ({ target }) => {
    setSearch(target.value);
  }

  return (
      <div>
        <Search value={search} onChange={handleChange}>
          Search:
        </Search>
        <p>Searches for {search || '...'}</p>
      </div>
  )
}

export default App;