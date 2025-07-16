import React,{useEffect,useState} from 'react'
import InboxHeader from './InboxHeader'
import '../css/Inbox.css'
import InBoxEmailType from './InBoxEmailType'
import StarredList from './StarredList'
import {db} from '../../../firebase'
import {useSelector} from 'react-redux'
const Starred = () => {

    const currUser = useSelector((state)=>state.user.currentUser)
    const [mails,setMails] = useState([]);
    const [sent_mails, setSentMail] = useState([]);
    useEffect(()=>{
      db.collection("receivers")
      .where("to", "==", currUser.email).where("isStarred","==",true)
      .get()
      .then(snap => {
          setMails(snap.docs.map((doc)=>({
            id:doc.id,
            data:doc.data()
          })));
      });

      db.collection("senders")
      .where("from", "==", currUser.email).where("isStarred","==",true)
      .get()
      .then(snap => {
        setSentMail(snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
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
          return (!data.isTrash && !data.isSpam && <StarredList key={id} attachment={data.attachment} isTrash={data.isTrash} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
        })
        
       }
       {
        sent_mails.map(({ id, data }) => {
          return (!data.isTrash && !data.isSpam && <StarredList key={id} attachment={data.attachment} isTrash={data.isTrash} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
        })
       }
        
      </div>
    </div>
  )
}

export default Starred