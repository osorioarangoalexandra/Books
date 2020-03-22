import React from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const NavBar = (props) => {

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
          props.handleLogout()
          props.history.push('/')
        })
        .catch(error => console.log(error))
      }
   
    return ( 
    <div>
      <nav className= 'menu'>
        <Link to='/login'>Log In</Link>
        <br></br>
        <Link to='/signup'>Sign Up</Link>
        <br></br>

        { 
          props.loggedInStatus ? 
          
          <Link to='/logout' onClick={handleClick}>Log Out</Link>
          : null
          
        }
    </nav>
      
    
    </div>

     );
}
 
export default NavBar;



