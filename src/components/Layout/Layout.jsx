import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

import NavBar from './NavBar'
import Alert from '../Alert/Alert'
import ScrollToTop from  '../ScrollToTop'

import './layout.css'
import logo from '../../media/logo_giacomo.png'

export default function Layout() {

    const navigate = useNavigate()

    return (
        <>
            <NavBar />
            <div className='layout-container'>
                <Outlet />
                <Alert />
                <ScrollToTop />
            </div>
            <div className='layout-footer'>
                <DoubleArrowIcon onClick={()=>navigate(-1)} sx={{transform: 'rotate(180deg)', marginRight: '20px', bgcolor: 'rgb(118, 118, 118)', color: 'white', width: '30px', borderRadius: '5px'}}/>
                <img src={logo} alt="logo" className='layout-img' />
                <DoubleArrowIcon onClick={()=>navigate(1)} sx={{marginLeft: '20px', bgcolor: 'rgb(118, 118, 118)', color: 'white', width: '30px', borderRadius: '5px'}}/>
            </div>
        </>
    )
    
}