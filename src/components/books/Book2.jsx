import React, { Component,useState } from 'react'
import axios from 'axios'
import update from 'immutability-helper'


//  class BooksContainer extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         books: [],
//         namevalue: '',
//         authorvalue: ''
//       }
//       }
function Book2 (){
    
const [listadoLibros, cambiarListado] = React.useState([]);
const [name, cambiarName] = React.useState("")
const [author, cambiarAuthor] = React.useState("")

    getBooks() {
        axios.get('/api/v1/books')
        .then(response => {
          this.setState({listadoLibros: response.data})
        })
        .catch(error => console.log(error))
      }

      createBook = (e) => {
        if (e.key === 'Enter' && !(e.target.value === '')) {
          axios.post('/api/v1/books', {book: {name: e.target.value}})
          .then(response => {
            const books = update(this.state.books, {
              $splice: [[0, 0, response.data]]
            })
            this.setState({
              books: books,
              namevalue: ''
            })
          })
          .catch(error => console.log(error))      
        }    
      } 

      handleChange = (e) => {
        this.setState({namevalue: e.target.value});
        this.setState({authorvalue: e.target.value});
      }

      componentDidMount() {
        this.getBooks()
      }
      render(){
      return (
        <div>
        <div className="inputContainer">
          
          <input className="taskInput" type="text" 
            placeholder="Name of Book" maxLength="50"
            value={this.state.namevalue} onChange={this.handleChange} />

          <input className="taskInput" type="text" 
            placeholder="Author" maxLength="50"
            // onKeyPress={this.createBook}
            value={this.state.authorvalue} onChange={this.handleChange} /> 
        </div>        
        <button onClick={() => this.createBook()}>Create Book</button>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.books.map((book) => {
              return(
                <li className="task" key={book.id}>
                               
                  <label className="taskLabel">{book.name}</label>
                 
                </li>
              )       
            })}        
          </ul>
        </div>
      </div>
    )
  }
}
export default Book2;