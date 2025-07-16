import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { FormControl, FormLabel, Input, Button, InputGroup, WrapItem, Select, Spinner, AlertIcon, Alert } from '@chakra-ui/react'
import './Register.css'
import { auth, db } from '../../firebase'
const Register = () => {

    const [data, setDate] = useState({
        name: '', phone: '', gender: '', email: '', password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    // const [getErrorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate()
    const toast = useToast()
    useEffect(()=>{
        setTimeout(()=>{
            setError(false)
        },4000)
    },[error])
    const storeDate = (e) => {
        e.preventDefault()

        if(data.email==="" || data.phone==='' || data.name==='' || data.password===""){
            setError(true)
            // setErrorMsg("All fields are required!")
        }

        setLoading(true)
        auth.createUserWithEmailAndPassword(data.email, data.password).then(userCredential => {
            db.collection('users').doc(userCredential.user.uid).set({ id:userCredential.user.uid,name: data.name, phone: data.phone, gender: data.gender, email: data.email, password: data.password,profile:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' })
            .then(async (res) => { 
                setLoading(false)
                toast({
                    position: 'bottom-left',
                    description: "Registration Successfull!",
                    status: 'info',
                    duration: 5000,
                    isClosable: true,
                }) 
                navigate('/home')
            })
        }).catch((err) => {
            // setErrorMsg(err)
            setLoading(false)
            setError(true)
        })
    }

    return (
        <div className='register__'>
            <div className='register__area'>
                <div className='register__img'>
                    <img src='login.jpg' alt="" />
                </div>
                <div className='register__component'>
                    <div style={{ width: '80%' }}>
                        {
                            error && <Alert style={{marginTop:'10px'}} status='error'>
                                <AlertIcon />
                                All fields are required!
                            </Alert>

                        }
                        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                            <h1 style={{ fontSize: '40px', fontFamily: 'cursive', color: 'rgb(229, 65, 65)' }}>Sign Up</h1>
                        </div>
                        <form>
                            <FormControl isRequired style={{ marginBottom: '8px' }}>
                                <FormLabel>Name</FormLabel>
                                <Input type='email' value={data.name} onChange={(e) => setDate({ ...data, name: e.target.value })} />

                            </FormControl>
                            <FormControl isRequired style={{ marginBottom: '8px' }}>
                                <FormLabel>Phone Number</FormLabel>
                                <Input type='number' value={data.phone} onChange={(e) => setDate({ ...data, phone: e.target.value })} />

                            </FormControl>
                            <FormControl isRequired as='fieldset' style={{ marginBottom: '8px' }}>
                                <FormLabel as='legend'>Gender</FormLabel>
                                <Select placeholder='Select gender' value={data.gender} onChange={(e) => setDate({ ...data, gender: e.target.value })}>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='other'>Other</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired style={{ marginBottom: '8px' }}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type='email'
                                    value={data.email} onChange={(e) => setDate({ ...data, email: e.target.value })}
                                />
                            </FormControl>
                            <FormControl isRequired style={{ marginBottom: '8px' }}>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type='password'
                                        placeholder='Enter password'
                                        value={data.password} onChange={(e) => setDate({ ...data, password: e.target.value })}
                                    />
                                </InputGroup>
                            </FormControl>
                            <WrapItem style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                <Button type='submit' onClick={storeDate} style={{ width: "100%" }} colorScheme='red'>{loading ? (<Spinner
                                    thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='blue.500'
                                    size='sm'
                                    style={{marginRight:'10px'}}
                                />) : ''}Register</Button>
                            </WrapItem>
                        </form>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <p>Already have an account ? <span><Link style={{ color: 'red' }} to='/'>click here.</Link></span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register