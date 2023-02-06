import React, { useState } from 'react'

import './inputCheck.css'

export default function InputCheck({ each,selected }) {

    const [check, setCheck] = useState(selected?.includes(each))
    
    function selectInst(event) {
        //console.log(event.target.checked)
        setCheck(event.target.checked)
    }

    return (
        <>
            <input type="checkbox" name='inst' id={each} defaultChecked={check} value={each} onChange={selectInst} className='inputCheck-input2' />
            <label htmlFor={each} className={`inputCheck-label2 il-${check}`}>{each}</label>
        </>
    )

}
