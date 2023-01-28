import React from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'
import Alert from '../Alert/Alert'
import ScrollToTop from  '../ScrollToTop'

import './layout.css'

export default function Layout() {

    return (
        <>
            <div className='layout-container'>
                <NavBar />
                <Outlet />
                <Alert />
                <ScrollToTop />
            </div>
        </>
    )
    
}