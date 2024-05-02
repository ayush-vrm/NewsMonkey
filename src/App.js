import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { useState } from 'react';

import {
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



const App = ()=> {
  const [progress, setProgress] = useState(0);
  
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <Routes>
          <Route excact path = "/" element = {<News setProgress={setProgress}  key = "general" pageSize = {9} country = "in" category = "General"/>}></Route>
          <Route exact path = "/business" element = {<News setProgress={setProgress}  key = "business" pageSize = {9} country = "in" category = "Business"/>}></Route>
          <Route exact path = "/entertainment" element = {<News setProgress={setProgress}  key = "entertainment" pageSize = {9} country = "in" category = "Entertainment"/>}></Route>
          <Route exact path = "/health" element = {<News setProgress={setProgress}  key = "health" pageSize = {9} country = "in" category = "Health"/>}></Route>
          <Route exact path = "/sports" element = {<News setProgress={setProgress}  key = "sports" pageSize = {9} country = "in" category = "Sports"/>}></Route>
          <Route exact path = "/science" element = {<News setProgress={ setProgress}  key = "science" pageSize = {9} country = "in" category = "Science"/>}></Route>
          <Route exact path = "/technology" element = {<News setProgress={setProgress}  key = "technology" pageSize = {9} country = "in" category = "Technology"/>}></Route>
          </Routes>
        </Router>
        {/* <News setProgress={ setProgress}  pageSize = {9} country="in" category="general"/> */}
      </div>
    )
}

export default App
