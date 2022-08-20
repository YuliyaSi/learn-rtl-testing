import {useEffect, useState} from "react";

const getUser = () => Promise.resolve({ id: 1, name: "Yuliya"})

const Search = ({ value, onChange, children }) => (
    <div>
        <img alt="search-image"/>
      <label htmlFor="search">{children}</label>
        <br/>
      <input type="text" id="search" value={value} onChange={onChange} placeholder="Search text..." required/>
    </div>
)

const App1 = () => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
      const loadUser = async () => {
          return await getUser()
      }

      loadUser().then(data => setUser(data))
  }, [])

  const handleChange = ({ target }) => {
    setSearch(target.value);
  }

  return (
      <div>
          {user && <h2>Logged as {user.name}</h2>}
        <Search value={search} onChange={handleChange}>
          Search:
        </Search>
        <p>Searches for {search || '...'}</p>
      </div>
  )
}

export default App1;