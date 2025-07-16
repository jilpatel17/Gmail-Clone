import React,{useEffect,useState} from 'react'
import InboxHeader from './InboxHeader'
import '../css/Inbox.css'
import InBoxEmailType from './InBoxEmailType'
import EmailList from './EmailList'
import {db} from '../../../firebase'
import {useSelector} from 'react-redux'
const Inbox = () => {

    const currUser = useSelector((state)=>state.user.currentUser)
    const [mails,setMails] = useState([]);
    useEffect(()=>{
      db.collection("receivers")
      .where("to", "==", currUser.email)
      .get()
      .then(snap => {
          setMails(snap.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          })));
      });
    },[])
  return (
    <div className='inbox__container'>
      <InboxHeader />
      <InBoxEmailType />
      <div className='main__email__list_body'>
       {
        mails.map(({id,data})=>{
          return (!data.isSpam && !data.isTrash && <EmailList key={id} isTrash={data.isTrash} attachment={data.attachment} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
        })
       }
        
      </div>
    </div>
  )
}

export default Inbox