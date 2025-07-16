import React from 'react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import {Outlet} from 'react-router-dom'
import ExtraList from './components/ExtraList'
import Compose from './components/Compose'
import {useSelector} from 'react-redux'
const Home = () => {

  const style = {
    display: 'grid',
    gridTemplateColumns: '250px auto 70px'
  }

  const isOpen = useSelector((state)=>state.composemail.isComposeOpen)

  return (
    <div>
      <Header />
      <div style={style}>
        <Sidebar />
        <div>
            <Outlet/>
        </div>
        <ExtraList/>
      </div>
      {
        isOpen && <Compose/>

      }
    </div>
  )
}

export default Home