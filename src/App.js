import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from "./components/Shelves"
import SearchPage from "./components/SearchPage"
import Header from "./components/Header"
// import { Link } from 'react-router-dom'
import SearchButton from './components/SearchBtn'
import MainPage from "./MainPage"
import {Route} from "react-router-dom"

class BooksApp extends React.Component {

  render() {
    return (
      <div>
        <Route exact component={MainPage} path="/"/>
        <Route exact component={SearchPage} path="/search"/>
      </div>
    )
  }
}

export default BooksApp
