import { useState,useEffect } from 'react'

import './accesoryCheck.css'

const AccesoryCheck = ({ accesory,inputText,selected,modal }) => {

    const [check, setCheck] = useState(selected.includes(accesory?.name))
    const [hide,setHide] = useState(false)
    
    function selectAcc(event) {
        //console.log(data.code,check)
        setCheck(event.target.checked)
    }
    useEffect(
        () => {
            if (inputText.length !== 0) {
                if (accesory?.name?.toLowerCase().includes(inputText?.toLowerCase().trim())) {
                    setHide(false)
                } else {
                    setHide(true)
                }
            } else {
                setHide(false)
            }
        },
        [inputText,check,hide]
    )
    return (
        <div className={`ac-container hide-${hide} modal-${modal}`}>
            <input
                className={`ac-input modal-${modal}`}
                type="checkbox"
                name='acc'
                id={accesory._id}
                defaultChecked={check}
                value={accesory.name}
                onChange={selectAcc}/>
            <img src={accesory.photo} alt={accesory._id} className={`ac-img modal-${modal}`}  />
            <label htmlFor={accesory._id} className={`ac-label check-${check} modal-${modal}`}>{accesory.name}</label>
        </div>
    )
    
}

export default AccesoryCheck