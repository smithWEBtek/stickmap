import React, { Component } from 'react'
import MainHeader from '../components/MainHeader/MainHeader'
import MainNav from '../components/MainNav/MainNav'
import './app.css'

class App extends Component {
  render() {
    return (
      <>
        <MainHeader />
        <MainNav />
      </>
    )
  }
}

export default App;
