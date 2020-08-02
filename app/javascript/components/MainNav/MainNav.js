import React from 'react'
import './MainNav.scss'
import Button from 'react-bootstrap/Button';

class MainNav extends React.Component {
  render() {
    return (
      <div className="MainNav">
        <Button className="navButton">home</Button>
        <Button className="navButton">about</Button>
        <Button className="navButton">settings</Button>
        <Button className="navButton">account</Button>
        <Button className="navButton">login</Button>
      </div >
    )
  }
}

export default MainNav;
