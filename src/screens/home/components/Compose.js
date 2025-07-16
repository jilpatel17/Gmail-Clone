import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faXmark, faPaperPlane, faRotateRight, faFaceSmile, faCamera, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { Box, List, ListItem, Badge, Button, Divider, Image, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverTrigger, Progress, useToast } from '@chakra-ui/react'
import { LinkIcon, AttachmentIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { closeDialogForSendMail } from '../../../features/user/mailSlice'
import '../css/Compose.css'
import { db, firebase, storage } from '../../../firebase'
const Compose = () => {

    const dispatch = useDispatch()
    const [uploadStatus,setUploadStatus] = useState(0)
    const toast = useToast()
    const user = useSelector((state) => state.user.currentUser);
    const [suggestions, setSuggestions] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [composemail, setComposemail] = useState({
        to: '',
        subject: '',
        message: '',
        attachment: [],
    })

    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
  const fetchEmails = async () => {
    try {
      const snap = await db.collection('users').get();
      const emails = snap.docs.map(doc => doc.data().email);
      setContacts(emails);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  fetchEmails();
}, []);

    const sendMail = () => {
        setLoading(true)
        if (composemail.attachment.length == 0 && composemail.to != "" && composemail.subject != "") {

            db.collection('senders').add({
                attachment: [],
                from: user.email,
                isImportant: false,
                isRead: false,
                isSpam: false,
                isStarred: false,
                isTrash: false,
                message: composemail.message,
                name: user.name,
                profileUrl: user.profile,
                subject: composemail.subject,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                to: composemail.to
            }).then(res => console.log());
            db.collection('receivers').add({
                attachment: [],
                from: user.email,
                isImportant: false,
                isRead: false,
                isSpam: false,
                isStarred: false,
                isTrash: false,
                message: composemail.message,
                name: user.name,
                profileUrl: user.profile,
                subject: composemail.subject,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                to: composemail.to
            }).then(res => console.log());


            setLoading(false)
            toast({
                position: 'bottom-left',
                description: "Email Sent !",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            dispatch(closeDialogForSendMail())

        } else {
            if (composemail.attachment.length == 0)
                return

            db.collection('senders').add({
                attachment: composemail.attachment,
                from: user.email,
                isImportant: false,
                isRead: false,
                isSpam: false,
                isStarred: false,
                isTrash: false,
                message: composemail.message,
                name: user.name,
                profileUrl: user.profile,
                subject: composemail.subject,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                to: composemail.to
            }).then(res => console.log());
            db.collection('receivers').add({
                attachment: composemail.attachment,
                from: user.email,
                isImportant: false,
                isRead: false,
                isSpam: false,
                isStarred: false,
                isTrash: false,
                message: composemail.message,
                name: user.name,
                profileUrl: user.profile,
                subject: composemail.subject,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                to: composemail.to
            }).then(res => console.log());
           

            setLoading(false)
            toast({
                position: 'bottom-left',
                description: "Email Sent !",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            dispatch(closeDialogForSendMail())




        }
    }

    const upload = (e) => {

        const image = e.target.files[0] || ""
        const storage = getStorage();
        var storagePath = 'compose/' + image.name;

        const storageRef = ref(storage, storagePath);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed', (snapshot) => {
            // progrss function ....
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadStatus(progress)
            console.log(progress);
        },
            (error) => {
                // error function ....
                console.log(error);
            },
            async () => {
                // complete function ....
                await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setComposemail({ ...composemail, attachment: [...composemail.attachment, downloadURL] })
                 });
            });

    }

    const deleteFile = (url)=>{
        var fileRef = storage.refFromURL(url);
        fileRef.delete().then(function () {
            setComposemail({...composemail,attachment:[...composemail.attachment.filter((data)=>data !== url)]})
            console.log("File Deleted")
        }).catch(function (error) {
            // Some Error occurred
        });
    }

    if(uploadStatus===100){
        setUploadStatus(0)
    }
    

    return (
        <div className='compose__area'>
            <div className="compose__header">
                <div className="compose_header_left">
                    <span>New Message</span>{(composemail.attachment.length !== 0) ? <Popover

                        placement='bottom'
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <Badge style={{ marginLeft: '10px' }} colorScheme='whatsapp'>{composemail.attachment.length} Attachments</Badge>
                        </PopoverTrigger>
                        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody style={{marginTop: '15px',flexWrap:'wrap' }}>
                                {
                                    composemail.attachment.map((url,index)=>{
                                        return <div key={index} style={{display:'inline-block',marginRight:'5px'}}><Image src={url} width="60px" height='60px'/><i onClick={()=>deleteFile(url)} style={{position:'relative',top:'-80px',left:'48px',cursor:'pointer'}} className='fa fa-close'></i></div>
                                    })
                                }
                                <Image />
                            </PopoverBody>
                            <Divider orientation='horizontal' />
                            
                        </PopoverContent>
                    </Popover> : ''}
                </div>
                <div className="compose_header_right">
                    <FontAwesomeIcon onClick={() => window.location.reload()} style={{ marginRight: '15px' }} icon={faRotateRight} />
                    <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faMinus} />
                    <i style={{ marginRight: '15px' }} className="fa fa-window-maximize"></i>
                    <FontAwesomeIcon onClick={() => dispatch(closeDialogForSendMail())} style={{ marginRight: '15px' }} icon={faXmark} />
                </div>
            </div>
            <div className="compose__body_area">
                <div className="compose_body_form">
                    {/* <input value={composemail.to} onChange={(e) => setComposemail({ ...composemail, to: e.target.value })} type="email" placeholder='To' /> */}
                <Box position="relative">
                <Input
                type="email"
                placeholder="To"
                value={composemail.to}
                onChange={(e) => {
                const value = e.target.value;
                setComposemail({ ...composemail, to: value });
                if (value.trim() && contacts.length > 0) {
                const filtered = contacts.filter(email =>
                    email.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(filtered);
                } else {
                setSuggestions([]);
                }
                }}
                />

                {suggestions.length > 0 && (
                <Box
                position="absolute"
                bg="white"
                border="1px solid #ccc"
                mt={1}
                zIndex="10"
                width="100%"
                borderRadius="md"
                boxShadow="md"
                maxHeight="200px"
                overflowY="auto"
                >
                <List spacing={0}>
                {suggestions.map((email, index) => (
                    <ListItem
                    key={index}
                    px={3}
                    py={2}
                    _hover={{ bg: 'gray.100', cursor: 'pointer' }}
                    onClick={() => {
                        setComposemail({ ...composemail, to: email });
                        setSuggestions([]);
                    }}
                    >
                    {email}
                    </ListItem>
                ))}
                </List>
                </Box>
                )}
                </Box>


                    <input value={composemail.subject} onChange={(e) => setComposemail({ ...composemail, subject: e.target.value })} type="text" placeholder='Subject' />
                    <textarea value={composemail.message} onChange={(e) => setComposemail({ ...composemail, message: e.target.value })} rows="15"></textarea>
                </div>
            </div>
            <div className="compose__footer">
                <div className="compose__footer__left">
                    <Button onClick={sendMail} isLoading={isLoading} loadingText='Sending Please wait .....'
                        variant='outline' rightIcon={<FontAwesomeIcon icon={faPaperPlane} />} colorScheme='messenger'>Send</Button>
                </div> 
                <div style={{width:'150px'}}><Progress hasStripe value={uploadStatus} /></div>
                <div className="compose__footer_right">
                    <Input id='attachment' type='file' accept='*' hidden onChange={upload} />
                    <label htmlFor='attachment'>

                        <AttachmentIcon style={{ transform: 'rotate(134deg)', marginRight: '15px' }} />
                    </label>
                    <LinkIcon style={{ marginRight: '15px' }} />
                    <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faFaceSmile} />
                    <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faCamera} />
                    <FontAwesomeIcon style={{ marginRight: '15px' }} icon={faEllipsisVertical} />


                </div>
            </div>
        </div>
    )
}

export default Compose