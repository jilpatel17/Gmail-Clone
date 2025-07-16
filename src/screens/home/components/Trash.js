import React, { useEffect, useState } from 'react'
import InboxHeader from './InboxHeader'
import '../css/Inbox.css'
import InBoxEmailType from './InBoxEmailType'
import TrashList from './TrashList'
import { db } from '../../../firebase'
import { useSelector } from 'react-redux'
import { Alert, AlertDescription, AlertTitle, Badge,useToast } from '@chakra-ui/react'
const Trash = () => {

    const currUser = useSelector((state) => state.user.currentUser)
    const toast = useToast()
    const [mails, setMails] = useState([]);
    const [sent_mails, setSentMail] = useState([]);
    useEffect(() => {
        db.collection("receivers")
            .where("to", "==", currUser.email).where("isTrash", "==", true)
            .get()
            .then(snap => {
                setMails(snap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })));
                
            });

        db.collection("senders")
            .where("from", "==", currUser.email).where("isTrash", "==", true)
            .get()
            .then(snap => {
                setSentMail(snap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })));
            });

    }, [])

    // const emptyTrash = async()=>{
    //     await db.collection('receivers').where("to","==",currUser.email).where("isTrash","==",true)
    //     .get().then(snap=>{
    //         snap.docs.forEach((doc)=> {
    //             db.collection('receivers').doc(doc.id).delete()
    //         })
    //         toast({
    //             position: 'bottom-left',
    //             description: "All message has been deleted !",
    //             status: 'success',
    //             duration: 3000,
    //             isClosable: true,
    //           })

    //     })
    // }

    const emptyTrash = async () => {
    try {
        // 1. Delete from receivers collection
        const receiverSnap = await db.collection('receivers')
            .where("to", "==", currUser.email)
            .where("isTrash", "==", true)
            .get();

        const receiverDeletions = receiverSnap.docs.map(doc =>
            db.collection('receivers').doc(doc.id).delete()
        );

        // 2. Delete from senders collection
        const senderSnap = await db.collection('senders')
            .where("from", "==", currUser.email)
            .where("isTrash", "==", true)
            .get();

        const senderDeletions = senderSnap.docs.map(doc =>
            db.collection('senders').doc(doc.id).delete()
        );

        // 3. Wait for all deletions to complete
        await Promise.all([...receiverDeletions, ...senderDeletions]);

        // 4. Show toast
        toast({
            position: 'bottom-left',
            description: "All trashed emails deleted successfully!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    } catch (error) {
        console.error("Error emptying trash:", error);
        toast({
            position: 'bottom-left',
            description: "Failed to delete trashed emails.",
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    }
};

    return (
        <div className='inbox__container'>
            <InboxHeader />
            <InBoxEmailType />
            <div>
                <Alert status='warning' style={{ display: 'flex', justifyContent: 'center',fontSize:'14px',fontFamily:'sans-serif' }}>
                    {/* <i className='fa fa-trash'></i> */}
                    <AlertTitle>Messages that have been in Trash more than 30 days will be automatically deleted.
                    </AlertTitle>
                    <AlertDescription onClick={emptyTrash} style={{cursor:'pointer'}}><Badge colorScheme='blue'>Empty Trash <i className='fa fa-trash'></i></Badge></AlertDescription>
                </Alert>
            </div>
            <div className='main__email__list_body'>
                {
                    mails.map(({ id, data }) => {
                        return (<TrashList key={id} attachment={data.attachment} isTrash={data.isTrash} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
                    })

                }
                {
                    sent_mails.map(({ id, data }) => {
                        return (<TrashList key={id} attachment={data.attachment} isTrash={data.isTrash} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
                    })
                }

            </div>
        </div>
    )
}

export default Trash