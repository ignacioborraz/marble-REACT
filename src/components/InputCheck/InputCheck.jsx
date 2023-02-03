import React, { useState } from 'react'

import './inputCheck.css'

export default function InputCheck({ each }) {

    const [check, setCheck] = useState(false)
    
    function selectInst(event) {
        //console.log(event.target.checked)
        setCheck(event.target.checked)
    }

    return (
        <>
            <input type="checkbox" name='inst' id={each} value={each} onChange={selectInst} className='inputCheck-input' />
            <label htmlFor={each} className={`inputCheck-label il-${check}`}>{each}</label>
        </>
    )

}
