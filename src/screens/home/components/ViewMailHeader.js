import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip,useToast } from '@chakra-ui/react'
import { faClipboard, faChevronLeft, faCircleExclamation, faArrowLeft, faChevronRight, faTrash, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { db } from '../../../firebase'
const ViewMailHeader = ({ mid,collection }) => {

    const navigate = useNavigate()
    const toast = useToast()
    const body__header = {
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '0px',
        justifyContent: 'space-between',
        borderBottom: '1px solid whitesmoke',
        height: '50px',
        margin: '5px 10px',
        backgroundColor:'#fff'
    }
    const body__left = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    }
    const body__right = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',

    }

    //unread
    const makeUnread = async () => {
        await db.collection(collection).doc(mid).update({ isRead: false }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation marked as unread !",
            status: 'info',
            duration: 3000,
            isClosable: true,
          }))
    }
    //make spam
    const makeSpam = async () => {
        await db.collection(collection).doc(mid).update({ isSpam: true }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation marked as spam !",
            status: 'info',
            duration: 3000,
            isClosable: true,
          }))
    }
    //move to trash
    const moveToTrash = async () => {
        await db.collection(collection).doc(mid).update({ isTrash: true }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation moved to trash !",
            status: 'info',
            duration: 3000,
            isClosable: true,
          }))
    }
    //make important
    const makeImportant = async () => {
        await db.collection(collection).doc(mid).update({ isImportant: true }).then(res => toast({
            position: 'bottom-left',
            description: "Conversation marked ad important !",
            status: 'info',
            duration: 3000,
            isClosable: true,
          }))
    }


    return (
        <div style={body__header}>
            <div style={body__left}>
                <Tooltip label="Back to Inbox" aria-label='A tooltip'>
                    <FontAwesomeIcon onClick={() => navigate(-1)} style={{ marginRight: '20px', color: 'gray' }} icon={faArrowLeft} />
                </Tooltip>

                <Tooltip label="Report Spam" aria-label='A tooltip'>
                    <FontAwesomeIcon onClick={makeSpam} style={{ marginRight: '30px', color: 'gray' }} icon={faCircleExclamation} />
                </Tooltip>

                <Tooltip label="Delete" aria-label='A tooltip'>

                    <FontAwesomeIcon onClick={moveToTrash} style={{ marginRight: '30px', color: 'gray' }} icon={faTrash} />
                </Tooltip>

                <Tooltip label="Mark as Unread" aria-label='A tooltip'>

                    <FontAwesomeIcon onClick={makeUnread} style={{ marginRight: '30px', color: 'gray' }} icon={faEnvelope} />
                </Tooltip>

                <Tooltip label="Mark as Important" aria-label='A tooltip'>

                    <FontAwesomeIcon onClick={makeImportant} style={{ marginRight: '30px', color: 'gray' }} icon={faClipboard} />
                </Tooltip>

            </div>
            <div style={body__right}>
                <p style={{ fontSize: '14px', color: 'gray', marginRight: '10px' }}>1-22 of 200</p>
                <FontAwesomeIcon style={{ color: 'gray', marginRight: '10px' }} width='10px' height='10px' icon={faChevronLeft} />
                <FontAwesomeIcon style={{ color: 'gray' }} width='10px' height='10px' icon={faChevronRight} />
            </div>
        </div>
    )
}

export default ViewMailHeader