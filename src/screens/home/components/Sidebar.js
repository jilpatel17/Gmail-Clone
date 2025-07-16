import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faInbox, faStar, faPaperPlane, faCircleExclamation, faTrash, faFile, faIdBadge, faPlus, faTag, faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import React,{useState,useEffect} from 'react'
import '../css/Sidebar.css'
import SideBarOptions from './SideBarOptions'
import { NavLink } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {db} from '../../../firebase'
import { openDialogForSendMail } from '../../../features/user/mailSlice'

const Sidebar = () => {

    const dispatch = useDispatch()
    return (
        <div className='sideBar'>
            <Button onClick={()=>dispatch(openDialogForSendMail())} className='compose' width='150px' height='60px' style={{ margin: '10px', background: '#c2e7ff', borderRadius: '20px', transition: '.8s' }}>
                <div className='compose__btn'>
                    <div style={{ marginRight: '20px' }}><FontAwesomeIcon icon={faPencil} /></div>
                    <div>Compose</div>
                </div>
            </Button>

            <NavLink to='/home/inbox' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faInbox} title="Inbox" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/starred' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faStar} title="Starred" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/sent' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faPaperPlane} title="Sent" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/spam' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faCircleExclamation} title="Spam" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/trash' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faTrash} title="Trash" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/draft' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faFile} title="Drafts" unreadNumber="" />
            </NavLink>
            <NavLink to='/home/important' className='active__link'>
                <SideBarOptions Icon={FontAwesomeIcon} iconType={faIdBadge} title="Important" unreadNumber="" />
            </NavLink>


            <div className='label__sidebar'>
                <div className='title'>
                    <h2>Labels</h2>
                    <FontAwesomeIcon color='rgb(94, 94, 94)' icon={faPlus} />
                </div>
                <div className='list'>
                    <ul className='unlist'>
                        <li><SideBarOptions Icon={FontAwesomeIcon} iconType={faTag} title="Junk" /></li>
                        <li><SideBarOptions Icon={FontAwesomeIcon} iconType={faNoteSticky} title="Notes" /></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar