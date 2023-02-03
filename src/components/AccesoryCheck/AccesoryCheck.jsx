import { useState,useEffect } from 'react'

import './accesoryCheck.css'

const AccesoryCheck = ({ data,inputText,modal }) => {

    const [check, setCheck] = useState(false)
    const [hide,setHide] = useState(false)
    const [show,setShow] = useState(true)
    
    function selectAcc(event) {
        //console.log(event.target.checked)
        setCheck(event.target.checked)
    }
    useEffect(
        () => {
            //console.log(inputText)
            if (inputText.length !== 0) {
                if (data?.code?.toLowerCase().includes(inputText?.toLowerCase().trim())) {
                    setHide(false)
                } else {
                    setHide(true)
                }
            } else {
                setHide(false)
            }
            setShow(modal)
        },
        [inputText,modal]
    )

    return (
        <div className={`accCheck-container hide-${hide} modal-${show}`}>
            <input type="checkbox" name='acc' id={data._id} value={data.code} onChange={selectAcc} className='accCheck-input' />
            <img src={data.photo} alt={data._id} className={`accCheck-img`}  />
            <label htmlFor={data._id} className={`accCheck-label il-${check}`}>{data.code}</label>
        </div>
    )
    
}

export default AccesoryCheck