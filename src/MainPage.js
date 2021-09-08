import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from "./components/Shelves"
import SearchPage from "./components/SearchPage"
import Header from "./components/Header"
// import { Link } from 'react-router-dom'
import SearchButton from './components/SearchBtn'

class MainPage extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks:[],
  }

  updateSearchPage = (prevState) =>{
    this.setState({
      showSearchPage: prevState
    })
  }

  componentDidMount(){
    BooksAPI.getAll()
      .then(response => this.setState({allBooks: response}))
  }

  handleChangeShelf = (book, shelf) => {
    book.shelf = shelf
    if (this.state.allBooks.indexOf(book) < 0) {
      this.state.allBooks.push(book)
    }
    BooksAPI.update(book, shelf)
      .then(
        this.setState((prevState, props) => {
          return {
            allBooks: prevState.allBooks.map(b => b.id === book.id ? book : b)
          }
        })
      )
  }
  

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (<SearchPage showSearchPage={this.updateSearchPage} allBooks = {this.state.allBooks}/> ) : (
          <div className="list-books">
            <Header/>
            <Shelves allBooks={this.state.allBooks} handleChangeShelf={this.handleChangeShelf}/> 
            <SearchButton showSearchPage={this.updateSearchPage}/>
          </div>
        )}
      </div>
    )
  }
}

export default MainPage
