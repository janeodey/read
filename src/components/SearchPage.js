import React from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from "../BooksAPI"
import Shelf from "./Shelf"

class SearchPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          query: "",
          showBooks: [],
          result:[]
        }
    }

    componentDidMount(){
        BooksAPI.getAll()
            .then(res =>{
              this.setState({showBooks: res})
            })
    }

    updateQueryState = (query) =>{
        this.setState({query: query}, this.submitSearch)
    }

    submitSearch =()=>{
        if(this.state.query === "" || this.state.query === undefined){
            return this.setState({result: []})
        }
        BooksAPI.search(this.state.query.trim())
            .then(res=>{
                if(res.error){
                    return this.setState({result:[]})
                }else{
                    res.forEach(b=>{
                        let book = this.state.showBooks.filter(B => B.id === b.id)
                        if(book[0]){
                            b.shelf = book[0].shelf
                        }
                    })
                    return this.setState({result: res})
                }
            })
    }

    // updateBook = (book, shelf) =>{
    //     BooksAPI.update(book, shelf)
    //         .then(res => {
    //             book.shelf = shelf
    //             this.setState(prevState =>({
    //                 showBooks: prevState.showBooks.filter(b => b.id !== book.id).concat([book])
    //             }))
    //         })
    // }

    

    render(){
        return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link  to="/">
                <button className="close-search" onClick={() => this.props.showSearchPage(false)}>Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateQueryState(event.target.value)} value={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                  {
                    this.state.result.map((item,key) => <Shelf key={key} book={item}  />)
                  }
              </ol>
            </div>
          </div>

        )
    }
}

export default SearchPage