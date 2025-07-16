import React, { useState } from 'react'
import {
  FormControl, FormLabel, Input, Button, InputGroup, WrapItem, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from '@chakra-ui/react'

import './Login.css'
import { Link ,useNavigate} from 'react-router-dom'
import { auth, db } from '../../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../../features/user/userSlice'
const Login = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [updateemail, setUEmail] = useState('')
  // const [updatepass, setUPass] = useState('')
  // const [updatepass1, setUPass1] = useState('')
  const [error, setError] = useState('')
 const navigate = useNavigate()
     const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPass(e.target.value)
  const handleUEmailChange = (e) => setUEmail(e.target.value)
  // const handleUPassword = (e) => setUPass(e.target.value)
  // const handleUPassword1 = (e) => setUPass1(e.target.value)

  const dispatch = useDispatch()
  const handleLogin = async (e) => {
    e.preventDefault()
    await auth.signInWithEmailAndPassword(email,pass)
    .then(async (userCredential)=>{
      await db.collection('users').doc(userCredential.user.uid).get().then((snapshot)=>{
        const user =snapshot.data()
        dispatch(login(user))
        localStorage.setItem('current-user',JSON.stringify(user))
      })

      navigate('/home/inbox')
    })
    .catch(err=>setError(err))
    
  }

const sendResetPasswordEmail = async (e) => {
  e.preventDefault()
    try {
        await auth.sendPasswordResetEmail(updateemail);
        toast({
            position: 'bottom-left',
            description: "Password reset email sent successfully!",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    } catch (error) {
        console.error("Error sending reset email:", error);
        toast({
            position: 'bottom-left',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
};

  return (
    <div className='login__'>
      <div className='login__area'>
        <div className='login__img'>
          <img src='login.jpg' alt="" />
        </div>
        <div className='login__component'>
          <div style={{ width: '80%' }}>
            <div style={{ textAlign: 'center', marginBottom: '55px' }}>
              <h1 style={{ fontSize: '50px', fontFamily: 'cursive', color: 'rgb(229, 65, 65)' }}>Sign In</h1>
            </div>
            <form>

              <FormControl style={{ marginBottom: '20px' }}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  value={email}
                  placeholder='Enter Email Id.'
                  onChange={handleEmailChange}
                />

              </FormControl>
              <FormControl style={{ marginBottom: '20px' }}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type='password'
                    placeholder='Enter password'
                    value={pass}
                    onChange={handlePassword}
                  />
                </InputGroup>
              </FormControl>
              <WrapItem style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' onClick={handleLogin} style={{ width: "100%" }} colorScheme='red'>Login</Button>
              </WrapItem>
            </form>
            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <p>Forgot <span><span onClick={onOpen} style={{ color: 'red', cursor: 'pointer' }}>password</span> ?</span></p>
            </div>
            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <p>Don't have an account ? <span><Link style={{ color: 'red' }} to='/register'>click here.</Link></span></p>
            </div>
          </div>

        </div>
      </div>
      {/* forgot password modal started */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader><h1 style={{ color: 'red', fontFamily: 'cursive', fontSize: '25px' }}>Update Password</h1></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>

              <FormControl isRequired style={{ marginBottom: '20px' }}>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  value={updateemail}
                  placeholder='Enter Email Id.'
                  onChange={handleUEmailChange}
                />

              </FormControl>
              {/* <FormControl style={{ marginBottom: '20px' }}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type='password'
                    placeholder='Enter password'
                    onChange={handleUPassword}
                  />
                </InputGroup>
              </FormControl>
              <FormControl style={{ marginBottom: '20px' }}>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                  <Input
                    pr='4.5rem'
                    type='password'
                    placeholder='Re-Enter password'
                    onChange={handleUPassword1}
                  />
                </InputGroup>
              </FormControl> */}
              <WrapItem style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <Button type='submit' onClick={sendResetPasswordEmail} style={{ width: "100%" }} colorScheme='red'>Update</Button>
              </WrapItem>
            </form>
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Login