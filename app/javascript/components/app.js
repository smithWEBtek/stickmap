import React, { Component } from 'react'
import MainHeader from '../components/MainHeader/MainHeader'
import MainNav from '../components/MainNav/MainNav'
import Fretboard from '../components/Fretboard/Fretboard'
import './app.css'

class App extends Component {
  render() {
    return (
      <>
        <MainHeader />
        <MainNav />
        <Fretboard />
      </>
    )
  }
}

export default App;
