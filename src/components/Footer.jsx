import React from 'react'
import '../styles/Footer.scss'
import { Email, LocalPhone } from '@mui/icons-material'
const Footer = () => {
    return (
        <div className='footer'>
            <div className='footer_left'>
                <a href='/'><img src='/assets/logo.png' alt='logo'/></a>
            </div>
            
            <div className='footer_center'>
                <h3>Usefull Links</h3>
                <ul>
                    <li>About Us</li>
                    <li>Terms and Conditions</li>
                    <li>Return and Refund Policy</li>
                </ul>
                
            </div>

            <div className='footer_right'>
                <h3>Contact</h3>
                <div className='footer_right_info'>
                    <LocalPhone />
                    <p>9873464335</p>
                </div>

                <div className='footer_right_info'>

                    <Email />
                    <p>chiraga581@gmail.com</p>

                </div>
                <img src='/assets/payment.png' alt='payment'/>
                
            </div>
        </div>
    )
}

export default Footer