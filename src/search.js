import React, { useEffect } from 'react'
import axios from 'axios';


const Search =({post,handlename,handlenumber,data,search,setSearch}) =>{

function del(c){
    const id= c.id
    const url = 'http://localhost:3001/persons/' + id
   
    if (window.confirm(`Delete ${c.name}?`)){
        axios
        .delete(url)
        .then(
            response =>{
                console.log("deleted");
                setSearch(search.filter(person => person.id !== id))
            }
        )

    }
    const node ={
      name:"bha",
      number:"789"
  }
  
  axios.
  put("http://localhost:3001/persons/11",node)
  .then(
      response =>{
          console.log(response.data)
      }
  )
  

    
       
    
}




 



    return (
        <div>
            
        <form onSubmit={post}>
        name:
        <input name="text" onChange={handlename} /><br></br>
        number:
        <input name="text" onChange={handlenumber} />
        <button>submit</button>
      </form>
      
        <p>{data.length}</p>
      <ul>
      <p>contacts</p>
      {search.map(c =>(
        <div>
          <li key={c.id}>{c.name}  
          {c.number} 
          <button onClick={() => del(c)}>delete</button>
          </li>
         
        </div>
      ))}
    </ul>
    
      </div>
     
    )
}
export default Search