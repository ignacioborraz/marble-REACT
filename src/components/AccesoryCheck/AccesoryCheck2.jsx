import { useState,useEffect } from 'react'

import './accesoryCheck.css'

const AccesoryCheck2 = ({ data,inputText,modal,selected,id_stock }) => {
    //console.log({ data,inputText,modal,selected,id_stock })
    const [check, setCheck] = useState(selected?.map(each=>each._id).includes(data._id))
    const [hide,setHide] = useState(false)
    const [show,setShow] = useState(true)

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
        [inputText,modal,check]
    )

    function changeCheck() {
        setCheck(!check)

    }

    return (
        <div className={`accCheck-container hide-${hide} modal-${show}`}>
            <input type="checkbox" name='acc' id={`${id_stock}-${data._id}`} value={data._id} defaultChecked={check} className={`accCheck-input`} />
            <img src={data.photo} alt={data._id} className={`accCheck-img`}  />
            <label htmlFor={`${id_stock}-${data._id}`} className={`accCheck-label il-${check}`} onClick={changeCheck}>{data.code}</label>
        </div>
    )
    
}

export default AccesoryCheck2