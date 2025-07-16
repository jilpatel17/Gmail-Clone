import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint,faClipboard, faChevronLeft, faArrowLeft, faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import '../css/EmailBodyRead.css'
import { useNavigate } from 'react-router-dom'
import { Badge, Image, Tooltip, useToast } from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux'
import { db } from '../../../firebase'
import {changeStarredState} from '../../../features/user/mailSlice'

const TrashBodyRead = () => {

    
    const body__header = {
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: '0px',
        justifyContent: 'space-between',
        borderBottom: '1px solid whitesmoke',
        height: '50px',
        margin: '5px 10px',
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

    const selectedMail = useSelector((state) => state.composemail.selectedMessage)
    const dispatch = useDispatch()
    const id = useParams();
    const toast = useToast()
    useEffect(() => {
        db.collection('receivers').doc(id.id).update({ isRead: true }).then(res => console.log(res))
    }, [])
    const navigate = useNavigate()
    //make starred
const makeStarred = async () => {
    const docId = id.id;

    try {
        const receiverRef = db.collection('receivers').doc(docId);
        const senderRef = db.collection('senders').doc(docId);

        const [receiverDoc, senderDoc] = await Promise.all([
            receiverRef.get(),
            senderRef.get()
        ]);

        let updated = false;

        if (receiverDoc.exists) {
            await receiverRef.update({ isStarred: true });
            updated = true;
        }

        if (senderDoc.exists) {
            await senderRef.update({ isStarred: true });
            updated = true;
        }

        if (updated) {
            toast({
                position: 'bottom-left',
                description: "Conversation marked as starred!",
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            dispatch(changeStarredState(true));
        } else {
            toast({
                position: 'bottom-left',
                description: "Conversation not found!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error("Error starring conversation:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to star conversation!",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};

    //make un starred
const makeUnStarred = async () => {
    const docId = id.id;

    try {
        const receiverRef = db.collection('receivers').doc(docId);
        const senderRef = db.collection('senders').doc(docId);

        const [receiverDoc, senderDoc] = await Promise.all([
            receiverRef.get(),
            senderRef.get()
        ]);

        let updated = false;

        if (receiverDoc.exists) {
            await receiverRef.update({ isStarred: false });
            updated = true;
        }

        if (senderDoc.exists) {
            await senderRef.update({ isStarred: false });
            updated = true;
        }

        if (updated) {
            toast({
                position: 'bottom-left',
                description: "Conversation marked as unstarred!",
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
            dispatch(changeStarredState(false));
        } else {
            toast({
                position: 'bottom-left',
                description: "Conversation not found!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error("Error un-starring conversation:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to unstar conversation!",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};


    //unread
const makeUnread = async () => {
    const docId = id.id;

    try {
        const receiverRef = db.collection('receivers').doc(docId);
        const senderRef = db.collection('senders').doc(docId);

        const [receiverDoc, senderDoc] = await Promise.all([
            receiverRef.get(),
            senderRef.get()
        ]);

        let updated = false;

        if (receiverDoc.exists) {
            await receiverRef.update({ isRead: false });
            updated = true;
        }

        if (senderDoc.exists) {
            await senderRef.update({ isRead: false });
            updated = true;
        }

        if (updated) {
            toast({
                position: 'bottom-left',
                description: "Conversation marked as unread!",
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                position: 'bottom-left',
                description: "Conversation not found!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error("Error marking as unread:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to mark as unread!",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};


    //make delete permenently
const deletetrash = async () => {
    const docId = id.id;

    try {
        const receiverRef = db.collection('receivers').doc(docId);
        const senderRef = db.collection('senders').doc(docId);

        const [receiverDoc, senderDoc] = await Promise.all([
            receiverRef.get(),
            senderRef.get()
        ]);

        // Flag to track if any deletion happened
        let deleted = false;

        if (receiverDoc.exists) {
            await receiverRef.delete();
            deleted = true;
        }

        if (senderDoc.exists) {
            await senderRef.delete();
            deleted = true;
        }

        if (deleted) {
            toast({
                position: 'bottom-left',
                description: "Conversation deleted permanently!",
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                position: 'bottom-left',
                description: "Conversation not found!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error("Error deleting conversation:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to delete conversation!",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};
    
const makeImportant = async () => {
    const docId = id.id;

    try {
        const receiverRef = db.collection('receivers').doc(docId);
        const senderRef = db.collection('senders').doc(docId);

        const [receiverDoc, senderDoc] = await Promise.all([
            receiverRef.get(),
            senderRef.get()
        ]);

        let updated = false;

        if (receiverDoc.exists) {
            await receiverRef.update({ isImportant: true });
            updated = true;
        }

        if (senderDoc.exists) {
            await senderRef.update({ isImportant: true });
            updated = true;
        }

        if (updated) {
            toast({
                position: 'bottom-left',
                description: "Conversation marked as important!",
                status: 'info',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                position: 'bottom-left',
                description: "Conversation not found!",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    } catch (error) {
        console.error("Error marking important:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to mark as important!",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};


    return (
        <div className='mail__container'>
            <div style={body__header}>
            <div style={body__left}>
                <Tooltip label="Back to Inbox" aria-label='A tooltip'>
                    <FontAwesomeIcon onClick={() => navigate(-1)} style={{ marginRight: '20px', color: 'gray' }} icon={faArrowLeft} />
                </Tooltip>
                <Tooltip label="Delete From Trash" aria-label='A tooltip'>
                    <Badge onClick={deletetrash} style={{ marginRight: '20px' }} colorScheme='red'>Delete</Badge>
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
                                return type ? <Image key={index} style={{ borderRadius: '10px', width:'300px',height:'180px',margin: '15px 20px',cursor:'pointer' }} onClick={() => window.open(item)} src={item} /> : <div style={{display:'inline-block'}}><iframe style={{ borderRadius: '10px', margin: '15px 20px',width:'300px',cursor:'pointer' }} src={item}></iframe><p onClick={() => window.open(item)} style={{borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',display:'flex',alignItems:'center',cursor:'pointer',position:'relative',top:'-60px',left:'20px',padding:'17px 0px',backgroundColor:'#F1F0EC',width:'300px'}}><img style={{margin:'0px 10px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/4726/4726010.png'/>{selectedMail.name}.pdf</p></div>
                            })
                        }

                    </div> : ''
                }
            </div>
        </div>
    )
}

export default TrashBodyRead
