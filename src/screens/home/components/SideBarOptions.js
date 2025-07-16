import React from 'react'
import '../css/SideBarOptions.css'
const SideBarOptions = ({Icon,iconType,title,unreadNumber}) => {
  return (
    <div className='sidebar__option'>
        <Icon style={{fontSize:'15px',color:'rgb(94, 94, 94)',marginRight:'17px'}} icon={iconType}/>
        <h2>{title}</h2>
        <p>{unreadNumber}</p>
    </div>
  )
}

export default SideBarOptions