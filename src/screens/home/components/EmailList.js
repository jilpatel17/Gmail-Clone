import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Checkbox } from '@chakra-ui/react'
import {useDispatch} from 'react-redux'
import { openMessage } from '../../../features/user/mailSlice'

const EmailList = ({isSpam,attachment,isImportant,isTrash,isRead,isStarred,mailid,profile,email,name,subject,message,time}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const openMessageFroReadMail = async()=>{
        dispatch(openMessage({
            profile,
            email,
            name,
            subject,
            message,
            time,
            attachment,
            status:{
                isSpam,isRead,isImportant,isTrash,isStarred
            }
        }))
        
        navigate('/home/inbox/'+mailid)
    }

    const styles = {
        marginRight : '10px',
        color : isStarred ? '#F1C40F' : '#333'
    }
  return (
    <div className={isRead ? 'email_readed' :'email__body'} onClick={openMessageFroReadMail}>
        <div className='email__left'>
            <Checkbox style={{marginRight:'10px'}}/>
            <i style={styles} className={"fa " +(isStarred ? "fa-star":"fa-star-o")}></i>
            <p style={{fontWeight:'550'}}>{name}</p>
        </div>
        <div className='email__middle'>
            <div className='email__middle__msg'>
                <p><strong>{subject} </strong> - {message}</p>
            </div>
        </div>
        <div className='email__right'>
            <p>{time}</p>
        </div>
    </div>
  )
}

export default EmailList