import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css';
import E404 from './screens/error-page/E404';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Home from './screens/home/Home';
import SplashScreen from './screens/SplashScreen';
import Inbox from './screens/home/components/Inbox'
import Spam from './screens/home/components/Spam'
import Starred from './screens/home/components/Starred'
import Important from './screens/home/components/Important'
import Trash from './screens/home/components/Trash'
import Sent from './screens/home/components/Sent'
import { useSelector } from 'react-redux';
import EmailBodyRead from './screens/home/components/EmailBodyRead';
import ImportantBodyRead from './screens/home/components/ImportantBodyRead';
import SenderBodyRead from './screens/home/components/SenderBodyRead'
import StarredReadBody from './screens/home/components/StarredReadBody'
import SpamBodyRead from './screens/home/components/SpamBodyRead'
import TrashBodyRead from './screens/home/components/TrashBodyRead'

function App() {

  const [isSplashScreen, setSplashScreen] = useState(false);
  
  useEffect(() => {
    setSplashScreen(true);
    setTimeout(function () {
      setSplashScreen(false);
    }, 4000)
  }, [])

  const currentUser = useSelector((state)=>state.user.currentUser);

  const ProtectedRoute = ({children})=>{
    return currentUser ? (children) : <Navigate to='/' />
  }

  const MustStayInThisRoute = ({children})=>{
    return currentUser ?  <Navigate to='/home'/> : (children) 
  }

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <MustStayInThisRoute>{isSplashScreen ? <SplashScreen/>:<Login />}</MustStayInThisRoute>} />
          <Route path='/register' element={ <MustStayInThisRoute><Register/></MustStayInThisRoute>} />
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}>
            <Route path='inbox' element={<Inbox/>}/>
            <Route path='starred' element={<Starred/>}/>
            <Route path='sent' element={<Sent/>}/>
            <Route path='spam' element={<Spam/>}/>
            <Route path='important' element={<Important/>}/>
            <Route path='trash' element={<Trash/>}/>
            <Route path='sent/:id' element={<SenderBodyRead/>}/>
            <Route path='inbox/:id' element={<EmailBodyRead/>}/>
            <Route path='starred/:id' element={<StarredReadBody/>}/>
            <Route path='spam/:id' element={<SpamBodyRead/>}/>
            <Route path='trash/:id' element={<TrashBodyRead/>}/>
            <Route path='important/:id' element={<ImportantBodyRead/>}/>
          
          </Route> 
          <Route path='/*' element={ <E404/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
