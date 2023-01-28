import { useState,useEffect,useRef } from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import './button.css'

const Button = ({ icon,options,extra }) => {

    const [open, setOpen] = useState(false)
    const handleMenu = () => setOpen(!open)
    const menuIcon = useRef(null)

    useEffect(() => {
        document.addEventListener('click', handleCloseMenu)        
        return () => document.removeEventListener('click', handleCloseMenu)
    }, [])

    const handleCloseMenu = (event) => {
        const isClickInside = menuIcon.current.contains(event.target)
        if(menuIcon.current !== event.target && !isClickInside) {
            setOpen(false)
        }        
    }

    return (
        <>
            <img ref={menuIcon} onClick={handleMenu} className='button-icon' src={icon} alt={'icon'} />
            <div className='button-display'>
                {open && options?.map(option => <LinkRouter key={option.to} to={option.to} onClick={extra} className='button-option'>{option.name}</LinkRouter>)}
            </div>
        </>
    )
    
}

export default Button