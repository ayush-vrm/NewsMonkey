import './App.css';

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export class App extends Component {
  static propTypes = {}
  state = {
    progress : 0
  }
  setProgress = (progress) => {
    this.setState({progress : progress})
  }

  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route excact path = "/general" element = {<News setProgress={this.setProgress}  key = "general" pageSize = {9} country = "in" category = "General"/>}></Route>
          <Route exact path = "/business" element = {<News setProgress={this.setProgress}  key = "business" pageSize = {9} country = "in" category = "Business"/>}></Route>
          <Route exact path = "/entertainment" element = {<News setProgress={this.setProgress}  key = "entertainment" pageSize = {9} country = "in" category = "Entertainment"/>}></Route>
          <Route exact path = "/health" element = {<News setProgress={this.setProgress}  key = "health" pageSize = {9} country = "in" category = "Health"/>}></Route>
          <Route exact path = "/sports" element = {<News setProgress={this.setProgress}  key = "sports" pageSize = {9} country = "in" category = "Sports"/>}></Route>
          <Route exact path = "/science" element = {<News setProgress={this.setProgress}  key = "science" pageSize = {9} country = "in" category = "Science"/>}></Route>
          <Route exact path = "/technology" element = {<News setProgress={this.setProgress}  key = "technology" pageSize = {9} country = "in" category = "Technology"/>}></Route>
          </Routes>
        </Router>
        <News setProgress={this.setProgress}  pageSize = {9} country="in" category="general"/>
      </div>
    )
  }
}

export default App
