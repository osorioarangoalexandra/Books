import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'
import '../../App.css';

class BooksContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        books: [],
        namevalue: '',
        authorvalue: '',
       // quality: ''
      }
      }
    
  getBooks() {
    axios.get('/api/v1/books')
    .then(response => {
      this.setState({books: response.data})
      })
      .catch(error => console.log(error))
  }

  
  createBook = (e) => {
       
    axios.post('/api/v1/books',
     {book: 
      {name: this.state.namevalue, 
      author: this.state.authorvalue, 
      quality: this.state.quality,
      language: this.state.language,
      genre: this.state.genre
    }})
    .then(response => {
      const books = update(this.state.books, {
        $splice: [[0, 0, response.data]]
        })
        
        this.setState({
          books: books,
          namevalue: '',
          author: '',
          quality: '',
          language: '',
          genre: ''
        })
      })
      .catch(error => console.log(error))      
    } 


  handleName = (e) => {
    this.setState({namevalue: e.target.value});
  }
        

  handleAuthor = (e) => {
    this.setState({authorvalue: e.target.value});
  }
     

  handleQuality = (e) => {
    this.setState({quality: e.target.value});
  }
   
  handleLanguage = (e) => {
    this.setState({language: e.target.value});
  }

  handleGenre = (e) => {
    this.setState({genre: e.target.value});
  }

  componentDidMount() {
    this.getBooks()
    }
      

  render(){
    return (
   
    <div className="form-style-3">
      
      <br></br>
      <fieldset><legend>General Info</legend>
        
          <label htmlFor="field1">
              <span>Book Name 
              <span className="required">*
              </span></span>
              <input type="text" className="input-field" name="bookname" placeholder="Type here.." 
              value={this.state.namevalue} onChange={this.handleName}/>
          </label>

          
          <label htmlFor="field2">
              <span>Author: 
              <span className="required">*
              </span></span>
              <input type="text" className="input-field" name="author" placeholder="Type here.." 
              value={this.state.authorvalue} onChange={this.handleAuthor}/>
          </label>

          <label htmlFor="field2">
            <span>Quality:
              </span>
              <select value={this.state.quality} onChange={this.handleQuality} name="field3" className="select-field">
               <option defaultValue>Select Quality!</option>
                <option value="Bueno">Good</option>
                <option value="Regular">Regular</option>
                <option value="Malo">Bad</option>
              </select>
          </label>


          <label htmlFor="field2">
            <span>Language:
              </span>
              <select value={this.state.language} onChange={this.handleLanguage} name="field3" className="select-field">
              <option defaultValue>Select language!</option>
                <option value="Spanish">Spanish</option>
                <option value="English">English</option>
              </select>
          </label>


          <label htmlFor="field2">
            <span>Genre:
              </span>
              <select value={this.state.genre} onChange={this.handleGenre} name="field3" className="select-field">
                <option defaultValue>Select Genre!</option>
                <option value="Biography">Biography</option>
                <option value="Children">Children</option>
                <option value="Crime">Crime</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Sci-fi">Science Fiction</option>
              </select>
          </label>

          <label>
            <span> </span>
            <input onClick={(event) => this.createBook(event)} type="submit" value="Submit" />
          </label>
      </fieldset>


              <ul>
                {this.state.books.map((book) => {
                  return(
                    <li key={book.id}>
                      <label>{book.name}</label>
                    </li>
                  )       
                })}        
              </ul>
                                  
              
      </div>
          
            
    )
  }
}
export default BooksContainer;