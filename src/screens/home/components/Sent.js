import React, { useState, useEffect } from 'react'
import SentHeader from './SentHeader'
import InBoxEmailType from './InBoxEmailType'
import SenderList from './SenderList'
import '../css/Sent.css'
import { db } from '../../../firebase'
import { useSelector } from 'react-redux'
const Sent = () => {

  const currUser = useSelector((state) => state.user.currentUser)
  const [sent_mails, setSentMail] = useState([]);
  useEffect(() => {
    db.collection("senders")
      .where("from", "==", currUser.email)
      .get()
      .then(snap => {
        setSentMail(snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        })));
      });
  }, [])
  return (
    <div className='inbox__container'>
      <SentHeader />
      <InBoxEmailType />
      <div className='main__email__list_body'>
        {
          sent_mails.map(({ id, data }) => {
            return (!data.isSpam && !data.isTrash && <SenderList key={id} attachment={data.attachment} isTrash={data.isTrash} isSpam={data.isSpam} isImportant={data.isImportant} isStarred={data.isStarred} isRead={data.isRead} mailid={id} profile={data.profileUrl} email={data.from} name={data.name} subject={data.subject} message={data.message} time={new Date(data.time?.seconds * 1000).toLocaleTimeString()} />)
          })
        }


      </div>
    </div>
  )
}

export default Sent