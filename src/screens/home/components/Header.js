import React, { useState, useEffect } from 'react'
import '../css/Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faCircleQuestion, faGear, faGrip, faCamera } from '@fortawesome/free-solid-svg-icons'
import {
    Image, InputGroup, Input, InputLeftElement, WrapItem, Avatar, Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Box,
    Button,
    Badge,
    Text,
    Divider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useDisclosure
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { auth, db } from '../../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { logout, updateProfile } from '../../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const [image, setImage] = useState(null)
    const [allData, setAllData] = useState([])
    const [filterResult, setFilterResult] = useState([])
    const [filterVal, setFilterVal] = useState("")
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isOpen, onOpen, onClose } = useDisclosure()
    if (image !== null) {
        setTimeout(function () {

            if (window.confirm("Are you sure! you want to change current profile ?") === true) {
                if (image === null)
                    return;

                const storage = getStorage();
                var storagePath = 'uploads/' + image.name;

                const storageRef = ref(storage, storagePath);
                const uploadTask = uploadBytesResumable(storageRef, image);

                uploadTask.on('state_changed', (snapshot) => {
                    // progrss function ....
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                    (error) => {
                        // error function ....
                        console.log(error);
                    },
                    () => {
                        // complete function ....
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log('File available at', downloadURL);
                            db.collection('users').doc(user.id).update({ profile: downloadURL }).then(res => console.log(res)).catch(err => console.log(err))
                            dispatch(updateProfile(downloadURL))
                        });
                    });


            }
            // setImage('')
        }, 1000)
    }
    const userLogout = () => {
        auth.signOut()
        dispatch(logout())
        navigate('/')
    }

    useEffect(() => {
        db.collection("receivers").where("to", "==", user.email).
            get().then(snap => {
                setAllData(snap.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })));
            })
    }, [])

    const filterValue = (e) => {
        if (e.target.value == "") {
            setFilterResult([])
        }
        else {

            const data = allData.filter(({ data }) => data.from.toLowerCase().includes(e.target.value.toLowerCase()))
            setFilterResult(data)
        }

        setFilterVal(e.target.value)


    }

    const openMail = (id)=>{
        navigate('/home/inbox/'+id)
        onClose()
    }


    return (
        <div className='header__main'>
            <div className='left__header'>
                <FontAwesomeIcon icon={faBars} style={{ color: 'grey', marginLeft: '10px', marginRight: '20px', fontSize: '20px', cursor: 'pointer' }} />
                <Image src='../../gmail.png' title='logo' />
            </div>
            <div className='middle__header'>
                <div className="search">
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FontAwesomeIcon icon={faSearch} />}
                        />
                        <Input onClick={onOpen} style={{ cursor: 'pointer', outline: 'none', border: 'none', backgroundColor: '#eaf1fb' }} type='text' placeholder='Search in mails' />
                    </InputGroup>
                </div>
                <Modal isOpen={isOpen} size="xl" onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader style={{ padding: '8px 10px' }}>
                            <InputGroup>
                                <Input value={filterVal} onInput={filterValue} height="60px" style={{ fontFamily: 'sans-serif', fontSize: '18px', outline: 'none', border: 'none', backgroundColor: '#eaf1fb' }} type='text' placeholder='Search in mails' />
                            </InputGroup>
                            {
                                //TODO : Design
                                (filterResult.length !== 0) ? <div>
                                    {
                                        filterResult.map(({ id, data }) => {
                                            return <Box onClick={()=>openMail(id)} style={{ boxShadow: '1px 2px 6px gray', cursor:'pointer',margin: '10px 0px', borderRadius: '7px', backgroundColor: '#fff' }} w='100%' p={4} color='black'>
                                                <div style={{display:'flex',alignItems:'center'}}>
                                                    <Image borderRadius='full' width='40px' height='40px' src={data.profileUrl}/>
                                                    <div  style={{marginLeft:'10px'}}>
                                                        <h6 style={{fontSize:'17px'}}>{data.subject}</h6>
                                                        <p style={{fontSize:'14px',color:'#4D5656'}}>{data.name}, <small>{data.from}</small></p>
                                                    </div>
                                                </div>
                                            </Box>
                                        })
                                    }</div> : ''
                            }

                        </ModalHeader>

                    </ModalContent>
                </Modal>
            </div>
            <div className='right__header'>

                <FontAwesomeIcon style={{ color: 'grey', marginRight: '15px', fontSize: '20px' }} icon={faCircleQuestion} />
                <FontAwesomeIcon style={{ color: 'grey', marginRight: '15px', fontSize: '20px' }} icon={faGear} />
                <FontAwesomeIcon style={{ color: 'grey', marginRight: '15px', fontSize: '20px' }} icon={faGrip} />
                <WrapItem>

                    <Popover

                        placement='bottom'
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <Avatar width='35px' height="35px" name='Dan Abrahmov' src={user.profile} />
                        </PopoverTrigger>
                        <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                            <PopoverHeader style={{ display: 'flex', justifyContent: 'center' }} pt={4} fontWeight='bold' border='0'>
                                <Image borderRadius='full' width='90px' height='90px' src={user.profile} />
                                <Input id='file' type='file' accept='image/*' hidden onChange={(e) => {
                                    const file = e.target.files[0] || ""
                                    setImage(file)
                                }} />
                                <label style={{ cursor: 'pointer' }} htmlFor="file"><Badge style={{ position: 'absolute', top: '85px', left: '170px', textAlign: 'center', padding: '8px', borderRadius: '50%' }} width='32px' height='32px' colorScheme='purple'><FontAwesomeIcon style={{ color: 'purple', fontSize: '16px' }} icon={faCamera} /></Badge></label>
                            </PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody style={{ textAlign: 'center', marginTop: '15px' }}>
                                <Text fontSize='20px'>{user.name}</Text>
                                <Text color='gray'>{user.email}</Text>
                            </PopoverBody>
                            <Divider orientation='horizontal' />
                            <PopoverFooter
                                border='0'
                                display='flex'
                                alignItems='center'
                                justifyContent='center'
                                pb={4}
                            >
                                <Box fontSize='sm'><Button onClick={userLogout} colorScheme='purple'>Sign out</Button></Box>

                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>

                </WrapItem>

            </div>


        </div>
    )
}

export default Header