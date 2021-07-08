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



  handleClick = (e) => {
    e.preventDefault();
    let url = `https://www.googleapis.com/books/v1/volumes?q=${this.state.inputValue}:keyes&key=AIzaSyAiIeH1W2G39YWs3wlmpCD7m6SPXaK0vMI`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        let curStateDataCopy = [];
        
        data.items.map((item) => {

          let curObj = {}
          curObj.bookTitle = item.volumeInfo.title;
          curObj.bookSubtitle = item.volumeInfo.title;
          curObj.bookImg = item.volumeInfo.imageLinks.smallThumbnail;


          curObj.bookDescription = item.volumeInfo.description;   

          curObj.publishedDate = item.volumeInfo.publishedDate;   
          curObj.authors = item.volumeInfo.authors;

          curStateDataCopy.push(curObj)

        })

        this.setState({...this.state, booksData: curStateDataCopy, inputValue: ''})

      })
  }

  handleChange = (e) => {
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
              {this.state.booksData.map((item, id) => {
                return (<li key={id}>
                    <h2>{item.bookTitle}</h2>
                    <p>{item.bookSubtitle}</p>
                    <div className="bookContent">
                      <div className="bookContent__img">
                        <img src={item.bookImg} alt="book-img"></img>
                      </div>
                      <div className="bookContent__text">
                        <p className="desc">{item.bookDescription}</p>
                        <p>{item.publishedDate}</p>
                        <p>{item.authors}</p>
                      </div>
                    </div>
                    <button className="add-btn">Add</button>
                  </li>)
              })}
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
