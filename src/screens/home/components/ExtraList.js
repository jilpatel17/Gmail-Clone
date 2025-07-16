import React from 'react'
import { Divider, Image } from '@chakra-ui/react'
const ExtraList = () => {
  return (
    <div style={{display:'flex',alignItems:'center',flexDirection:'column',cursor:'pointer',backgroundColor:'#f6f8fc'}}>
        <Image style={{marginTop:'30px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/5968/5968499.png' title='Calender'/>
        <Image style={{marginTop:'40px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/2875/2875444.png'/>
        <Image style={{marginTop:'40px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/720/720307.png'/>
        <Image style={{marginTop:'40px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/5968/5968552.png'/>
        <Image style={{marginTop:'40px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/201/201565.png'/>
        <Divider style={{marginTop:'30px'}}/>
        <Image style={{marginTop:'30px'}} width='30px' height='30px' src='https://cdn-icons-png.flaticon.com/512/4315/4315609.png'/>
    </div>
  )
}

export default ExtraList