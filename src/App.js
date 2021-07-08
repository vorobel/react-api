import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      booksData: []
    }

  }



  handleClick(e) {
    e.preventDefault();

    fetch('https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=AIzaSyAiIeH1W2G39YWs3wlmpCD7m6SPXaK0vMI')
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let curStateDataCopy = [...this.state.booksData];
        let curBooksData = {
          book: data.items.searchInfo.textSnippet
        }
        curStateDataCopy.push(curBooksData)
        this.setState({...this.state, booksData: curStateDataCopy, inputValue: ''})

      })
  }

  handleChange(e) {
    this.setState({...this.state, inputValue: e.target.value})
  }
 

  render() {
    return(
      <div className="wrapper">
        <form className="header-form">
          <input placeholder="What you wanna find?" onChange={this.handleChange} value={this.state.inputValue}></input>
          <button type="submit" onClick={this.handleClick}>Search</button>
        </form>
        <div className="content">
          <div className="search-result">
            <h1 className="search-result__title">Search result:</h1>
            <ul className="search-result__items">

            </ul>
          </div>
          <div className="my-list">
            <h1 className="my-list__title">My list:</h1>
            <ul className="my-list__items">

            </ul>
          </div>
        </div>
      </div>
    )
  }
}
