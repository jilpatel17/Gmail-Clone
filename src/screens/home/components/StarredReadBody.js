import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import '../css/EmailBodyRead.css'
import ViewMailHeader from './ViewMailHeader'
import { Badge, Image, Tooltip,toast, useToast } from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux'
import { db } from '../../../firebase'
import {changeStarredState} from '../../../features/user/mailSlice'

const StarredReadBody = () => {

    const selectedMail = useSelector((state) => state.composemail.selectedMessage)
    const dispatch = useDispatch()
    const id = useParams();
    const toast = useToast()
    useEffect(() => {
        db.collection('receivers').doc(id.id).update({ isRead: true }).then(res => console.log(res))
    }, [])

    //make starred
    const makeStarred = async()=>{
        await db.collection('receivers').doc(id.id).update({ isStarred: true }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation marked as starred !",
            status: 'success',
            duration: 3000,
            isClosable: true,
          }))
        dispatch(changeStarredState(true))
    }
    //make un starred
    const makeUnStarred = async()=>{
        await db.collection('receivers').doc(id.id).update({ isStarred: false }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation marked as unstarred !",
            status: 'success',
            duration: 3000,
            isClosable: true,
          }))
        dispatch(changeStarredState(false))
    }
    return (
        <div className='mail__container'>
            <ViewMailHeader mid={id.id} collection="receivers" />
            <div className='subject__body'>
                <div className='subject__itself'>
                    <p>{selectedMail.subject}</p>
                    <Badge colorScheme='purple'>Inbox</Badge>
                </div>
                <div className='print'>
                    <FontAwesomeIcon onClick={() => window.print()} style={{ fontSize: '17px', marginRight: '15px', cursor: 'pointer', color: 'gray' }} icon={faPrint} />
                </div>
            </div>
            <div className='mail__details'>
                <div className="mail__content">
                    <div className="inbox__profile">
                        <Image borderRadius='full' width='40px' height='40px' src={selectedMail.profile} />
                    </div>
                    <div className='inbox_email_detail'>
                        <div className='inbox__detail'>
                            <p style={{ marginLeft: '15px', fontWeight: '512' }}>{selectedMail.name}</p>
                            <p style={{ marginLeft: '3px' }}><small>&lt;{selectedMail.email}&gt;</small></p>
                        </div>
                    </div>
                </div>
                <div className="timeing">
                    <p><small>{selectedMail.time}</small></p>
                    <Tooltip label={selectedMail.status.isStarred ?"Starred":"Not Starred"} aria-label='A tooltip'>
                        {
                            selectedMail.status.isStarred ? <i onClick={makeUnStarred} style={{ fontSize: '19px', marginLeft: '40px',color:'#F1C40F' }} className='fa fa-star'></i> : <i onClick={makeStarred} style={{ fontSize: '19px', marginLeft: '40px' }} className='fa fa-star-o'></i>
                        }
                    </Tooltip>
                </div>
            </div>
            <div className='main_message'>
                <p>{selectedMail.message}</p>
                <br></br>
                <hr></hr>
                {
                    (selectedMail.attachment.length!==0) ? <div style={{ display: 'flex', alignItems: 'center', margin: '25px 10px',flexWrap:'wrap' }}>
                        {
                            selectedMail.attachment.map((item, index) => {
                                const type = item.includes('.jpg') || item.includes('.png') || item.includes('.jpeg')
                                return type ? <div><Image key={index} style={{ borderRadius: '10px',width:'300px',height:'180px', margin: '15px 20px',cursor:'pointer' }} onClick={() => window.open(item)} src={item} /></div> : <div style={{display:'inline-block'}}><iframe style={{ borderRadius: '10px', margin: '20px 20px',width:'300px',cursor:'pointer' }} src={item}></iframe><p onClick={() => window.open(item)} style={{borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',display:'flex',alignItems:'center',cursor:'pointer',position:'relative',top:'-60px',left:'20px',padding:'17px 0px',backgroundColor:'#F1F0EC',width:'300px'}}><img style={{margin:'0px 10px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/4726/4726010.png'/>{selectedMail.name}.pdf</p></div>
                            })
                        }

                    </div> : ''
                }
            </div>
        </div>
    )
}

export default StarredReadBody