import { useEffect,useState } from 'react';
import axios from 'axios';
import { Cont } from './components/table';


const App:React.FC = () => {
  // array of objects state || name state ||contact array of object
  const [contacts, setContacts] = useState<Cont[]>([])


  //form onClick event
  const handleAddContactOnClick=async()=>{
      //fetch api using axios
      const response:any = await axios.get("https://randomuser.me/api")
      const res = response.data.results
      
      //adding contact from api into contacts as array
      let contact ={
        name:`${res[0].name.title}. ${res[0].name.first} ${res[0].name.last}`,
        email: `${res[0].email}`
      }
      setContacts([...contacts,contact]);
      
    }

  
  //sending contacts into localStorage as string whenever contacts update
	useEffect(() => {
		localStorage.setItem('contacts', JSON.stringify(contacts));
	}, [contacts]);

  return (
   
      <div className="wrapper">
      <h1>Contact book</h1>
      <p>View name and email by clicking refresh button</p>
      <div className='view-container'>
      {contacts.length>0 && <>
        <div className='table-responsive'>
          <table className='table' >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              
              {contacts.map((contact,i) =>(

              <tr key={i}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>}
      
      {contacts.length < 1 && <div>No contacts added yet</div>}
      <button onClick={handleAddContactOnClick} className='btn btn-success btn-md'>
            Refresh
          </button>
      </div>
    </div>
    
  );
}

export default App;
