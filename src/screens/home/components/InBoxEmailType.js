import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox,faUser,faTag } from '@fortawesome/free-solid-svg-icons'

const InBoxEmailType = () => {
    const emailType ={
        display:'flex',
        alignItems:'center',
        borderBottom:'1px solid rgb(232, 232, 232)'
    }
    const emailType_option={
        display:'flex',
        alignItems:'center',
        minWidth:'230px',
        padding:'10px',
        cursor:'pointer',
    }

  return (
    <div style={emailType}>
        <div className='active_link_nav' style={emailType_option}>
            <FontAwesomeIcon style={{marginRight:'15px',color:'#2c79ad'}} icon={faInbox}/>
            <p style={{color:'#2c79ad',fontWeight:'500'}}>Inbox</p>
        </div>
        <div style={emailType_option}>
            <FontAwesomeIcon style={{marginRight:'15px',color:'gray'}} icon={faUser}/>
            <p>Social</p>
        </div>
        <div style={emailType_option}>
            <FontAwesomeIcon style={{marginRight:'15px',color:'gray'}} icon={faTag}/>
            <p>Promotions</p>
        </div>
    </div>
  )
}

export default InBoxEmailType