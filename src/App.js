import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './search';

function App() {

  const [persons, setPersons] = useState([])
  const [searchfilter,setsearchFilter]=useState('')
  const [search,setSearch]=useState([])

 
   
   
 

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        console.log(response.data)
      })
  }, [])

  const handlefilter = (e) =>{
    e.preventDefault()
    setsearchFilter(e.target.value)
    setSearch(
      persons.filter(
        (c) =>
          c.name.toUpperCase().includes(e.target.value.toUpperCase())
      )

    )

    return(
      <p>{searchfilter}</p>
    )
   
   
  }

  if (persons.length === 0)
  {
    return (
      <div className="App">
        No Data Available
      </div>
    );
  }
  else 
  {
      return (
      <div>
        <h1>search</h1>
        <input type="text" onChange={handlefilter}></input>
        
        <p>
          {search.map(e =>(
            <div>
              <p>{e.name} </p>
              
            </div>
          ))}
        
        </p>
      
        
      
        <div>
        
        <h4> To add new data, submit the values </h4>
        
        
       

        </div>
      </div>

    );
  }
}

export default App;