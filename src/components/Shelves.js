import React from "react"
import Shelf from "./Shelf"

class Shelves extends React.Component{
    render(){
        const allBooks = this.props.allBooks
        console.log(allBooks)

        const currentlyReading = allBooks.filter(book => book.shelf === "currentlyReading")

        const wantToRead = allBooks.filter(book => book.shelf === "wantToRead")

        const Read = allBooks.filter(book => book.shelf === "read")


        return(
            <div className="list-books-content">
              <div>
                <Shelf books={currentlyReading} title={"Currently Reading"} handleChangeShelf={this.props.handleChangeShelf}/>
                <Shelf books={wantToRead} title={"Want to Reading"} handleChangeShelf={this.props.handleChangeShelf}/>
                <Shelf books={Read} title={"Read"} handleChangeShelf={this.props.handleChangeShelf}/>
              </div>
              
            </div>

        )
    }
}


export default Shelves