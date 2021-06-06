import React from 'react'
import { useState,useEffect,useRef } from 'react'

import './index.css';
import Form from './components/persondata'
import person from './service/person'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('') 
  const [Phonenumber,setPhn]=useState('')
  const [ searchName, setSearchName ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ type, setType ] = useState('');
  const focusName = useRef();
  
  

  useEffect(() => {
    person.getAll()
    .then(setPersons);
    console.log(persons)
  }, []);
  
  const addNote = event => {
    event.preventDefault()
   const existingPerson=persons.find(person=>person.name === newName);

   if(existingPerson){
   window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) &&
    person.update(existingPerson.id,{number:Phonenumber,name:newName})
    .then(updatedPerson=>{
      setPersons(persons.map(person=>person.id === updatedPerson.id ? updatedPerson : person));

      setMessage(`Updated ${newName}'s number`);
      setType('info');
      setNewName('');
      setPhn('');
      focusName.current.focus();    
    })
    .catch(error=>{
      if(error.name ==='TypeError'){
        setMessage(`Information of ${newName} has already been deleted`);
        {console.log(persons)}
        setPersons(persons.filter(person=>person.id !== existingPerson.id));
        

      }
      else{
        setMessage(error.response.data.error);
      }
      setType('error');

    });
   }
else{
  
    person.create(newName,Phonenumber)
    .then(newPerson=>{
      setPersons(persons.concat(newPerson));
      setMessage(`Added ${newName}`);
      setType('info');
      setNewName('')
    setPhn('')
    
      
    console.log(persons) 

    })
    .catch((error) => {
      console.warn(error.response.data.error);
      setMessage(error.response.data.error)
      setType("error")
    })
   

  

    
   
   
  }
    
};


const Notification = ({message, type, setMessage, setType}) => {

 
  useEffect(() => {
      if (message) {
          const timer = setTimeout(() => {
              setMessage(null);
              setType('');
          }, 5000);
          return () => clearTimeout(timer);
      }
     
  }, [message]);

  return (
      message ?
      <div className={type}>
          {message}
      </div>
      :
      null
  );
};
const deletePerson=(id,name)=>{
  if(window.confirm(`Delete ${name}?`)){
    person.remove(id)
    .then(()=>{
      setPersons(persons.filter(person => person.id !== id));
      setMessage(`Deleted ${name}`);
      setType('info'); 
    });
  }
};


  const handlename = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handlenumber = (event) => {
    console.log(event.target.value)
    setPhn(event.target.value)
  }






  return (
    <div>
      <h1>phonebook</h1>
      <Notification message={message} type={type} setMessage={setMessage} setType={setType} />
      <div>
        Search by name:<input value={searchName} 
        onChange={event=>setSearchName(event.target.value)}/>
      </div>
      <Form  addNote={addNote} newName={newName} handlename={handlename} handlenumber={handlenumber} focusName={focusName} Phonenumber={Phonenumber}></Form>
     
      <h1>Numbers</h1>
          
            {
                persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase()))
                .map(person => (
                    <li key={person.id}>
                        {person.name} {person.number} &nbsp;
                        <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
                        
                    </li>
                ))
            }
       
    </div>
  )
}
export default App