import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faRotateRight,faEllipsisVertical,faChevronLeft,faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { Checkbox } from '@chakra-ui/react'
const InboxHeader = () => {

    const body__header ={
        display:'flex',
        alignItems:'center',
        position:'sticky',
        top:'0px',
        justifyContent:'space-between',
        borderBottom:'1px solid whitesmoke',
        height:'50px',
        margin:'5px 10px',
    }
    const body__left = {
        display:'flex',
        alignItems:'center',
        cursor:'pointer',
    }
    const body__right={
        display:'flex',
        alignItems:'center',
        cursor:'pointer',
      
    }

    const refreshToGetMails =()=>{
        window.location.reload()
    }

  return (
    <div style={body__header}>
        <div style={body__left}>
            <Checkbox style={{marginRight:'10px'}}/>
            <FontAwesomeIcon style={{marginRight:'10px',color:'gray'}} icon={faChevronDown}/>
            <FontAwesomeIcon onClick={refreshToGetMails} style={{marginRight:'10px',color:'gray'}} icon={faRotateRight}/>
            <FontAwesomeIcon style={{marginRight:'10px',color:'gray'}} icon={faEllipsisVertical}/>
        </div>
        <div style={body__right}>
            <p style={{fontSize:'14px',color:'gray', marginRight:'10px'}}>1-22 of 200</p>
            <FontAwesomeIcon style={{color:'gray',marginRight:'10px'}} width='10px' height='10px' icon={faChevronLeft}/>
            <FontAwesomeIcon style={{color:'gray'}} width='10px' height='10px' icon={faChevronRight}/>

        </div>
    </div>
  )
}

export default InboxHeader